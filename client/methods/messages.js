Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
require("../../tl/index.js");
const require_requestIter = require("../../requestIter.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_Helpers = require("../../Helpers.js");
const require_Utils = require("../../Utils.js");
const require_client_methods_messageParse = require("./messageParse.js");
const require_client_methods_users = require("./users.js");
const require_client_methods_uploads = require("./uploads.js");
const require_tl_custom_RichContent = require("../../tl/custom/RichContent.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/client/methods/messages.ts
var messages_exports = /* @__PURE__ */ require_runtime.__exportAll({
	_IDsIter: () => _IDsIter,
	_MessagesIter: () => _MessagesIter,
	_parseMessageLink: () => _parseMessageLink,
	_pin: () => _pin,
	clearAllDrafts: () => clearAllDrafts,
	clearDraft: () => clearDraft,
	closePoll: () => closePoll,
	copyMessages: () => copyMessages,
	deleteMessages: () => deleteMessages,
	deleteScheduledMessages: () => deleteScheduledMessages,
	editMessage: () => editMessage,
	forwardMessages: () => forwardMessages,
	getCommentData: () => getCommentData,
	getDiscussionMessage: () => getDiscussionMessage,
	getMessageByLink: () => getMessageByLink,
	getMessageReadParticipants: () => getMessageReadParticipants,
	getMessages: () => getMessages,
	getMessagesViews: () => getMessagesViews,
	getOutboxReadDate: () => getOutboxReadDate,
	getReactionUsers: () => getReactionUsers,
	getRichMessage: () => getRichMessage,
	getScheduledMessages: () => getScheduledMessages,
	iterMessages: () => iterMessages,
	markAsRead: () => markAsRead,
	pinMessage: () => pinMessage,
	saveDraft: () => saveDraft,
	sendMessage: () => sendMessage,
	sendPoll: () => sendPoll,
	sendReaction: () => sendReaction,
	sendScheduledMessages: () => sendScheduledMessages,
	translateText: () => translateText,
	unpinMessage: () => unpinMessage,
	vote: () => vote
});
const _MAX_CHUNK_SIZE = 100;
/**
* Async iterator over messages in a chat.
*
* Fetches messages in chunks from the Telegram API, supporting forward/reverse
* iteration, date offsets, sender filtering, text search, and reply threading.
* Used internally by `iterMessages` / `getMessages`.
* @internal
*/
var _MessagesIter = class extends require_requestIter.RequestIter {
	async _init({ entity, offsetId, minId, maxId, fromUser, offsetDate, addOffset, filter, search, replyTo, topMsgId, savedPeerId, community }) {
		if (entity) this.entity = await this.client.getInputEntity(entity);
		else {
			this.entity = void 0;
			if (this.reverse) throw new Error("Cannot reverse global search");
		}
		if (this.reverse) {
			offsetId = Math.max(offsetId, minId);
			if (offsetId && maxId) {
				if (maxId - offsetId <= 1) return true;
			}
			if (!maxId) maxId = Number.MAX_SAFE_INTEGER;
		} else {
			offsetId = Math.max(offsetId, maxId);
			if (offsetId && minId) {
				if (offsetId - minId <= 1) return true;
			}
		}
		if (this.reverse) {
			if (offsetId) offsetId += 1;
			else if (!offsetDate) offsetId = 1;
		}
		if (fromUser) fromUser = await this.client.getInputEntity(fromUser);
		if (!this.entity && fromUser) this.entity = new require_tl_generated_api.Api.InputPeerEmpty();
		if (!filter) filter = new require_tl_generated_api.Api.InputMessagesFilterEmpty();
		if (!this.entity) this.request = new require_tl_generated_api.Api.messages.SearchGlobal({
			community: community === void 0 ? void 0 : require_Utils.getInputChannel(await this.client.getInputEntity(community)),
			q: search || "",
			filter,
			minDate: 0,
			maxDate: offsetDate ?? 0,
			offsetRate: 0,
			offsetPeer: new require_tl_generated_api.Api.InputPeerEmpty(),
			offsetId,
			limit: 1
		});
		else if (replyTo !== void 0) this.request = new require_tl_generated_api.Api.messages.GetReplies({
			peer: this.entity,
			msgId: replyTo,
			offsetId,
			offsetDate: offsetDate ?? 0,
			addOffset,
			limit: 0,
			maxId: 0,
			minId: 0,
			hash: big_integer.default.zero
		});
		else if (search !== void 0 || !(filter instanceof require_tl_generated_api.Api.InputMessagesFilterEmpty) || fromUser !== void 0 || topMsgId !== void 0 || savedPeerId !== void 0) {
			this.request = new require_tl_generated_api.Api.messages.Search({
				peer: this.entity,
				q: search || "",
				filter: typeof filter === "function" ? new filter() : filter,
				minDate: 0,
				maxDate: offsetDate ?? 0,
				offsetId,
				addOffset,
				limit: 0,
				maxId: 0,
				minId: 0,
				hash: require_Helpers.generateRandomBigInt(),
				fromId: fromUser,
				topMsgId,
				savedPeerId: savedPeerId ? await this.client.getInputEntity(savedPeerId) : void 0
			});
			if (!(filter instanceof require_tl_generated_api.Api.InputMessagesFilterEmpty) && offsetDate && !search && !offsetId) for await (const m of this.client.iterMessages(this.entity, {
				limit: 1,
				offsetDate
			})) this.request.offsetId = m.id + 1;
		} else this.request = new require_tl_generated_api.Api.messages.GetHistory({
			peer: this.entity,
			limit: 1,
			offsetDate: offsetDate ?? 0,
			offsetId,
			minId: 0,
			maxId: 0,
			addOffset,
			hash: big_integer.default.zero
		});
		if (this.limit <= 0) {
			const result = await this.client.invoke(this.request);
			if (result instanceof require_tl_generated_api.Api.messages.MessagesNotModified) this.total = result.count;
			else if ("count" in result) this.total = result.count;
			else this.total = result.messages.length;
			return false;
		}
		if (!this.waitTime) this.waitTime = this.limit > 3e3 ? 1 : 0;
		if (this.reverse && !(this.request instanceof require_tl_generated_api.Api.messages.SearchGlobal)) this.request.addOffset -= _MAX_CHUNK_SIZE;
		this.addOffset = addOffset;
		this.maxId = maxId;
		this.minId = minId;
		this.lastId = this.reverse ? 0 : Number.MAX_SAFE_INTEGER;
	}
	async _loadNextChunk() {
		if (!this.request) throw new Error("Request not set yet");
		this.request.limit = Math.min(this.left, _MAX_CHUNK_SIZE);
		if (this.reverse && this.request.limit != _MAX_CHUNK_SIZE) {
			if (!(this.request instanceof require_tl_generated_api.Api.messages.SearchGlobal)) this.request.addOffset = this.addOffset - this.request.limit;
		}
		const r = await this.client.invoke(this.request);
		if (r instanceof require_tl_generated_api.Api.messages.MessagesNotModified) return true;
		if ("count" in r) this.total = r.count;
		else this.total = r.messages.length;
		const entities = /* @__PURE__ */ new Map();
		for (const x of [...r.users, ...r.chats]) entities.set(require_Utils.getPeerId(x), x);
		const messages = this.reverse ? r.messages.reverse() : r.messages;
		for (const message of messages) {
			if (!this._messageInRange(message)) return true;
			this.lastId = message.id;
			try {
				message._finishInit(this.client, entities, this.entity);
			} catch (e) {}
			message._entities = entities;
			this.buffer?.push(message);
		}
		if (r.messages.length < this.request.limit) return true;
		if (this.buffer) this._updateOffset(this.buffer[this.buffer.length - 1], r);
		else return true;
	}
	_messageInRange(message) {
		if (this.entity) {
			if (this.reverse) {
				if (message.id <= this.lastId || message.id >= this.maxId) return false;
			} else if (message.id >= this.lastId || message.id <= this.minId) return false;
		}
		return true;
	}
	[Symbol.asyncIterator]() {
		return super[Symbol.asyncIterator]();
	}
	_updateOffset(lastMessage, response) {
		if (!this.request) throw new Error("Request not set yet");
		this.request.offsetId = Number(lastMessage.id);
		if (this.reverse) this.request.offsetId += 1;
		if (this.request instanceof require_tl_generated_api.Api.messages.Search) this.request.maxDate = -1;
		else if (!(this.request instanceof require_tl_generated_api.Api.messages.SearchGlobal)) this.request.offsetDate = lastMessage.date;
		if (this.request instanceof require_tl_generated_api.Api.messages.SearchGlobal) {
			if (lastMessage.inputChat) this.request.offsetPeer = lastMessage.inputChat;
			else this.request.offsetPeer = new require_tl_generated_api.Api.InputPeerEmpty();
			this.request.offsetRate = response.nextRate;
		}
	}
};
var _IDsIter = class extends require_requestIter.RequestIter {
	async _init({ entity, ids }) {
		this.total = ids.length;
		this._ids = this.reverse ? ids.reverse() : ids;
		this._offset = 0;
		this._entity = entity ? await this.client.getInputEntity(entity) : void 0;
		this._ty = this._entity ? require_Helpers._entityType(this._entity) : void 0;
		if (!this.waitTime) this.waitTime = this.limit > 300 ? 10 : 0;
	}
	[Symbol.asyncIterator]() {
		return super[Symbol.asyncIterator]();
	}
	async _loadNextChunk() {
		const ids = this._ids.slice(this._offset, this._offset + _MAX_CHUNK_SIZE);
		if (!ids.length) return false;
		this._offset += _MAX_CHUNK_SIZE;
		let fromId;
		let r;
		if (this._ty == require_Helpers._EntityType.CHANNEL) try {
			r = await this.client.invoke(new require_tl_generated_api.Api.channels.GetMessages({
				channel: this._entity,
				id: ids
			}));
		} catch (e) {
			if (e.errorMessage == "MESSAGE_IDS_EMPTY") r = new require_tl_generated_api.Api.messages.MessagesNotModified({ count: ids.length });
			else throw e;
		}
		else {
			r = await this.client.invoke(new require_tl_generated_api.Api.messages.GetMessages({ id: ids }));
			if (this._entity) fromId = await require_client_methods_users._getPeer(this.client, this._entity);
		}
		if (r instanceof require_tl_generated_api.Api.messages.MessagesNotModified) {
			this.buffer?.push(...Array(ids.length));
			return;
		}
		const entities = /* @__PURE__ */ new Map();
		for (const entity of [...r.users, ...r.chats]) entities.set(require_Utils.getPeerId(entity), entity);
		let message;
		for (message of r.messages) if (message instanceof require_tl_generated_api.Api.MessageEmpty || fromId && require_Utils.getPeerId(message.peerId) != require_Utils.getPeerId(fromId)) this.buffer?.push(void 0);
		else {
			const temp = message;
			temp._finishInit(this.client, entities, this._entity);
			temp._entities = entities;
			this.buffer?.push(temp);
		}
	}
};
const IterMessagesDefaults = {
	limit: void 0,
	offsetDate: void 0,
	offsetId: 0,
	maxId: 0,
	minId: 0,
	addOffset: 0,
	search: void 0,
	filter: void 0,
	fromUser: void 0,
	waitTime: void 0,
	ids: void 0,
	reverse: false,
	replyTo: void 0,
	scheduled: false,
	topMsgId: void 0,
	savedPeerId: void 0
};
/** @hidden */
function iterMessages(client, entity, options) {
	const { limit, offsetDate, offsetId, maxId, minId, addOffset, search, filter, fromUser, waitTime, ids, reverse, replyTo, topMsgId, savedPeerId, community } = {
		...IterMessagesDefaults,
		...options
	};
	if (community !== void 0 && (entity !== void 0 || ids !== void 0 || fromUser !== void 0 || replyTo !== void 0 || topMsgId !== void 0 || savedPeerId !== void 0)) throw new Error("Community search requires global search without a peer, message IDs or thread filters");
	if (ids) {
		let idsArray;
		if (!require_Helpers.isArrayLike(ids)) idsArray = [ids];
		else idsArray = ids;
		return new _IDsIter(client, idsArray.length, {
			reverse,
			waitTime
		}, {
			entity,
			ids: idsArray
		});
	}
	return new _MessagesIter(client, limit, {
		waitTime,
		reverse
	}, {
		entity,
		offsetId,
		minId,
		maxId,
		fromUser,
		offsetDate,
		addOffset,
		filter,
		search,
		replyTo,
		topMsgId,
		savedPeerId,
		community
	});
}
/** @hidden */
async function getMessages(client, entity, params) {
	if (Object.keys(params).length == 1 && params.limit === void 0) {
		if (params.minId === void 0 && params.maxId === void 0) params.limit = void 0;
		else params.limit = 1;
	}
	const it = client.iterMessages(entity, params);
	const ids = params.ids;
	if (ids && !require_Helpers.isArrayLike(ids)) {
		for await (const message of it) return [message];
		return [];
	}
	return await it.collect();
}
function _toRichMessage(value) {
	return value instanceof require_tl_custom_RichContent.RichContent ? value.build() : value;
}
/** @hidden */
async function sendMessage(client, entity, { message, replyTo, attributes, parseMode, formattingEntities, linkPreview = true, file, thumb, forceDocument, clearDraft, buttons, silent, supportStreaming, schedule, noforwards, commentTo, topMsgId, sendAs, effect, invertMedia, background, updateStickersetsOrder, allowPaidFloodskip, allowPaidStars, scheduleRepeatPeriod, quickReplyShortcut, suggestedPost, richMessage, quoteText, quoteEntities, quoteOffset, replyToPeerId } = {}) {
	if (file) return client.sendFile(entity, {
		file,
		caption: message ? typeof message == "string" ? message : message.message : "",
		forceDocument,
		clearDraft,
		replyTo,
		attributes,
		thumb,
		supportsStreaming: supportStreaming,
		parseMode,
		formattingEntities,
		silent,
		scheduleDate: schedule,
		buttons,
		noforwards,
		commentTo,
		topMsgId,
		sendAs,
		effect,
		invertMedia,
		background,
		updateStickersetsOrder,
		allowPaidFloodskip,
		allowPaidStars,
		scheduleRepeatPeriod,
		quickReplyShortcut,
		suggestedPost,
		quoteText,
		quoteEntities,
		quoteOffset,
		replyToPeerId
	});
	entity = await client.getInputEntity(entity);
	if (commentTo != void 0) {
		const discussionData = await getCommentData(client, entity, commentTo);
		entity = discussionData.entity;
		replyTo = discussionData.replyTo;
	}
	let markup, request;
	const replyObject = await require_client_methods_uploads._toReplyObject(client, replyTo, topMsgId, {
		quoteText,
		quoteEntities,
		quoteOffset,
		replyToPeerId
	});
	if (message && message instanceof require_tl_generated_api.Api.Message) {
		if (buttons == void 0) markup = message.replyMarkup;
		else markup = client.buildReplyMarkup(buttons);
		if (silent == void 0) silent = message.silent;
		if (message.media && !(message.media instanceof require_tl_generated_api.Api.MessageMediaWebPage)) return client.sendFile(entity, {
			file: message.media,
			caption: message.message,
			silent,
			replyTo,
			buttons: markup,
			formattingEntities: message.entities,
			scheduleDate: schedule,
			clearDraft,
			noforwards,
			topMsgId,
			sendAs,
			effect,
			invertMedia,
			background,
			allowPaidStars,
			quoteText,
			quoteEntities,
			quoteOffset,
			replyToPeerId
		});
		request = new require_tl_generated_api.Api.messages.SendMessage({
			peer: entity,
			message: message.message || "",
			silent,
			replyTo: replyObject,
			replyMarkup: markup,
			entities: message.entities,
			clearDraft,
			noWebpage: !(message.media instanceof require_tl_generated_api.Api.MessageMediaWebPage),
			scheduleDate: schedule,
			scheduleRepeatPeriod,
			noforwards,
			background,
			updateStickersetsOrder,
			allowPaidFloodskip,
			allowPaidStars,
			quickReplyShortcut: require_client_methods_uploads._toQuickReplyShortcut(quickReplyShortcut),
			suggestedPost,
			richMessage: _toRichMessage(richMessage),
			sendAs: sendAs ? await client.getInputEntity(sendAs) : void 0,
			effect,
			invertMedia
		});
		message = message.message;
	} else {
		if (formattingEntities == void 0) [message, formattingEntities] = await require_client_methods_messageParse._parseMessageText(client, message || "", parseMode);
		if (!message && !richMessage) throw new Error("The message cannot be empty unless a file is provided");
		request = new require_tl_generated_api.Api.messages.SendMessage({
			peer: entity,
			message: message ? message.toString() : "",
			entities: formattingEntities,
			noWebpage: !linkPreview,
			replyTo: replyObject,
			clearDraft,
			silent,
			replyMarkup: client.buildReplyMarkup(buttons),
			scheduleDate: schedule,
			scheduleRepeatPeriod,
			noforwards,
			background,
			updateStickersetsOrder,
			allowPaidFloodskip,
			allowPaidStars,
			quickReplyShortcut: require_client_methods_uploads._toQuickReplyShortcut(quickReplyShortcut),
			suggestedPost,
			richMessage: _toRichMessage(richMessage),
			sendAs: sendAs ? await client.getInputEntity(sendAs) : void 0,
			effect,
			invertMedia
		});
	}
	const result = await client.invoke(request);
	if (result instanceof require_tl_generated_api.Api.UpdateShortSentMessage) {
		const msg = new require_tl_generated_api.Api.Message({
			id: result.id,
			peerId: await require_client_methods_users._getPeer(client, entity),
			message,
			date: result.date,
			out: result.out,
			media: result.media,
			entities: result.entities,
			replyMarkup: request.replyMarkup,
			ttlPeriod: result.ttlPeriod
		});
		msg._finishInit(client, /* @__PURE__ */ new Map(), entity);
		return msg;
	}
	return client._getResponseMessage(request, result, entity);
}
/** @hidden */
async function forwardMessages(client, entity, { messages, fromPeer, silent, schedule, noforwards, dropAuthor, topMsgId, sendAs, effect, dropMediaCaptions, withMyScore, background, allowPaidFloodskip, allowPaidStars, videoTimestamp, scheduleRepeatPeriod, quickReplyShortcut, suggestedPost, replyTo }) {
	if (!require_Helpers.isArrayLike(messages)) messages = [messages];
	entity = await client.getInputEntity(entity);
	let fromPeerId;
	if (fromPeer) {
		fromPeer = await client.getInputEntity(fromPeer);
		fromPeerId = await client.getPeerId(fromPeer);
	}
	const getKey = (m) => {
		if (m instanceof require_tl_generated_api.Api.Message) return m.chatId;
		if (require_Utils.parseID(m)) {
			if (fromPeerId !== void 0) return fromPeerId;
			throw new Error("fromPeer must be given if integer IDs are used");
		} else throw new Error(`Cannot forward ${m}`);
	};
	const sent = [];
	for (let [chatId, chunk] of require_Helpers.groupBy(messages, getKey)) {
		let chat;
		let numbers = [];
		if (typeof chunk[0] == "number") {
			chat = fromPeer;
			numbers = chunk;
		} else {
			chat = await chunk[0].getInputChat();
			numbers = chunk.map((m) => m.id);
		}
		const request = new require_tl_generated_api.Api.messages.ForwardMessages({
			fromPeer: chat,
			id: numbers,
			toPeer: entity,
			silent,
			scheduleDate: schedule,
			scheduleRepeatPeriod,
			noforwards,
			dropAuthor,
			topMsgId: topMsgId ? require_Utils.getMessageId(topMsgId) : void 0,
			replyTo: await require_client_methods_uploads._toReplyObject(client, replyTo, void 0),
			sendAs: sendAs ? await client.getInputEntity(sendAs) : void 0,
			effect,
			dropMediaCaptions,
			withMyScore,
			background,
			allowPaidFloodskip,
			allowPaidStars,
			videoTimestamp,
			quickReplyShortcut: require_client_methods_uploads._toQuickReplyShortcut(quickReplyShortcut),
			suggestedPost
		});
		const result = await client.invoke(request);
		sent.push(...client._getResponseMessage(request, result, entity));
	}
	return sent;
}
/** @hidden */
async function editMessage(client, entity, { message, text, parseMode, formattingEntities, linkPreview = true, file, forceDocument, buttons, schedule, invertMedia, scheduleRepeatPeriod, quickReplyShortcutId, richMessage }) {
	if (typeof message === "number" && typeof text === "undefined" && !file && !schedule && !richMessage) throw Error("You have to provide either file or text or schedule property.");
	entity = await client.getInputEntity(entity);
	let id;
	let markup;
	let entities;
	let inputMedia;
	if (file) {
		const { fileHandle, media, image } = await require_client_methods_uploads._fileToMedia(client, {
			file,
			forceDocument
		});
		inputMedia = media;
	}
	if (message instanceof require_tl_generated_api.Api.Message) {
		id = require_Utils.getMessageId(message);
		text = message.message;
		entities = message.entities;
		if (buttons == void 0) markup = message.replyMarkup;
		else markup = client.buildReplyMarkup(buttons);
		if (message.media) inputMedia = require_Utils.getInputMedia(message.media, { forceDocument });
	} else {
		if (typeof message !== "number") throw Error("editMessageParams.message must be either a number or a Api.Message type");
		id = message;
		if (formattingEntities == void 0) [text, entities] = await require_client_methods_messageParse._parseMessageText(client, text || "", parseMode);
		else entities = formattingEntities;
		markup = client.buildReplyMarkup(buttons);
	}
	const request = new require_tl_generated_api.Api.messages.EditMessage({
		peer: entity,
		id,
		message: text,
		noWebpage: !linkPreview,
		entities,
		media: inputMedia,
		replyMarkup: markup,
		scheduleDate: schedule,
		scheduleRepeatPeriod,
		quickReplyShortcutId,
		richMessage: _toRichMessage(richMessage),
		invertMedia
	});
	const result = await client.invoke(request);
	return client._getResponseMessage(request, result, entity);
}
/** @hidden */
async function deleteMessages(client, entity, messageIds, { revoke = true }) {
	let ty = require_Helpers._EntityType.USER;
	if (entity) {
		entity = await client.getInputEntity(entity);
		ty = require_Helpers._entityType(entity);
	}
	const ids = [];
	for (const messageId of messageIds) if (messageId instanceof require_tl_generated_api.Api.Message || messageId instanceof require_tl_generated_api.Api.MessageService || messageId instanceof require_tl_generated_api.Api.MessageEmpty) ids.push(messageId.id);
	else if (typeof messageId === "number") ids.push(messageId);
	else throw new Error(`Cannot convert ${messageId} to an integer`);
	const results = [];
	if (ty == require_Helpers._EntityType.CHANNEL) for (const chunk of require_Utils.chunks(ids)) results.push(client.api.channels.deleteMessages({
		channel: require_Utils.getInputChannel(entity),
		id: chunk
	}));
	else for (const chunk of require_Utils.chunks(ids)) results.push(client.api.messages.deleteMessages({
		id: chunk,
		revoke
	}));
	return Promise.all(results);
}
/** @hidden */
async function pinMessage(client, entity, message, pinMessageParams) {
	return await _pin(client, entity, message, false, pinMessageParams?.notify, pinMessageParams?.pmOneSide, pinMessageParams);
}
/** @hidden */
async function unpinMessage(client, entity, message, unpinMessageParams) {
	return await _pin(client, entity, message, true, unpinMessageParams?.notify, unpinMessageParams?.pmOneSide, unpinMessageParams);
}
/** @hidden */
async function _pin(client, entity, message, unpin, notify = false, pmOneSide = false, params) {
	message = require_Utils.getMessageId(message) || 0;
	if (message === 0) return await client.api.messages.unpinAllMessages({
		peer: entity,
		topMsgId: params?.topMsgId,
		savedPeerId: params?.savedPeerId ? await client.getInputEntity(params.savedPeerId) : void 0
	});
	entity = await client.getInputEntity(entity);
	const request = new require_tl_generated_api.Api.messages.UpdatePinnedMessage({
		silent: !notify,
		unpin,
		pmOneside: pmOneSide,
		peer: entity,
		id: message
	});
	const result = await client.invoke(request);
	/**
	* Unpinning does not produce a service message.
	* Pinning a message that was already pinned also produces no service message.
	* Pinning a message in your own chat does not produce a service message,
	* but pinning on a private conversation with someone else does.
	*/
	if (unpin || !("updates" in result) || "updates" in result && !result.updates) return;
	return client._getResponseMessage(request, result, entity);
}
/** @hidden */
async function markAsRead(client, entity, message, markAsReadParams) {
	let maxId = markAsReadParams?.maxId || 0;
	const maxIdIsUndefined = markAsReadParams?.maxId === void 0;
	if (maxIdIsUndefined) {
		if (message) {
			if (Array.isArray(message)) maxId = Math.max(...message.map((v) => require_Utils.getMessageId(v)));
			else maxId = require_Utils.getMessageId(message);
		}
	}
	entity = await client.getInputEntity(entity);
	if (markAsReadParams && markAsReadParams.clearMentions) {
		await client.invoke(new require_tl_generated_api.Api.messages.ReadMentions({
			peer: entity,
			topMsgId: markAsReadParams.topMsgId
		}));
		if (maxIdIsUndefined && message === void 0) return true;
	}
	if (require_Helpers._entityType(entity) === require_Helpers._EntityType.CHANNEL) return await client.api.channels.readHistory({
		channel: require_Utils.getInputChannel(entity),
		maxId
	});
	else {
		await client.api.messages.readHistory({
			peer: entity,
			maxId
		});
		return true;
	}
}
/** @hidden */
async function getCommentData(client, entity, message) {
	const msgId = require_Utils.getMessageId(message);
	if (msgId == void 0) throw new Error(`Cannot convert ${message} to a message ID`);
	const result = await client.api.messages.getDiscussionMessage({
		peer: entity,
		msgId
	});
	const relevantMessage = result.messages.reduce((p, c) => p && p.id < c.id ? p : c);
	let chat;
	for (const c of result.chats) if (relevantMessage.peerId instanceof require_tl_generated_api.Api.PeerChannel && c.id.eq(relevantMessage.peerId.channelId)) {
		chat = c;
		break;
	}
	return {
		entity: require_Utils.getInputPeer(chat),
		replyTo: relevantMessage.id
	};
}
/** @hidden */
async function sendReaction(client, entity, messageId, reaction, big, addToRecent) {
	return client.invoke(new require_tl_generated_api.Api.messages.SendReaction({
		peer: entity,
		msgId: messageId,
		reaction: reaction || [],
		big,
		addToRecent
	}));
}
/** @hidden */
async function getReactionUsers(client, entity, messageId, params) {
	const { reaction, limit = 100, offset = "" } = params || {};
	return client.invoke(new require_tl_generated_api.Api.messages.GetMessageReactionsList({
		peer: entity,
		id: messageId,
		limit,
		offset,
		reaction: typeof reaction === "string" ? new require_tl_generated_api.Api.ReactionEmoji({ emoticon: reaction }) : reaction
	}));
}
async function _pollText(client, text, parseMode) {
	const [parsed, entities] = await require_client_methods_messageParse._parseMessageText(client, text, parseMode);
	return new require_tl_generated_api.Api.TextWithEntities({
		text: parsed,
		entities
	});
}
/** @hidden */
async function sendPoll(client, entity, poll, params = {}) {
	let solution;
	let solutionEntities = poll.solutionEntities;
	if (poll.solution != void 0) {
		if (solutionEntities == void 0) [solution, solutionEntities] = await require_client_methods_messageParse._parseMessageText(client, poll.solution, poll.parseMode);
		else solution = poll.solution;
	}
	const correctAnswers = poll.correctAnswers == void 0 ? void 0 : Array.isArray(poll.correctAnswers) ? poll.correctAnswers : [poll.correctAnswers];
	const media = new require_tl_generated_api.Api.InputMediaPoll({
		poll: new require_tl_generated_api.Api.Poll({
			id: big_integer.default.zero,
			question: await _pollText(client, poll.question, poll.parseMode),
			answers: await Promise.all(poll.answers.map(async (answer) => {
				const item = typeof answer === "string" ? { text: answer } : answer;
				return new require_tl_generated_api.Api.InputPollAnswer({
					text: await _pollText(client, item.text, poll.parseMode),
					media: item.media
				});
			})),
			multipleChoice: poll.multipleChoice,
			quiz: poll.quiz,
			publicVoters: poll.publicVoters,
			closePeriod: poll.closePeriod,
			closeDate: poll.closeDate,
			openAnswers: poll.openAnswers,
			shuffleAnswers: poll.shuffleAnswers,
			hideResultsUntilClose: poll.hideResultsUntilClose,
			revotingDisabled: poll.revotingDisabled,
			subscribersOnly: poll.subscribersOnly,
			countriesIso2: poll.countriesIso2,
			hash: big_integer.default.zero
		}),
		correctAnswers,
		solution,
		solutionEntities: solution != void 0 ? solutionEntities : void 0,
		solutionMedia: poll.solutionMedia,
		attachedMedia: poll.attachedMedia
	});
	return client.sendFile(entity, {
		...params,
		file: media
	});
}
async function _getMessagePoll(client, entity, message) {
	let msg = message instanceof require_tl_generated_api.Api.Message ? message : void 0;
	if (!msg || !(msg.media instanceof require_tl_generated_api.Api.MessageMediaPoll)) {
		const id = require_Utils.getMessageId(message);
		if (id == void 0) throw new Error(`Cannot convert ${message} to a message ID`);
		msg = (await getMessages(client, entity, { ids: id }))[0];
	}
	if (!msg || !(msg.media instanceof require_tl_generated_api.Api.MessageMediaPoll)) throw new Error("The message does not contain a poll");
	return msg.media.poll;
}
/** @hidden */
async function vote(client, entity, message, options) {
	const peer = await client.getInputEntity(entity);
	const msgId = require_Utils.getMessageId(message);
	if (msgId == void 0) throw new Error(`Cannot convert ${message} to a message ID`);
	const list = Array.isArray(options) ? options : [options];
	let bytes;
	if (list.every((option) => typeof option === "number")) {
		const poll = await _getMessagePoll(client, peer, message);
		bytes = list.map((index) => {
			const answer = poll.answers[index];
			if (!answer || !(answer instanceof require_tl_generated_api.Api.PollAnswer)) throw new Error(`Poll has no answer with index ${index}`);
			return answer.option;
		});
	} else bytes = list;
	return client.invoke(new require_tl_generated_api.Api.messages.SendVote({
		peer,
		msgId,
		options: bytes
	}));
}
/** @hidden */
async function closePoll(client, entity, message) {
	const peer = await client.getInputEntity(entity);
	const msgId = require_Utils.getMessageId(message);
	if (msgId == void 0) throw new Error(`Cannot convert ${message} to a message ID`);
	const poll = await _getMessagePoll(client, peer, message);
	const request = new require_tl_generated_api.Api.messages.EditMessage({
		peer,
		id: msgId,
		media: new require_tl_generated_api.Api.InputMediaPoll({ poll: new require_tl_generated_api.Api.Poll({
			id: poll.id,
			closed: true,
			question: poll.question,
			answers: poll.answers,
			multipleChoice: poll.multipleChoice,
			quiz: poll.quiz,
			publicVoters: poll.publicVoters,
			hash: poll.hash
		}) })
	});
	const result = await client.invoke(request);
	if ("updates" in result) {
		for (const update of result.updates) if (update instanceof require_tl_generated_api.Api.UpdateMessagePoll && update.poll) return update.poll;
	}
	return _getMessagePoll(client, peer, msgId);
}
function _collectMessages(client, messages, users, chats) {
	const entities = /* @__PURE__ */ new Map();
	for (const x of [...users, ...chats]) entities.set(require_Utils.getPeerId(x), x);
	const out = [];
	for (const m of messages) {
		if (m instanceof require_tl_generated_api.Api.MessageEmpty) continue;
		const msg = m;
		try {
			msg._finishInit(client, entities, void 0);
		} catch (e) {}
		msg._entities = entities;
		out.push(msg);
	}
	return out;
}
/** @hidden */
async function getScheduledMessages(client, entity, ids) {
	const peer = await client.getInputEntity(entity);
	const result = ids == void 0 ? await client.api.messages.getScheduledHistory({
		peer,
		hash: big_integer.default.zero
	}) : await client.api.messages.getScheduledMessages({
		peer,
		id: Array.isArray(ids) ? ids : [ids]
	});
	if (!("messages" in result)) return [];
	return _collectMessages(client, result.messages, result.users, result.chats);
}
/** @hidden */
async function sendScheduledMessages(client, entity, ids) {
	const peer = await client.getInputEntity(entity);
	const result = await client.api.messages.sendScheduledMessages({
		peer,
		id: Array.isArray(ids) ? ids : [ids]
	});
	if (!("updates" in result)) return [];
	const messages = [];
	for (const update of result.updates) if (update instanceof require_tl_generated_api.Api.UpdateNewMessage || update instanceof require_tl_generated_api.Api.UpdateNewChannelMessage || update instanceof require_tl_generated_api.Api.UpdateNewScheduledMessage) messages.push(update.message);
	return _collectMessages(client, messages, result.users, result.chats);
}
/** @hidden */
async function deleteScheduledMessages(client, entity, ids) {
	const peer = await client.getInputEntity(entity);
	await client.api.messages.deleteScheduledMessages({
		peer,
		id: Array.isArray(ids) ? ids : [ids]
	});
}
/** @hidden */
async function copyMessages(client, entity, params) {
	return forwardMessages(client, entity, {
		...params,
		dropAuthor: true
	});
}
/** @hidden */
async function saveDraft(client, entity, params = {}) {
	const peer = await client.getInputEntity(entity);
	let message = params.message || "";
	let entities = params.formattingEntities;
	if (entities == void 0 && message) [message, entities] = await require_client_methods_messageParse._parseMessageText(client, message, params.parseMode);
	const replyTo = await require_client_methods_uploads._toReplyObject(client, params.replyTo, params.topMsgId, {
		quoteText: params.quoteText,
		quoteEntities: params.quoteEntities,
		quoteOffset: params.quoteOffset,
		replyToPeerId: params.replyToPeerId
	});
	return client.invoke(new require_tl_generated_api.Api.messages.SaveDraft({
		peer,
		message: message.toString(),
		entities,
		noWebpage: params.linkPreview === void 0 ? void 0 : !params.linkPreview,
		replyTo,
		invertMedia: params.invertMedia,
		media: params.media,
		effect: params.effect,
		suggestedPost: params.suggestedPost,
		richMessage: _toRichMessage(params.richMessage)
	}));
}
/** @hidden */
async function clearDraft(client, entity) {
	return saveDraft(client, entity, {});
}
/** @hidden */
async function clearAllDrafts(client) {
	return client.api.messages.clearAllDrafts({});
}
function _linkInt(value) {
	if (!value || !/^\d+$/.test(value)) return;
	const n = parseInt(value, 10);
	return isNaN(n) ? void 0 : n;
}
/** @hidden */
function _parseMessageLink(link) {
	let raw = link.trim();
	if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) raw = "https://" + raw;
	let url;
	try {
		url = new URL(raw);
	} catch (e) {
		return;
	}
	const query = url.searchParams;
	if (url.protocol === "tg:") {
		const host = url.host || url.pathname.replace(/^\/+/, "");
		const post = _linkInt(query.get("post"));
		if (post == void 0) return;
		const common = {
			msgId: post,
			thread: _linkInt(query.get("thread")),
			comment: _linkInt(query.get("comment"))
		};
		if (host === "resolve" && query.get("domain")) return {
			username: query.get("domain"),
			...common
		};
		if (host === "privatepost" && _linkInt(query.get("channel"))) return {
			channelId: query.get("channel"),
			...common
		};
		return;
	}
	if (!/^(t\.me|telegram\.me|telegram\.dog)$/i.test(url.hostname)) return;
	const parts = url.pathname.split("/").filter(Boolean);
	if (parts[0] === "s") parts.shift();
	if (parts.length < 2) return;
	const msgId = _linkInt(parts[parts.length - 1]);
	if (msgId == void 0) return;
	const thread = parts.length >= 3 ? _linkInt(parts[1]) : _linkInt(query.get("thread"));
	const comment = _linkInt(query.get("comment"));
	if (parts[0] === "c") {
		const channelId = parts[1];
		if (parts.length < 3 || !/^\d+$/.test(channelId)) return;
		return {
			channelId,
			msgId,
			thread: parts.length >= 4 ? _linkInt(parts[2]) : thread,
			comment
		};
	}
	const username = parts[0];
	if (username.startsWith("+") || username.startsWith("joinchat")) return;
	return {
		username,
		msgId,
		thread,
		comment
	};
}
/** @hidden */
async function getMessageByLink(client, link) {
	const parsed = _parseMessageLink(link);
	if (!parsed) throw new Error(`Cannot parse message link: ${link}`);
	const peer = await client.getInputEntity(parsed.channelId != void 0 ? "-100" + parsed.channelId : parsed.username);
	if (parsed.comment != void 0) return (await getMessages(client, (await getCommentData(client, peer, parsed.msgId)).entity, { ids: parsed.comment }))[0];
	return (await getMessages(client, peer, { ids: parsed.msgId }))[0];
}
/** @hidden */
async function translateText(client, params) {
	const { toLang, tone, entity, ids, text } = params;
	if (entity == void 0 !== (ids == void 0)) throw new Error("translateText: entity and ids must be used together");
	if (entity == void 0 === (text == void 0)) throw new Error("translateText: provide either entity+ids or text, not both");
	return client.invoke(new require_tl_generated_api.Api.messages.TranslateText({
		toLang,
		tone,
		peer: entity ? await client.getInputEntity(entity) : void 0,
		id: ids == void 0 ? void 0 : Array.isArray(ids) ? ids : [ids],
		text: text == void 0 ? void 0 : (Array.isArray(text) ? text : [text]).map((t) => new require_tl_generated_api.Api.TextWithEntities({
			text: t,
			entities: []
		}))
	}));
}
/** @hidden */
async function getMessagesViews(client, entity, ids, increment = false) {
	const peer = await client.getInputEntity(entity);
	return client.api.messages.getMessagesViews({
		peer,
		id: Array.isArray(ids) ? ids : [ids],
		increment
	});
}
/** @hidden */
async function getOutboxReadDate(client, entity, message) {
	const peer = await client.getInputEntity(entity);
	const msgId = require_Utils.getMessageId(message);
	if (msgId == void 0) throw new Error(`Cannot convert ${message} to a message ID`);
	return client.api.messages.getOutboxReadDate({
		peer,
		msgId
	});
}
/** @hidden */
async function getMessageReadParticipants(client, entity, message) {
	const peer = await client.getInputEntity(entity);
	const msgId = require_Utils.getMessageId(message);
	if (msgId == void 0) throw new Error(`Cannot convert ${message} to a message ID`);
	return client.api.messages.getMessageReadParticipants({
		peer,
		msgId
	});
}
/**
* Fetches the full content of a rich message whose delivery was truncated
* (`richMessage.part` set).
* @hidden
*/
async function getRichMessage(client, entity, message) {
	const peer = await client.getInputEntity(entity);
	const msgId = require_Utils.getMessageId(message);
	if (msgId == void 0) throw new Error(`Cannot convert ${message} to a message ID`);
	const result = await client.api.messages.getRichMessage({
		peer,
		id: msgId
	});
	if (!("messages" in result)) return;
	const collected = _collectMessages(client, result.messages, result.users, result.chats);
	return collected.find((m) => m.id === msgId) ?? collected[0];
}
/** @hidden */
async function getDiscussionMessage(client, entity, message) {
	const peer = await client.getInputEntity(entity);
	const msgId = require_Utils.getMessageId(message);
	if (msgId == void 0) throw new Error(`Cannot convert ${message} to a message ID`);
	const result = await client.api.messages.getDiscussionMessage({
		peer,
		msgId
	});
	const collected = _collectMessages(client, result.messages, result.users, result.chats);
	if (!collected.length) return;
	return collected.reduce((a, b) => a.id < b.id ? a : b);
}
exports._IDsIter = _IDsIter;
exports._MessagesIter = _MessagesIter;
exports._parseMessageLink = _parseMessageLink;
exports._pin = _pin;
exports.clearAllDrafts = clearAllDrafts;
exports.clearDraft = clearDraft;
exports.closePoll = closePoll;
exports.copyMessages = copyMessages;
exports.deleteMessages = deleteMessages;
exports.deleteScheduledMessages = deleteScheduledMessages;
exports.editMessage = editMessage;
exports.forwardMessages = forwardMessages;
exports.getCommentData = getCommentData;
exports.getDiscussionMessage = getDiscussionMessage;
exports.getMessageByLink = getMessageByLink;
exports.getMessageReadParticipants = getMessageReadParticipants;
exports.getMessages = getMessages;
exports.getMessagesViews = getMessagesViews;
exports.getOutboxReadDate = getOutboxReadDate;
exports.getReactionUsers = getReactionUsers;
exports.getRichMessage = getRichMessage;
exports.getScheduledMessages = getScheduledMessages;
exports.iterMessages = iterMessages;
exports.markAsRead = markAsRead;
Object.defineProperty(exports, "messages_exports", {
	enumerable: true,
	get: function() {
		return messages_exports;
	}
});
exports.pinMessage = pinMessage;
exports.saveDraft = saveDraft;
exports.sendMessage = sendMessage;
exports.sendPoll = sendPoll;
exports.sendReaction = sendReaction;
exports.sendScheduledMessages = sendScheduledMessages;
exports.translateText = translateText;
exports.unpinMessage = unpinMessage;
exports.vote = vote;
