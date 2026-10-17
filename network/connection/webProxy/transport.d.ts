import type { SocketFactory } from "../../../extensions/SocketInterface";
import { type WebProxyOptions } from "./protocol";
/** Creates a client-scoped relay pool shared by main and media connections. */
export declare function createWebProxySocket(options: WebProxyOptions): {
    socket: SocketFactory;
    host: string;
    secret: string;
};
