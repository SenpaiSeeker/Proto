Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_events_common = require("./common.js");
require("../tl/index.js");
const require_tl_generated_api = require("../tl/generated/api.js");
const require_Helpers = require("../Helpers.js");
const require_Utils = require("../Utils.js");
// teleproto/events/CallbackQuery.ts
const NewCallbackQueryDefaults = {
	chats: [],
	fromUsers: [],
	blacklistUsers: []
};
/**
* Occurs whenever you sign in as a bot and a user
* clicks one of the inline buttons on your messages.
* Note that the `chats` parameter will **not** work with normal
* IDs or peers if the clicked inline button comes from a "via bot"
* message. The `chats` parameter also supports checking against the
* `chat_instance` which should be used for inline callbacks.
*
* @example
* ```ts
* async function printQuery(event: NewCallbackQueryEvent) {
*     // TODO
* }
* ```
*/
var CallbackQuery = class extends require_events_common.EventBuilder {
	constructor(inlineQueryParams = {}) {
		const { chats, func, pattern } = inlineQueryParams;
		super({
			chats,
			func,
			blacklistChats: false
		});
		this.match = pattern;
		this._noCheck = [
			this.chats,
			this.func,
			this.match
		].every((i) => i === null || i === void 0);
	}
	build(update, callback, selfId = void 0) {
		if (update instanceof require_tl_generated_api.Api.UpdateBotCallbackQuery) return new CallbackQueryEvent(update, update.peer, update.msgId);
		else if (update instanceof require_tl_generated_api.Api.UpdateInlineBotCallbackQuery) {
			const b = require_Helpers.toSignedLittleBuffer(update.msgId.id, 8);
			const msgId = b.readInt32LE(0);
			const peerId = b.readInt32LE(4);
			return new CallbackQueryEvent(update, peerId < 0 ? new require_tl_generated_api.Api.PeerChannel({ channelId: require_Helpers.returnBigInt(-peerId) }) : new require_tl_generated_api.Api.PeerUser({ userId: require_Helpers.returnBigInt(peerId) }), msgId);
		}
	}
	filter(event) {
		if (this._noCheck) return event;
		if (this.chats) {
			let inside = this.chats.includes(event.query.chatInstance.toString());
			if (event.chatId) inside = inside || this.chats.includes(event.chatId.toString());
			if (inside === this.blacklistChats) return;
		}
		if (this.match) {
			const data = new TextDecoder().decode(event.query.data);
			const result = this.match.exec(data);
			this.match.lastIndex = 0;
			if (result) event.patternMatch = result;
			else return;
		}
		if (this.func) return this.func(event);
		return true;
	}
};
var CallbackQueryEvent = class extends require_events_common.EventCommonSender {
	constructor(query, peer, msgId) {
		super({
			msgId,
			chatPeer: peer,
			broadcast: false
		});
		this.query = query;
		this.patternMatch = void 0;
		this._senderId = require_Helpers.returnBigInt(query.userId);
		this._message = void 0;
		this._answered = false;
	}
	_setClient(client) {
		super._setClient(client);
		const [sender, inputSender] = require_Utils._getEntityPair(this._senderId.toString(), this._entities, client._entityCache);
		this._sender = sender;
		this._inputSender = inputSender;
	}
	get id() {
		return this.query.queryId;
	}
	get messageId() {
		return this._messageId;
	}
	get data() {
		return this.query.data;
	}
	get chatInstance() {
		return this.query.chatInstance;
	}
	async getMessage() {
		if (this._message) return this._message;
		const chat = this.isChannel ? await this.getInputChat() : void 0;
		const messages = await this._client.getMessages(chat, { ids: this._messageId });
		this._message = messages[0];
		return this._message;
	}
	async _refetchSender() {
		if (this._entities.has(this.senderId.toString())) this._sender = this._entities.get(this.senderId.toString());
		if (!this._sender) return;
		this._inputSender = require_Utils.getInputPeer(this._chat);
		if (!this._inputSender.hasOwnProperty("accessHash")) try {
			this._inputSender = this._client._entityCache.get(this._senderId);
		} catch (e) {
			const m = await this.getMessage();
			if (m) {
				this._sender = m._sender;
				this._inputSender = m._inputSender;
			}
		}
	}
	async answer({ message, cacheTime, url, alert } = {}) {
		if (this._answered) return;
		return await this._client.invoke(new require_tl_generated_api.Api.messages.SetBotCallbackAnswer({
			queryId: this.query.queryId,
			cacheTime: cacheTime ?? 0,
			alert,
			message,
			url
		})).then((res) => {
			this._answered = true;
			return res;
		});
	}
	get viaInline() {
		return this.query instanceof require_tl_generated_api.Api.UpdateInlineBotCallbackQuery;
	}
	async respond(params = {}) {
		await this.answer();
		const inputChat = await this.getInputChat();
		await this._client.sendMessage(inputChat, params);
	}
	async reply(params = {}) {
		await this.answer();
		params.replyTo = this.messageId;
		const inputChat = await this.getInputChat();
		await this._client.sendMessage(inputChat, params);
	}
	async edit(params) {
		if (this.query.msgId instanceof require_tl_generated_api.Api.InputBotInlineMessageID || this.query.msgId instanceof require_tl_generated_api.Api.InputBotInlineMessageID64) throw new Error("Editing messages sent via inline mode is not supported yet");
		else {
			const inputChat = await this.getInputChat();
			return await this._client.editMessage(inputChat, {
				...params,
				message: params.message ?? this.messageId
			}).then(async (res) => {
				await this.answer();
				return res;
			});
		}
	}
	async delete({ revoke = true } = {}) {
		if (this._client) return this._client.deleteMessages(await this.getInputChat(), [this.messageId], { revoke });
	}
	get sender() {
		return this._sender;
	}
};
exports.CallbackQuery = CallbackQuery;
exports.CallbackQueryEvent = CallbackQueryEvent;
exports.NewCallbackQueryDefaults = NewCallbackQueryDefaults;
