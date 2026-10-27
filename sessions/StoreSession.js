"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSession = void 0;
const Memory_1 = require("./Memory");
const store2_1 = __importDefault(require("store2"));
const AuthKey_1 = require("../crypto/AuthKey");
const FileStore_1 = require("./FileStore");
const path_1 = require("path");
const fs_1 = require("fs");
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
class StoreSession extends Memory_1.MemorySession {
    constructor(sessionName, divider = ":") {
        super();
        this.entityRowsLoaded = false;
        if (sessionName === "session") {
            throw new Error("Session name can't be 'session'. Please use a different name.");
        }
        const directory = (0, path_1.resolve)(sessionName);
        const legacyDirectory = (0, path_1.resolve)("./" + sessionName);
        this.fileStore = new FileStore_1.FileStore((0, path_1.isAbsolute)(sessionName) && !(0, fs_1.existsSync)(directory) && (0, fs_1.existsSync)(legacyDirectory)
            ? legacyDirectory
            : directory);
        this.store = store2_1.default.area(sessionName, this.fileStore);
        if (divider == undefined) {
            divider = ":";
        }
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
            this._authKey = new AuthKey_1.AuthKey();
            if ("data" in authKey) {
                authKey = Buffer.from(authKey.data);
            }
            await this._authKey.setKey(authKey);
        }
        const updateState = this.store.get(this.sessionName + "updateState");
        if (updateState && typeof updateState === "object")
            this._updateState = updateState;
        const dcId = this.store.get(this.sessionName + "dcId");
        if (dcId) {
            this._dcId = dcId;
        }
        const port = this.store.get(this.sessionName + "port");
        if (port) {
            this._port = port;
        }
        const serverAddress = this.store.get(this.sessionName + "serverAddress");
        if (serverAddress) {
            this._serverAddress = serverAddress;
        }
        const testServers = this.store.get(this.sessionName + "testServers");
        if (testServers != null) {
            super.testServers = !!testServers;
        }
        // Reload cached per-DC (non-main) auth keys so we don't have to do a
        // fresh DH handshake every process start.
        const dcKeys = this.store.get(this.sessionName + "dcAuthKeys");
        if (dcKeys && typeof dcKeys === "object") {
            for (const [k, v] of Object.entries(dcKeys)) {
                const id = Number(k);
                if (!Number.isFinite(id) || !v || typeof v !== "object")
                    continue;
                let buf;
                if (Buffer.isBuffer(v))
                    buf = v;
                else if ("data" in v)
                    buf = Buffer.from(v.data);
                if (!buf)
                    continue;
                const key = new AuthKey_1.AuthKey();
                await key.setKey(buf);
                this._dcAuthKeys.set(id, key);
            }
        }
    }
    setAuthKey(authKey, dcId) {
        super.setAuthKey(authKey, dcId);
        if (dcId !== undefined && dcId !== this._dcId) {
            this._saveDcAuthKeys();
        }
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
        if (state)
            this.store.set(this.sessionName + "updateState", state);
        else
            this.store.remove(this.sessionName + "updateState");
    }
    _saveDcAuthKeys() {
        const snapshot = {};
        for (const [id, k] of this._dcAuthKeys) {
            const raw = k.getKey();
            if (raw)
                snapshot[String(id)] = raw;
        }
        this.store.set(this.sessionName + "dcAuthKeys", snapshot);
    }
    delete() {
        this.store.clear();
        super.delete();
    }
    processEntities(tlo) {
        const rows = this._entitiesToRows(tlo);
        if (!rows) {
            return;
        }
        for (const row of rows) {
            this._entities.set(row[0].toString(), row);
            this.store.set(this.sessionName + row[0], row);
        }
    }
    getEntityRowsById(id, exact = true) {
        const key = id.toString();
        const cached = this._entities.get(key);
        if (cached)
            return cached;
        this.ensureEntityRows();
        const fromDisk = this._entities.get(key)
            ?? this.store.get(this.sessionName + key);
        if (fromDisk || exact) {
            if (fromDisk)
                this._entities.set(key, fromDisk);
            return fromDisk;
        }
        const fallback = this.store.get(this.sessionName + "-" + id)
            ?? this.store.get(this.sessionName + "-100" + id);
        if (fallback)
            this._entities.set(key, fallback);
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
        if (this.entityRowsLoaded)
            return;
        this.entityRowsLoaded = true;
        this.store.each((key, row) => {
            if (Array.isArray(row) && row.length >= 5 &&
                key === this.sessionName + row[0]) {
                this._entities.set(row[0].toString(), row);
            }
        });
    }
    findEntityRow(matches) {
        for (const row of this._entities.values()) {
            if (Array.isArray(row) && row.length >= 5 && matches(row)) {
                return row;
            }
        }
        let result;
        this.store.each((key, row) => {
            if (Array.isArray(row) && row.length >= 5 &&
                key === this.sessionName + row[0] && matches(row)) {
                this._entities.set(row[0].toString(), row);
                result = row;
                return false;
            }
        });
        return result;
    }
}
exports.StoreSession = StoreSession;
