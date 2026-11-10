Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_client_methods_uploads = require("./uploads.js");
const require_client_methods_inviteLinks = require("./inviteLinks.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_Helpers = require("../../Helpers.js");
const require_requestIter = require("../../requestIter.js");
const require_Utils = require("../../Utils.js");
require("../../tl/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/client/methods/chats.ts
var chats_exports = /* @__PURE__ */ require_runtime.__exportAll({
	_AdminLogIter: () => _AdminLogIter,
	_ParticipantsIter: () => _ParticipantsIter,
	createChannel: () => createChannel,
	createChat: () => createChat,
	deleteHistory: () => deleteHistory,
	editAdmin: () => editAdmin,
	editBanned: () => editBanned,
	editChatAbout: () => editChatAbout,
	editChatDefaultBannedRights: () => editChatDefaultBannedRights,
	editPeerFolders: () => editPeerFolders,
	editPhoto: () => editPhoto,
	editTitle: () => editTitle,
	getAdminLog: () => getAdminLog,
	getParticipant: () => getParticipant,
	getParticipants: () => getParticipants,
	importChatInvite: () => importChatInvite,
	iterAdminLog: () => iterAdminLog,
	iterParticipants: () => iterParticipants,
	joinChannel: () => joinChannel,
	kickParticipant: () => kickParticipant,
	leaveChannel: () => leaveChannel,
	setTyping: () => setTyping,
	toggleSlowMode: () => toggleSlowMode
});
const _MAX_PARTICIPANTS_CHUNK_SIZE = 200;
const _MAX_ADMIN_LOG_CHUNK_SIZE = 100;
/**
* Sends a chat action (e.g. "typing…") that repeats at a fixed interval until stopped.
*
* Supported action strings: `"typing"`, `"contact"`, `"game"`, `"location"`,
* `"record-audio"` / `"record-voice"`, `"record-round"`, `"record-video"`,
* `"audio"` / `"voice"` / `"song"`, `"round"`, `"video"`, `"photo"`,
* `"document"` / `"file"`, `"cancel"`.
* @internal
*/
var _ChatAction = class {
	static {
		this._str_mapping = {
			typing: new require_tl_generated_api.Api.SendMessageTypingAction(),
			contact: new require_tl_generated_api.Api.SendMessageChooseContactAction(),
			game: new require_tl_generated_api.Api.SendMessageGamePlayAction(),
			location: new require_tl_generated_api.Api.SendMessageGeoLocationAction(),
			"record-audio": new require_tl_generated_api.Api.SendMessageRecordAudioAction(),
			"record-voice": new require_tl_generated_api.Api.SendMessageRecordAudioAction(),
			"record-round": new require_tl_generated_api.Api.SendMessageRecordRoundAction(),
			"record-video": new require_tl_generated_api.Api.SendMessageRecordVideoAction(),
			audio: new require_tl_generated_api.Api.SendMessageUploadAudioAction({ progress: 1 }),
			voice: new require_tl_generated_api.Api.SendMessageUploadAudioAction({ progress: 1 }),
			song: new require_tl_generated_api.Api.SendMessageUploadAudioAction({ progress: 1 }),
			round: new require_tl_generated_api.Api.SendMessageUploadRoundAction({ progress: 1 }),
			video: new require_tl_generated_api.Api.SendMessageUploadVideoAction({ progress: 1 }),
			photo: new require_tl_generated_api.Api.SendMessageUploadPhotoAction({ progress: 1 }),
			document: new require_tl_generated_api.Api.SendMessageUploadDocumentAction({ progress: 1 }),
			file: new require_tl_generated_api.Api.SendMessageUploadDocumentAction({ progress: 1 }),
			cancel: new require_tl_generated_api.Api.SendMessageCancelAction()
		};
	}
	constructor(client, chat, action, params = {
		delay: 4,
		autoCancel: true
	}) {
		this._client = client;
		this._chat = chat;
		this._action = action;
		this._delay = params.delay;
		this.autoCancel = params.autoCancel;
		this._request = void 0;
		this._task = null;
		this._running = false;
	}
	async start() {
		this._request = new require_tl_generated_api.Api.messages.SetTyping({
			peer: this._chat,
			action: this._action
		});
		this._running = true;
		this._update();
	}
	async stop() {
		this._running = false;
		if (this.autoCancel) await this._client.invoke(new require_tl_generated_api.Api.messages.SetTyping({
			peer: this._chat,
			action: new require_tl_generated_api.Api.SendMessageCancelAction()
		}));
	}
	async _update() {
		while (this._running) {
			if (this._request != void 0) await this._client.invoke(this._request);
			await require_Helpers.sleep(this._delay * 1e3);
		}
	}
	progress(current, total) {
		if ("progress" in this._action) this._action.progress = 100 * Math.round(current / total);
	}
};
var _ParticipantsIter = class extends require_requestIter.RequestIter {
	async _init({ entity, filter, offset, search, showTotal }) {
		if (!offset) offset = 0;
		if (filter && filter.constructor === Function) {
			if ([
				require_tl_generated_api.Api.ChannelParticipantsBanned,
				require_tl_generated_api.Api.ChannelParticipantsKicked,
				require_tl_generated_api.Api.ChannelParticipantsSearch,
				require_tl_generated_api.Api.ChannelParticipantsContacts
			].includes(filter)) filter = new filter({ q: "" });
			else filter = new filter();
		}
		entity = await this.client.getInputEntity(entity);
		const ty = require_Helpers._entityType(entity);
		if (search && (filter || ty != require_Helpers._EntityType.CHANNEL)) {
			search = search.toLowerCase();
			this.filterEntity = (entity) => {
				return require_Utils.getDisplayName(entity).toLowerCase().includes(search) || ("username" in entity ? entity.username || "" : "").toLowerCase().includes(search);
			};
		} else this.filterEntity = (entity) => true;
		this.request = void 0;
		if (ty == require_Helpers._EntityType.CHANNEL) {
			if (showTotal) {
				const channel = await this.client.api.channels.getFullChannel({ channel: require_Utils.getInputChannel(entity) });
				if (channel.fullChat instanceof require_tl_generated_api.Api.ChannelFull) this.total = channel.fullChat.participantsCount;
			}
			if (this.total && this.total <= 0) return false;
			this.request = new require_tl_generated_api.Api.channels.GetParticipants({
				channel: entity,
				filter: filter || new require_tl_generated_api.Api.ChannelParticipantsSearch({ q: search || "" }),
				offset,
				limit: _MAX_PARTICIPANTS_CHUNK_SIZE,
				hash: big_integer.default.zero
			});
		} else if (ty == require_Helpers._EntityType.CHAT) {
			if (!("chatId" in entity)) throw new Error("Found chat without id " + JSON.stringify(entity));
			const full = await this.client.api.messages.getFullChat({ chatId: entity.chatId });
			if (full.fullChat instanceof require_tl_generated_api.Api.ChatFull) {
				if (!(full.fullChat.participants instanceof require_tl_generated_api.Api.ChatParticipantsForbidden)) this.total = full.fullChat.participants.participants.length;
				else {
					this.total = 0;
					return false;
				}
				const users = /* @__PURE__ */ new Map();
				for (const user of full.users) users.set(user.id.toString(), user);
				for (const participant of full.fullChat.participants.participants) {
					const user = users.get(participant.userId.toString());
					if (!user || !this.filterEntity(user)) continue;
					user.participant = participant;
					this.buffer?.push(user);
				}
				return true;
			}
		} else {
			this.total = 1;
			if (this.limit != 0) {
				const user = await this.client.getEntity(entity);
				if (this.filterEntity(user)) {
					user.participant = void 0;
					this.buffer?.push(user);
				}
			}
			return true;
		}
	}
	async _loadNextChunk() {
		while (this.request) {
			const request = this.request;
			request.limit = Math.min(this.left, _MAX_PARTICIPANTS_CHUNK_SIZE);
			const participants = await this.client.invoke(request);
			if (participants instanceof require_tl_generated_api.Api.channels.ChannelParticipantsNotModified || !participants.participants.length) {
				this.request = void 0;
				return true;
			}
			request.offset += participants.participants.length;
			const users = /* @__PURE__ */ new Map();
			for (const user of participants.users) users.set(user.id.toString(), user);
			for (const participant of participants.participants) {
				const userId = "userId" in participant ? participant.userId : "peer" in participant && participant.peer instanceof require_tl_generated_api.Api.PeerUser ? participant.peer.userId : void 0;
				const user = userId && users.get(userId.toString());
				if (!user || this.filterEntity && !this.filterEntity(user)) continue;
				user.participant = participant;
				this.buffer?.push(user);
			}
			if (this.buffer?.length) return void 0;
		}
		return true;
	}
	[Symbol.asyncIterator]() {
		return super[Symbol.asyncIterator]();
	}
};
var _AdminLogIter = class extends require_requestIter.RequestIter {
	async _init(params) {
		const { entity, search, admins, minId, maxId, limit, ...filterArgs } = params;
		let eventsFilter = void 0;
		if (Object.values(filterArgs).find((element) => element === true)) eventsFilter = new require_tl_generated_api.Api.ChannelAdminLogEventsFilter({ ...filterArgs });
		this.entity = await this.client.getInputEntity(entity);
		let adminList = void 0;
		if (admins) {
			adminList = [];
			for (const admin of admins) adminList.push(await this.client.getInputEntity(admin));
		}
		this.request = new require_tl_generated_api.Api.channels.GetAdminLog({
			channel: this.entity,
			q: search || "",
			minId: minId ?? big_integer.default.zero,
			maxId: maxId ?? big_integer.default.zero,
			limit: 0,
			eventsFilter,
			admins: adminList
		});
	}
	async _loadNextChunk() {
		if (!this.request) return true;
		this.request.limit = Math.min(this.left, _MAX_ADMIN_LOG_CHUNK_SIZE);
		const r = await this.client.invoke(this.request);
		if (!r.events.length) return true;
		const entities = /* @__PURE__ */ new Map();
		for (const entity of [...r.users, ...r.chats]) entities.set(require_Utils.getPeerId(entity), entity);
		const eventIds = [];
		for (const e of r.events) eventIds.push(e.id);
		this.request.maxId = require_Helpers.getMinBigInt(eventIds);
		for (const ev of r.events) {
			if (ev.action instanceof require_tl_generated_api.Api.ChannelAdminLogEventActionEditMessage) try {
				ev.action.prevMessage._finishInit?.(this.client, entities, this.entity);
				ev.action.newMessage._finishInit?.(this.client, entities, this.entity);
			} catch (e) {}
			this.buffer?.push(ev);
		}
		if (r.events.length < this.request.limit) return true;
	}
	[Symbol.asyncIterator]() {
		return super[Symbol.asyncIterator]();
	}
};
/** @hidden */
function iterParticipants(client, entity, { limit, offset, search, filter, showTotal = true }) {
	return new _ParticipantsIter(client, limit ?? Number.MAX_SAFE_INTEGER, {}, {
		entity,
		filter,
		offset: offset ?? 0,
		search,
		showTotal
	});
}
/** @hidden */
async function getParticipants(client, entity, params) {
	return await client.iterParticipants(entity, params).collect();
}
/** @hidden */
async function kickParticipant(client, entity, participant) {
	const peer = await client.getInputEntity(entity);
	const user = await client.getInputEntity(participant);
	let resp;
	let request;
	const type = require_Helpers._entityType(peer);
	if (type === require_Helpers._EntityType.CHAT) {
		request = new require_tl_generated_api.Api.messages.DeleteChatUser({
			chatId: require_Helpers.returnBigInt(require_Utils.getPeerId(entity)),
			userId: require_Helpers.returnBigInt(require_Utils.getPeerId(participant))
		});
		resp = await client.invoke(request);
	} else if (type === require_Helpers._EntityType.CHANNEL) {
		if (user instanceof require_tl_generated_api.Api.InputPeerSelf) {
			request = new require_tl_generated_api.Api.channels.LeaveChannel({ channel: peer });
			resp = await client.invoke(request);
		} else {
			request = new require_tl_generated_api.Api.channels.EditBanned({
				channel: peer,
				participant: user,
				bannedRights: new require_tl_generated_api.Api.ChatBannedRights({
					untilDate: 0,
					viewMessages: true
				})
			});
			resp = await client.invoke(request);
			await require_Helpers.sleep(500);
			await client.invoke(new require_tl_generated_api.Api.channels.EditBanned({
				channel: peer,
				participant: user,
				bannedRights: new require_tl_generated_api.Api.ChatBannedRights({ untilDate: 0 })
			}));
		}
	} else throw new Error("You must pass either a channel or a chat");
	return client._getResponseMessage(request, resp, entity);
}
function _toBannedRights(params) {
	if (params instanceof require_tl_generated_api.Api.ChatBannedRights) return params;
	const { untilDate, ...rights } = params;
	return new require_tl_generated_api.Api.ChatBannedRights({
		...rights,
		untilDate: untilDate instanceof Date ? Math.floor(untilDate.getTime() / 1e3) : untilDate || 0
	});
}
/** @hidden */
async function editBanned(client, entity, participant, params = { viewMessages: true }) {
	const channel = await client.getInputEntity(entity);
	const peer = await client.getInputEntity(participant);
	return client.invoke(new require_tl_generated_api.Api.channels.EditBanned({
		channel,
		participant: peer,
		bannedRights: _toBannedRights(params)
	}));
}
/** @hidden */
async function editAdmin(client, entity, participant, params) {
	const peer = await client.getInputEntity(entity);
	const user = await client.getInputEntity(participant);
	if (require_Helpers._entityType(peer) === require_Helpers._EntityType.CHAT) {
		const isAdmin = params instanceof require_tl_generated_api.Api.ChatAdminRights || Object.entries(params).some(([key, value]) => key !== "rank" && value === true);
		return client.invoke(new require_tl_generated_api.Api.messages.EditChatAdmin({
			chatId: require_Helpers.returnBigInt(require_Utils.getPeerId(peer, false)),
			userId: user,
			isAdmin
		}));
	}
	let rights;
	let rank;
	if (params instanceof require_tl_generated_api.Api.ChatAdminRights) rights = params;
	else {
		const { rank: paramsRank, ...flags } = params;
		rank = paramsRank;
		rights = new require_tl_generated_api.Api.ChatAdminRights({ ...flags });
	}
	return client.invoke(new require_tl_generated_api.Api.channels.EditAdmin({
		channel: peer,
		userId: user,
		adminRights: rights,
		rank
	}));
}
/** @hidden */
async function editChatDefaultBannedRights(client, entity, params) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.messages.EditChatDefaultBannedRights({
		peer,
		bannedRights: _toBannedRights(params)
	}));
}
/** @hidden */
async function getParticipant(client, entity, participant) {
	const channel = await client.getInputEntity(entity);
	if (require_Helpers._entityType(channel) !== require_Helpers._EntityType.CHANNEL) throw new Error("getParticipant is only available for channels and supergroups; use getParticipants for small group chats");
	const peer = await client.getInputEntity(participant);
	return client.api.channels.getParticipant({
		channel: require_Utils.getInputChannel(channel),
		participant: peer
	});
}
/** @hidden */
async function editTitle(client, entity, title) {
	const peer = await client.getInputEntity(entity);
	if (require_Helpers._entityType(peer) === require_Helpers._EntityType.CHAT) return client.invoke(new require_tl_generated_api.Api.messages.EditChatTitle({
		chatId: require_Helpers.returnBigInt(require_Utils.getPeerId(peer, false)),
		title
	}));
	return client.api.channels.editTitle({
		channel: require_Utils.getInputChannel(peer),
		title
	});
}
/** @hidden */
async function editPhoto(client, entity, photo) {
	const peer = await client.getInputEntity(entity);
	let chatPhoto;
	if (photo == void 0) chatPhoto = new require_tl_generated_api.Api.InputChatPhotoEmpty();
	else if (photo instanceof require_tl_generated_api.Api.InputChatPhotoEmpty || photo instanceof require_tl_generated_api.Api.InputChatUploadedPhoto || photo instanceof require_tl_generated_api.Api.InputChatPhoto) chatPhoto = photo;
	else {
		const { fileHandle } = await require_client_methods_uploads._fileToMedia(client, {
			file: photo,
			asImage: true
		});
		if (!fileHandle) throw new Error(`Cannot use ${photo} as a chat photo`);
		chatPhoto = new require_tl_generated_api.Api.InputChatUploadedPhoto({ file: fileHandle });
	}
	if (require_Helpers._entityType(peer) === require_Helpers._EntityType.CHAT) return client.invoke(new require_tl_generated_api.Api.messages.EditChatPhoto({
		chatId: require_Helpers.returnBigInt(require_Utils.getPeerId(peer, false)),
		photo: chatPhoto
	}));
	return client.invoke(new require_tl_generated_api.Api.channels.EditPhoto({
		channel: peer,
		photo: chatPhoto
	}));
}
/** @hidden */
async function editChatAbout(client, entity, about) {
	const peer = await client.getInputEntity(entity);
	return client.api.messages.editChatAbout({
		peer,
		about
	});
}
/** @hidden */
async function toggleSlowMode(client, entity, seconds = 0) {
	const channel = await client.getInputEntity(entity);
	return client.api.channels.toggleSlowMode({
		channel: require_Utils.getInputChannel(channel),
		seconds
	});
}
/** @hidden */
async function createChannel(client, params) {
	const result = await client.invoke(new require_tl_generated_api.Api.channels.CreateChannel({
		title: params.title,
		about: params.about || "",
		broadcast: !params.megagroup,
		megagroup: params.megagroup,
		forum: params.forum,
		forImport: params.forImport,
		geoPoint: params.geoPoint,
		address: params.address,
		ttlPeriod: params.ttlPeriod
	}));
	if ("chats" in result) {
		for (const chat of result.chats) if (chat instanceof require_tl_generated_api.Api.Channel) return chat;
	}
	throw new Error("Could not find the created channel in the response");
}
/** @hidden */
async function createChat(client, params) {
	const users = [];
	for (const user of params.users) users.push(await client.getInputEntity(user));
	const result = await client.invoke(new require_tl_generated_api.Api.messages.CreateChat({
		title: params.title,
		users,
		ttlPeriod: params.ttlPeriod
	}));
	if ("chats" in result.updates) {
		for (const chat of result.updates.chats) if (chat instanceof require_tl_generated_api.Api.Chat) return {
			chat,
			missingInvitees: result.missingInvitees
		};
	}
	throw new Error("Could not find the created chat in the response");
}
/** @hidden */
async function joinChannel(client, entity) {
	const channel = await client.getInputEntity(entity);
	return client.api.channels.joinChannel({ channel: require_Utils.getInputChannel(channel) });
}
/** @hidden */
async function importChatInvite(client, link) {
	return client.api.messages.importChatInvite({ hash: require_client_methods_inviteLinks._parseInviteHash(link) });
}
/** @hidden */
async function leaveChannel(client, entity) {
	const channel = await client.getInputEntity(entity);
	return client.api.channels.leaveChannel({ channel: require_Utils.getInputChannel(channel) });
}
/** @hidden */
async function deleteHistory(client, entity, params = {}) {
	const peer = await client.getInputEntity(entity);
	if (require_Helpers._entityType(peer) === require_Helpers._EntityType.CHANNEL) return client.api.channels.deleteHistory({
		channel: require_Utils.getInputChannel(peer),
		maxId: params.maxId ?? 0,
		forEveryone: params.revoke
	});
	return client.api.messages.deleteHistory({
		peer,
		maxId: params.maxId ?? 0,
		revoke: params.revoke,
		justClear: params.justClear,
		minDate: params.minDate,
		maxDate: params.maxDate
	});
}
/** @hidden */
async function editPeerFolders(client, entity, folderId) {
	const entities = Array.isArray(entity) ? entity : [entity];
	const folderPeers = [];
	for (const e of entities) folderPeers.push(new require_tl_generated_api.Api.InputFolderPeer({
		peer: await client.getInputEntity(e),
		folderId
	}));
	return client.invoke(new require_tl_generated_api.Api.folders.EditPeerFolders({ folderPeers }));
}
/** @hidden */
async function setTyping(client, entity, action = "typing", params = {}) {
	const peer = await client.getInputEntity(entity);
	let resolved;
	if (typeof action === "string") {
		resolved = _ChatAction._str_mapping[action];
		if (!resolved) throw new Error(`Unknown chat action: ${action}`);
	} else resolved = action;
	return client.invoke(new require_tl_generated_api.Api.messages.SetTyping({
		peer,
		action: resolved,
		topMsgId: params.topMsgId
	}));
}
/** @hidden */
function iterAdminLog(client, entity, params = {}) {
	return new _AdminLogIter(client, params.limit ?? Number.MAX_SAFE_INTEGER, {}, {
		entity,
		...params
	});
}
/** @hidden */
async function getAdminLog(client, entity, params = {}) {
	return await iterAdminLog(client, entity, params).collect();
}
exports._AdminLogIter = _AdminLogIter;
exports._ParticipantsIter = _ParticipantsIter;
Object.defineProperty(exports, "chats_exports", {
	enumerable: true,
	get: function() {
		return chats_exports;
	}
});
exports.createChannel = createChannel;
exports.createChat = createChat;
exports.deleteHistory = deleteHistory;
exports.editAdmin = editAdmin;
exports.editBanned = editBanned;
exports.editChatAbout = editChatAbout;
exports.editChatDefaultBannedRights = editChatDefaultBannedRights;
exports.editPeerFolders = editPeerFolders;
exports.editPhoto = editPhoto;
exports.editTitle = editTitle;
exports.getAdminLog = getAdminLog;
exports.getParticipant = getParticipant;
exports.getParticipants = getParticipants;
exports.importChatInvite = importChatInvite;
exports.iterAdminLog = iterAdminLog;
exports.iterParticipants = iterParticipants;
exports.joinChannel = joinChannel;
exports.kickParticipant = kickParticipant;
exports.leaveChannel = leaveChannel;
exports.setTyping = setTyping;
exports.toggleSlowMode = toggleSlowMode;
