import { mkdirSync, readdirSync, readFileSync, statSync } from "fs";
import { open, rename, rm } from "fs/promises";
import { join } from "path";

const EMPTY_KEY_FILENAME = "---.EMPTY_STRING.---";

function encodeKey(key: string): string {
    const escaped = key === "" ? EMPTY_KEY_FILENAME : `${key}`;
    return encodeURIComponent(escaped)
        .replace(/[!'()]/g, escape)
        .replace(/\*/g, "%2A");
}

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
export class FileStore {
    private readonly directory: string;
    private readonly keys: string[] = [];
    private readonly pending = new Map<string, string | undefined>();
    private chain: Promise<void> = Promise.resolve();
    private flushQueued = false;
    private writeCounter = 0;
    private lastError: Error | undefined;

    constructor(directory: string) {
        this.directory = directory;
        let exists = true;
        try {
            if (!statSync(directory).isDirectory()) {
                throw new Error(
                    `A file exists at the location '${directory}' when trying to create/open session storage`
                );
            }
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
                throw error;
            }
            exists = false;
        }
        if (!exists) {
            mkdirSync(directory, { recursive: true });
        }
        for (const name of readdirSync(this.directory)) {
            if (name.endsWith(".tmp")) {
                continue;
            }
            this.keys.push(decodeURIComponent(name));
        }
    }

    get length(): number {
        return this.keys.length;
    }

    key(index: number): string | null {
        return this.keys[index] ?? null;
    }

    has(key: string): boolean {
        return this.keys.includes(key);
    }

    getItem(key: string): string | null {
        try {
            return readFileSync(
                join(this.directory, encodeKey(key)),
                "utf8"
            );
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === "ENOENT") {
                return null;
            }
            throw error;
        }
    }

    setItem(key: string, value: string): void {
        if (!this.keys.includes(key)) {
            this.keys.push(key);
        }
        this.pending.set(key, `${value}`);
        this.scheduleFlush();
    }

    removeItem(key: string): void {
        const index = this.keys.indexOf(key);
        if (index >= 0) {
            this.keys.splice(index, 1);
        }
        this.pending.set(key, undefined);
        this.scheduleFlush();
    }

    clear(): void {
        this.keys.length = 0;
        this.pending.clear();
        let names: string[] = [];
        try {
            names = readdirSync(this.directory);
        } catch {
            names = [];
        }
        this.chain = this.chain.then(async () => {
            for (const name of names) {
                try {
                    await rm(join(this.directory, name), {
                        force: true,
                        recursive: true,
                    });
                } catch (error) {
                    this.lastError = error as Error;
                }
            }
        });
    }

    async flush(): Promise<void> {
        while (this.flushQueued || this.pending.size > 0) {
            this.scheduleFlush();
            await this.chain;
        }
        if (this.lastError) {
            const error = this.lastError;
            this.lastError = undefined;
            throw error;
        }
    }

    private scheduleFlush(): void {
        if (this.flushQueued) {
            return;
        }
        this.flushQueued = true;
        this.chain = this.chain.then(async () => {
            this.flushQueued = false;
            while (this.pending.size > 0) {
                const batch = Array.from(this.pending.entries());
                this.pending.clear();
                for (const [key, value] of batch) {
                    const file = join(this.directory, encodeKey(key));
                    try {
                        if (value === undefined) {
                            await rm(file, { force: true });
                        } else {
                            await this.writeAtomic(file, value);
                        }
                    } catch (error) {
                        this.lastError = error as Error;
                    }
                }
            }
        });
    }

    private async writeAtomic(file: string, value: string): Promise<void> {
        const temp = `${file}.${process.pid}.${this.writeCounter++}.tmp`;
        const handle = await open(temp, "w");
        try {
            await handle.writeFile(value, "utf8");
            await handle.sync();
        } finally {
            await handle.close();
        }
        try {
            await rename(temp, file);
        } catch (error) {
            await rm(temp, { force: true });
            throw error;
        }
    }
}
