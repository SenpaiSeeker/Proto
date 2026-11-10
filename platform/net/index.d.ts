import type * as browser from "./browser";
import type { Implements } from "../implements";
import type * as node from "./node";
import type { Network, TcpSocket } from "./types";
export type * from "./types";
export type Socket = node.Socket;
export type BrowserImplementation = Implements<Network<TcpSocket>, typeof browser>;
export declare const tcp: boolean, createSocket: () => import("net").Socket, isIP: (host: string) => number, httpConnect: (options: import("./types").HttpConnectOptions) => Promise<import("./types").HttpConnectResponse<import("net").Socket>>, socksConnect: (options: import("./types").SocksConnectOptions) => Promise<import("net").Socket>;
