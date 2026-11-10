import { Buffer } from "../../platform";
import { Connection, PacketCodec } from "./Connection";
import type { PacketReader } from "../transport/socket/types";
export declare function readIntermediateLength(reader: PacketReader): Promise<number>;
export declare function checkTransportError(body: Buffer): void;
export declare class IntermediatePacketCodec extends PacketCodec {
    static readonly tag: globalThis.Buffer<ArrayBuffer>;
    static readonly obfuscateTag: globalThis.Buffer<ArrayBuffer>;
    encodePacket(data: Buffer): Buffer;
    readPacket(reader: PacketReader): Promise<Buffer>;
}
export declare class PaddedIntermediatePacketCodec extends PacketCodec {
    static readonly tag: globalThis.Buffer<ArrayBuffer>;
    static readonly obfuscateTag: globalThis.Buffer<ArrayBuffer>;
    encodePacket(data: Buffer): Buffer;
    readPacket(reader: PacketReader): Promise<Buffer>;
}
export declare class ConnectionTCPIntermediate extends Connection {
    PacketCodecClass: typeof IntermediatePacketCodec;
}
export declare class ConnectionTCPPaddedIntermediate extends Connection {
    PacketCodecClass: typeof PaddedIntermediatePacketCodec;
    get usesRandomPadding(): boolean;
}
