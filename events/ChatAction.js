Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_generated_api = require("../tl/generated/api.js");
require("../tl/index.js");
const require_events_common = require("./common.js");
// teleproto/events/ChatAction.ts
/**
* Occurs on chat actions: user joined/left/kicked, title/photo changed,
* messages pinned, chat created, etc.
*
* @example
* ```ts
* client.addEventHandler((event: ChatActionEvent) => {
*     if (event.userJoined) {
*         console.log(`User ${event.userId} joined!`);
*     }
*     if (event.userLeft) {
*         console.log(`User ${event.userId} left`);
*     }
*     if (event.newTitle) {
*         console.log(`New title: ${event.newTitle}`);
*     }
*     if (event.newPin) {
*         console.log(`Message pinned: ${event.pinnedMessageIds}`);
*     }
* }, new ChatAction({}));
* ```
*/
var ChatAction = class extends require_events_common.EventBuilder {
	constructor(params = {}) {
		super({
			chats: params.chats,
			blacklistChats: params.blacklistChats,
			func: params.func
		});
	}
	build(update) {
		if (update instanceof require_tl_generated_api.Api.UpdateChatParticipantAdd || update instanceof require_tl_generated_api.Api.UpdateChatParticipantDelete || update instanceof require_tl_generated_api.Api.UpdateChatParticipant || update instanceof require_tl_generated_api.Api.UpdateChannelParticipant) return new ChatActionEvent(update);
		if (update instanceof require_tl_generated_api.Api.UpdatePinnedMessages || update instanceof require_tl_generated_api.Api.UpdatePinnedChannelMessages) return new ChatActionEvent(update);
		if (update instanceof require_tl_generated_api.Api.UpdateNewMessage || update instanceof require_tl_generated_api.Api.UpdateNewChannelMessage) {
			const msg = update.message;
			if (msg instanceof require_tl_generated_api.Api.MessageService && msg.action) {
				if (msg.action instanceof require_tl_generated_api.Api.MessageActionChatCreate || msg.action instanceof require_tl_generated_api.Api.MessageActionChannelCreate || msg.action instanceof require_tl_generated_api.Api.MessageActionChatEditTitle || msg.action instanceof require_tl_generated_api.Api.MessageActionChatEditPhoto || msg.action instanceof require_tl_generated_api.Api.MessageActionChatDeletePhoto || msg.action instanceof require_tl_generated_api.Api.MessageActionChatAddUser || msg.action instanceof require_tl_generated_api.Api.MessageActionChatDeleteUser || msg.action instanceof require_tl_generated_api.Api.MessageActionChatJoinedByLink || msg.action instanceof require_tl_generated_api.Api.MessageActionPinMessage || msg.action instanceof require_tl_generated_api.Api.MessageActionChatJoinedByRequest) return new ChatActionEvent(update, msg);
			}
		}
	}
};
var ChatActionEvent = class extends require_events_common.EventCommon {
	constructor(update, actionMessage) {
		let chatPeer;
		if (update instanceof require_tl_generated_api.Api.UpdateChatParticipantAdd) chatPeer = new require_tl_generated_api.Api.PeerChat({ chatId: update.chatId });
		else if (update instanceof require_tl_generated_api.Api.UpdateChatParticipantDelete) chatPeer = new require_tl_generated_api.Api.PeerChat({ chatId: update.chatId });
		else if (update instanceof require_tl_generated_api.Api.UpdateChatParticipant) chatPeer = new require_tl_generated_api.Api.PeerChat({ chatId: update.chatId });
		else if (update instanceof require_tl_generated_api.Api.UpdateChannelParticipant) chatPeer = new require_tl_generated_api.Api.PeerChannel({ channelId: update.channelId });
		else if (update instanceof require_tl_generated_api.Api.UpdatePinnedMessages) chatPeer = update.peer;
		else if (update instanceof require_tl_generated_api.Api.UpdatePinnedChannelMessages) chatPeer = new require_tl_generated_api.Api.PeerChannel({ channelId: update.channelId });
		else if (actionMessage) chatPeer = actionMessage.peerId;
		super({ chatPeer });
		this._eventName = "ChatAction";
		this.originalUpdate = update;
		this._actionMessage = actionMessage;
		this._userIds = [];
		this._pinnedIds = [];
		this._pinned = false;
		this._created = false;
		this._parseUpdate(update, actionMessage);
	}
	_parseUpdate(update, actionMessage) {
		if (update instanceof require_tl_generated_api.Api.UpdateChatParticipantAdd) {
			this._userIds = [update.userId];
			this._addedBy = update.inviterId;
		} else if (update instanceof require_tl_generated_api.Api.UpdateChatParticipantDelete) this._userIds = [update.userId];
		else if (update instanceof require_tl_generated_api.Api.UpdateChatParticipant) {
			this._userIds = [update.userId];
			if (update.newParticipant && !update.prevParticipant) this._addedBy = update.actorId;
			else if (!update.newParticipant && update.prevParticipant) this._kickedBy = update.actorId;
		} else if (update instanceof require_tl_generated_api.Api.UpdateChannelParticipant) {
			this._userIds = [update.userId];
			if (update.newParticipant && !update.prevParticipant) this._addedBy = update.actorId;
			else if (!update.newParticipant && update.prevParticipant) this._kickedBy = update.actorId;
		}
		if (update instanceof require_tl_generated_api.Api.UpdatePinnedMessages) {
			this._pinnedIds = update.messages;
			this._pinned = update.pinned ?? true;
		} else if (update instanceof require_tl_generated_api.Api.UpdatePinnedChannelMessages) {
			this._pinnedIds = update.messages;
			this._pinned = update.pinned ?? true;
		}
		if (actionMessage?.action) {
			const action = actionMessage.action;
			if (action instanceof require_tl_generated_api.Api.MessageActionChatCreate) {
				this._created = true;
				this._newTitle = action.title;
				this._userIds = action.users;
			} else if (action instanceof require_tl_generated_api.Api.MessageActionChannelCreate) {
				this._created = true;
				this._newTitle = action.title;
			} else if (action instanceof require_tl_generated_api.Api.MessageActionChatEditTitle) this._newTitle = action.title;
			else if (action instanceof require_tl_generated_api.Api.MessageActionChatEditPhoto) this._newPhoto = action.photo;
			else if (action instanceof require_tl_generated_api.Api.MessageActionChatAddUser) {
				this._userIds = action.users;
				if (actionMessage.fromId instanceof require_tl_generated_api.Api.PeerUser) this._addedBy = actionMessage.fromId.userId;
			} else if (action instanceof require_tl_generated_api.Api.MessageActionChatDeleteUser) {
				this._userIds = [action.userId];
				if (actionMessage.fromId instanceof require_tl_generated_api.Api.PeerUser) {
					if (!action.userId.eq(actionMessage.fromId.userId)) this._kickedBy = actionMessage.fromId.userId;
				}
			} else if (action instanceof require_tl_generated_api.Api.MessageActionChatJoinedByLink) {
				if (actionMessage.fromId instanceof require_tl_generated_api.Api.PeerUser) this._userIds = [actionMessage.fromId.userId];
				this._addedBy = action.inviterId;
			} else if (action instanceof require_tl_generated_api.Api.MessageActionChatJoinedByRequest) {
				if (actionMessage.fromId instanceof require_tl_generated_api.Api.PeerUser) this._userIds = [actionMessage.fromId.userId];
			} else if (action instanceof require_tl_generated_api.Api.MessageActionPinMessage) {
				if (actionMessage.replyTo instanceof require_tl_generated_api.Api.MessageReplyHeader && actionMessage.replyTo.replyToMsgId !== void 0) this._pinnedIds = [actionMessage.replyTo.replyToMsgId];
				this._pinned = true;
			}
		}
	}
	/**
	* The service message that triggered this event (if any).
	*/
	get actionMessage() {
		return this._actionMessage;
	}
	/**
	* True if a user joined the chat.
	*/
	get userJoined() {
		const action = this._actionMessage?.action;
		return action instanceof require_tl_generated_api.Api.MessageActionChatJoinedByLink || action instanceof require_tl_generated_api.Api.MessageActionChatJoinedByRequest || this.originalUpdate instanceof require_tl_generated_api.Api.UpdateChatParticipant && !!this.originalUpdate.newParticipant && !this.originalUpdate.prevParticipant || this.originalUpdate instanceof require_tl_generated_api.Api.UpdateChannelParticipant && !!this.originalUpdate.newParticipant && !this.originalUpdate.prevParticipant;
	}
	/**
	* True if a user was added by someone else.
	*/
	get userAdded() {
		return this._actionMessage?.action instanceof require_tl_generated_api.Api.MessageActionChatAddUser || this.originalUpdate instanceof require_tl_generated_api.Api.UpdateChatParticipantAdd;
	}
	/**
	* True if a user left the chat.
	*/
	get userLeft() {
		const action = this._actionMessage?.action;
		if (action instanceof require_tl_generated_api.Api.MessageActionChatDeleteUser) {
			if (this._actionMessage?.fromId instanceof require_tl_generated_api.Api.PeerUser) return action.userId.eq(this._actionMessage.fromId.userId);
		}
		if (this.originalUpdate instanceof require_tl_generated_api.Api.UpdateChatParticipant || this.originalUpdate instanceof require_tl_generated_api.Api.UpdateChannelParticipant) return !this.originalUpdate.newParticipant && !!this.originalUpdate.prevParticipant && this.originalUpdate.userId.eq(this.originalUpdate.actorId);
		return false;
	}
	/**
	* True if a user was kicked/banned.
	*/
	get userKicked() {
		const action = this._actionMessage?.action;
		if (action instanceof require_tl_generated_api.Api.MessageActionChatDeleteUser) {
			if (this._actionMessage?.fromId instanceof require_tl_generated_api.Api.PeerUser) return !action.userId.eq(this._actionMessage.fromId.userId);
		}
		if (this.originalUpdate instanceof require_tl_generated_api.Api.UpdateChatParticipant || this.originalUpdate instanceof require_tl_generated_api.Api.UpdateChannelParticipant) return !this.originalUpdate.newParticipant && !!this.originalUpdate.prevParticipant && !this.originalUpdate.userId.eq(this.originalUpdate.actorId);
		return this.originalUpdate instanceof require_tl_generated_api.Api.UpdateChatParticipantDelete;
	}
	/**
	* The user IDs affected by this action.
	*/
	get userIds() {
		return this._userIds;
	}
	/**
	* The first user ID (convenience getter).
	*/
	get userId() {
		return this._userIds.length > 0 ? this._userIds[0] : void 0;
	}
	/**
	* The user ID who added someone (if applicable).
	*/
	get addedBy() {
		return this._addedBy;
	}
	/**
	* The user ID who kicked someone (if applicable).
	*/
	get kickedBy() {
		return this._kickedBy;
	}
	/**
	* True if this is a new chat/channel creation.
	*/
	get created() {
		return this._created;
	}
	/**
	* The new chat title (if changed).
	*/
	get newTitle() {
		return this._newTitle;
	}
	/**
	* True if the chat photo was changed.
	*/
	get newPhoto() {
		return this._newPhoto !== void 0 || this._actionMessage?.action instanceof require_tl_generated_api.Api.MessageActionChatEditPhoto;
	}
	/**
	* True if the chat photo was deleted.
	*/
	get photoDeleted() {
		return this._actionMessage?.action instanceof require_tl_generated_api.Api.MessageActionChatDeletePhoto;
	}
	/**
	* The new photo object (if available).
	*/
	get photo() {
		return this._newPhoto;
	}
	/**
	* True if a message was pinned.
	*/
	get newPin() {
		return this._pinned && this._pinnedIds.length > 0;
	}
	/**
	* True if a message was unpinned.
	*/
	get unpin() {
		return !this._pinned && this._pinnedIds.length > 0;
	}
	/**
	* The IDs of pinned/unpinned messages.
	*/
	get pinnedMessageIds() {
		return this._pinnedIds;
	}
	/**
	* The first pinned message ID.
	*/
	get pinnedMessageId() {
		return this._pinnedIds.length > 0 ? this._pinnedIds[0] : void 0;
	}
	/**
	* Get the pinned message(s).
	*/
	async getPinnedMessages() {
		if (!this._client || this._pinnedIds.length === 0 || !this.chatId) return;
		try {
			return await this._client.getMessages(this.chatId, { ids: this._pinnedIds });
		} catch {
			return;
		}
	}
	/**
	* Get the first pinned message.
	*/
	async getPinnedMessage() {
		const messages = await this.getPinnedMessages();
		return messages && messages.length > 0 ? messages[0] : void 0;
	}
	/**
	* Get the user(s) affected by this action.
	*/
	async getUsers() {
		if (!this._client || this._userIds.length === 0) return;
		try {
			const users = [];
			for (const userId of this._userIds) {
				const entity = await this._client.getEntity(new require_tl_generated_api.Api.PeerUser({ userId }));
				if (entity instanceof require_tl_generated_api.Api.User) users.push(entity);
			}
			return users.length > 0 ? users : void 0;
		} catch {
			return;
		}
	}
	/**
	* Get the first affected user.
	*/
	async getUser() {
		const users = await this.getUsers();
		return users && users.length > 0 ? users[0] : void 0;
	}
	/**
	* Respond to the action in the same chat.
	*/
	async respond(params) {
		if (!this._client || !this.chatId) return void 0;
		return this._client.sendMessage(this.chatId, params);
	}
};
exports.ChatAction = ChatAction;
exports.ChatActionEvent = ChatActionEvent;
