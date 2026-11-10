Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
require("../../tl/index.js");
const require_Utils = require("../../Utils.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_requestIter = require("../../requestIter.js");
const require_Helpers = require("../../Helpers.js");
// teleproto/client/methods/communities.ts
var communities_exports = /* @__PURE__ */ require_runtime.__exportAll({
	CommunityPeerLinkRequestsIter: () => CommunityPeerLinkRequestsIter,
	createCommunity: () => createCommunity,
	getCommunity: () => getCommunity,
	getCommunityNotifySettings: () => getCommunityNotifySettings,
	getCommunityParticipantJoinedChats: () => getCommunityParticipantJoinedChats,
	getCommunityPeerLinkRequests: () => getCommunityPeerLinkRequests,
	getCommunityPeers: () => getCommunityPeers,
	getJoinedCommunities: () => getJoinedCommunities,
	iterCommunityPeerLinkRequests: () => iterCommunityPeerLinkRequests,
	pinCommunity: () => pinCommunity,
	setAllCommunityPeerLinkRequestsApproval: () => setAllCommunityPeerLinkRequestsApproval,
	setCommunityCollapsed: () => setCommunityCollapsed,
	setCommunityParticipantBanned: () => setCommunityParticipantBanned,
	setCommunityPeerLink: () => setCommunityPeerLink,
	setCommunityPeerLinkRequestApproval: () => setCommunityPeerLinkRequestApproval,
	updateCommunityNotifySettings: () => updateCommunityNotifySettings
});
/** Creates a community and returns its entity. */
async function createCommunity(client, params) {
	const result = await client.invoke(new require_tl_generated_api.Api.communities.Create({
		title: params.title,
		peer: await client.getInputEntity(params.peer),
		about: params.about,
		hidden: params.hidden
	}));
	if (result instanceof require_tl_generated_api.Api.Updates || result instanceof require_tl_generated_api.Api.UpdatesCombined) {
		const community = result.chats.find((chat) => chat instanceof require_tl_generated_api.Api.Community);
		if (community) return community;
	}
	throw new Error("Telegram did not return the created community");
}
/** Fetches full community details and linked peers. */
async function getCommunity(client, community) {
	const result = await client.invoke(new require_tl_generated_api.Api.channels.GetFullChannel({ channel: require_Utils.getInputChannel(await client.getInputEntity(community)) }));
	if (!(result.fullChat instanceof require_tl_generated_api.Api.CommunityFull)) throw new Error("The entity is not a community");
	return result;
}
/** Lists joined communities, retaining forbidden entries. */
async function getJoinedCommunities(client) {
	const result = await client.invoke(new require_tl_generated_api.Api.communities.GetJoinedCommunities());
	const communities = new require_Helpers.TotalList();
	for (const chat of result.chats) if (chat instanceof require_tl_generated_api.Api.Community || chat instanceof require_tl_generated_api.Api.CommunityForbidden) communities.push(chat);
	communities.total = result instanceof require_tl_generated_api.Api.messages.ChatsSlice ? result.count : communities.length;
	return communities;
}
/** Lists linked peers with visibility and history access metadata. */
async function getCommunityPeers(client, community) {
	const result = await getCommunity(client, community);
	const entities = new Map([...result.chats, ...result.users].map((entity) => [require_Utils.getPeerId(entity), entity]));
	return result.fullChat.linkedPeers.map((peer) => Object.assign(peer, { entity: entities.get(require_Utils.getPeerId(peer.peer)) }));
}
/** Adds, changes visibility of, or removes a peer link. */
async function setCommunityPeerLink(client, community, peer, action) {
	if (![
		"visible",
		"hidden",
		"deleted"
	].includes(action)) throw new Error("Community peer link action must be visible, hidden or deleted");
	return client.invoke(new require_tl_generated_api.Api.communities.TogglePeerLink({
		community: require_Utils.getInputChannel(await client.getInputEntity(community)),
		peer: await client.getInputEntity(peer),
		visible: action === "visible" || void 0,
		hidden: action === "hidden" || void 0,
		deleted: action === "deleted" || void 0
	}));
}
/** Groups or expands the community in the dialog list. */
async function setCommunityCollapsed(client, community, collapsed) {
	return client.invoke(new require_tl_generated_api.Api.communities.ToggleCommunityCollapsedInDialogs({
		community: require_Utils.getInputChannel(await client.getInputEntity(community)),
		collapsed: collapsed || void 0
	}));
}
/** Iterates pending peer links using Telegram’s opaque pagination cursor. */
var CommunityPeerLinkRequestsIter = class extends require_requestIter.RequestIter {
	constructor(..._args) {
		super(..._args);
		this.offsets = /* @__PURE__ */ new Set();
	}
	async _init({ community, offset }) {
		this.offsets.clear();
		this.request = new require_tl_generated_api.Api.communities.GetPeerLinkRequests({
			community: require_Utils.getInputChannel(await this.client.getInputEntity(community)),
			offset,
			limit: Math.min(this.left || 1, 100)
		});
		if (this.left === 0) {
			this.total = (await this.client.invoke(this.request)).totalCount;
			return true;
		}
	}
	async _loadNextChunk() {
		while (this.request) {
			const request = this.request;
			this.offsets.add(request.offset);
			request.limit = Math.min(this.left, 100);
			const result = await this.client.invoke(request);
			this.total = result.totalCount;
			const entities = new Map([...result.chats, ...result.users].map((entity) => [require_Utils.getPeerId(entity), entity]));
			const users = new Map(result.users.map((user) => [user.id.toString(), user]));
			for (const entry of result.requests) {
				const requestedBy = users.get(entry.requestedBy.toString());
				this.buffer.push(Object.assign(entry, {
					entity: entities.get(require_Utils.getPeerId(entry.peer)),
					requestedByUser: requestedBy instanceof require_tl_generated_api.Api.User ? requestedBy : void 0
				}));
			}
			if (!result.nextOffset || this.offsets.has(result.nextOffset)) {
				this.request = void 0;
				return true;
			}
			request.offset = result.nextOffset;
			if (this.buffer.length) return void 0;
		}
		return true;
	}
	[Symbol.asyncIterator]() {
		return super[Symbol.asyncIterator]();
	}
};
/** Iterates pending links with requester and peer metadata. */
function iterCommunityPeerLinkRequests(client, community, params = {}) {
	return new CommunityPeerLinkRequestsIter(client, params.limit, { waitTime: params.waitTime }, {
		community,
		offset: params.offset ?? ""
	});
}
/** Collects pending peer links and their total count. */
async function getCommunityPeerLinkRequests(client, community, params = {}) {
	return await iterCommunityPeerLinkRequests(client, community, params).collect();
}
/** Approves a peer link request, or rejects it when approved is false. */
async function setCommunityPeerLinkRequestApproval(client, community, peer, approved) {
	return client.invoke(new require_tl_generated_api.Api.communities.TogglePeerLinkRequestApproval({
		community: require_Utils.getInputChannel(await client.getInputEntity(community)),
		peer: await client.getInputEntity(peer),
		reject: !approved || void 0
	}));
}
/** Approves or rejects all pending peer link requests. */
async function setAllCommunityPeerLinkRequestsApproval(client, community, approved) {
	return client.invoke(new require_tl_generated_api.Api.communities.ToggleAllPeerLinkRequestApproval({
		community: require_Utils.getInputChannel(await client.getInputEntity(community)),
		reject: !approved || void 0
	}));
}
/** Bans a participant across the community, or unbans when banned is false. */
async function setCommunityParticipantBanned(client, community, participant, banned) {
	return client.invoke(new require_tl_generated_api.Api.communities.ToggleParticipantBanned({
		community: require_Utils.getInputChannel(await client.getInputEntity(community)),
		participant: await client.getInputEntity(participant),
		unban: !banned || void 0
	}));
}
/** Returns the community chats a participant owns or has joined. */
async function getCommunityParticipantJoinedChats(client, community, participant) {
	return client.invoke(new require_tl_generated_api.Api.communities.GetParticipantJoinedChats({
		community: require_Utils.getInputChannel(await client.getInputEntity(community)),
		participant: await client.getInputEntity(participant)
	}));
}
/** Pins or unpins the community's grouped dialog. */
async function pinCommunity(client, community, pinned = true) {
	return client.invoke(new require_tl_generated_api.Api.messages.ToggleDialogPin({
		peer: new require_tl_generated_api.Api.InputDialogPeerCommunity({ community: require_Utils.getInputChannel(await client.getInputEntity(community)) }),
		pinned: pinned || void 0
	}));
}
/** Fetches notification settings using the community notification scope. */
async function getCommunityNotifySettings(client, community) {
	return client.getNotifySettings(new require_tl_generated_api.Api.InputNotifyCommunity({ community: require_Utils.getInputChannel(await client.getInputEntity(community)) }));
}
/** Updates notification settings for the community notification scope. */
async function updateCommunityNotifySettings(client, community, params) {
	return client.updateNotifySettings(new require_tl_generated_api.Api.InputNotifyCommunity({ community: require_Utils.getInputChannel(await client.getInputEntity(community)) }), params);
}
exports.CommunityPeerLinkRequestsIter = CommunityPeerLinkRequestsIter;
Object.defineProperty(exports, "communities_exports", {
	enumerable: true,
	get: function() {
		return communities_exports;
	}
});
exports.createCommunity = createCommunity;
exports.getCommunity = getCommunity;
exports.getCommunityNotifySettings = getCommunityNotifySettings;
exports.getCommunityParticipantJoinedChats = getCommunityParticipantJoinedChats;
exports.getCommunityPeerLinkRequests = getCommunityPeerLinkRequests;
exports.getCommunityPeers = getCommunityPeers;
exports.getJoinedCommunities = getJoinedCommunities;
exports.iterCommunityPeerLinkRequests = iterCommunityPeerLinkRequests;
exports.pinCommunity = pinCommunity;
exports.setAllCommunityPeerLinkRequestsApproval = setAllCommunityPeerLinkRequestsApproval;
exports.setCommunityCollapsed = setCommunityCollapsed;
exports.setCommunityParticipantBanned = setCommunityParticipantBanned;
exports.setCommunityPeerLink = setCommunityPeerLink;
exports.setCommunityPeerLinkRequestApproval = setCommunityPeerLinkRequestApproval;
exports.updateCommunityNotifySettings = updateCommunityNotifySettings;
