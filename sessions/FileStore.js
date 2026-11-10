Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let fs = require("fs");
let fs_promises = require("fs/promises");
let path = require("path");
// teleproto/sessions/FileStore.ts
const EMPTY_KEY_FILENAME = "---.EMPTY_STRING.---";
function encodeKey(key) {
	const escaped = key === "" ? EMPTY_KEY_FILENAME : `${key}`;
	return encodeURIComponent(escaped).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
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
var FileStore = class {
	constructor(directory) {
		this.keys = [];
		this.pendingAdded = [];
		this.keysScanned = false;
		this.pending = /* @__PURE__ */ new Map();
		this.chain = Promise.resolve();
		this.flushQueued = false;
		this.writeCounter = 0;
		this.directory = directory;
		try {
			if (!(0, fs.statSync)(directory).isDirectory()) throw new Error(`A file exists at the location '${directory}' when trying to create/open session storage`);
		} catch (error) {
			if (error.code !== "ENOENT") throw error;
		}
	}
	get length() {
		this.ensureKeys();
		return this.keys.length;
	}
	key(index) {
		this.ensureKeys();
		return this.keys[index] ?? null;
	}
	has(key) {
		this.ensureKeys();
		return this.keys.includes(key);
	}
	getItem(key) {
		try {
			return (0, fs.readFileSync)((0, path.join)(this.directory, encodeKey(key)), "utf8");
		} catch (error) {
			if (error.code === "ENOENT") return null;
			throw error;
		}
	}
	setItem(key, value) {
		if (!this.hasKeyRecord(key)) this.pendingAdded.push(key);
		this.pending.set(key, `${value}`);
		this.scheduleFlush();
	}
	removeItem(key) {
		const pendingIndex = this.pendingAdded.indexOf(key);
		if (pendingIndex >= 0) this.pendingAdded.splice(pendingIndex, 1);
		if (this.keysScanned) {
			const index = this.keys.indexOf(key);
			if (index >= 0) this.keys.splice(index, 1);
		}
		this.pending.set(key, void 0);
		this.scheduleFlush();
	}
	clear() {
		this.keys.length = 0;
		this.pendingAdded.length = 0;
		this.pending.clear();
		let names = [];
		try {
			names = (0, fs.readdirSync)(this.directory);
		} catch {
			names = [];
		}
		this.chain = this.chain.then(async () => {
			for (const name of names) try {
				await (0, fs_promises.rm)((0, path.join)(this.directory, name), {
					force: true,
					recursive: true
				});
			} catch (error) {
				this.lastError = error;
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
			this.lastError = void 0;
			throw error;
		}
	}
	hasKeyRecord(key) {
		if (!this.keysScanned) return this.pendingAdded.includes(key);
		return this.keys.includes(key);
	}
	/**
	* Loads the on-disk key index on first use. Sessions that only read and
	* write known keys (the normal case) never pay for the directory scan, so
	* opening hundreds of sessions at boot stays cheap.
	*/
	ensureKeys() {
		if (this.keysScanned) return;
		this.keysScanned = true;
		let names = [];
		try {
			names = (0, fs.readdirSync)(this.directory);
		} catch (error) {
			if (error.code !== "ENOENT") throw error;
		}
		for (const name of names) {
			if (name.endsWith(".tmp")) continue;
			this.keys.push(decodeURIComponent(name));
		}
		for (const key of this.pendingAdded) if (!this.keys.includes(key)) this.keys.push(key);
		this.pendingAdded.length = 0;
	}
	scheduleFlush() {
		if (this.flushQueued) return;
		this.flushQueued = true;
		this.chain = this.chain.then(async () => {
			this.flushQueued = false;
			if (this.pending.size === 0) return;
			await (0, fs_promises.mkdir)(this.directory, { recursive: true });
			while (this.pending.size > 0) {
				const batch = Array.from(this.pending.entries());
				this.pending.clear();
				for (const [key, value] of batch) {
					const file = (0, path.join)(this.directory, encodeKey(key));
					try {
						if (value === void 0) await (0, fs_promises.rm)(file, { force: true });
						else await this.writeAtomic(file, value);
					} catch (error) {
						this.lastError = error;
					}
				}
			}
		});
	}
	async writeAtomic(file, value) {
		const temp = `${file}.${process.pid}.${this.writeCounter++}.tmp`;
		const handle = await (0, fs_promises.open)(temp, "w");
		try {
			await handle.writeFile(value, "utf8");
			await handle.sync();
		} finally {
			await handle.close();
		}
		try {
			await (0, fs_promises.rename)(temp, file);
		} catch (error) {
			await (0, fs_promises.rm)(temp, { force: true });
			throw error;
		}
	}
};
exports.FileStore = FileStore;
