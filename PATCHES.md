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

## 6. Backpressure on the socket write path

The transport never awaited the socket: `PromisedNetSockets.write` called
`this.client.write(data)` and returned nothing, and `Connection._send` (and
the obfuscated/MTProxy/WebSocket variants) called the socket without
awaiting. A slow or congested peer therefore let the write loop push every
batched request into the socket's userland buffer — with media parts of up to
1 MB per batch, a stalled connection could accumulate megabytes per client,
multiplied by hundreds of clients.

`PromisedNetSockets.write` is now `async` and, when `socket.write()` reports a
full buffer, waits for `drain` (rejecting on `error`/`close` so a dead socket
cannot hang the sender). The whole chain propagates and awaits that promise:
`Connection._send`, `ObfuscatedConnection._send`/`_initConn`,
`ObfuscatedIO.write`, `MTProxyIO.write`, `FakeTlsSocket.write`/`handshake`,
and `PromisedWebSockets.write` (waits while `bufferedAmount` is above 1 MB).
The WEB-proxy `RelaySocket` keeps its own bounded queue and is unchanged.

Only one reader and one writer still exist per sender; the write loop now
simply pauses while the kernel buffer is full instead of buffering the whole
backlog in userland.

### Audit of the remaining hot paths

The same pass reviewed the other pieces that see 500-client concurrency and
found them already bounded:

- `MediaScheduler`/`BalancePolicy` bound per-DC in-flight media requests and
  pace sends; retries are capped and abortable.
- `SenderSlot`/`Network` ref-count media sessions and close idle ones on a
  timer, so media sockets do not pile up per client.
- Uploads read file parts lazily (`CustomBuffer` uses `fs.promises.open` +
  positional reads for files above ~20 MB) instead of loading large files
  into memory.
- `EntityCache` is an LRU capped at 4096 entries, the update manager's
  recent-message dedup queue is capped and its channel timers are cleared on
  stop, and `crc32` already uses the native `zlib.crc32` when available.
- Session `FileStore.getItem` reads are the only remaining synchronous file
  reads by design (the session API is synchronous); they are plain page-cache
  reads and the entity layer above them is now memory-first (patch 3).

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

Reference run (Node v26.10.0, 6 vCPU container, `1.230.1-seeker.3`):

```
[1/7] connect          : 500/500 clients in 84.5 ms | loop p99=0.0 ms stall-max=136.5 ms stalls>=250ms=0
[2/7] ping storm       : 20000 encrypted pings, 2261.7 KB in 20 s | loop p99=31.2 ms stall-max=49.5 ms stalls>=250ms=0
[3/7] gzip 4.2 MB x20 : unzipSync(legacy) wall=196.5 ms stall=188 ms | GZIPPacked.ungzip(patched) wall=452.5 ms stall=27 ms
[4/7] StoreSession x500 : write 142 ms (stall 144 ms) load 69 ms (stall 72 ms) delete 36 ms (stall 41 ms)
[5/7] session storm     : 500 sessions x 40 rows, 200000 reads (200000 hits)
                         | read 117 ms (0.6 us/op, stall 0 ms)
                         | raw readFileSync 139 ms (6.9 us/op, stall 0 ms)
                         seed 2158 ms (stall 874 ms) writes 99 ms (stall 32 ms) flush 16 ms (stall 0 ms)
[6/7] download writes   : 500 slow sinks x 512 KB (16 chunks, sink 2 ms/chunk)
                         | writeWithBackpressure peak-queued 31.2 MB rss +22 MB wall 488 ms
                         | raw stream.write peak-queued 250.0 MB rss +125 MB wall 399 ms
[7/7] socket backpressure: 12 MB to a slow TCP peer (58 ms patched)
                         | await-drain peak 1024 KB | raw write peak 10240 KB
VERDICT: no blocking I/O detected
```

Phase 5 compares the memory-first entity lookup against the raw
`readFileSync` path the old code used (~15x cheaper per lookup, no filesystem
traffic). Phase 6 models a consumer slower than the network (the reason to
apply backpressure): without `writeWithBackpressure` all 500 writers queue
their entire file (250 MB) in userland, with it the queue stays at ~31 MB —
bounded by the high-water mark instead of the download size. Phase 7 pushes
12 MB through a real loopback TCP peer that reads in short bursts: the raw
socket path (what the transport used to do) queues ~10 MB in userland, while
`PromisedNetSockets.write` stays bounded at one in-flight chunk (1 MB) and
pauses the sender until the peer drains.

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
