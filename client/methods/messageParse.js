Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_Utils = require("../../Utils.js");
require("../../tl/index.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_Helpers = require("../../Helpers.js");
const require_extensions_markdown = require("../../extensions/markdown.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/client/methods/messageParse.ts
var messageParse_exports = /* @__PURE__ */ require_runtime.__exportAll({
	DEFAULT_DELIMITERS: () => require_extensions_markdown.DEFAULT_DELIMITERS,
	_getResponseMessage: () => _getResponseMessage,
	_parseMessageText: () => _parseMessageText,
	_replaceWithMention: () => _replaceWithMention
});
/** @hidden */
async function _replaceWithMention(client, entities, i, user) {
	try {
		entities[i] = new require_tl_generated_api.Api.InputMessageEntityMentionName({
			offset: entities[i].offset,
			length: entities[i].length,
			userId: require_Utils.getInputUser(await client.getInputEntity(user))
		});
		return true;
	} catch (e) {
		return false;
	}
}
/** @hidden */
async function _parseMessageText(client, message, parseMode) {
	if (parseMode == false) return [message, []];
	if (parseMode == void 0) {
		if (client.parseMode == void 0) return [message, []];
		parseMode = client.parseMode;
	} else if (typeof parseMode === "string") parseMode = client._sanitizeParseMode(parseMode);
	const [rawMessage, msgEntities] = parseMode.parse(message);
	for (let i = msgEntities.length - 1; i >= 0; i--) {
		const e = msgEntities[i];
		if (e instanceof require_tl_generated_api.Api.MessageEntityMentionName) await _replaceWithMention(client, msgEntities, i, e.userId);
		else if (e instanceof require_tl_generated_api.Api.MessageEntityTextUrl) {
			const m = /^(?:@|\+|tg:\/\/user\?id=(\d+))/.exec(e.url);
			if (m) {
				const userIdOrUsername = m[1] ? Number(m[1]) : e.url;
				if (!await _replaceWithMention(client, msgEntities, i, userIdOrUsername)) msgEntities.splice(i, 1);
			}
		}
	}
	return [rawMessage, msgEntities];
}
/** @hidden */
function _getResponseMessage(client, request, result, inputChat) {
	let updates = [];
	let entities = /* @__PURE__ */ new Map();
	if (result instanceof require_tl_generated_api.Api.UpdateShort) updates = [result.update];
	else if (result instanceof require_tl_generated_api.Api.Updates || result instanceof require_tl_generated_api.Api.UpdatesCombined) {
		updates = result.updates;
		for (const x of [...result.users, ...result.chats]) entities.set(require_Utils.getPeerId(x), x);
	} else return;
	const randomToId = /* @__PURE__ */ new Map();
	const idToMessage = /* @__PURE__ */ new Map();
	let schedMessage;
	for (const update of updates) if (update instanceof require_tl_generated_api.Api.UpdateMessageID) randomToId.set(update.randomId.toString(), update.id);
	else if (update instanceof require_tl_generated_api.Api.UpdateNewChannelMessage || update instanceof require_tl_generated_api.Api.UpdateNewMessage) {
		update.message._finishInit(client, entities, inputChat);
		if ("randomId" in request || require_Helpers.isArrayLike(request)) idToMessage.set(update.message.id, update.message);
		else return update.message;
	} else if (update instanceof require_tl_generated_api.Api.UpdateEditMessage && "peer" in request && require_Helpers._entityType(request.peer) != require_Helpers._EntityType.CHANNEL) {
		update.message._finishInit(client, entities, inputChat);
		if ("randomId" in request) idToMessage.set(update.message.id, update.message);
		else if ("id" in request && request.id === update.message.id) return update.message;
	} else if (update instanceof require_tl_generated_api.Api.UpdateEditChannelMessage && "peer" in request && require_Utils.getPeerId(request.peer) == require_Utils.getPeerId(update.message.peerId)) {
		if (request.id == update.message.id) {
			update.message._finishInit(client, entities, inputChat);
			return update.message;
		}
	} else if (update instanceof require_tl_generated_api.Api.UpdateNewScheduledMessage) {
		update.message._finishInit(client, entities, inputChat);
		schedMessage = update.message;
		idToMessage.set(update.message.id, update.message);
	} else if (update instanceof require_tl_generated_api.Api.UpdateMessagePoll) {
		if (request.media.poll.id == update.pollId) {
			const m = new require_tl_generated_api.Api.Message({
				id: request.id,
				peerId: require_Utils.getPeerId(request.peer),
				media: new require_tl_generated_api.Api.MessageMediaPoll({
					poll: update.poll,
					results: update.results
				}),
				message: "",
				date: 0
			});
			m._finishInit(client, entities, inputChat);
			return m;
		}
	}
	if (request == void 0) return idToMessage;
	let randomId;
	if (require_Helpers.isArrayLike(request) || typeof request == "number" || big_integer.default.isInstance(request)) randomId = request;
	else randomId = request.randomId;
	if (!randomId) {
		if (schedMessage) return schedMessage;
		client._log.warn(`No randomId in ${request} to map to. returning undefined for ${result} (Message was empty)`);
		return;
	}
	if (!require_Helpers.isArrayLike(randomId)) {
		let msg = idToMessage.get(randomToId.get(randomId.toString()));
		if (!msg) client._log.warn(`Request ${request.className} had missing message mapping ${result.className} (Message was empty)`);
		return msg;
	}
	const final = [];
	let warned = false;
	for (const rnd of randomId) {
		const tmp = randomToId.get(rnd.toString());
		if (!tmp) {
			warned = true;
			break;
		}
		const tmp2 = idToMessage.get(tmp);
		if (!tmp2) {
			warned = true;
			break;
		}
		final.push(tmp2);
	}
	if (warned) client._log.warn(`Request ${request.className} had missing message mapping ${result.className} (Message was empty)`);
	const finalToReturn = [];
	for (const rnd of randomId) finalToReturn.push(idToMessage.get(randomToId.get(rnd.toString())));
	return finalToReturn;
}
exports.DEFAULT_DELIMITERS = require_extensions_markdown.DEFAULT_DELIMITERS;
exports._getResponseMessage = _getResponseMessage;
exports._parseMessageText = _parseMessageText;
exports._replaceWithMention = _replaceWithMention;
Object.defineProperty(exports, "messageParse_exports", {
	enumerable: true,
	get: function() {
		return messageParse_exports;
	}
});
