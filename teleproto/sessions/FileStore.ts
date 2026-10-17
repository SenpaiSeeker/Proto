import { readdirSync, readFileSync, statSync } from "fs";
import { mkdir, open, rename, rm } from "fs/promises";
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
    private readonly pendingAdded: string[] = [];
    private keysScanned = false;
    private readonly pending = new Map<string, string | undefined>();
    private chain: Promise<void> = Promise.resolve();
    private flushQueued = false;
    private writeCounter = 0;
    private lastError: Error | undefined;

    constructor(directory: string) {
        this.directory = directory;
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
        }
    }

    get length(): number {
        this.ensureKeys();
        return this.keys.length;
    }

    key(index: number): string | null {
        this.ensureKeys();
        return this.keys[index] ?? null;
    }

    has(key: string): boolean {
        this.ensureKeys();
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
        if (!this.hasKeyRecord(key)) {
            this.pendingAdded.push(key);
        }
        this.pending.set(key, `${value}`);
        this.scheduleFlush();
    }

    removeItem(key: string): void {
        const pendingIndex = this.pendingAdded.indexOf(key);
        if (pendingIndex >= 0) {
            this.pendingAdded.splice(pendingIndex, 1);
        }
        if (this.keysScanned) {
            const index = this.keys.indexOf(key);
            if (index >= 0) {
                this.keys.splice(index, 1);
            }
        }
        this.pending.set(key, undefined);
        this.scheduleFlush();
    }

    clear(): void {
        this.keys.length = 0;
        this.pendingAdded.length = 0;
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

    private hasKeyRecord(key: string): boolean {
        if (!this.keysScanned) {
            return this.pendingAdded.includes(key);
        }
        return this.keys.includes(key);
    }

    /**
     * Loads the on-disk key index on first use. Sessions that only read and
     * write known keys (the normal case) never pay for the directory scan, so
     * opening hundreds of sessions at boot stays cheap.
     */
    private ensureKeys(): void {
        if (this.keysScanned) {
            return;
        }
        this.keysScanned = true;
        let names: string[] = [];
        try {
            names = readdirSync(this.directory);
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
                throw error;
            }
        }
        for (const name of names) {
            if (name.endsWith(".tmp")) {
                continue;
            }
            this.keys.push(decodeURIComponent(name));
        }
        for (const key of this.pendingAdded) {
            if (!this.keys.includes(key)) {
                this.keys.push(key);
            }
        }
        this.pendingAdded.length = 0;
    }

    private scheduleFlush(): void {
        if (this.flushQueued) {
            return;
        }
        this.flushQueued = true;
        this.chain = this.chain.then(async () => {
            this.flushQueued = false;
            if (this.pending.size === 0) {
                return;
            }
            await mkdir(this.directory, { recursive: true });
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
