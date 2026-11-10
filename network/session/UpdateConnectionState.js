Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/network/session/UpdateConnectionState.ts
var UpdateConnectionState = class {
	static {
		this.disconnected = -1;
	}
	static {
		this.connected = 1;
	}
	static {
		this.broken = 0;
	}
	constructor(state) {
		this.state = state;
	}
};
exports.UpdateConnectionState = UpdateConnectionState;
