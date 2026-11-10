Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
require("../../tl/index.js");
const require_Utils = require("../../Utils.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_Helpers = require("../../Helpers.js");
const require_client_rpc_invoke = require("../rpc/invoke.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/client/methods/users.ts
var users_exports = /* @__PURE__ */ require_runtime.__exportAll({
	_getEntityFromString: () => _getEntityFromString,
	_getInputDialog: () => _getInputDialog,
	_getInputNotify: () => _getInputNotify,
	_getPeer: () => _getPeer,
	_selfId: () => _selfId,
	getCommonChats: () => getCommonChats,
	getEntity: () => getEntity,
	getInputEntity: () => getInputEntity,
	getMe: () => getMe,
	getPeerId: () => getPeerId,
	invoke: () => require_client_rpc_invoke.invoke,
	isBot: () => isBot,
	isUserAuthorized: () => isUserAuthorized
});
/**
* Returns the current user as an {@link Api.User}, or as an {@link Api.InputPeerUser}
* if `inputPeer` is `true` (useful when only the input peer is needed without a full API call).
*
* The result is cached after the first call.
* @hidden
*/
async function getMe(client, inputPeer) {
	if (inputPeer && client._selfInputPeer) return client._selfInputPeer;
	const me = (await client.api.users.getUsers({ id: [new require_tl_generated_api.Api.InputUserSelf()] }))[0];
	client._bot = me.bot;
	client._premium = !!me.premium;
	if (!client._selfInputPeer) client._selfInputPeer = require_Utils.getInputPeer(me, false);
	return inputPeer ? client._selfInputPeer : me;
}
/** @hidden */
async function isBot(client) {
	if (client._bot === void 0) {
		const me = await client.getMe();
		if (me) return !(me instanceof require_tl_generated_api.Api.InputPeerUser) ? me.bot : void 0;
	}
	return client._bot;
}
/** @hidden */
async function isUserAuthorized(client) {
	try {
		await client.api.updates.getState();
		return true;
	} catch (e) {
		return false;
	}
}
/**
* Resolves one or more entity-like values into their full {@link Entity} objects
* by calling the appropriate Telegram API methods (`users.GetUsers`, `messages.GetChats`,
* `channels.GetChannels`).
*
* @param client - The Telegram client instance.
* @param entity - A single entity or array of entities to resolve (usernames, IDs, peers, etc.).
* @returns A single entity if a single value was given, or an array of entities.
* @hidden
*/
async function getEntity(client, entity) {
	const single = !require_Helpers.isArrayLike(entity);
	let entityArray = [];
	if (require_Helpers.isArrayLike(entity)) entityArray = entity;
	else entityArray.push(entity);
	const inputs = [];
	for (const x of entityArray) if (typeof x === "string") {
		const valid = require_Utils.parseID(x);
		if (valid) inputs.push(await client.getInputEntity(valid));
		else inputs.push(x);
	} else inputs.push(await client.getInputEntity(x));
	const lists = /* @__PURE__ */ new Map([
		[require_Helpers._EntityType.USER, []],
		[require_Helpers._EntityType.CHAT, []],
		[require_Helpers._EntityType.CHANNEL, []]
	]);
	for (const x of inputs) try {
		lists.get(require_Helpers._entityType(x)).push(x);
	} catch (e) {}
	let users = lists.get(require_Helpers._EntityType.USER);
	let chats = lists.get(require_Helpers._EntityType.CHAT);
	let channels = lists.get(require_Helpers._EntityType.CHANNEL);
	if (users.length) users = await client.api.users.getUsers({ id: users });
	if (chats.length) {
		const chatIds = chats.map((x) => x.chatId);
		chats = (await client.api.messages.getChats({ id: chatIds })).chats;
	}
	if (channels.length) channels = await _getChannelsWithCommunityFallback(client, channels);
	const idEntity = /* @__PURE__ */ new Map();
	for (const user of users) idEntity.set(require_Utils.getPeerId(user), user);
	for (const channel of channels) idEntity.set(require_Utils.getPeerId(channel), channel);
	for (const chat of chats) idEntity.set(require_Utils.getPeerId(chat), chat);
	const result = [];
	for (const x of inputs) if (typeof x === "string") result.push(await _getEntityFromString(client, x));
	else if (!(x instanceof require_tl_generated_api.Api.InputPeerSelf)) result.push(idEntity.get(require_Utils.getPeerId(x)));
	else for (const [key, u] of idEntity.entries()) if (u instanceof require_tl_generated_api.Api.User && u.self) {
		result.push(u);
		break;
	}
	return single ? result[0] : result;
}
async function _getChannelsWithCommunityFallback(client, inputs) {
	try {
		return (await client.api.channels.getChannels({ id: inputs })).chats;
	} catch (e) {
		if (e?.errorMessage !== "COMMUNITY_ID_INVALID") throw e;
	}
	const joined = await client.api.communities.getJoinedCommunities();
	const byId = /* @__PURE__ */ new Map();
	for (const chat of joined.chats) byId.set(chat.id.toString(), chat);
	const resolved = [];
	const rest = [];
	for (const input of inputs) {
		const id = input.channelId;
		const hit = id && byId.get(id.toString());
		if (hit) resolved.push(hit);
		else rest.push(input);
	}
	if (rest.length) resolved.push(...(await client.api.channels.getChannels({ id: rest })).chats);
	return resolved;
}
/**
* Resolves an entity-like value into an {@link Api.TypeInputPeer}, using (in order):
* 1. Direct InputPeer conversion
* 2. In-memory entity cache
* 3. Known strings ("me", "this", "self")
* 4. Session (disk) cache
* 5. Network lookup (username resolution, `users.GetUsers`, `channels.GetChannels`)
*
* @param client - The Telegram client instance.
* @param peer - The entity to resolve (username, phone, ID, Peer object, etc.).
* @returns The corresponding InputPeer.
* @throws {Error} If the entity cannot be resolved by any means.
* @hidden
*/
async function getInputEntity(client, peer) {
	let channelResolutionFailed = false;
	let channelResolutionError;
	try {
		return require_Utils.getInputPeer(peer);
	} catch (e) {}
	try {
		if (typeof peer == "string") {
			if (require_Utils.parseID(peer)) {
				const res = client._entityCache.get(peer);
				if (res) return res;
			}
		}
		if (typeof peer === "number" || typeof peer === "bigint" || big_integer.default.isInstance(peer)) {
			const res = client._entityCache.get(peer.toString());
			if (res) return res;
		}
		if (typeof peer == "object" && !big_integer.default.isInstance(peer) && peer.SUBCLASS_OF_ID === require_Helpers.unionId("Peer")) {
			const res = client._entityCache.get(require_Utils.getPeerId(peer));
			if (res) return res;
		}
	} catch (e) {}
	if (typeof peer == "string") {
		if ([
			"me",
			"this",
			"self"
		].includes(peer)) return new require_tl_generated_api.Api.InputPeerSelf();
	}
	try {
		if (peer != void 0) return await client.session.getInputEntity(peer);
	} catch (e) {}
	if (typeof peer === "string") return require_Utils.getInputPeer(await _getEntityFromString(client, peer));
	if (typeof peer === "number") peer = require_Helpers.returnBigInt(peer);
	peer = require_Utils.getPeer(peer);
	if (peer instanceof require_tl_generated_api.Api.PeerUser) {
		const users = await client.api.users.getUsers({ id: [new require_tl_generated_api.Api.InputUser({
			userId: peer.userId,
			accessHash: big_integer.default.zero
		})] });
		if (users.length && !(users[0] instanceof require_tl_generated_api.Api.UserEmpty)) return require_Utils.getInputPeer(users[0]);
	} else if (peer instanceof require_tl_generated_api.Api.PeerChat) return new require_tl_generated_api.Api.InputPeerChat({ chatId: peer.chatId });
	else if (peer instanceof require_tl_generated_api.Api.PeerChannel) try {
		const channels = await _getChannelsWithCommunityFallback(client, [new require_tl_generated_api.Api.InputChannel({
			channelId: peer.channelId,
			accessHash: big_integer.default.zero
		})]);
		return require_Utils.getInputPeer(channels[0]);
	} catch (e) {
		channelResolutionFailed = true;
		channelResolutionError = e;
		const msg = e?.errorMessage;
		if (msg === "CHANNEL_INVALID" || msg === "CHANNEL_PRIVATE") client._log.debug(`Cannot resolve channel entity (${msg})`);
		else client._log.error("Error while resolving channel entity", e);
		if (client._errorHandler) await client._errorHandler(e);
	}
	const error = /* @__PURE__ */ new Error(`Could not find the input entity for ${JSON.stringify(peer)}.
         Please read https://docs.teleproto.dev/concepts/entities to find out more details.`);
	if (channelResolutionFailed) error.cause = channelResolutionError;
	throw error;
}
/** @hidden */
async function _getEntityFromString(client, string) {
	const phone = require_Utils.parsePhone(string);
	if (phone) try {
		const result = await client.api.contacts.getContacts({ hash: big_integer.default.zero });
		if (!(result instanceof require_tl_generated_api.Api.contacts.ContactsNotModified)) {
			for (const user of result.users) if (user instanceof require_tl_generated_api.Api.User && user.phone === phone) return user;
		}
	} catch (e) {
		if (e.errorMessage === "BOT_METHOD_INVALID") throw new Error("Cannot get entity by phone number as a bot (try using integer IDs, not strings)");
		throw e;
	}
	const id = require_Utils.parseID(string);
	if (id != void 0) return getInputEntity(client, id);
	else if (["me", "this"].includes(string.toLowerCase())) return client.getMe();
	else {
		const { username, isInvite } = require_Utils.parseUsername(string);
		if (isInvite) {
			const invite = await client.api.messages.checkChatInvite({ hash: username });
			if (invite instanceof require_tl_generated_api.Api.ChatInvite) throw new Error("Cannot get entity from a channel (or group) that you are not part of. Join the group and retry");
			else if (invite instanceof require_tl_generated_api.Api.ChatInviteAlready) return invite.chat;
		} else if (username) try {
			const result = await client.api.contacts.resolveUsername({ username });
			const pid = require_Utils.getPeerId(result.peer, false);
			if (result.peer instanceof require_tl_generated_api.Api.PeerUser) {
				for (const x of result.users) if (require_Helpers.returnBigInt(x.id).equals(require_Helpers.returnBigInt(pid))) return x;
			} else for (const x of result.chats) if (require_Helpers.returnBigInt(x.id).equals(require_Helpers.returnBigInt(pid))) return x;
		} catch (e) {
			if (e.errorMessage === "USERNAME_NOT_OCCUPIED") throw new Error(`No user has "${username}" as username`);
			throw e;
		}
	}
	throw new Error(`Cannot find any entity corresponding to "${string}"`);
}
/** @hidden */
async function getPeerId(client, peer, addMark = true) {
	if (typeof peer == "string") {
		if (require_Utils.parseID(peer)) return require_Utils.getPeerId(peer, addMark);
		else peer = await client.getInputEntity(peer);
	}
	if (typeof peer == "number" || typeof peer == "bigint" || big_integer.default.isInstance(peer)) return require_Utils.getPeerId(peer, addMark);
	if (peer.SUBCLASS_OF_ID == require_Helpers.unionId("Peer") || peer.SUBCLASS_OF_ID == require_Helpers.unionId("InputPeer")) peer = await client.getInputEntity(peer);
	if (peer instanceof require_tl_generated_api.Api.InputPeerSelf) peer = await client.getMe(true);
	return require_Utils.getPeerId(peer, addMark);
}
/** @hidden */
async function _getPeer(client, peer) {
	if (!peer) return;
	const [i, cls] = require_Utils.resolveId(require_Helpers.returnBigInt(await client.getPeerId(peer)));
	return new cls({
		userId: i,
		channelId: i,
		chatId: i
	});
}
/** @hidden */
async function _getInputDialog(client, dialog) {
	if (dialog?.inputDialog) return _getInputDialog(client, dialog.inputDialog);
	if (dialog instanceof require_tl_generated_api.Api.InputDialogPeerCommunity) {
		dialog.community = require_Utils.getInputChannel(await client.getInputEntity(dialog.community));
		return dialog;
	}
	if (dialog instanceof require_tl_generated_api.Api.InputDialogPeerFolder) return dialog;
	if (dialog instanceof require_tl_generated_api.Api.Community || dialog instanceof require_tl_generated_api.Api.CommunityForbidden) return require_Utils.getInputDialog(dialog);
	if (dialog instanceof require_tl_generated_api.Api.DialogCommunity || dialog instanceof require_tl_generated_api.Api.DialogPeerCommunity) return new require_tl_generated_api.Api.InputDialogPeerCommunity({ community: require_Utils.getInputChannel(await client.getInputEntity(new require_tl_generated_api.Api.PeerChannel({ channelId: dialog.communityId }))) });
	try {
		if (dialog.SUBCLASS_OF_ID == require_Helpers.unionId("InputDialogPeer")) {
			dialog.peer = await client.getInputEntity(dialog.peer);
			return dialog;
		} else if (dialog.SUBCLASS_OF_ID == require_Helpers.unionId("InputPeer")) return new require_tl_generated_api.Api.InputDialogPeer({ peer: dialog });
	} catch (e) {}
	return new require_tl_generated_api.Api.InputDialogPeer({ peer: await client.getInputEntity(dialog) });
}
/** @hidden */
async function _getInputNotify(client, notify) {
	if (notify instanceof require_tl_generated_api.Api.Community || notify instanceof require_tl_generated_api.Api.CommunityForbidden) return new require_tl_generated_api.Api.InputNotifyCommunity({ community: require_Utils.getInputChannel(await client.getInputEntity(notify)) });
	if (notify instanceof require_tl_generated_api.Api.InputNotifyCommunity) {
		notify.community = require_Utils.getInputChannel(await client.getInputEntity(notify.community));
		return notify;
	}
	if (notify instanceof require_tl_generated_api.Api.NotifyCommunity || notify instanceof require_tl_generated_api.Api.DialogCommunity) return new require_tl_generated_api.Api.InputNotifyCommunity({ community: require_Utils.getInputChannel(await client.getInputEntity(new require_tl_generated_api.Api.PeerChannel({ channelId: notify.communityId }))) });
	try {
		if (notify.SUBCLASS_OF_ID == require_Helpers.unionId("InputNotifyPeer")) {
			if (notify instanceof require_tl_generated_api.Api.InputNotifyPeer) notify.peer = await client.getInputEntity(notify.peer);
			return notify;
		}
	} catch (e) {}
	return new require_tl_generated_api.Api.InputNotifyPeer({ peer: await client.getInputEntity(notify) });
}
/** @hidden */
function _selfId(client) {
	return client._selfInputPeer ? client._selfInputPeer.userId : void 0;
}
/** @hidden */
async function getCommonChats(client, entity, params = {}) {
	const user = await client.getInputEntity(entity);
	const result = await client.invoke(new require_tl_generated_api.Api.messages.GetCommonChats({
		userId: user,
		maxId: params.maxId ?? big_integer.default.zero,
		limit: params.limit ?? 100
	}));
	const chats = new require_Helpers.TotalList();
	chats.push(...result.chats);
	chats.total = result instanceof require_tl_generated_api.Api.messages.ChatsSlice ? result.count : result.chats.length;
	return chats;
}
exports._getEntityFromString = _getEntityFromString;
exports._getInputDialog = _getInputDialog;
exports._getInputNotify = _getInputNotify;
exports._getPeer = _getPeer;
exports._selfId = _selfId;
exports.getCommonChats = getCommonChats;
exports.getEntity = getEntity;
exports.getInputEntity = getInputEntity;
exports.getMe = getMe;
exports.getPeerId = getPeerId;
exports.invoke = require_client_rpc_invoke.invoke;
exports.isBot = isBot;
exports.isUserAuthorized = isUserAuthorized;
Object.defineProperty(exports, "users_exports", {
	enumerable: true,
	get: function() {
		return users_exports;
	}
});
