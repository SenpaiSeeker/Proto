Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../platform/buffer/index.js");
const require_platform_fs_index = require("../platform/fs/index.js");
const require_sessions_Memory = require("./Memory.js");
const require_crypto_AuthKey = require("../crypto/AuthKey.js");
const require_sessions_FileStore = require("./FileStore.js");
require("../platform/index.js");
// teleproto/sessions/StoreSession.ts
var JsonStore = class {
	constructor(area) {
		this.area = area;
	}
	get(key) {
		const value = this.area.getItem(key);
		if (value === null) return null;
		try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}
	set(key, value) {
		this.area.setItem(key, value === void 0 || typeof value === "function" ? String(value) : JSON.stringify(value));
	}
	remove(key) {
		this.area.removeItem(key);
	}
	each(visit) {
		for (let i = 0, count = this.area.length; i < count; i++) {
			const key = this.area.key(i);
			if (key !== null && visit(key, this.get(key)) === false) return;
			if (count > this.area.length) {
				count--;
				i--;
			}
		}
	}
};
/**
* Persistent session that stores auth keys and entity data on disk.
*
* Accepts an absolute path or a directory relative to the working directory.
* Reuses an existing legacy directory when the absolute target is absent.
* Suitable for long-running server applications where session data must survive restarts.
*
* The on-disk format is compatible with `node-localstorage` (one file per key),
* but writes are flushed asynchronously, so keeping hundreds of file sessions
* up to date does not block the event loop.
*
* @example
* ```ts
* const session = new StoreSession("my_session");
* const client = new TelegramClient(session, apiId, apiHash, {});
* ```
*/
var StoreSession = class extends require_sessions_Memory.MemorySession {
	constructor(sessionName, divider = ":") {
		super();
		this.entityRowsLoaded = false;
		if (sessionName === "session") throw new Error("Session name can't be 'session'. Please use a different name.");
		const directory = require_platform_fs_index.resolve(sessionName);
		const legacyDirectory = require_platform_fs_index.resolve("./" + sessionName);
		this.fileStore = new require_sessions_FileStore.FileStore(require_platform_fs_index.isAbsolute(sessionName) && !require_platform_fs_index.exists(directory) && require_platform_fs_index.exists(legacyDirectory) ? legacyDirectory : directory);
		this.store = new JsonStore(this.fileStore);
		if (divider == void 0) divider = ":";
		this.sessionName = sessionName + divider;
	}
	/**
	* Waits until every queued write has been persisted to disk.
	* Session updates are flushed automatically; call this when the
	* process needs a durability barrier (shutdown, file swap, tests).
	*/
	async flush() {
		await this.fileStore.flush();
	}
	async load() {
		let authKey = this.store.get(this.sessionName + "authKey");
		if (authKey && typeof authKey === "object") {
			this._authKey = new require_crypto_AuthKey.AuthKey();
			if ("data" in authKey) authKey = require_platform_buffer_index.Buffer.from(authKey.data);
			await this._authKey.setKey(authKey);
		}
		const updateState = this.store.get(this.sessionName + "updateState");
		if (updateState && typeof updateState === "object") this._updateState = updateState;
		const dcId = this.store.get(this.sessionName + "dcId");
		if (dcId) this._dcId = dcId;
		const port = this.store.get(this.sessionName + "port");
		if (port) this._port = port;
		const serverAddress = this.store.get(this.sessionName + "serverAddress");
		if (serverAddress) this._serverAddress = serverAddress;
		const testServers = this.store.get(this.sessionName + "testServers");
		if (testServers != null) super.testServers = !!testServers;
		const dcKeys = this.store.get(this.sessionName + "dcAuthKeys");
		if (dcKeys && typeof dcKeys === "object") for (const [k, v] of Object.entries(dcKeys)) {
			const id = Number(k);
			if (!Number.isFinite(id) || !v || typeof v !== "object") continue;
			let buf;
			if (require_platform_buffer_index.Buffer.isBuffer(v)) buf = v;
			else if ("data" in v) buf = require_platform_buffer_index.Buffer.from(v.data);
			if (!buf) continue;
			const key = new require_crypto_AuthKey.AuthKey();
			await key.setKey(buf);
			this._dcAuthKeys.set(id, key);
		}
	}
	setAuthKey(authKey, dcId) {
		super.setAuthKey(authKey, dcId);
		if (dcId !== void 0 && dcId !== this._dcId) this._saveDcAuthKeys();
	}
	setDC(dcId, serverAddress, port) {
		super.setDC(dcId, serverAddress, port);
		this.store.set(this.sessionName + "dcId", dcId);
		this.store.set(this.sessionName + "port", port);
		this.store.set(this.sessionName + "serverAddress", serverAddress);
		this.store.set(this.sessionName + "authKey", this._authKey?.getKey());
		this._saveDcAuthKeys();
	}
	set testServers(value) {
		super.testServers = value;
		this.store.set(this.sessionName + "testServers", value);
	}
	get testServers() {
		return super.testServers;
	}
	set authKey(value) {
		this._authKey = value;
		this.store.set(this.sessionName + "authKey", value?.getKey());
	}
	get authKey() {
		return this._authKey;
	}
	setUpdateState(state) {
		super.setUpdateState(state);
		if (state) this.store.set(this.sessionName + "updateState", state);
		else this.store.remove(this.sessionName + "updateState");
	}
	_saveDcAuthKeys() {
		const snapshot = {};
		for (const [id, k] of this._dcAuthKeys) {
			const raw = k.getKey();
			if (raw) snapshot[String(id)] = raw;
		}
		this.store.set(this.sessionName + "dcAuthKeys", snapshot);
	}
	delete() {
		const keys = [];
		this.store.each((key) => {
			if (key.startsWith(this.sessionName)) keys.push(key);
		});
		for (const key of keys) this.store.remove(key);
		super.delete();
	}
	processEntities(tlo) {
		const rows = this._entitiesToRows(tlo);
		if (!rows) return;
		for (const row of rows) {
			this._entities.set(row[0].toString(), row);
			this.store.set(this.sessionName + row[0], row);
		}
	}
	getEntityRowsById(id, exact = true) {
		const key = id.toString();
		const cached = this._entities.get(key);
		if (cached) return cached;
		this.ensureEntityRows();
		const fromDisk = this._entities.get(key) ?? this.store.get(this.sessionName + key);
		if (fromDisk || exact) {
			if (fromDisk) this._entities.set(key, fromDisk);
			return fromDisk;
		}
		const fallback = this.store.get(this.sessionName + "-" + id) ?? this.store.get(this.sessionName + "-100" + id);
		if (fallback) this._entities.set(key, fallback);
		return fallback;
	}
	getEntityRowsByPhone(phone) {
		return this.findEntityRow((row) => row[3] === phone);
	}
	getEntityRowsByUsername(username) {
		return this.findEntityRow((row) => row[2] === username.toLowerCase());
	}
	getEntityRowsByName(name) {
		return this.findEntityRow((row) => row[4] === name);
	}
	ensureEntityRows() {
		if (this.entityRowsLoaded) return;
		this.entityRowsLoaded = true;
		this.store.each((key, row) => {
			if (Array.isArray(row) && row.length >= 5 && key === this.sessionName + row[0]) this._entities.set(row[0].toString(), row);
		});
	}
	findEntityRow(matches) {
		for (const row of this._entities.values()) if (Array.isArray(row) && row.length >= 5 && matches(row)) return row;
		let result;
		this.store.each((key, row) => {
			if (Array.isArray(row) && row.length >= 5 && key === this.sessionName + row[0] && matches(row)) {
				this._entities.set(row[0].toString(), row);
				result = row;
				return false;
			}
		});
		return result;
	}
};
exports.StoreSession = StoreSession;
