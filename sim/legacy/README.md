# Legacy simulations

`mediaThroughput.ts` targets the teleproto 1.230.1 media pipeline
(`MediaScheduler` / `OrderedWriter` / `client._media`). Upstream 1.232 replaced
that pipeline with `FileDownloader`, `FileUploader` and `ResourceManager`, so
this harness no longer imports APIs that exist in the library.

It is kept for historical comparison only and is not a gate. A 1.232 media
throughput baseline still needs to be written against the new pipeline before
making any gigabit-per-second claim.

The current scale simulation is `../scale500.ts`; it was updated for 1.232 and
covers client bootstrap, ping traffic, async GZIP, session persistence,
download-writer backpressure and socket backpressure at 500 clients.
