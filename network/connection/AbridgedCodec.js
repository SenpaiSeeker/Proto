Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_network_connection_Connection = require("./Connection.js");
require("../../errors/index.js");
const require_errors_Common = require("../../errors/Common.js");
require("../../platform/index.js");
// teleproto/network/connection/AbridgedCodec.ts
const TRANSPORT_ERROR_HEADS = /* @__PURE__ */ new Set([
	108,
	83,
	68
]);
const TRANSPORT_ERROR_CODES = /* @__PURE__ */ new Set([
	-404,
	-429,
	-444
]);
var AbridgedPacketCodec = class extends require_network_connection_Connection.PacketCodec {
	static {
		this.tag = require_platform_buffer_index.Buffer.from("ef", "hex");
	}
	static {
		this.obfuscateTag = require_platform_buffer_index.Buffer.from("efefefef", "hex");
	}
	encodePacket(data) {
		const words = data.length >> 2;
		if (words < 127) return require_platform_buffer_index.Buffer.concat([require_platform_buffer_index.Buffer.from([words]), data]);
		const head = require_platform_buffer_index.Buffer.allocUnsafe(4);
		head.writeUInt32LE((words << 8 | 127) >>> 0, 0);
		return require_platform_buffer_index.Buffer.concat([head, data]);
	}
	async readPacket(reader) {
		const first = (await reader.readExactly(1))[0];
		if (first >= 127) {
			const length = (await reader.readExactly(3)).readUIntLE(0, 3);
			return reader.readExactly(length << 2);
		}
		if (TRANSPORT_ERROR_HEADS.has(first)) {
			const tail = await reader.readExactly(3);
			const candidate = require_platform_buffer_index.Buffer.concat([require_platform_buffer_index.Buffer.from([first]), tail]);
			if (TRANSPORT_ERROR_CODES.has(candidate.readInt32LE(0))) throw new require_errors_Common.InvalidBufferError(candidate);
			return require_platform_buffer_index.Buffer.concat([tail, await reader.readExactly((first << 2) - 3)]);
		}
		return reader.readExactly(first << 2);
	}
};
var ConnectionTCPAbridged = class extends require_network_connection_Connection.Connection {
	constructor(..._args) {
		super(..._args);
		this.PacketCodecClass = AbridgedPacketCodec;
	}
};
exports.AbridgedPacketCodec = AbridgedPacketCodec;
exports.ConnectionTCPAbridged = ConnectionTCPAbridged;
