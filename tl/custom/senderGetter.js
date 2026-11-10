Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
require("../api.js");
const require_tl_generated_api = require("../generated/api.js");
const require_tl_custom_chatGetter = require("./chatGetter.js");
// teleproto/tl/custom/senderGetter.ts
var SenderGetter = class extends require_tl_custom_chatGetter.ChatGetter {
	static initSenderClass(c, { senderId, sender, inputSender }) {
		c._senderId = senderId;
		c._sender = sender;
		c._inputSender = inputSender;
		c._client = void 0;
	}
	get sender() {
		return this._sender;
	}
	async getSender() {
		if (this._client && (!this._sender || this._sender instanceof require_tl_generated_api.Api.Channel && this._sender.min) && await this.getInputSender()) try {
			this._sender = await this._client.getEntity(this._inputSender);
		} catch (e) {
			await this._refetchSender();
		}
		return this._sender;
	}
	get inputSender() {
		if (!this._inputSender && this._senderId && this._client) try {
			this._inputSender = this._client._entityCache.get(this._senderId);
		} catch (e) {}
		return this._inputSender;
	}
	async getInputSender() {
		if (!this.inputSender && this._senderId && this._client) {
			try {
				this._inputSender = await this._client.getInputEntity(this._senderId);
				return this._inputSender;
			} catch (e) {}
			await this._refetchSender();
		}
		return this._inputSender;
	}
	get senderId() {
		return this._senderId;
	}
	async _refetchSender() {}
};
exports.SenderGetter = SenderGetter;
