Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
require("../api.js");
const require_Utils = require("../../Utils.js");
const require_tl_generated_api = require("../generated/api.js");
const require_tl_custom_draft = require("./draft.js");
const require_Helpers = require("../../Helpers.js");
// teleproto/tl/custom/dialog.ts
var Dialog = class {
	constructor(client, dialog, entities, message) {
		this._client = client;
		this.dialog = dialog;
		this.pinned = !!dialog.pinned;
		this.folderId = dialog instanceof require_tl_generated_api.Api.Dialog ? dialog.folderId : void 0;
		this.archived = this.folderId != void 0;
		this.message = message;
		this.date = this.message?.date;
		const peer = dialog instanceof require_tl_generated_api.Api.DialogCommunity ? new require_tl_generated_api.Api.PeerChannel({ channelId: dialog.communityId }) : dialog.peer;
		this.entity = entities.get(require_Utils.getPeerId(peer));
		this.inputEntity = require_Utils.getInputPeer(this.entity);
		if (this.entity) {
			this.id = require_Helpers.returnBigInt(require_Utils.getPeerId(this.entity));
			this.name = this.title = require_Utils.getDisplayName(this.entity);
		}
		this.unreadCount = dialog instanceof require_tl_generated_api.Api.Dialog ? dialog.unreadCount : 0;
		this.unreadMentionsCount = dialog instanceof require_tl_generated_api.Api.Dialog ? dialog.unreadMentionsCount : 0;
		if (!this.entity) throw new Error("Entity not found for dialog");
		this.draft = new require_tl_custom_draft.Draft(client, this.entity, dialog instanceof require_tl_generated_api.Api.Dialog ? dialog.draft : void 0);
		this.isUser = this.entity instanceof require_tl_generated_api.Api.User;
		this.isGroup = !!(this.entity instanceof require_tl_generated_api.Api.Chat || this.entity instanceof require_tl_generated_api.Api.ChatForbidden || this.entity instanceof require_tl_generated_api.Api.Channel && this.entity.megagroup);
		this.isChannel = this.entity instanceof require_tl_generated_api.Api.Channel;
		this.isCommunity = dialog instanceof require_tl_generated_api.Api.DialogCommunity;
	}
	/** Input dialog reference, including the distinct community constructor. */
	get inputDialog() {
		return this.isCommunity ? new require_tl_generated_api.Api.InputDialogPeerCommunity({ community: require_Utils.getInputChannel(this.inputEntity) }) : new require_tl_generated_api.Api.InputDialogPeer({ peer: this.inputEntity });
	}
	/** Groups or expands a community row; unavailable for ordinary dialogs. */
	async setCollapsed(collapsed) {
		if (!this.isCommunity) throw new Error("The dialog is not a community");
		const result = await this._client.setCommunityCollapsed(this.inputEntity, collapsed);
		if (this.entity instanceof require_tl_generated_api.Api.Community) this.entity.collapsedInDialogs = collapsed || void 0;
		return result;
	}
	/** Sends a message to this dialog. A bare string is used as the message text. */
	async send(params) {
		return this._client.sendMessage(this.inputEntity, typeof params === "string" ? { message: params } : params);
	}
	/** Marks all messages in this dialog as read (clearing mentions too when asked). */
	async markAsRead(params) {
		return this._client.markAsRead(this.inputEntity, void 0, params);
	}
	/** Moves this dialog to the archive folder. */
	async archive() {
		this.archived = true;
		this.folderId = 1;
		return this._client.editPeerFolders(this.inputEntity, 1);
	}
	/** Moves this dialog back to the main chat list. */
	async unarchive() {
		this.archived = false;
		this.folderId = 0;
		return this._client.editPeerFolders(this.inputEntity, 0);
	}
	/** Pins or unpins this dialog in the chat list (`messages.toggleDialogPin`). */
	async pin(pinned = true) {
		const result = await this._client.invoke(new require_tl_generated_api.Api.messages.ToggleDialogPin({
			peer: this.inputDialog,
			pinned: pinned || void 0
		}));
		this.pinned = pinned;
		return result;
	}
	/** Unpins this dialog in the chat list. */
	async unpin() {
		return this.pin(false);
	}
	/**
	* Deletes this dialog: leaves channels/supergroups, or deletes the
	* message history of private chats and small groups (see {@link DeleteHistoryParams}).
	*/
	async delete(params) {
		if (this.isChannel || this.isCommunity) return this._client.leaveChannel(this.inputEntity);
		return this._client.deleteHistory(this.inputEntity, params);
	}
};
exports.Dialog = Dialog;
