import type { Connection } from "../connection";
import type { RequestState } from "../mtproto/RequestState";
import { Buffer } from "../../platform";
export type LinkCloseReason = "lost" | "bad-key" | "flood" | "restart";
export interface LinkClose {
    reason: LinkCloseReason;
    error?: unknown;
}
export interface OutgoingPacket {
    batch: RequestState[];
    data: Buffer;
}
export interface LinkHost {
    nextPacket(link: SessionLink): Promise<OutgoingPacket | undefined>;
    onSent(link: SessionLink, packet: OutgoingPacket): void;
    onSendFailed(packet: OutgoingPacket): void;
    receive(link: SessionLink, body: Buffer): Promise<void>;
    tick(link: SessionLink, now: number, stalled: boolean): void;
    wake(): void;
}
export declare class SessionLink {
    readonly connection: Connection;
    private readonly host;
    readonly connectedAt: number;
    readonly closed: Promise<LinkClose>;
    gated: boolean;
    lastPongAt: number;
    lastPingAt: number;
    private readMark;
    private markedAt;
    private replyDeadline;
    private lastTickAt;
    private timer?;
    private closeInfo?;
    private resolveClosed;
    constructor(connection: Connection, host: LinkHost, gated: boolean);
    get isClosed(): boolean;
    get lastReadAt(): number;
    get quietUntil(): number;
    start(): void;
    open(): void;
    markRead(at: number): void;
    expectReplyBy(deadline: number): void;
    close(reason: LinkCloseReason, error?: unknown): void;
    private writeLoop;
    private readLoop;
}
