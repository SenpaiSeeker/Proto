import nodeNet from "node:net";
import type { HttpConnectOptions, HttpConnectResponse, SocksConnectOptions } from "./types";
export type Socket = nodeNet.Socket;
export declare const tcp = true;
export declare function createSocket(): Socket;
export declare function isIP(host: string): number;
export declare function httpConnect(options: HttpConnectOptions): Promise<HttpConnectResponse<Socket>>;
export declare function socksConnect(options: SocksConnectOptions): Promise<Socket>;
