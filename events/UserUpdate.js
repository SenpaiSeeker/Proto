Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../_virtual/_rolldown/runtime.js");
const require_tl_generated_api = require("../tl/generated/api.js");
require("../tl/index.js");
const require_events_common = require("./common.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/events/UserUpdate.ts
/**
* Occurs whenever a user goes online, starts typing, etc.
*
* @example
* ```ts
* client.addEventHandler((event: UserUpdateEvent) => {
*     if (event.online) {
*         console.log(`${event.userId} is now online!`);
*     }
*     if (event.typing) {
*         console.log(`${event.userId} is typing...`);
*     }
* }, new UserUpdate({}));
* ```
*/
var UserUpdate = class extends require_events_common.EventBuilder {
	constructor(params = {}) {
		super({
			chats: params.chats,
			blacklistChats: params.blacklistChats,
			func: params.func
		});
	}
	async _resolve(client) {
		this.chats = await require_events_common._intoIdSet(client, this.chats);
	}
	build(update) {
		if (update instanceof require_tl_generated_api.Api.UpdateUserStatus) return new UserUpdateEvent(update);
		if (update instanceof require_tl_generated_api.Api.UpdateUserTyping || update instanceof require_tl_generated_api.Api.UpdateChatUserTyping || update instanceof require_tl_generated_api.Api.UpdateChannelUserTyping) return new UserUpdateEvent(update);
	}
	filter(event) {
		if (this.chats != void 0) {
			const userId = event.userId?.toString();
			if (!userId || !this.chats.includes(userId)) {
				if (!this.blacklistChats) return;
			} else if (this.blacklistChats) return;
		}
		if (this.func && !this.func(event)) return;
		return event;
	}
};
/**
* Represents a user update event (status change or typing action).
*/
var UserUpdateEvent = class extends require_events_common.EventCommonSender {
	constructor(update) {
		let chatPeer;
		let userId;
		if (update instanceof require_tl_generated_api.Api.UpdateUserStatus) {
			userId = update.userId;
			chatPeer = new require_tl_generated_api.Api.PeerUser({ userId: update.userId });
		} else if (update instanceof require_tl_generated_api.Api.UpdateUserTyping) {
			userId = update.userId;
			chatPeer = new require_tl_generated_api.Api.PeerUser({ userId: update.userId });
		} else if (update instanceof require_tl_generated_api.Api.UpdateChatUserTyping) {
			userId = update.fromId instanceof require_tl_generated_api.Api.PeerUser ? update.fromId.userId : big_integer.default.zero;
			chatPeer = new require_tl_generated_api.Api.PeerChat({ chatId: update.chatId });
		} else {
			userId = update.fromId instanceof require_tl_generated_api.Api.PeerUser ? update.fromId.userId : big_integer.default.zero;
			chatPeer = new require_tl_generated_api.Api.PeerChannel({ channelId: update.channelId });
		}
		super({ chatPeer });
		this._eventName = "UserUpdate";
		this.originalUpdate = update;
		this._userId = userId;
		if (update instanceof require_tl_generated_api.Api.UpdateUserStatus) this._status = update.status;
		else {
			this._action = update.action;
			if (update instanceof require_tl_generated_api.Api.UpdateChatUserTyping) this._chatId = update.chatId;
			else if (update instanceof require_tl_generated_api.Api.UpdateChannelUserTyping) this._chatId = update.channelId;
		}
	}
	/**
	* The ID of the user whose status/action changed.
	*/
	get userId() {
		return this._userId;
	}
	/**
	* The raw status object (if this is a status update).
	*/
	get status() {
		return this._status;
	}
	/**
	* The raw action object (if this is a typing/action update).
	*/
	get action() {
		return this._action;
	}
	/**
	* Whether the user is currently online.
	*/
	get online() {
		if (!this._status) return void 0;
		return this._status instanceof require_tl_generated_api.Api.UserStatusOnline;
	}
	/**
	* Whether the user went offline.
	*/
	get offline() {
		if (!this._status) return void 0;
		return this._status instanceof require_tl_generated_api.Api.UserStatusOffline;
	}
	/**
	* When the user's online status expires (if online).
	*/
	get until() {
		if (this._status instanceof require_tl_generated_api.Api.UserStatusOnline) return /* @__PURE__ */ new Date(this._status.expires * 1e3);
	}
	/**
	* When the user was last seen (if offline).
	*/
	get lastSeen() {
		if (this._status instanceof require_tl_generated_api.Api.UserStatusOffline) return /* @__PURE__ */ new Date(this._status.wasOnline * 1e3);
	}
	/**
	* Whether the user was seen recently.
	*/
	get recently() {
		if (!this._status) return void 0;
		return this._status instanceof require_tl_generated_api.Api.UserStatusRecently;
	}
	/**
	* Whether the user was seen within the last week.
	*/
	get withinWeeks() {
		if (!this._status) return void 0;
		return this._status instanceof require_tl_generated_api.Api.UserStatusLastWeek;
	}
	/**
	* Whether the user was seen within the last month.
	*/
	get withinMonths() {
		if (!this._status) return void 0;
		return this._status instanceof require_tl_generated_api.Api.UserStatusLastMonth;
	}
	/**
	* Whether the user is typing a message.
	*/
	get typing() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageTypingAction;
	}
	/**
	* Whether the user cancelled the action.
	*/
	get cancel() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageCancelAction;
	}
	/**
	* Whether the user is recording something (audio, video, or round).
	*/
	get recording() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageRecordVideoAction || this._action instanceof require_tl_generated_api.Api.SendMessageRecordAudioAction || this._action instanceof require_tl_generated_api.Api.SendMessageRecordRoundAction;
	}
	/**
	* Whether the user is uploading something.
	*/
	get uploading() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageUploadVideoAction || this._action instanceof require_tl_generated_api.Api.SendMessageUploadAudioAction || this._action instanceof require_tl_generated_api.Api.SendMessageUploadPhotoAction || this._action instanceof require_tl_generated_api.Api.SendMessageUploadDocumentAction || this._action instanceof require_tl_generated_api.Api.SendMessageUploadRoundAction;
	}
	/**
	* Whether the user is recording or sending audio.
	*/
	get audio() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageRecordAudioAction || this._action instanceof require_tl_generated_api.Api.SendMessageUploadAudioAction;
	}
	/**
	* Whether the user is recording or sending video.
	*/
	get video() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageRecordVideoAction || this._action instanceof require_tl_generated_api.Api.SendMessageUploadVideoAction;
	}
	/**
	* Whether the user is recording or sending a round video.
	*/
	get round() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageRecordRoundAction || this._action instanceof require_tl_generated_api.Api.SendMessageUploadRoundAction;
	}
	/**
	* Whether the user is uploading a photo.
	*/
	get photo() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageUploadPhotoAction;
	}
	/**
	* Whether the user is uploading a document.
	*/
	get document() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageUploadDocumentAction;
	}
	/**
	* Whether the user is sending a geo location.
	*/
	get geo() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageGeoLocationAction;
	}
	/**
	* Whether the user is choosing a contact to share.
	*/
	get contact() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageChooseContactAction;
	}
	/**
	* Whether the user is playing a game.
	*/
	get playing() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageGamePlayAction;
	}
	/**
	* Whether the user is choosing a sticker.
	*/
	get sticker() {
		if (!this._action) return void 0;
		return this._action instanceof require_tl_generated_api.Api.SendMessageChooseStickerAction;
	}
	/**
	* Upload progress (0-100) if uploading, otherwise undefined.
	*/
	get uploadProgress() {
		if (this._action instanceof require_tl_generated_api.Api.SendMessageUploadVideoAction || this._action instanceof require_tl_generated_api.Api.SendMessageUploadAudioAction || this._action instanceof require_tl_generated_api.Api.SendMessageUploadPhotoAction || this._action instanceof require_tl_generated_api.Api.SendMessageUploadDocumentAction || this._action instanceof require_tl_generated_api.Api.SendMessageUploadRoundAction) return this._action.progress;
	}
	/**
	* Fetches the User entity for this event.
	*/
	async getUser() {
		if (!this._client) return void 0;
		try {
			const result = await this._client.getEntity(new require_tl_generated_api.Api.PeerUser({ userId: this._userId }));
			if (result instanceof require_tl_generated_api.Api.User) return result;
		} catch {
			return;
		}
	}
	/**
	* Gets the InputUser for this event.
	*/
	async getInputUser() {
		if (!this._client) return void 0;
		try {
			return await this._client.getInputEntity(new require_tl_generated_api.Api.PeerUser({ userId: this._userId }));
		} catch {
			return;
		}
	}
};
exports.UserUpdate = UserUpdate;
exports.UserUpdateEvent = UserUpdateEvent;
