"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionTCPFull = exports.FullPacketCodec = void 0;
const Connection_1 = require("./Connection");
const Helpers_1 = require("../../Helpers");
const errors_1 = require("../../errors");
class FullPacketCodec extends Connection_1.PacketCodec {
    constructor(connection) {
        super(connection);
        this._sendCounter = 0; // Telegram will ignore us otherwise
    }
    encodePacket(data) {
        const length = data.length + 12;
        const packet = Buffer.allocUnsafe(length);
        packet.writeInt32LE(length, 0);
        packet.writeInt32LE(this._sendCounter, 4);
        data.copy(packet, 8);
        packet.writeUInt32LE((0, Helpers_1.crc32)(packet.subarray(0, length - 4)), length - 4);
        this._sendCounter += 1;
        return packet;
    }
    /**
     *
     * @param reader {PacketReader}
     * @returns {Promise<*>}
     */
    async readPacket(reader) {
        const lenBuf = await reader.readExactly(4);
        if (lenBuf === undefined) {
            // Return empty buffer in case of issue
            return Buffer.alloc(0);
        }
        const packetLen = lenBuf.readInt32LE(0);
        if (packetLen < 0) {
            throw new errors_1.InvalidBufferError(lenBuf);
        }
        const seqBuf = await reader.readExactly(4);
        let body = await reader.readExactly(packetLen - 8);
        const checksum = body.slice(-4).readUInt32LE(0);
        body = body.slice(0, -4);
        const validChecksum = (0, Helpers_1.crc32)(body, (0, Helpers_1.crc32)(seqBuf, (0, Helpers_1.crc32)(lenBuf)));
        if (!(validChecksum === checksum)) {
            throw new errors_1.InvalidChecksumError(checksum, validChecksum);
        }
        return body;
    }
}
exports.FullPacketCodec = FullPacketCodec;
class ConnectionTCPFull extends Connection_1.Connection {
    constructor() {
        super(...arguments);
        this.PacketCodecClass = FullPacketCodec;
    }
}
exports.ConnectionTCPFull = ConnectionTCPFull;
