import type { Connection } from "../connection/Connection";
import { type WebSocketLike } from "./socket/WebSocketSocket";
import { Transport, type ResolvedTransport } from "./Transport";
export type { WebSocketLike } from "./socket/WebSocketSocket";
/** Connects to Telegram over secure WebSocket. */
export declare class WebSocketTransport extends Transport {
    /** Creates the WebSocket for each connection. Override it to use another implementation or route. */
    webSocket?(url: string, protocols: string | string[]): WebSocketLike;
    resolve(connection?: typeof Connection): ResolvedTransport;
}
