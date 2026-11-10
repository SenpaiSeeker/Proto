Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_network_connection_Connection = require("./Connection.js");
const require_Helpers = require("../../Helpers.js");
require("../../errors/index.js");
const require_errors_Common = require("../../errors/Common.js");
require("../../platform/index.js");
// teleproto/network/connection/FullCodec.ts
var FullPacketCodec = class extends require_network_connection_Connection.PacketCodec {
	constructor(..._args) {
		super(..._args);
		this.sendCounter = 0;
	}
	encodePacket(data) {
		const length = data.length + 12;
		const packet = require_platform_buffer_index.Buffer.allocUnsafe(length);
		packet.writeInt32LE(length, 0);
		packet.writeInt32LE(this.sendCounter++, 4);
		data.copy(packet, 8);
		packet.writeUInt32LE(require_Helpers.crc32(packet.subarray(0, length - 4)), length - 4);
		return packet;
	}
	async readPacket(reader) {
		const head = await reader.readExactly(4);
		const length = head.readInt32LE(0);
		if (length < 0) throw new require_errors_Common.InvalidBufferError(head);
		if (length < 12) throw new Error(`Invalid full packet length: ${length}`);
		const rest = await reader.readExactly(length - 4);
		const checksum = rest.readUInt32LE(rest.length - 4);
		const expected = require_Helpers.crc32(rest.subarray(0, rest.length - 4), require_Helpers.crc32(head));
		if (checksum !== expected) throw new require_errors_Common.InvalidChecksumError(checksum, expected);
		return rest.subarray(4, rest.length - 4);
	}
};
var ConnectionTCPFull = class extends require_network_connection_Connection.Connection {
	constructor(..._args2) {
		super(..._args2);
		this.PacketCodecClass = FullPacketCodec;
	}
};
exports.ConnectionTCPFull = ConnectionTCPFull;
exports.FullPacketCodec = FullPacketCodec;
