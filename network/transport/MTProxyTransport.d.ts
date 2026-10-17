import type { Connection } from "../connection/Connection";
import { Transport, type ResolvedTransport } from "./Transport";
export interface MTProxyTransportOptions {
    host: string;
    port: number;
    /** Hex or base64 secret: plain, `dd` random padding or `ee` fake TLS. */
    secret: string;
    /** Connection timeout in seconds. Defaults to 5. */
    timeout?: number;
}
/** Connects to Telegram through an MTProxy server. */
export declare class MTProxyTransport extends Transport {
    readonly options: MTProxyTransportOptions;
    constructor(options: MTProxyTransportOptions);
    resolve(connection?: typeof Connection): ResolvedTransport;
}
