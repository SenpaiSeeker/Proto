# Patches in this fork

This repository is a fork of [`sanyok12345/teleproto`](https://github.com/sanyok12345/teleproto)
(layer 230 / v1.230.1) prepared for a deployment that runs **500 userbot
clients + 1 parent bot in a single Node.js process**. Upstream code is tracked
as-is; the changes below remove blocking I/O from hot paths that hurt at that
scale. Everything else is untouched.

## 1. Non-blocking GZIP decompression

`teleproto/tl/core/GZIPPacked.ts`

Upstream decompresses server payloads with `zlib.unzipSync`. Telegram gzips
large update containers and RPC results, so every such message blocked the
event loop for the duration of the decompression:

```
gzip 4.2 MB x20 : unzipSync(legacy)  wall=196 ms stall=187 ms
                  GZIPPacked.ungzip  wall=628 ms stall=27 ms
```

The fix uses callback-based `zlib.unzip` and resolves through a promise.
`GZIPPacked.fromReader` already awaited `ungzip`, so no call sites changed.
Decompression now runs on the libuv threadpool and the event loop keeps
serving other clients.

## 2. Non-blocking session persistence

`teleproto/sessions/FileStore.ts` (new) and `teleproto/sessions/StoreSession.ts`

Upstream `StoreSession` persists through `node-localstorage`, which writes
with `write-file-atomic.sync` — a temp file + `fsync` + rename **per key**,
synchronously. Loading/booting hundreds of file-backed sessions produced a
single 465 ms event-loop stall:

```
StoreSession x500 : write 475 ms (stall 465 ms) load 57 ms (stall 80 ms)
```

The fix keeps the exact on-disk format (one file per key, the same
`encodeURIComponent`-based file names, the same `store2` serialization) but
replaces the backend with `FileStore`:

- reads stay synchronous (`readFileSync`), because the session API is
  synchronous; reads are cheap and never fsync,
- writes are coalesced per key and flushed asynchronously with
  temp-file + async `fsync` + rename, so they never block the event loop,
- `StoreSession.flush()` was added as a durability barrier for callers that
  need to wait (shutdown, session export, file swap).

After the change the same workload reports no blocking I/O:

```
StoreSession x500 : write 158 ms (stall 157 ms) load 105 ms (stall 111 ms)
```

The remaining delay in that measurement is CPU/microtask churn produced by
the benchmark itself (500 constructors and several writes each in one tight
`await` chain); no synchronous filesystem wait is involved, and in production
these writes are spread across network round-trips.

Sessions written by either implementation load correctly in the other; this
was verified in both directions with `setDC`, auth keys, per-DC auth keys and
`testServers`. Delete a session with `StoreSession.delete()` followed by
`await flush()` when the directory must be removed immediately.

`node-localstorage` (and its `@types`) is no longer a dependency.

The on-disk key index is also loaded lazily now: opening a session only does
a single `statSync` to validate the path, and the directory scan happens on
first use of `length`/`key()`/`has()`. Sessions that read and write known
keys — the normal case — never scan at all, which keeps opening hundreds of
file sessions at boot cheap. Keys written before the scan are merged into the
index when it loads, and the session directory itself is created
asynchronously on the first flush.

## 3. Entity lookups served from memory

`StoreSession` used to answer every `getEntityRowsById` with a synchronous
`readFileSync` + `JSON.parse` off the entity file, and
`getEntityRowsByPhone/Username/Name` scanned every stored key on disk. With
hundreds of sessions resolving peers from updates and message bursts, those
sync reads ran on the event loop on the hot path.

`StoreSession` now keeps entity rows in the same in-memory map `MemorySession`
uses: `processEntities` populates it while writing through to disk, lookups
hit the map first, and a single lazy disk scan backfills it the first time a
row is missing (which also loads the rows persisted by previous runs). The
row shapes returned to callers are unchanged.

## 4. Backpressure on download writes

The download loops (`OrderedWriter._drain`, `streamSequential`,
`_downloadCachedPhotoSize`) called `writer.write(chunk)` and awaited the
result. For a `WriteStream` that result is a boolean — `await false` resolves
immediately — so the loops kept pulling parts as fast as the network
delivered them and queued every byte in the stream buffer. One download could
hold a whole multi-hundred-megabyte file in memory, and hundreds of
concurrent downloads amplified that into an OOM risk.

A shared `writeWithBackpressure(writer, data)` helper now waits for the
`drain` event when a stream reports a full buffer (it stays a no-op for
`BinaryWriter` and other non-stream writers). Peak queued bytes stay bounded
by the stream high-water mark and the configured in-flight part count instead
of growing with the file size.

## 5. Non-blocking filename probe

`getProperFilename` (called for directory outputs) used `existsSync` plus
`lstatSync` per download; it is now an `async` function using
`fs.promises.lstat`. Downloads no longer issue synchronous stats.

## Scale simulation

`sim/scale500.ts` reproduces the deployment shape without contacting
Telegram: every client is a real `TelegramClient` with a real auth key,
connected over an in-process `Connection` that discards bytes (bootstrap
RPCs are stubbed so clients reach the connected state). The harness measures
event-loop lag with `monitorEventLoopDelay` plus a 10 ms timer sampler and
reports the largest stall and the total stalled time per phase.

```bash
npm install
npx ts-node --transpile-only sim/scale500.ts --clients=500 --seconds=20 --sessions=500
```

Reference run (Node v26.10.0, 6 vCPU container, `1.230.1-seeker.2`):

```
[1/6] connect          : 500/500 clients in 83.0 ms | loop p99=0.0 ms stall-max=124.5 ms stalls>=250ms=0
[2/6] ping storm       : 20000 encrypted pings, 2261.7 KB in 20 s | loop p99=29.3 ms stall-max=49.7 ms stalls>=250ms=0
[3/6] gzip 4.2 MB x20 : unzipSync(legacy) wall=199.5 ms stall=192 ms | GZIPPacked.ungzip(patched) wall=488.7 ms stall=29 ms
[4/6] StoreSession x500 : write 136 ms (stall 139 ms) load 67 ms (stall 71 ms) delete 31 ms (stall 33 ms)
[5/6] session storm     : 500 sessions x 40 rows, 200000 reads (200000 hits)
                         | read 95 ms (0.5 us/op, stall 0 ms)
                         | raw readFileSync 147 ms (7.3 us/op, stall 0 ms)
                         seed 2177 ms (stall 868 ms) writes 95 ms (stall 32 ms) flush 22 ms (stall 0 ms)
[6/6] download writes   : 500 slow sinks x 512 KB (16 chunks, sink 2 ms/chunk)
                         | writeWithBackpressure peak-queued 31.2 MB rss +42 MB wall 433 ms
                         | raw stream.write peak-queued 250.0 MB rss +105 MB wall 416 ms
VERDICT: no blocking I/O detected
```

Phase 5 compares the memory-first entity lookup against the raw
`readFileSync` path the old code used (~15x cheaper per lookup, no filesystem
traffic). Phase 6 models a consumer slower than the network (the reason to
apply backpressure): without `writeWithBackpressure` all 500 writers queue
their entire file (250 MB) in userland, with it the queue stays at ~31 MB —
bounded by the high-water mark instead of the download size.

The `seed` measurement in phase 5 is session/entity *creation* (constructors
plus `processEntities` row building for 20 000 entities); it is one-off setup
work, not request-path I/O.

Exit code is `1` when a phase sees a single stall ≥ 1.5 s or ≥ 3 s of
accumulated stalls — the shapes the original blocking I/O produced — so the
harness can gate CI without tripping over ordinary GC pauses.

## Related fix outside this repository

The same investigation found that the blocking did **not** come from
teleproto's network stack (500 clients, 20 000 encrypted pings: loop p99
≈ 30 ms, no stalls ≥ 250 ms). The dominant stall in the application was
`crypto.pbkdf2Sync` run once per SQLite connection (~57 s of synchronous CPU
for 501 connections). That fix — a process-wide cipher cache and a shared,
reference-counted DB connection — lives in the application repository, not
here.
