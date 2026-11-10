import { Buffer } from "../buffer";
export type * from "./types";
export declare function gzip(data: Uint8Array): Buffer;
export declare function gunzip(data: Uint8Array): Buffer;
export declare function crc32(data: Uint8Array | string, previous?: number): number;
