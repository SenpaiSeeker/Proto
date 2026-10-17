import { ConnectionTCPMTProxyAbridged } from "./TCPMTProxy";
export { createWebProxySocket } from "./webProxy/transport";
export type { WebProxyOptions, WebProxyWebSocket } from "./webProxy/protocol";
/** MTProxy framing over a native WEB relay; configure through proxy.WEB. */
export declare class ConnectionWebProxy extends ConnectionTCPMTProxyAbridged {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
