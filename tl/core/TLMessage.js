Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/tl/core/TLMessage.ts
var TLMessage = class {
	static {
		this.SIZE_OVERHEAD = 12;
	}
	static {
		this.classType = "constructor";
	}
	constructor(msgId, seqNo, obj) {
		this.msgId = msgId;
		this.seqNo = seqNo;
		this.obj = obj;
		this.classType = "constructor";
	}
};
exports.TLMessage = TLMessage;
