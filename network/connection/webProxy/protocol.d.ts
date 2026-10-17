export declare const WINDOW: number;
export declare const MAX_BATCH: number;
export declare const MAX_PAYLOAD: number;
export declare const CHUNK: number;
export declare const MAX_QUEUE: number;
export declare const MAX_STREAM_QUEUE: number;
export declare const MAX_ITEMS = 8192;
export declare const enum FrameType {
    Open = 1,
    Data = 2,
    Close = 3,
    Window = 4,
    Ping = 5,
    Pong = 6,
    Hello = 16,
    Welcome = 17,
    Bye = 31
}
export type CarrierMode = "https" | "https-lanes" | "websocket" | "websocket-lanes";
type SocketEventHandler<T = unknown> = {
    handle(event: T): void;
}["handle"];
export interface WebProxyWebSocket {
    binaryType: string;
    readonly bufferedAmount: number;
    readonly protocol: string;
    send(data: Uint8Array): void;
    close(): void;
    onopen: SocketEventHandler | null;
    onmessage: SocketEventHandler<{
        data: ArrayBuffer | string;
    }> | null;
    onerror: SocketEventHandler | null;
    onclose: SocketEventHandler | null;
}
/** Experimental native transport for the tproxy-server reference bootstrap; no WebView or provider JavaScript. */
export interface WebProxyOptions {
    /** Relay hostname, optionally followed by a base path; HTTPS port 443 is used. */
    server: string;
    secret: string;
    /** Total relay startup deadline in milliseconds. Defaults to 30000. */
    connectTimeoutMs?: number;
    /** HTTP operation and retry deadline in milliseconds. Defaults to 90000. */
    requestTimeoutMs?: number;
    maxStreams?: number;
    /** Optional WebSocket constructor for websocket relay profiles on Node.js 18/20. */
    webSocket?: new (url: string, protocols: string | string[]) => WebProxyWebSocket;
}
export declare function configure(options: WebProxyOptions): {
    host: string;
    base: string;
    secret: string;
    capability: string;
    connectTimeoutMs: number;
    requestTimeoutMs: number;
    maxStreams: number;
    webSocket: (new (url: string, protocols: string | string[]) => WebProxyWebSocket) | undefined;
};
export type Configuration = ReturnType<typeof configure>;
export declare function frame(type: FrameType, id: number, payload?: Buffer): Buffer;
export declare function parseFrames(data: Buffer): {
    type: number;
    id: number;
    payload: Buffer;
}[];
export declare function token(value: string | null): string;
export {};
