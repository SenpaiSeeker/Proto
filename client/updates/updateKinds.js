Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
require("../../tl/index.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_Utils = require("../../Utils.js");
// teleproto/client/updates/updateKinds.ts
function isCommonPtsUpdate(update) {
	return update instanceof require_tl_generated_api.Api.UpdateNewMessage || update instanceof require_tl_generated_api.Api.UpdateDeleteMessages || update instanceof require_tl_generated_api.Api.UpdateReadHistoryInbox || update instanceof require_tl_generated_api.Api.UpdateReadHistoryOutbox || update instanceof require_tl_generated_api.Api.UpdateWebPage || update instanceof require_tl_generated_api.Api.UpdateReadMessagesContents || update instanceof require_tl_generated_api.Api.UpdateEditMessage || update instanceof require_tl_generated_api.Api.UpdateFolderPeers || update instanceof require_tl_generated_api.Api.UpdatePinnedMessages;
}
function isChannelPtsUpdate(update) {
	return update instanceof require_tl_generated_api.Api.UpdateNewChannelMessage || update instanceof require_tl_generated_api.Api.UpdateEditChannelMessage || update instanceof require_tl_generated_api.Api.UpdateDeleteChannelMessages || update instanceof require_tl_generated_api.Api.UpdateChannelWebPage || update instanceof require_tl_generated_api.Api.UpdatePinnedChannelMessages;
}
function hasQts(update) {
	return typeof update.qts === "number";
}
function channelIdOf(update) {
	const fields = update;
	if (fields.channelId) return fields.channelId.toString();
	const peer = fields.message?.peerId;
	return peer instanceof require_tl_generated_api.Api.PeerChannel ? peer.channelId.toString() : void 0;
}
function requestChannelId(request) {
	let current = request;
	while (current?.classType === "request") {
		const target = current.peer ?? current.channel;
		if (target instanceof require_tl_generated_api.Api.InputPeerChannel || target instanceof require_tl_generated_api.Api.InputChannel || target instanceof require_tl_generated_api.Api.InputPeerChannelFromMessage || target instanceof require_tl_generated_api.Api.InputChannelFromMessage) return target.channelId.toString();
		current = current.query;
	}
}
function collectEntities(users, chats) {
	const entities = /* @__PURE__ */ new Map();
	for (const entity of [...users, ...chats]) try {
		entities.set(require_Utils.getPeerId(entity), entity);
	} catch {}
	return entities;
}
function isMessage(message) {
	return message instanceof require_tl_generated_api.Api.Message || message instanceof require_tl_generated_api.Api.MessageService;
}
function nextRetryDelaySeconds(previous) {
	if (!previous) return 1;
	if (previous >= 32) return 60 + Math.random() * 20;
	return previous * 2;
}
exports.channelIdOf = channelIdOf;
exports.collectEntities = collectEntities;
exports.hasQts = hasQts;
exports.isChannelPtsUpdate = isChannelPtsUpdate;
exports.isCommonPtsUpdate = isCommonPtsUpdate;
exports.isMessage = isMessage;
exports.nextRetryDelaySeconds = nextRetryDelaySeconds;
exports.requestChannelId = requestChannelId;
