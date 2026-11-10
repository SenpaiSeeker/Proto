import type { ProxyInterface } from "../../client/TelegramBaseClient";
import { WebSocketSocket } from "../../network/transport/socket/WebSocketSocket";
import { Buffer } from "../../platform";
/** @deprecated Use {@link WebSocketTransport}. */
export declare class PromisedWebSockets extends WebSocketSocket {
    static readonly isWebSocket = true;
    constructor(proxy?: ProxyInterface, _keepAliveInterval?: number);
    readAll(): Promise<Buffer>;
    toString(): string;
}
