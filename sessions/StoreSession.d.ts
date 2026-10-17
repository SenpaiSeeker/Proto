import { MemorySession } from "./Memory";
import { AuthKey } from "../crypto/AuthKey";
import bigInt from "big-integer";
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
export declare class StoreSession extends MemorySession {
    private readonly sessionName;
    private readonly fileStore;
    private store;
    private entityRowsLoaded;
    constructor(sessionName: string, divider?: string);
    /**
     * Waits until every queued write has been persisted to disk.
     * Session updates are flushed automatically; call this when the
     * process needs a durability barrier (shutdown, file swap, tests).
     */
    flush(): Promise<void>;
    load(): Promise<void>;
    setAuthKey(authKey?: AuthKey, dcId?: number): void;
    setDC(dcId: number, serverAddress: string, port: number): void;
    set testServers(value: boolean);
    get testServers(): boolean;
    set authKey(value: AuthKey | undefined);
    get authKey(): AuthKey | undefined;
    private _saveDcAuthKeys;
    delete(): void;
    processEntities(tlo: any): void;
    getEntityRowsById(id: string | bigInt.BigInteger, exact?: boolean): any;
    getEntityRowsByPhone(phone: string): string[] | undefined;
    getEntityRowsByUsername(username: string): string[] | undefined;
    getEntityRowsByName(name: string): string[] | undefined;
    private ensureEntityRows;
    private findEntityRow;
}
