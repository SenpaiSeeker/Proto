"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStore = void 0;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const EMPTY_KEY_FILENAME = "---.EMPTY_STRING.---";
function encodeKey(key) {
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
class FileStore {
    constructor(directory) {
        this.keys = [];
        this.pending = new Map();
        this.chain = Promise.resolve();
        this.flushQueued = false;
        this.writeCounter = 0;
        this.directory = directory;
        let exists = true;
        try {
            if (!(0, fs_1.statSync)(directory).isDirectory()) {
                throw new Error(`A file exists at the location '${directory}' when trying to create/open session storage`);
            }
        }
        catch (error) {
            if (error.code !== "ENOENT") {
                throw error;
            }
            exists = false;
        }
        if (!exists) {
            (0, fs_1.mkdirSync)(directory, { recursive: true });
        }
        for (const name of (0, fs_1.readdirSync)(this.directory)) {
            if (name.endsWith(".tmp")) {
                continue;
            }
            this.keys.push(decodeURIComponent(name));
        }
    }
    get length() {
        return this.keys.length;
    }
    key(index) {
        return this.keys[index] ?? null;
    }
    has(key) {
        return this.keys.includes(key);
    }
    getItem(key) {
        try {
            return (0, fs_1.readFileSync)((0, path_1.join)(this.directory, encodeKey(key)), "utf8");
        }
        catch (error) {
            if (error.code === "ENOENT") {
                return null;
            }
            throw error;
        }
    }
    setItem(key, value) {
        if (!this.keys.includes(key)) {
            this.keys.push(key);
        }
        this.pending.set(key, `${value}`);
        this.scheduleFlush();
    }
    removeItem(key) {
        const index = this.keys.indexOf(key);
        if (index >= 0) {
            this.keys.splice(index, 1);
        }
        this.pending.set(key, undefined);
        this.scheduleFlush();
    }
    clear() {
        this.keys.length = 0;
        this.pending.clear();
        let names = [];
        try {
            names = (0, fs_1.readdirSync)(this.directory);
        }
        catch {
            names = [];
        }
        this.chain = this.chain.then(async () => {
            for (const name of names) {
                try {
                    await (0, promises_1.rm)((0, path_1.join)(this.directory, name), {
                        force: true,
                        recursive: true,
                    });
                }
                catch (error) {
                    this.lastError = error;
                }
            }
        });
    }
    async flush() {
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
    scheduleFlush() {
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
                    const file = (0, path_1.join)(this.directory, encodeKey(key));
                    try {
                        if (value === undefined) {
                            await (0, promises_1.rm)(file, { force: true });
                        }
                        else {
                            await this.writeAtomic(file, value);
                        }
                    }
                    catch (error) {
                        this.lastError = error;
                    }
                }
            }
        });
    }
    async writeAtomic(file, value) {
        const temp = `${file}.${process.pid}.${this.writeCounter++}.tmp`;
        const handle = await (0, promises_1.open)(temp, "w");
        try {
            await handle.writeFile(value, "utf8");
            await handle.sync();
        }
        finally {
            await handle.close();
        }
        try {
            await (0, promises_1.rename)(temp, file);
        }
        catch (error) {
            await (0, promises_1.rm)(temp, { force: true });
            throw error;
        }
    }
}
exports.FileStore = FileStore;
