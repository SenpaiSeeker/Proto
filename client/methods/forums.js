Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_Helpers = require("../../Helpers.js");
require("../../tl/index.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_Utils = require("../../Utils.js");
// teleproto/client/methods/forums.ts
var forums_exports = /* @__PURE__ */ require_runtime.__exportAll({
	createForumTopic: () => createForumTopic,
	editForumTopic: () => editForumTopic,
	getForumTopics: () => getForumTopics,
	getForumTopicsByID: () => getForumTopicsByID,
	reorderPinnedForumTopics: () => reorderPinnedForumTopics,
	toggleForum: () => toggleForum,
	toggleViewForumAsMessages: () => toggleViewForumAsMessages,
	updatePinnedForumTopic: () => updatePinnedForumTopic
});
/** @hidden */
async function createForumTopic(client, entity, params) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.messages.CreateForumTopic({
		peer,
		title: params.title,
		iconColor: params.iconColor,
		iconEmojiId: params.iconEmojiId,
		titleMissing: params.titleMissing,
		randomId: require_Helpers.generateRandomBigInt(),
		sendAs: params.sendAs ? await client.getInputEntity(params.sendAs) : void 0
	}));
}
/** @hidden */
async function editForumTopic(client, entity, topicId, params) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.messages.EditForumTopic({
		peer,
		topicId,
		title: params.title,
		iconEmojiId: params.iconEmojiId,
		closed: params.closed,
		hidden: params.hidden
	}));
}
/** @hidden */
async function updatePinnedForumTopic(client, entity, topicId, pinned) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.messages.UpdatePinnedForumTopic({
		peer,
		topicId,
		pinned
	}));
}
/** @hidden */
async function reorderPinnedForumTopics(client, entity, order, params = {}) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.messages.ReorderPinnedForumTopics({
		peer,
		order,
		force: params.force
	}));
}
/** @hidden */
async function getForumTopics(client, entity, params = {}) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.messages.GetForumTopics({
		peer,
		q: params.search,
		offsetDate: params.offsetDate ?? 0,
		offsetId: params.offsetId ?? 0,
		offsetTopic: params.offsetTopic ?? 0,
		limit: params.limit ?? 100
	}));
}
/** @hidden */
async function getForumTopicsByID(client, entity, topicIds) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.messages.GetForumTopicsByID({
		peer,
		topics: Array.isArray(topicIds) ? topicIds : [topicIds]
	}));
}
/** @hidden */
async function toggleForum(client, entity, enabled, tabs = false, sidebar = false) {
	const channel = await client.getInputEntity(entity);
	return client.api.channels.toggleForum({
		channel: require_Utils.getInputChannel(channel),
		enabled,
		tabs,
		sidebar
	});
}
/** @hidden */
async function toggleViewForumAsMessages(client, entity, enabled) {
	const channel = await client.getInputEntity(entity);
	return client.api.channels.toggleViewForumAsMessages({
		channel: require_Utils.getInputChannel(channel),
		enabled
	});
}
exports.createForumTopic = createForumTopic;
exports.editForumTopic = editForumTopic;
Object.defineProperty(exports, "forums_exports", {
	enumerable: true,
	get: function() {
		return forums_exports;
	}
});
exports.getForumTopics = getForumTopics;
exports.getForumTopicsByID = getForumTopicsByID;
exports.reorderPinnedForumTopics = reorderPinnedForumTopics;
exports.toggleForum = toggleForum;
exports.toggleViewForumAsMessages = toggleViewForumAsMessages;
exports.updatePinnedForumTopic = updatePinnedForumTopic;
