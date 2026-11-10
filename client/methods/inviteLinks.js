Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_requestIter = require("../../requestIter.js");
require("../../tl/index.js");
// teleproto/client/methods/inviteLinks.ts
var inviteLinks_exports = /* @__PURE__ */ require_runtime.__exportAll({
	_ChatInviteImportersIter: () => _ChatInviteImportersIter,
	_ExportedChatInvitesIter: () => _ExportedChatInvitesIter,
	_parseInviteHash: () => _parseInviteHash,
	checkChatInvite: () => checkChatInvite,
	deleteExportedChatInvite: () => deleteExportedChatInvite,
	deleteRevokedExportedChatInvites: () => deleteRevokedExportedChatInvites,
	editExportedChatInvite: () => editExportedChatInvite,
	exportChatInvite: () => exportChatInvite,
	getAdminsWithInvites: () => getAdminsWithInvites,
	getChatInviteImporters: () => getChatInviteImporters,
	getExportedChatInvite: () => getExportedChatInvite,
	getExportedChatInvites: () => getExportedChatInvites,
	hideAllChatJoinRequests: () => hideAllChatJoinRequests,
	hideChatJoinRequest: () => hideChatJoinRequest,
	iterChatInviteImporters: () => iterChatInviteImporters,
	iterExportedChatInvites: () => iterExportedChatInvites
});
const _MAX_INVITES_CHUNK_SIZE = 100;
const _MAX_IMPORTERS_CHUNK_SIZE = 100;
/**
* Extracts the hash from an invite link (`t.me/+hash`, `t.me/joinchat/hash`)
* or returns the input unchanged if it is already a bare hash.
* @hidden
*/
function _parseInviteHash(link) {
	const trimmed = link.trim();
	const match = trimmed.match(/(?:t\.me\/|telegram\.me\/|telegram\.dog\/)?(?:joinchat\/|\+)([a-zA-Z0-9_-]+)\/?$/);
	return match ? match[1] : trimmed;
}
function _toDate(value) {
	return value instanceof Date ? Math.floor(value.getTime() / 1e3) : value;
}
/** @hidden */
async function exportChatInvite(client, entity, params = {}) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.messages.ExportChatInvite({
		peer,
		title: params.title,
		expireDate: _toDate(params.expireDate),
		usageLimit: params.usageLimit,
		requestNeeded: params.requestNeeded,
		legacyRevokePermanent: params.legacyRevokePermanent,
		subscriptionPricing: params.subscriptionPricing
	}));
}
/** @hidden */
async function editExportedChatInvite(client, entity, link, params) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.messages.EditExportedChatInvite({
		peer,
		link,
		revoked: params.revoked,
		expireDate: _toDate(params.expireDate),
		usageLimit: params.usageLimit,
		requestNeeded: params.requestNeeded,
		title: params.title
	}));
}
/** @hidden */
async function getExportedChatInvite(client, entity, link) {
	const peer = await client.getInputEntity(entity);
	return client.api.messages.getExportedChatInvite({
		peer,
		link
	});
}
/** @hidden */
async function deleteExportedChatInvite(client, entity, link) {
	const peer = await client.getInputEntity(entity);
	return client.api.messages.deleteExportedChatInvite({
		peer,
		link
	});
}
/** @hidden */
async function deleteRevokedExportedChatInvites(client, entity, admin) {
	const peer = await client.getInputEntity(entity);
	const adminId = admin ? await client.getInputEntity(admin) : new require_tl_generated_api.Api.InputUserSelf();
	return client.invoke(new require_tl_generated_api.Api.messages.DeleteRevokedExportedChatInvites({
		peer,
		adminId
	}));
}
/** @hidden */
async function getAdminsWithInvites(client, entity) {
	const peer = await client.getInputEntity(entity);
	return client.api.messages.getAdminsWithInvites({ peer });
}
var _ExportedChatInvitesIter = class extends require_requestIter.RequestIter {
	async _init(params) {
		const peer = await this.client.getInputEntity(params.entity);
		const adminId = params.admin ? await this.client.getInputEntity(params.admin) : new require_tl_generated_api.Api.InputUserSelf();
		this.request = new require_tl_generated_api.Api.messages.GetExportedChatInvites({
			peer,
			adminId,
			revoked: params.revoked,
			limit: 0
		});
	}
	async _loadNextChunk() {
		if (!this.request) return true;
		this.request.limit = Math.min(this.left, _MAX_INVITES_CHUNK_SIZE);
		const result = await this.client.invoke(this.request);
		this.total = result.count;
		if (!result.invites.length) return true;
		for (const invite of result.invites) this.buffer?.push(invite);
		const last = result.invites[result.invites.length - 1];
		if (!(last instanceof require_tl_generated_api.Api.ChatInviteExported)) return true;
		this.request.offsetDate = last.date;
		this.request.offsetLink = last.link;
		if (result.invites.length < this.request.limit) return true;
	}
	[Symbol.asyncIterator]() {
		return super[Symbol.asyncIterator]();
	}
};
/** @hidden */
function iterExportedChatInvites(client, entity, params = {}) {
	return new _ExportedChatInvitesIter(client, params.limit ?? Number.MAX_SAFE_INTEGER, {}, {
		entity,
		...params
	});
}
/** @hidden */
async function getExportedChatInvites(client, entity, params = {}) {
	return await iterExportedChatInvites(client, entity, params).collect();
}
var _ChatInviteImportersIter = class extends require_requestIter.RequestIter {
	async _init(params) {
		const peer = await this.client.getInputEntity(params.entity);
		this.request = new require_tl_generated_api.Api.messages.GetChatInviteImporters({
			peer,
			link: params.link,
			requested: params.requested,
			subscriptionExpired: params.subscriptionExpired,
			q: params.search,
			offsetDate: 0,
			offsetUser: new require_tl_generated_api.Api.InputUserEmpty(),
			limit: 0
		});
	}
	async _loadNextChunk() {
		if (!this.request) return true;
		this.request.limit = Math.min(this.left, _MAX_IMPORTERS_CHUNK_SIZE);
		const result = await this.client.invoke(this.request);
		this.total = result.count;
		if (!result.importers.length) return true;
		for (const importer of result.importers) this.buffer?.push(importer);
		const last = result.importers[result.importers.length - 1];
		this.request.offsetDate = last.date;
		this.request.offsetUser = await this.client.getInputEntity(last.userId);
		if (result.importers.length < this.request.limit) return true;
	}
	[Symbol.asyncIterator]() {
		return super[Symbol.asyncIterator]();
	}
};
/** @hidden */
function iterChatInviteImporters(client, entity, params = {}) {
	return new _ChatInviteImportersIter(client, params.limit ?? Number.MAX_SAFE_INTEGER, {}, {
		entity,
		...params
	});
}
/** @hidden */
async function getChatInviteImporters(client, entity, params = {}) {
	return await iterChatInviteImporters(client, entity, params).collect();
}
/** @hidden */
async function hideChatJoinRequest(client, entity, user, params = {}) {
	const peer = await client.getInputEntity(entity);
	const userId = await client.getInputEntity(user);
	return client.invoke(new require_tl_generated_api.Api.messages.HideChatJoinRequest({
		peer,
		userId,
		approved: params.approved
	}));
}
/** @hidden */
async function hideAllChatJoinRequests(client, entity, params = {}) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.messages.HideAllChatJoinRequests({
		peer,
		approved: params.approved,
		link: params.link
	}));
}
/** @hidden */
async function checkChatInvite(client, link) {
	return client.api.messages.checkChatInvite({ hash: _parseInviteHash(link) });
}
exports._ChatInviteImportersIter = _ChatInviteImportersIter;
exports._ExportedChatInvitesIter = _ExportedChatInvitesIter;
exports._parseInviteHash = _parseInviteHash;
exports.checkChatInvite = checkChatInvite;
exports.deleteExportedChatInvite = deleteExportedChatInvite;
exports.deleteRevokedExportedChatInvites = deleteRevokedExportedChatInvites;
exports.editExportedChatInvite = editExportedChatInvite;
exports.exportChatInvite = exportChatInvite;
exports.getAdminsWithInvites = getAdminsWithInvites;
exports.getChatInviteImporters = getChatInviteImporters;
exports.getExportedChatInvite = getExportedChatInvite;
exports.getExportedChatInvites = getExportedChatInvites;
exports.hideAllChatJoinRequests = hideAllChatJoinRequests;
exports.hideChatJoinRequest = hideChatJoinRequest;
Object.defineProperty(exports, "inviteLinks_exports", {
	enumerable: true,
	get: function() {
		return inviteLinks_exports;
	}
});
exports.iterChatInviteImporters = iterChatInviteImporters;
exports.iterExportedChatInvites = iterExportedChatInvites;
