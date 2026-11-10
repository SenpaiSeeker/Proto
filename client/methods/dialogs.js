Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
require("../../tl/index.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_requestIter = require("../../requestIter.js");
const require_Utils = require("../../Utils.js");
const require_tl_custom_dialog = require("../../tl/custom/dialog.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/client/methods/dialogs.ts
var dialogs_exports = /* @__PURE__ */ require_runtime.__exportAll({
	_DialogsIter: () => _DialogsIter,
	getDialogs: () => getDialogs,
	iterDialogs: () => iterDialogs
});
const _MAX_CHUNK_SIZE = 100;
/**
Get the key to get messages from a dialog.

We cannot just use the message ID because channels share message IDs,
and the peer ID is required to distinguish between them. But it is not
necessary in small group chats and private chats.
* @param {Api.TypePeer} [peer] the dialog peer
* @param {number} [messageId] the message id
* @returns {[number,number]} the channel id and message id
*/
function _dialogMessageKey(peer, messageId) {
	return "" + [peer instanceof require_tl_generated_api.Api.PeerChannel ? peer.channelId : void 0, messageId];
}
/**
* Async iterator over the user's dialogs (conversations).
*
* Fetches dialogs in chunks, supports date/ID offsets, folder filtering,
* and can skip pinned or migrated chats. Used internally by `iterDialogs` / `getDialogs`.
* @internal
*/
var _DialogsIter = class extends require_requestIter.RequestIter {
	constructor(..._args) {
		super(..._args);
		this.includeCommunities = false;
	}
	async _init({ offsetDate, offsetId, offsetPeer, ignorePinned, ignoreMigrated, folder, includeCommunities }) {
		this.request = new require_tl_generated_api.Api.messages.GetDialogs({
			offsetDate: offsetDate ?? 0,
			offsetId,
			offsetPeer,
			limit: 1,
			hash: big_integer.default.zero,
			excludePinned: ignorePinned,
			folderId: folder
		});
		if (this.limit <= 0) {
			const dialogs = await this.client.invoke(this.request);
			if ("count" in dialogs) this.total = dialogs.count;
			else this.total = dialogs.dialogs.length;
			return true;
		}
		this.seen = /* @__PURE__ */ new Set();
		this.filterDate = offsetDate;
		this.ignoreMigrated = ignoreMigrated;
		this.lastOffset = void 0;
		this.includeCommunities = !!includeCommunities;
	}
	[Symbol.asyncIterator]() {
		return super[Symbol.asyncIterator]();
	}
	async _loadNextChunk() {
		if (!this.request || !this.seen || !this.buffer) return;
		while (true) {
			this.request.limit = Math.min(this.left, _MAX_CHUNK_SIZE);
			const r = await this.client.invoke(this.request);
			if (r instanceof require_tl_generated_api.Api.messages.DialogsNotModified) return;
			if ("count" in r) this.total = r.count;
			else this.total = r.dialogs.length;
			const entities = /* @__PURE__ */ new Map();
			const messages = /* @__PURE__ */ new Map();
			for (const entity of [...r.users, ...r.chats]) {
				if (entity instanceof require_tl_generated_api.Api.UserEmpty || entity instanceof require_tl_generated_api.Api.ChatEmpty) continue;
				entities.set(require_Utils.getPeerId(entity), entity);
			}
			for (const m of r.messages) {
				let message = m;
				try {
					if (message && "_finishInit" in message) message._finishInit(this.client, entities, void 0);
				} catch (e) {
					this.client._log.error("Got error while trying to finish init message with id " + m.id, e);
					if (this.client._errorHandler) await this.client._errorHandler(e);
				}
				messages.set(_dialogMessageKey(message.peerId, message.id), message);
			}
			for (const d of r.dialogs) {
				if (d instanceof require_tl_generated_api.Api.DialogFolder || !this.includeCommunities && d instanceof require_tl_generated_api.Api.DialogCommunity) continue;
				const peer = d instanceof require_tl_generated_api.Api.DialogCommunity ? new require_tl_generated_api.Api.PeerChannel({ channelId: d.communityId }) : d.peer;
				const message = d instanceof require_tl_generated_api.Api.Dialog ? messages.get(_dialogMessageKey(d.peer, d.topMessage)) : void 0;
				if (this.filterDate != void 0 && d instanceof require_tl_generated_api.Api.Dialog) {
					const date = message?.date;
					if (date == void 0 || date > this.filterDate) continue;
				}
				const peerId = require_Utils.getPeerId(peer);
				if (!this.seen.has(peerId)) {
					this.seen.add(peerId);
					if (!entities.has(peerId)) continue;
					const cd = new require_tl_custom_dialog.Dialog(this.client, d, entities, message);
					if (!this.ignoreMigrated || !(cd.entity instanceof require_tl_generated_api.Api.Chat && cd.entity.migratedTo)) this.buffer.push(cd);
				}
			}
			if (r.dialogs.length < this.request.limit || !(r instanceof require_tl_generated_api.Api.messages.DialogsSlice)) return true;
			const lastDialog = [...r.dialogs].reverse().find((dialog) => dialog instanceof require_tl_generated_api.Api.Dialog);
			if (!lastDialog) {
				if (this.request.excludePinned) return true;
				this.request.excludePinned = true;
				if (this.buffer.length) return;
				continue;
			}
			const lastMessage = messages.get(_dialogMessageKey(lastDialog.peer, lastDialog.topMessage));
			const offsetEntity = entities.get(require_Utils.getPeerId(lastDialog.peer));
			const offsetPeer = offsetEntity ? require_Utils.getInputPeer(offsetEntity) : await this.client.getInputEntity(lastDialog.peer);
			const offset = `${require_Utils.getPeerId(lastDialog.peer)}:${lastDialog.topMessage}`;
			if (this.lastOffset === offset) return true;
			this.lastOffset = offset;
			this.request.excludePinned = true;
			this.request.offsetId = lastDialog.topMessage;
			this.request.offsetDate = lastMessage ? lastMessage.date : 0;
			this.request.offsetPeer = offsetPeer;
			if (this.buffer.length) return;
		}
	}
};
/** @hidden */
function iterDialogs(client, { limit = void 0, offsetDate = void 0, offsetId = 0, offsetPeer = new require_tl_generated_api.Api.InputPeerEmpty(), ignorePinned = false, ignoreMigrated = false, folder = void 0, archived = void 0, includeCommunities }) {
	if (archived != void 0) folder = archived ? 1 : 0;
	return new _DialogsIter(client, limit, {}, {
		offsetDate,
		offsetId,
		offsetPeer,
		ignorePinned,
		ignoreMigrated,
		folder,
		includeCommunities
	});
}
/** @hidden */
async function getDialogs(client, params) {
	return await client.iterDialogs(params).collect();
}
exports._DialogsIter = _DialogsIter;
Object.defineProperty(exports, "dialogs_exports", {
	enumerable: true,
	get: function() {
		return dialogs_exports;
	}
});
exports.getDialogs = getDialogs;
exports.iterDialogs = iterDialogs;
