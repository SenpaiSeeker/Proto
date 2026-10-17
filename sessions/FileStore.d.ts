/**
 * File-backed key/value storage with the same on-disk layout as
 * `node-localstorage` (one file per key, `encodeURIComponent` file names).
 *
 * Reads stay synchronous because the session API is synchronous, but they are
 * plain `readFileSync` calls without fsync and are cheap. Writes are queued
 * and flushed asynchronously with atomic temp-file + fsync + rename, so a
 * burst of session updates never blocks the event loop (the previous
 * `write-file-atomic` sync writes did, ~0.2 ms of fsync per key).
 *
 * Writes are coalesced per key and are durable shortly after the call; call
 * {@link FileStore.flush} when the caller must wait for persistence (for
 * example before deleting a session directory or exporting a session).
 */
export declare class FileStore {
    private readonly directory;
    private readonly keys;
    private readonly pending;
    private chain;
    private flushQueued;
    private writeCounter;
    private lastError;
    constructor(directory: string);
    get length(): number;
    key(index: number): string | null;
    has(key: string): boolean;
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
    flush(): Promise<void>;
    private scheduleFlush;
    private writeAtomic;
}
