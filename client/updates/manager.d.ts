import { Api } from "../../tl";
import type { TelegramClient } from "../TelegramClient";
export interface UpdateState {
    pts: number;
    qts: number;
    date: number;
    seq: number;
}
/** Snapshot of the shared channel RPC budget and per-channel polling delays. */
export interface ChannelPollingState {
    pendingRequests: number;
    activeRequests: number;
    /** End of a server-directed pause, in Unix milliseconds. */
    pausedUntil?: number;
    channels: {
        channelId: string;
        /** Last difference request start, in Unix milliseconds. */
        lastPolledAt?: number;
        /** Time the last difference request spent in the shared queue, in milliseconds. */
        lastDelayMs?: number;
        /** Earliest next poll time, in Unix milliseconds; the queue may delay it further. */
        nextPollAt?: number;
    }[];
}
export declare class UpdateManager {
    state?: UpdateState;
    lastUpdateTime: number;
    private readonly client;
    private readonly globalPts;
    private readonly qts;
    private qtsTimer?;
    private initializing?;
    private readonly beforeState;
    private globalPtsTimer?;
    private readonly channels;
    private readonly pendingSeq;
    private seqGapTimer?;
    private readonly recentMessageKeys;
    private readonly recentMessageQueue;
    private fetchingDifference;
    private failTimeoutS;
    private failRetryTimer?;
    private readonly channelFailTimeoutS;
    private readonly channelFailRetryTimers;
    private readonly watchedChannels;
    private readonly channelScheduler;
    private readonly channelRequests;
    private running;
    private generation;
    constructor(client: TelegramClient);
    start(): void;
    get isRunning(): boolean;
    /** Clears account-specific positions after disconnect and session deletion. @hidden */
    reset(): void;
    stop(): void;
    onUpdates(update: Api.TypeUpdate | Api.TypeUpdates, noDispatch?: boolean): void;
    private markNoDispatch;
    private handleShortSentMessage;
    applyAffected(pts: number, ptsCount: number, channelId?: string): void;
    catchUp(): Promise<void>;
    watchChannel(channelId: string, inputChannel: Api.TypeInputChannel, signal?: AbortSignal): Promise<void>;
    releaseChannel(channelId: string): void;
    watchedChannelIds(): string[];
    get polling(): ChannelPollingState;
    /** @hidden */
    handleChannelFloodWait(request: object, seconds: number): boolean;
    private invokeChannel;
    private readChannelPts;
    ensureState(): Promise<void>;
    refreshFromState(state: {
        pts: number;
        qts: number;
        date: number;
        seq: number;
    }): void;
    isStale(): boolean;
    recoverIfStale(): Promise<void>;
    private handleContainer;
    private applySeq;
    private armSeqGapTimer;
    private handleShortMessage;
    private feedUpdate;
    private isCurrent;
    private recoverChannel;
    private dispatch;
    private isDuplicateMessage;
    private saveEntities;
    private collectEntities;
    private makeGlobalWaiter;
    private getOrCreateChannel;
    private scheduleCommonDifference;
    private fetchCommonDifference;
    private fetchDifferenceLoop;
    private processDifference;
    private drainPendingSeq;
    private fetchChannelDifference;
    private fetchChannelDifferenceOnce;
    private resolveChannel;
    private scheduleChannelPoll;
    private bumpFailTimeout;
    private dropChannel;
    private bumpChannelFailTimeout;
}
