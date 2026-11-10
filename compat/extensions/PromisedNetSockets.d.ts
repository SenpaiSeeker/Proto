import type { ProxyInterface } from "../../client/TelegramBaseClient";
import { NetSocket } from "../../network/transport/socket/NetSocket";
import { Buffer } from "../../platform";
/** @deprecated Use {@link TcpTransport} or {@link SocksTransport}. */
export declare class PromisedNetSockets extends NetSocket {
    private readonly proxy?;
    constructor(proxy?: ProxyInterface | undefined, keepAliveInterval?: number);
    protected openTunnel(port: number, ip: string): Promise<{
        socket: import("../../platform/net").Socket;
    } | undefined>;
    readAll(): Promise<Buffer>;
    toString(): string;
}
