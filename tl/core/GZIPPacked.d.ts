import type { Reader } from "../binary/Reader";
export declare class GZIPPacked {
    readonly data: Buffer;
    readonly compressed: boolean;
    static readonly CONSTRUCTOR_ID = 812830625;
    static readonly classType = "constructor";
    readonly CONSTRUCTOR_ID = 812830625;
    readonly classType = "constructor";
    constructor(data: Buffer, compressed?: boolean);
    static gzipIfSmaller(contentRelated: boolean, data: Buffer): Buffer;
    static gzip(input: Buffer): Buffer;
    static ungzip(input: Buffer): Promise<Buffer>;
    decompressed(): Promise<Buffer>;
    toBytes(): Buffer;
    static read(reader: Reader): Buffer;
    static fromReader(reader: Reader): GZIPPacked;
}
