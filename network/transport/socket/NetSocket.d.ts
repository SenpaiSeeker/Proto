import { Buffer } from "../../../platform";
import type { SocketInterface, TransportStream } from "./types";
export interface Tunnel {
    socket: TransportStream;
    head?: Buffer;
}
export declare class NetSocket implements SocketInterface {
    private socket?;
    private stream;
    private readonly keepAliveInterval;
    constructor(keepAliveInterval?: number);
    get lastDataAt(): number;
    protected openTunnel(_port: number, _ip: string): Promise<Tunnel | undefined>;
    connect(port: number, ip: string): Promise<void>;
    read(n: number): Promise<Buffer>;
    readExactly(n: number): Promise<Buffer>;
    write(data: Buffer): Promise<void>;
    close(): Promise<void>;
    toString(): string;
}
