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

Reference run (Node v26.10.0, 6 vCPU container):

```
[1/4] connect          : 500/500 clients in 138.2 ms | loop p99=0.0 ms  stall-max=210.0 ms stalls>=250ms=0
[2/4] ping storm       : 20000 encrypted pings, 2261.7 KB in 20 s
                         | loop p99=28.6 ms stall-max=53.0 ms stalls>=250ms=0
[3/4] gzip 4.2 MB x20  : unzipSync(legacy) wall=176.6 ms stall=168 ms
                         | GZIPPacked.ungzip(patched) wall=485.2 ms stall=27 ms
[4/4] StoreSession x500 : write 174 ms (stall 172 ms) load 115 ms (stall 122 ms) delete 5 ms (stall 0 ms)
VERDICT: no blocking I/O detected
```

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
