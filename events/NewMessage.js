Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_generated_api = require("../tl/generated/api.js");
const require_events_common = require("./common.js");
require("../tl/index.js");
// teleproto/events/NewMessage.ts
/**
* Occurs whenever a new text message or a message with media arrives.
* @example
* ```ts
* async function eventPrint(event: NewMessageEvent) {
* const message = event.message;
*
*   // Checks if it's a private message (from user or bot)
*   if (event.isPrivate){
*       // prints sender id
*       console.log(message.senderId);
*       // read message
*       if (message.text == "hello"){
*           const sender = await message.getSender();
*           console.log("sender is",sender);
*           await client.sendMessage(sender,{
*               message:`hi your id is ${message.senderId}`
*           });
*       }
*   }
* }
* // adds an event handler for new messages
* client.addEventHandler(eventPrint, new NewMessage({}));
* ```
*/
var NewMessage = class extends require_events_common.EventBuilder {
	constructor(newMessageParams = {}) {
		let { chats, func, incoming, outgoing, fromUsers, forwards, pattern, blacklistChats = false } = newMessageParams;
		if (incoming && outgoing) incoming = outgoing = void 0;
		else if (incoming != void 0 && outgoing == void 0) outgoing = !incoming;
		else if (outgoing != void 0 && incoming == void 0) incoming = !outgoing;
		else if (outgoing == false && incoming == false) throw new Error("Don't create an event handler if you don't want neither incoming nor outgoing!");
		super({
			chats,
			blacklistChats,
			func
		});
		this.incoming = incoming;
		this.outgoing = outgoing;
		this.fromUsers = fromUsers;
		this.forwards = forwards;
		this.pattern = pattern;
		this._noCheck = [
			incoming,
			outgoing,
			chats,
			pattern,
			fromUsers,
			forwards,
			func
		].every((v) => v == void 0);
	}
	async _resolve(client) {
		await super._resolve(client);
		this.fromUsers = await require_events_common._intoIdSet(client, this.fromUsers);
	}
	build(update, callback, selfId) {
		if (update instanceof require_tl_generated_api.Api.UpdateNewMessage || update instanceof require_tl_generated_api.Api.UpdateNewChannelMessage) {
			if (!(update.message instanceof require_tl_generated_api.Api.Message)) return;
			const event = new NewMessageEvent(update.message, update);
			this.addAttributes(event);
			return event;
		} else if (update instanceof require_tl_generated_api.Api.UpdateShortMessage) return new NewMessageEvent(new require_tl_generated_api.Api.Message({
			out: update.out,
			mentioned: update.mentioned,
			mediaUnread: update.mediaUnread,
			silent: update.silent,
			id: update.id,
			peerId: new require_tl_generated_api.Api.PeerUser({ userId: update.userId }),
			fromId: new require_tl_generated_api.Api.PeerUser({ userId: update.out ? selfId : update.userId }),
			message: update.message,
			date: update.date,
			fwdFrom: update.fwdFrom,
			viaBotId: update.viaBotId,
			replyTo: update.replyTo,
			entities: update.entities,
			ttlPeriod: update.ttlPeriod
		}), update);
		else if (update instanceof require_tl_generated_api.Api.UpdateShortChatMessage) return new NewMessageEvent(new require_tl_generated_api.Api.Message({
			out: update.out,
			mentioned: update.mentioned,
			mediaUnread: update.mediaUnread,
			silent: update.silent,
			id: update.id,
			peerId: new require_tl_generated_api.Api.PeerChat({ chatId: update.chatId }),
			fromId: new require_tl_generated_api.Api.PeerUser({ userId: update.out ? selfId : update.fromId }),
			message: update.message,
			date: update.date,
			fwdFrom: update.fwdFrom,
			viaBotId: update.viaBotId,
			replyTo: update.replyTo,
			entities: update.entities,
			ttlPeriod: update.ttlPeriod
		}), update);
	}
	filter(event) {
		if (this._noCheck) return event;
		if (this.incoming && event.message.out) return;
		if (this.outgoing && !event.message.out) return;
		if (this.forwards != void 0) {
			if (this.forwards != !!event.message.fwdFrom) return;
		}
		if (this.fromUsers != void 0) {
			if (!event.message.senderId || !this.fromUsers.includes(event.message.senderId.toString())) return;
		}
		if (this.pattern) {
			const match = event.message.message?.match(this.pattern);
			if (!match) return;
			event.message.patternMatch = match;
		}
		return super.filter(event);
	}
	addAttributes(update) {}
};
var NewMessageEvent = class extends require_events_common.EventCommon {
	constructor(message, originalUpdate) {
		super({
			msgId: message.id,
			chatPeer: message.peerId,
			broadcast: message.post
		});
		this.originalUpdate = originalUpdate;
		this.message = message;
	}
	_setClient(client) {
		super._setClient(client);
		const m = this.message;
		try {
			m._finishInit(client, this.originalUpdate._entities || /* @__PURE__ */ new Map(), void 0);
		} catch (e) {
			client._log.error("Got error while trying to finish init message with id " + m.id, e);
			if (client._errorHandler) client._errorHandler(e);
		}
	}
	/**
	* The regex match object from the pattern filter (if any).
	*/
	get patternMatch() {
		return this.message.patternMatch;
	}
	/**
	* Replies to the message (with a reply header).
	*/
	async reply(params) {
		if (!this._client) return void 0;
		return this._client.sendMessage(this.message.peerId, {
			message: params.message,
			parseMode: params.parseMode,
			formattingEntities: params.formattingEntities,
			file: params.file,
			linkPreview: params.linkPreview,
			silent: params.silent,
			replyTo: this.message.id
		});
	}
	/**
	* Responds to the message in the same chat (without reply header).
	*/
	async respond(params) {
		if (!this._client) return void 0;
		return this._client.sendMessage(this.message.peerId, {
			message: params.message,
			parseMode: params.parseMode,
			formattingEntities: params.formattingEntities,
			file: params.file,
			linkPreview: params.linkPreview,
			silent: params.silent
		});
	}
	/**
	* Deletes the message.
	*/
	async delete(params = {}) {
		if (!this._client) return void 0;
		return this._client.deleteMessages(this.message.peerId, [this.message.id], params);
	}
	/**
	* Forwards the message to another chat.
	*/
	async forward(chat) {
		if (!this._client) return void 0;
		return this._client.forwardMessages(chat, {
			messages: [this.message.id],
			fromPeer: this.message.peerId
		});
	}
	/**
	* Edits the message (only own messages can be edited).
	*/
	async edit(params) {
		if (!this._client) return void 0;
		return this._client.editMessage(this.message.peerId, {
			message: this.message.id,
			text: params.message,
			parseMode: params.parseMode,
			formattingEntities: params.formattingEntities,
			file: params.file
		});
	}
	/**
	* Marks the message as read.
	*/
	async markRead() {
		if (!this._client) return void 0;
		return this._client.markAsRead(this.message.peerId, this.message.id);
	}
	/**
	* Pins the message.
	*/
	async pin(params) {
		if (!this._client) return void 0;
		return this._client.pinMessage(this.message.peerId, this.message.id, params);
	}
	/**
	* Unpins the message.
	*/
	async unpin() {
		if (!this._client) return void 0;
		await this._client.unpinMessage(this.message.peerId, this.message.id);
	}
};
exports.NewMessage = NewMessage;
exports.NewMessageEvent = NewMessageEvent;
