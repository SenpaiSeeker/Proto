import type { Connection } from "../connection/Connection";
import type { SocketFactory, TransportStream } from "./socket/types";
export type { TransportStream } from "./socket/types";
export interface ResolvedTransport {
    connection: typeof Connection;
    socket: SocketFactory;
    clientProxy?: {
        address: string;
        port: number;
    };
    proxied?: boolean;
    webSocket?: boolean;
}
/** A Telegram data center address to open a stream to. */
export interface TransportAddress {
    host: string;
    port: number;
}
/**
 * How the client reaches Telegram: directly, through a proxy or over WebSocket.
 * A custom route implements {@link connect}; teleproto keeps the MTProto framing, obfuscation and reconnects.
 */
export declare abstract class Transport {
    /** Opens a connected stream to `address`, such as a `net.Socket` or any duplex stream. */
    connect?(address: TransportAddress): Promise<TransportStream>;
    /** @hidden */
    resolve(connection?: typeof Connection): ResolvedTransport;
}
export declare function ownFraming(transport: string, framing: typeof Connection, requested?: typeof Connection): typeof Connection;
