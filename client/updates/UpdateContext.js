Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_events_common = require("../../events/common.js");
const require_Utils = require("../../Utils.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/client/updates/UpdateContext.ts
/** Chat access for raw updates; entity fetching is deferred until `getChat()`. */
var UpdateContext = class extends require_events_common.EventCommon {
	constructor(client, peerId, entities) {
		super({ chatPeer: peerId === void 0 ? void 0 : require_Utils.getPeer((0, big_integer.default)(peerId)) });
		this._entities = entities ?? /* @__PURE__ */ new Map();
		this._setClient(client);
	}
	/** Attached users and chats keyed by marked peer ID; reading never makes an RPC. */
	get peers() {
		return this._entities;
	}
	/** Returns the attached chat or fetches it, sharing concurrent calls within this update. */
	async getChat() {
		if (!this.pendingChat) this.pendingChat = super.getChat();
		const pending = this.pendingChat;
		try {
			return await pending;
		} finally {
			if (this.pendingChat === pending) this.pendingChat = void 0;
		}
	}
};
exports.UpdateContext = UpdateContext;
