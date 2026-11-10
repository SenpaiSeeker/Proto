Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_core_GZIPPacked = require("./GZIPPacked.js");
// teleproto/tl/core/RPCResult.ts
const RPC_ERROR_ID = 558156313;
var RPCResult = class RPCResult {
	static {
		this.CONSTRUCTOR_ID = 4082920705;
	}
	static {
		this.classType = "constructor";
	}
	constructor(reqMsgId, body, error, packed) {
		this.reqMsgId = reqMsgId;
		this.body = body;
		this.error = error;
		this.packed = packed;
		this.CONSTRUCTOR_ID = RPCResult.CONSTRUCTOR_ID;
		this.classType = "constructor";
	}
	static fromReader(reader) {
		const reqMsgId = reader.readLong();
		const inner = reader.readInt(false);
		if (inner === require_tl_core_GZIPPacked.GZIPPacked.CONSTRUCTOR_ID) return new RPCResult(reqMsgId, void 0, void 0, require_tl_core_GZIPPacked.GZIPPacked.fromReader(reader));
		reader.seek(-4);
		if (inner === RPC_ERROR_ID) return new RPCResult(reqMsgId, void 0, reader.tgReadObject());
		return new RPCResult(reqMsgId, reader.read());
	}
};
exports.RPCResult = RPCResult;
