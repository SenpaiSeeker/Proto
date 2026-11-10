Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_generated_api = require("../tl/generated/api.js");
require("../tl/index.js");
const require_events_common = require("./common.js");
// teleproto/events/MessageRead.ts
/**
* Occurs whenever messages are marked as read.
*
* @example
* ```ts
* // When others read your messages
* client.addEventHandler((event: MessageReadEvent) => {
*     console.log(`Messages up to ${event.maxId} were read`);
*     if (event.outbox) {
*         console.log("Someone read my message!");
*     }
* }, new MessageRead({}));
*
* // When you read messages
* client.addEventHandler((event: MessageReadEvent) => {
*     console.log("I read messages");
* }, new MessageRead({ inbox: true }));
* ```
*/
var MessageRead = class extends require_events_common.EventBuilder {
	constructor(params = {}) {
		super({
			chats: params.chats,
			blacklistChats: params.blacklistChats,
			func: params.func
		});
		this._inbox = params.inbox;
	}
	async _resolve(client) {
		await super._resolve(client);
	}
	build(update) {
		if (update instanceof require_tl_generated_api.Api.UpdateReadHistoryInbox || update instanceof require_tl_generated_api.Api.UpdateReadHistoryOutbox || update instanceof require_tl_generated_api.Api.UpdateReadChannelInbox || update instanceof require_tl_generated_api.Api.UpdateReadChannelOutbox || update instanceof require_tl_generated_api.Api.UpdateReadMessagesContents || update instanceof require_tl_generated_api.Api.UpdateChannelReadMessagesContents) return new MessageReadEvent(update);
	}
	filter(event) {
		if (this._inbox !== void 0) {
			if (this._inbox !== event.inbox) return;
		}
		if (this.chats !== void 0 && event.chatId) {
			const chatIdStr = event.chatId.toString();
			if (this.chats.includes(chatIdStr) === this.blacklistChats) return;
		}
		if (this.func && !this.func(event)) return;
		return event;
	}
};
/**
* Represents a message read event.
*/
var MessageReadEvent = class extends require_events_common.EventCommon {
	constructor(update) {
		let chatPeer;
		let isOutbox = false;
		let isContents = false;
		let maxId = 0;
		let messageIds = [];
		if (update instanceof require_tl_generated_api.Api.UpdateReadHistoryInbox) {
			chatPeer = update.peer;
			isOutbox = false;
			maxId = update.maxId;
		} else if (update instanceof require_tl_generated_api.Api.UpdateReadHistoryOutbox) {
			chatPeer = update.peer;
			isOutbox = true;
			maxId = update.maxId;
		} else if (update instanceof require_tl_generated_api.Api.UpdateReadChannelInbox) {
			chatPeer = new require_tl_generated_api.Api.PeerChannel({ channelId: update.channelId });
			isOutbox = false;
			maxId = update.maxId;
		} else if (update instanceof require_tl_generated_api.Api.UpdateReadChannelOutbox) {
			chatPeer = new require_tl_generated_api.Api.PeerChannel({ channelId: update.channelId });
			isOutbox = true;
			maxId = update.maxId;
		} else if (update instanceof require_tl_generated_api.Api.UpdateReadMessagesContents) {
			isContents = true;
			messageIds = update.messages;
			maxId = messageIds.length > 0 ? Math.max(...messageIds) : 0;
		} else if (update instanceof require_tl_generated_api.Api.UpdateChannelReadMessagesContents) {
			chatPeer = new require_tl_generated_api.Api.PeerChannel({ channelId: update.channelId });
			isContents = true;
			messageIds = update.messages;
			maxId = messageIds.length > 0 ? Math.max(...messageIds) : 0;
		}
		super({ chatPeer });
		this._eventName = "MessageRead";
		this.originalUpdate = update;
		this._outbox = isOutbox;
		this._contents = isContents;
		this._maxId = maxId;
		this._messageIds = messageIds;
	}
	/**
	* Up to which message ID has been read.
	* Every message with ID <= maxId has been read.
	*/
	get maxId() {
		return this._maxId;
	}
	/**
	* True if someone else read YOUR messages (outbox read).
	*/
	get outbox() {
		return this._outbox;
	}
	/**
	* True if YOU read someone else's messages (inbox read).
	*/
	get inbox() {
		return !this._outbox;
	}
	/**
	* True if this is a content read (e.g., voice message played).
	*/
	get contents() {
		return this._contents;
	}
	/**
	* The IDs of messages whose contents were read.
	* Only set when `contents` is True.
	*/
	get messageIds() {
		return this._messageIds;
	}
	/**
	* Whether any message IDs are available.
	*/
	get isRead() {
		return this._maxId > 0 || this._messageIds.length > 0;
	}
	/**
	* Gets messages that were read (if message IDs are available).
	* Only works for content reads.
	*/
	async getMessages() {
		if (!this._client || this._messageIds.length === 0) return;
		if (!this.chatId) return;
		try {
			return await this._client.getMessages(this.chatId, { ids: this._messageIds });
		} catch {
			return;
		}
	}
};
exports.MessageRead = MessageRead;
exports.MessageReadEvent = MessageReadEvent;
