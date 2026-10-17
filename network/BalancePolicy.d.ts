export interface BalancePolicyOptions {
    partSize: number;
    sessions: number;
    inFlight: number;
    startWindow?: number;
    maxWindow?: number;
    startSessions?: number;
    maxSessions?: number;
    slowRequestMs?: number;
    removeAfterTimeouts?: number;
    addSessionGateMs?: number;
}
export declare const DOWNLOAD_BALANCE: BalancePolicyOptions;
export declare const UPLOAD_BALANCE: BalancePolicyOptions;
export declare function normalizeBalanceOptions(opts: Partial<BalancePolicyOptions>, base: BalancePolicyOptions): BalancePolicyOptions;
export declare class BalancePolicy {
    readonly opts: BalancePolicyOptions;
    private readonly _sessions;
    private readonly _window;
    private _nextId;
    constructor(opts: BalancePolicyOptions, _now?: () => number);
    private _fresh;
    private _byId;
    get sessionCount(): number;
    get sessionIds(): number[];
    get window(): number;
    pick(bytes: number): number;
    start(id: number, bytes: number): {
        wasFull: boolean;
    };
    succeed(id: number, bytes: number, _wasFull?: boolean, _durationMs?: number): {
        addedSession: boolean;
        addedId: number;
    };
    fail(id: number, bytes: number): {
        removedId: number;
    };
    replace(id: number): number;
    remove(id: number): boolean;
    release(id: number, bytes: number): void;
    get totalRequested(): number;
}
