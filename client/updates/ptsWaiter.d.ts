import type { Api } from "../../tl";
export declare const WAIT_FOR_SKIPPED_TIMEOUT_MS = 500;
export type SkippedTag = "update" | "updates";
export interface SkippedEntry {
    pts: number;
    count: number;
    tieBreaker: number;
    tag: SkippedTag;
    update?: Api.TypeUpdate;
    updates?: Api.TypeUpdates;
    applyUpdate?: (update: Api.TypeUpdate) => void;
    applyUpdates?: (updates: Api.TypeUpdates) => void;
}
type Payload = Omit<SkippedEntry, "pts" | "count" | "tieBreaker">;
export interface PtsWaiterHost {
    onWaitForSkipped(ms: number): void;
    onWaitForShortPoll(ms: number): void;
    onApplied?(pts: number): void;
}
export declare class PtsWaiter {
    private readonly host;
    private good;
    private initialized;
    private requestingFlag;
    private waitingForSkipped;
    private waitingForShortPoll;
    private skippedKey;
    private readonly queue;
    constructor(host: PtsWaiterHost);
    inited(): boolean;
    current(): number;
    init(pts: number, preservePending?: boolean): void;
    requesting(): boolean;
    setRequesting(value: boolean): void;
    isWaitingForSkipped(): boolean;
    isWaitingForShortPoll(): boolean;
    setWaitingForSkipped(ms: number): void;
    setWaitingForShortPoll(ms: number): void;
    updated(pts: number, count: number, payload: Payload): boolean;
    updateAndApply(pts: number, count: number, payload: Payload, applyUpdate: (update: Api.TypeUpdate) => void, applyUpdates: (updates: Api.TypeUpdates) => void): boolean;
    applySkippedUpdates(applyUpdate?: (update: Api.TypeUpdate) => void, applyUpdates?: (updates: Api.TypeUpdates) => void): void;
    clearSkippedUpdates(): void;
    private apply;
}
export {};
