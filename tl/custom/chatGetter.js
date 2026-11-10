Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_Utils = require("../../Utils.js");
require("../api.js");
const require_tl_generated_api = require("../generated/api.js");
const require_Helpers = require("../../Helpers.js");
// teleproto/tl/custom/chatGetter.ts
var ChatGetter = class {
	static initChatClass(c, { chatPeer, inputChat, chat, broadcast }) {
		c._chatPeer = chatPeer;
		c._inputChat = inputChat;
		c._chat = chat;
		c._broadcast = broadcast;
		c._client = void 0;
	}
	get chat() {
		return this._chat;
	}
	async getChat() {
		if (!this._chat || "min" in this._chat && this._chat.min) try {
			await this.getInputChat();
			if (this._inputChat) this._chat = await this._client?.getEntity(this._inputChat);
		} catch (e) {
			await this._refetchChat();
		}
		return this._chat;
	}
	get inputChat() {
		if (!this._inputChat && this._chatPeer && this._client) try {
			this._inputChat = this._client._entityCache.get(require_Utils.getPeerId(this._chatPeer));
		} catch (e) {}
		return this._inputChat;
	}
	async getInputChat() {
		if (!this.inputChat && this._chatPeer && this._client) try {
			this._inputChat = await this._client.getInputEntity(this._chatPeer);
			return this._inputChat;
		} catch (e) {}
		if (!this._inputChat && this.chatId && this._client) try {
			const target = this.chatId;
			for await (const dialog of this._client.iterDialogs({ limit: 100 })) if (dialog.id.eq(target)) {
				this._chat = dialog.entity;
				this._inputChat = dialog.inputEntity;
				break;
			}
		} catch (e) {}
		return this._inputChat;
	}
	get chatId() {
		return this._chatPeer ? require_Helpers.returnBigInt(require_Utils.getPeerId(this._chatPeer)) : void 0;
	}
	get isPrivate() {
		return this._chatPeer ? this._chatPeer instanceof require_tl_generated_api.Api.PeerUser : void 0;
	}
	get isGroup() {
		if (!this._broadcast && this.chat && "broadcast" in this.chat) this._broadcast = Boolean(this.chat.broadcast);
		if (this._chatPeer instanceof require_tl_generated_api.Api.PeerChannel) {
			if (this._broadcast === void 0) return;
			else return !this._broadcast;
		}
		return this._chatPeer instanceof require_tl_generated_api.Api.PeerChat;
	}
	get isChannel() {
		return this._chatPeer instanceof require_tl_generated_api.Api.PeerChannel;
	}
	async _refetchChat() {}
};
exports.ChatGetter = ChatGetter;
