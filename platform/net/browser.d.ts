import type { HttpConnectOptions, HttpConnectResponse, SocksConnectOptions, TcpSocket } from "./types";
export { isIP } from "./ip";
export type Socket = TcpSocket;
export declare const tcp = false;
export declare function createSocket(): Socket;
export declare function httpConnect(_options: HttpConnectOptions): Promise<HttpConnectResponse<Socket>>;
export declare function socksConnect(_options: SocksConnectOptions): Promise<Socket>;
