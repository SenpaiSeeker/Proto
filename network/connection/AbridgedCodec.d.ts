import { Connection, PacketCodec } from "./Connection";
import type { PacketReader } from "../transport/socket/types";
import { Buffer } from "../../platform";
export declare class AbridgedPacketCodec extends PacketCodec {
    static readonly tag: globalThis.Buffer<ArrayBuffer>;
    static readonly obfuscateTag: globalThis.Buffer<ArrayBuffer>;
    encodePacket(data: Buffer): Buffer;
    readPacket(reader: PacketReader): Promise<Buffer>;
}
export declare class ConnectionTCPAbridged extends Connection {
    PacketCodecClass: typeof AbridgedPacketCodec;
}
