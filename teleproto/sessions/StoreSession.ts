import { MemorySession } from "./Memory";
import store, { StoreBase } from "store2";
import { AuthKey } from "../crypto/AuthKey";
import bigInt from "big-integer";
import { FileStore } from "./FileStore";
import { isAbsolute, resolve } from "path";
import { existsSync } from "fs";

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
export class StoreSession extends MemorySession {
    private readonly sessionName: string;
    private readonly fileStore: FileStore;
    private store: StoreBase;
    private entityRowsLoaded = false;

    constructor(sessionName: string, divider = ":") {
        super();
        if (sessionName === "session") {
            throw new Error(
                "Session name can't be 'session'. Please use a different name."
            );
        }
        const directory = resolve(sessionName);
        const legacyDirectory = resolve("./" + sessionName);
        this.fileStore = new FileStore(isAbsolute(sessionName) && !existsSync(directory) && existsSync(legacyDirectory)
            ? legacyDirectory
            : directory);
        this.store = store.area(sessionName, this.fileStore);
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
    async flush(): Promise<void> {
        await this.fileStore.flush();
    }

    async load() {
        let authKey = this.store.get(this.sessionName + "authKey");
        if (authKey && typeof authKey === "object") {
            this._authKey = new AuthKey();
            if ("data" in authKey) {
                authKey = Buffer.from(authKey.data);
            }
            await this._authKey.setKey(authKey);
        }

        const dcId = this.store.get(this.sessionName + "dcId");
        if (dcId) {
            this._dcId = dcId;
        }

        const port = this.store.get(this.sessionName + "port");
        if (port) {
            this._port = port;
        }
        const serverAddress = this.store.get(
            this.sessionName + "serverAddress"
        );
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
                if (!Number.isFinite(id) || !v || typeof v !== "object") continue;
                let buf: Buffer | undefined;
                if (Buffer.isBuffer(v)) buf = v as Buffer;
                else if ("data" in (v as any)) buf = Buffer.from((v as any).data);
                if (!buf) continue;
                const key = new AuthKey();
                await key.setKey(buf);
                this._dcAuthKeys.set(id, key);
            }
        }
    }

    setAuthKey(authKey?: AuthKey, dcId?: number) {
        super.setAuthKey(authKey, dcId);
        if (dcId !== undefined && dcId !== this._dcId) {
            this._saveDcAuthKeys();
        }
    }

    setDC(dcId: number, serverAddress: string, port: number) {
        super.setDC(dcId, serverAddress, port);
        this.store.set(this.sessionName + "dcId", dcId);
        this.store.set(this.sessionName + "port", port);
        this.store.set(this.sessionName + "serverAddress", serverAddress);
        this.store.set(this.sessionName + "authKey", this._authKey?.getKey());
        this._saveDcAuthKeys();
    }

    set testServers(value: boolean) {
        super.testServers = value;
        this.store.set(this.sessionName + "testServers", value);
    }

    get testServers() {
        return super.testServers;
    }

    set authKey(value: AuthKey | undefined) {
        this._authKey = value;
        this.store.set(this.sessionName + "authKey", value?.getKey());
    }

    get authKey() {
        return this._authKey;
    }

    private _saveDcAuthKeys() {
        const snapshot: Record<string, Buffer | undefined> = {};
        for (const [id, k] of this._dcAuthKeys) {
            const raw = k.getKey();
            if (raw) snapshot[String(id)] = raw;
        }
        this.store.set(this.sessionName + "dcAuthKeys", snapshot);
    }

    delete() {
        this.store.clear();
        super.delete();
    }

    processEntities(tlo: any) {
        const rows = this._entitiesToRows(tlo);
        if (!rows) {
            return;
        }
        for (const row of rows) {
            this._entities.set(row[0].toString(), row);
            this.store.set(this.sessionName + row[0], row);
        }
    }

    getEntityRowsById(
        id: string | bigInt.BigInteger,
        exact: boolean = true
    ): any {
        const key = id.toString();
        const cached = this._entities.get(key);
        if (cached) return cached;
        this.ensureEntityRows();
        const fromDisk = this._entities.get(key)
            ?? this.store.get(this.sessionName + key);
        if (fromDisk || exact) {
            if (fromDisk) this._entities.set(key, fromDisk);
            return fromDisk;
        }
        const fallback = this.store.get(this.sessionName + "-" + id)
            ?? this.store.get(this.sessionName + "-100" + id);
        if (fallback) this._entities.set(key, fallback);
        return fallback;
    }

    getEntityRowsByPhone(phone: string) {
        return this.findEntityRow((row) => row[3] === phone);
    }

    getEntityRowsByUsername(username: string) {
        return this.findEntityRow((row) => row[2] === username.toLowerCase());
    }

    getEntityRowsByName(name: string) {
        return this.findEntityRow((row) => row[4] === name);
    }

    private ensureEntityRows(): void {
        if (this.entityRowsLoaded) return;
        this.entityRowsLoaded = true;
        this.store.each((key, row) => {
            if (Array.isArray(row) && row.length >= 5 &&
                key === this.sessionName + row[0]) {
                this._entities.set(row[0].toString(), row);
            }
        });
    }

    private findEntityRow(matches: (row: string[]) => boolean): string[] | undefined {
        for (const row of this._entities.values()) {
            if (Array.isArray(row) && row.length >= 5 && matches(row)) {
                return row;
            }
        }
        let result: string[] | undefined;
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
