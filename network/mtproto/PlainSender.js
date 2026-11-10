Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_Helpers = require("../../Helpers.js");
require("../../errors/index.js");
const require_errors_Common = require("../../errors/Common.js");
const require_tl_binary_Reader = require("../../tl/binary/Reader.js");
const require_network_mtproto_SessionState = require("./SessionState.js");
require("../../platform/index.js");
// teleproto/network/mtproto/PlainSender.ts
var PlainSender = class {
	constructor(connection, log) {
		this.connection = connection;
		this.state = new require_network_mtproto_SessionState.SessionState(void 0, log);
	}
	async send(request) {
		const body = request.getBytes();
		const header = require_platform_buffer_index.Buffer.alloc(20);
		require_Helpers.toSignedLittleBuffer(this.state.newMsgId(), 8).copy(header, 8);
		header.writeInt32LE(body.length, 16);
		await this.connection.send(require_platform_buffer_index.Buffer.concat([header, body]));
		const packet = await this.connection.recv();
		if (packet.length < 20) throw new require_errors_Common.InvalidBufferError(packet);
		const reader = new require_tl_binary_Reader.Reader(packet);
		if (!reader.readLong().isZero()) throw new require_errors_Common.SecurityError("Plain answer has a non-zero auth_key_id");
		if (reader.readLong().isZero()) throw new require_errors_Common.SecurityError("Plain answer has a zero msg_id");
		const length = reader.readInt();
		if (length <= 0 || length > packet.length - 20) throw new require_errors_Common.SecurityError("Plain answer has an invalid length");
		return reader.tgReadObject();
	}
};
exports.PlainSender = PlainSender;
