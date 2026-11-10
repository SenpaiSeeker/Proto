import type { SocketInterface } from "./types";
import { Buffer } from "../../../platform";
/** The parts of a WebSocket the client uses: the browser `WebSocket`, the `ws` package or a compatible object. */
export interface WebSocketLike {
    binaryType: string;
    bufferedAmount?: number;
    send(data: Uint8Array): void;
    close(code?: number): void;
    onopen: ((event: never) => void) | null;
    onmessage: ((event: never) => void) | null;
    onclose: ((event: never) => void) | null;
    onerror: ((event: never) => void) | null;
}
type WebSocketCtor = new (url: string, protocols?: string | string[]) => WebSocketLike;
export declare class WebSocketSocket implements SocketInterface {
    static webSocketImpl?: WebSocketCtor;
    private socket?;
    private stream;
    constructor();
    get lastDataAt(): number;
    protected create(url: string, protocols: string | string[]): WebSocketLike;
    connect(port: number, ip: string, testServers?: boolean): Promise<void>;
    read(n: number): Promise<Buffer>;
    readExactly(n: number): Promise<Buffer>;
    write(data: Buffer): Promise<void>;
    close(): Promise<void>;
    toString(): string;
}
export {};
