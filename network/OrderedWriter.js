"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundedSemaphore = exports.OrderedWriter = void 0;
exports.writeWithBackpressure = writeWithBackpressure;
/**
 * Writes one chunk and, when the target is a stream whose buffer is full,
 * waits for `drain` before returning. Without this the download loops push
 * every part into the stream buffer as fast as the network delivers them,
 * which is unbounded memory with hundreds of concurrent downloads.
 */
async function writeWithBackpressure(writer, data) {
    const stream = writer;
    const accepted = stream.write(data);
    if (accepted !== false ||
        typeof stream.once !== "function" ||
        typeof stream.removeListener !== "function") {
        return;
    }
    await new Promise((resolve, reject) => {
        const onDrain = () => {
            cleanup();
            resolve();
        };
        const onError = (error) => {
            cleanup();
            reject(error);
        };
        const cleanup = () => {
            stream.removeListener("drain", onDrain);
            stream.removeListener("error", onError);
        };
        stream.once("drain", onDrain);
        stream.once("error", onError);
    });
}
class OrderedWriter {
    constructor(writer) {
        this.nextIdx = 0;
        this._stash = new Map();
        this._draining = Promise.resolve();
        this._writer = writer;
    }
    async write(idx, data, after) {
        if (idx < this.nextIdx)
            return;
        this._stash.set(idx, data);
        this._draining = this._draining.then(() => this._drain(after));
        await this._draining;
    }
    async _drain(after) {
        while (this._stash.has(this.nextIdx)) {
            const buf = this._stash.get(this.nextIdx);
            this._stash.delete(this.nextIdx);
            // Empty parts still advance nextIdx — otherwise a single zero-byte
            // response (e.g. server-side EOF that's earlier than our advertised
            // size) would freeze the drain and orphan every later part.
            if (buf.length > 0) {
                await writeWithBackpressure(this._writer, buf);
            }
            this.nextIdx++;
            if (after && buf.length > 0) {
                await after(buf.length);
            }
        }
    }
    reset(toIdx) {
        this.nextIdx = toIdx;
        for (const k of [...this._stash.keys()]) {
            if (k < toIdx)
                this._stash.delete(k);
        }
    }
}
exports.OrderedWriter = OrderedWriter;
class BoundedSemaphore {
    constructor(capacity) {
        this._waiters = [];
        if (capacity < 1)
            throw new Error("BoundedSemaphore capacity must be >= 1");
        this._available = capacity;
    }
    async acquire() {
        if (this._available > 0) {
            this._available--;
            return;
        }
        await new Promise((resolve) => this._waiters.push(resolve));
    }
    release() {
        const next = this._waiters.shift();
        if (next) {
            next(); // slot transferred, counter untouched
            return;
        }
        this._available++;
    }
}
exports.BoundedSemaphore = BoundedSemaphore;
