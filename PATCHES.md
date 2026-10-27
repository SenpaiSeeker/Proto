# Patches in this fork

This repository is a fork of [`sanyok12345/teleproto`](https://github.com/sanyok12345/teleproto)
prepared for a deployment that runs **500 userbot clients + 1 parent bot in a
single Node.js process**. The fork is based on upstream **v1.232.0** (layer
232) and re-applies the non-blocking/scale fixes that still matter after
upstream's transport, media and update-manager refactor.

Everything else is upstream code.

## 1. Non-blocking GZIP decompression

`teleproto/tl/core/GZIPPacked.ts`, `teleproto/tl/core/RPCResult.ts`,
`teleproto/network/mtproto/MessageRouter.ts`, `teleproto/network/session/Session.ts`

Upstream 1.232 decompresses `gzip_packed` payloads with `zlib.unzipSync` while
routing incoming messages. Telegram gzips large update containers and RPC
results, so a single message could block the event loop for the duration of
the decompression.

The fork uses callback-based `zlib.unzip` behind `GZIPPacked.ungzip()`.
`GZIPPacked.fromReader()` now keeps the compressed bytes, `RPCResult` carries
the packed payload, and `MessageRouter.route()` awaits decompression before
parsing the inner object. `Session.receive()` awaits the router. No
synchronous `unzip` remains on the incoming-message path.

## 2. Non-blocking session persistence

`teleproto/sessions/FileStore.ts` (new) and `teleproto/sessions/StoreSession.ts`

Upstream `StoreSession` persists through `node-localstorage`, which writes
with `write-file-atomic.sync` — a temp file + `fsync` + rename **per key**,
synchronously. Loading/booting hundreds of file-backed sessions produced a
single 465 ms event-loop stall in the 1.230.1 deployment.

`FileStore` keeps the exact on-disk format (one file per key, the same
`encodeURIComponent`-based file names, the same `store2` serialization) but:

- reads stay synchronous (`readFileSync`), because the session API is
  synchronous; reads are cheap and never fsync,
- writes are coalesced per key and flushed asynchronously with
  temp-file + async `fsync` + rename, so they never block the event loop,
- `StoreSession.flush()` is a durability barrier for callers that need to
  wait (shutdown, session export, file swap).

The on-disk key index is loaded lazily: opening a session only does a single
`statSync` to validate the path, and the directory scan happens on first use
of `length`/`key()`/`has()`. Sessions that read and write known keys — the
normal case — never scan at all. Keys written before the scan are merged into
the index when it loads, and the session directory is created asynchronously
on the first flush.

Sessions written by either implementation load correctly in the other; this
was verified in both directions with `setDC`, auth keys, per-DC auth keys and
`testServers`. Delete a session with `StoreSession.delete()` followed by
`await flush()` when the directory must be removed immediately.

`node-localstorage` (and its `@types`) is no longer a dependency.

## 3. Entity lookups served from memory

`teleproto/sessions/StoreSession.ts`

`StoreSession` used to answer every `getEntityRowsById` with a synchronous
`readFileSync` + `JSON.parse` off the entity file, and
`getEntityRowsByPhone/Username/Name` scanned every stored key on disk. With
hundreds of sessions resolving peers from updates and message bursts, those
sync reads ran on the event loop on the hot path.

`StoreSession` keeps entity rows in the same in-memory map `MemorySession`
uses: `processEntities` populates it while writing through to disk, lookups
hit the map first, and a single lazy disk scan backfills it the first time a
row is missing (which also loads rows persisted by previous runs). The row
shapes returned to callers are unchanged.

## 4. Backpressure on download writes

`teleproto/client/files/sinks.ts` and `teleproto/client/methods/downloads.ts`

Upstream 1.232 writes downloaded parts into the output sink and awaits the
sink. For a user-provided `WriteStream`, however, `write()` returns a boolean
and `await false` resolves immediately, so the download loop could keep
pulling parts as fast as the network delivered them and queue the whole file
in the stream buffer.

`WriterTarget` now uses `writeWithBackpressure()`: when a stream reports a
full buffer it waits for `drain` (or rejects on `error`) before the ordered
sink advances. Peak queued bytes stay bounded by the stream high-water mark
and the configured in-flight part count instead of growing with the file
size. `FileTarget` already awaits `FileHandle.write()`; `BufferTarget` writes
directly into its destination buffer.

`getProperFilename` (called for directory outputs) used `existsSync` plus
`lstatSync` per download; it is now an `async` function using
`fs.promises.lstat`. Downloads no longer issue synchronous stats.

## 5. Backpressure on the socket write path

`teleproto/network/transport/socket/NetSocket.ts`,
`teleproto/network/transport/socket/WebSocketSocket.ts`,
`teleproto/network/connection/Connection.ts`,
`teleproto/network/connection/Obfuscation.ts`,
`teleproto/network/transport/MTProxyTransport.ts`

Upstream 1.232's `NetSocket.write()` called `net.Socket.write()` and returned
nothing, and `Connection.send()` did not await the write. A slow or congested
peer therefore let the send loop push every batched request into the socket's
userland buffer — with media parts of up to 1 MB per batch, a stalled
connection could accumulate megabytes per client.

`NetSocket.write()` is now async and waits for `drain` when the kernel buffer
is full. `WebSocketSocket.write()` applies the same idea using
`bufferedAmount` with a 1 MB high-water mark. `Connection`, the obfuscated
connection, fake-TLS MTProxy and the WebSocket transport await the write all
the way down, so one slow client pauses its own sender instead of growing an
unbounded buffer.

## 6. Media pipeline after upstream 1.232

Upstream 1.232 replaced the old `MediaScheduler`/`OrderedWriter` pipeline with
`FileDownloader`, `FileUploader`, `ResourceManager` and per-DC session pools.
The old fork's 8x8 window and 4096 requests/s pacing constants no longer
exist upstream; the new pipeline bounds in-flight bytes through
`ResourceManager`, limits concurrent operations per DC, and awaits the output
sink.

The fork keeps the new upstream pipeline and adds the download-writer and
socket backpressure described above. The previous 1 GB/s media benchmark was
written against the removed 1.230.1 pipeline, so it is not a valid measurement
for 1.232.0. Re-baseline media throughput before making a new gigabit claim.

## 7. Stale channel update tracking

`teleproto/client/updates/ChannelUpdates.ts` and
`teleproto/client/methods/users.ts`

A channel tracker could outlive access to its channel. The old resolver
swallowed the failure and returned `undefined`; `fetchDifferenceOnce` only
logged a warning and left the PTS timer alive, so every retry repeated
`channels.GetChannels` and printed an error stack. In the observed deployment
this happened once per second for channel `2214771215` and later
`1457191159`.

Channel resolution is now classified:

- `CHANNEL_INVALID` and `CHANNEL_PRIVATE` drop the tracker immediately.
- other resolution failures retry with the existing backoff, then drop after
  three attempts.

`getInputEntity` logs those two expected errors at DEBUG and keeps the
original RPC error as the generic error's `cause`. This removes the runaway
timer/RPC loop and the repeated stack trace while leaving valid channel
difference processing unchanged. `sim/staleChannel.ts` covers invalid,
transient and valid resolution paths against the new `ChannelUpdates` class.

## Regression coverage

`sim/staleChannel.ts` runs against the 1.232 update manager:

```bash
/root/TgUserBot/node_modules/.bin/tsx sim/staleChannel.ts
# stale channel regression: OK
```

`sim/entityCacheMemory.ts` still measures the entity-cache memory bound.
`sim/mediaThroughput.ts` and `sim/scale500.ts` were written against the
1.230.1 transport/media internals and need a 1.232 re-baseline before they
can be used as gates.

## Related fix outside this repository

The same investigation found that the dominant boot stall did **not** come
from teleproto's network stack. It was `crypto.pbkdf2Sync` run once per SQLite
connection (~57 s of synchronous CPU for 501 connections). That fix — a
process-wide cipher cache and a shared, reference-counted DB connection —
lives in the application repository, not here.
