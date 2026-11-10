Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../_virtual/_rolldown/runtime.js");
require("../tl/index.js");
require("../tl/custom/index.js");
const require_tl_custom_chatGetter = require("../tl/custom/chatGetter.js");
const require_Helpers = require("../Helpers.js");
const require_tl_generated_api = require("../tl/generated/api.js");
const require_Utils = require("../Utils.js");
const require_tl_custom_senderGetter = require("../tl/custom/senderGetter.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/events/common.ts
/** @hidden */
async function _intoIdSet(client, chats) {
	if (chats == void 0) return;
	if (!require_Helpers.isArrayLike(chats)) chats = [chats];
	const result = /* @__PURE__ */ new Set();
	for (let chat of chats) if (typeof chat == "number" || typeof chat == "bigint" || typeof chat == "string" && require_Utils.parseID(chat) || big_integer.default.isInstance(chat)) {
		chat = require_Helpers.returnBigInt(chat);
		if (chat.lesser(0)) result.add(chat.toString());
		else {
			result.add(require_Utils.getPeerId(new require_tl_generated_api.Api.PeerUser({ userId: chat })));
			result.add(require_Utils.getPeerId(new require_tl_generated_api.Api.PeerChat({ chatId: chat })));
			result.add(require_Utils.getPeerId(new require_tl_generated_api.Api.PeerChannel({ channelId: chat })));
		}
	} else if (typeof chat == "object" && chat.SUBCLASS_OF_ID == require_Helpers.unionId("Peer")) result.add(require_Utils.getPeerId(chat));
	else {
		chat = await client.getInputEntity(chat);
		if (chat instanceof require_tl_generated_api.Api.InputPeerSelf) chat = await client.getMe(true);
		result.add(require_Utils.getPeerId(chat));
	}
	return Array.from(result);
}
/**
* The common event builder, with builtin support to filter per chat.<br/>
* All events inherit this.
*/
var EventBuilder = class {
	constructor(eventParams) {
		this.chats = eventParams.chats?.map((x) => x.toString());
		this.blacklistChats = eventParams.blacklistChats || false;
		this.resolved = false;
		this.func = eventParams.func;
	}
	build(update, callback, selfId) {
		if (update) return update;
	}
	async resolve(client) {
		if (this.resolved) return;
		await this._resolve(client);
		this.resolved = true;
	}
	async _resolve(client) {
		this.chats = await _intoIdSet(client, this.chats);
	}
	filter(event) {
		if (!this.resolved) return;
		if (this.chats != void 0) {
			if (event.chatId == void 0) return;
			if (this.chats.includes(event.chatId.toString()) == this.blacklistChats) return;
		}
		if (this.func && !this.func(event)) return;
		return event;
	}
};
var EventCommon = class extends require_tl_custom_chatGetter.ChatGetter {
	constructor({ chatPeer = void 0, msgId = void 0, broadcast = void 0 }) {
		super();
		this._eventName = "Event";
		require_tl_custom_chatGetter.ChatGetter.initChatClass(this, {
			chatPeer,
			broadcast
		});
		this._entities = /* @__PURE__ */ new Map();
		this._client = void 0;
		this._messageId = msgId;
	}
	_setClient(client) {
		this._client = client;
		if (this.chatId) [this._chat, this._inputChat] = require_Utils._getEntityPair(this.chatId.toString(), this._entities, client._entityCache);
	}
	get client() {
		return this._client;
	}
};
var EventCommonSender = class extends require_tl_custom_senderGetter.SenderGetter {
	constructor({ chatPeer = void 0, msgId = void 0, broadcast = void 0 }) {
		super();
		this._eventName = "Event";
		require_tl_custom_chatGetter.ChatGetter.initChatClass(this, {
			chatPeer,
			broadcast
		});
		require_tl_custom_senderGetter.SenderGetter.initChatClass(this, {
			chatPeer,
			broadcast
		});
		this._entities = /* @__PURE__ */ new Map();
		this._client = void 0;
		this._messageId = msgId;
	}
	_setClient(client) {
		this._client = client;
		if (this.chatId) [this._chat, this._inputChat] = require_Utils._getEntityPair(this.chatId.toString(), this._entities, client._entityCache);
	}
	get client() {
		return this._client;
	}
};
exports.EventBuilder = EventBuilder;
exports.EventCommon = EventCommon;
exports.EventCommonSender = EventCommonSender;
exports._intoIdSet = _intoIdSet;
