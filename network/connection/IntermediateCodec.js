Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_platform_crypto_index = require("../../platform/crypto/index.js");
const require_Helpers = require("../../Helpers.js");
require("../../platform/index.js");
const require_network_connection_Connection = require("./Connection.js");
const require_errors_Common = require("../../errors/Common.js");
require("../../errors/index.js");
// teleproto/network/connection/IntermediateCodec.ts
const TRANSPORT_ERRORS = /* @__PURE__ */ new Set([
	-404,
	-429,
	-444
]);
const MAX_PACKET_LENGTH = 16778240;
async function readIntermediateLength(reader) {
	const header = await reader.readExactly(4);
	const length = header.readInt32LE(0);
	if (TRANSPORT_ERRORS.has(length)) throw new require_errors_Common.InvalidBufferError(header);
	if (length < 4 || length > MAX_PACKET_LENGTH) throw new Error(`Invalid intermediate packet length: ${length}`);
	return length;
}
function checkTransportError(body) {
	if (body.length === 4 && body.readInt32LE(0) < 0) throw new require_errors_Common.InvalidBufferError(body);
}
var IntermediatePacketCodec = class IntermediatePacketCodec extends require_network_connection_Connection.PacketCodec {
	static {
		this.tag = require_platform_buffer_index.Buffer.from("eeeeeeee", "hex");
	}
	static {
		this.obfuscateTag = IntermediatePacketCodec.tag;
	}
	encodePacket(data) {
		const packet = require_platform_buffer_index.Buffer.allocUnsafe(4 + data.length);
		packet.writeUInt32LE(data.length, 0);
		data.copy(packet, 4);
		return packet;
	}
	async readPacket(reader) {
		const body = await reader.readExactly(await readIntermediateLength(reader));
		checkTransportError(body);
		return body;
	}
};
var PaddedIntermediatePacketCodec = class PaddedIntermediatePacketCodec extends require_network_connection_Connection.PacketCodec {
	static {
		this.tag = require_platform_buffer_index.Buffer.from("dddddddd", "hex");
	}
	static {
		this.obfuscateTag = PaddedIntermediatePacketCodec.tag;
	}
	encodePacket(data) {
		const padding = require_platform_crypto_index.randomInt(16);
		const packet = require_platform_buffer_index.Buffer.allocUnsafe(4 + data.length + padding);
		packet.writeUInt32LE(data.length + padding, 0);
		data.copy(packet, 4);
		if (padding) require_Helpers.generateRandomBytes(padding).copy(packet, 4 + data.length);
		return packet;
	}
	async readPacket(reader) {
		const length = await readIntermediateLength(reader);
		const body = await reader.readExactly(length);
		if (length < 20) {
			checkTransportError(body.subarray(0, 4));
			throw new Error("Invalid padded intermediate payload");
		}
		if (body.readBigUInt64LE(0) === BigInt(0)) {
			const end = 20 + body.readUInt32LE(16);
			if (end > length) throw new Error("Invalid unencrypted MTProto payload length");
			return body.subarray(0, end);
		}
		if (length < 40) throw new Error("Invalid encrypted MTProto payload length");
		return body.subarray(0, length - (length - 24) % 16);
	}
};
var ConnectionTCPIntermediate = class extends require_network_connection_Connection.Connection {
	constructor(..._args) {
		super(..._args);
		this.PacketCodecClass = IntermediatePacketCodec;
	}
};
var ConnectionTCPPaddedIntermediate = class extends require_network_connection_Connection.Connection {
	constructor(..._args2) {
		super(..._args2);
		this.PacketCodecClass = PaddedIntermediatePacketCodec;
	}
	get usesRandomPadding() {
		return true;
	}
};
exports.ConnectionTCPIntermediate = ConnectionTCPIntermediate;
exports.ConnectionTCPPaddedIntermediate = ConnectionTCPPaddedIntermediate;
exports.IntermediatePacketCodec = IntermediatePacketCodec;
exports.PaddedIntermediatePacketCodec = PaddedIntermediatePacketCodec;
exports.checkTransportError = checkTransportError;
exports.readIntermediateLength = readIntermediateLength;
