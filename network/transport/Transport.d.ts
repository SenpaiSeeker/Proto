import type { Connection } from "../connection/Connection";
import type { SocketFactory } from "../../extensions/SocketInterface";
import type { ProxyInterface } from "../connection/TCPMTProxy";
export interface ResolvedTransport {
    connection: typeof Connection;
    socket: SocketFactory;
    proxy?: ProxyInterface;
    clientProxy?: {
        address: string;
        port: number;
    };
}
/**
 * How the client reaches Telegram's data centers: directly, through a proxy or over WebSocket.
 * This is the route, not the MTProto packet framing, which stays the `connection` client option.
 */
export declare abstract class Transport {
    /** @hidden */
    abstract resolve(connection?: typeof Connection): ResolvedTransport;
}
export declare function ownFraming(transport: string, framing: typeof Connection, requested?: typeof Connection): typeof Connection;
/** @hidden */
export declare function resolveLegacyTransport(options: {
    proxy?: ProxyInterface;
    socket: SocketFactory;
    connection: typeof Connection;
    explicitConnection: boolean;
    explicitSocket: boolean;
}): ResolvedTransport;
