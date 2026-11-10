Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_Helpers = require("../../Helpers.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../tl/index.js");
const require_client_methods_uploads = require("./uploads.js");
const require_client_methods_messageParse = require("./messageParse.js");
// teleproto/client/methods/stories.ts
var stories_exports = /* @__PURE__ */ require_runtime.__exportAll({
	canSendStory: () => canSendStory,
	deleteStories: () => deleteStories,
	editStory: () => editStory,
	exportStoryLink: () => exportStoryLink,
	getAllStories: () => getAllStories,
	getPeerStories: () => getPeerStories,
	getPinnedStories: () => getPinnedStories,
	getStoriesArchive: () => getStoriesArchive,
	getStoriesByID: () => getStoriesByID,
	getStoryViewsList: () => getStoryViewsList,
	incrementStoryViews: () => incrementStoryViews,
	readStories: () => readStories,
	sendStory: () => sendStory,
	sendStoryReaction: () => sendStoryReaction,
	toggleStoriesPinned: () => toggleStoriesPinned
});
async function _toStoryMedia(client, media) {
	const converted = await require_client_methods_uploads._fileToMedia(client, { file: media });
	if (!converted.media) throw new Error(`Cannot use ${media} as story media`);
	return converted.media;
}
/** @hidden */
async function sendStory(client, entity, params) {
	const peer = await client.getInputEntity(entity);
	let caption = params.caption;
	let entities = params.entities;
	if (caption != void 0 && entities == void 0) [caption, entities] = await require_client_methods_messageParse._parseMessageText(client, caption, params.parseMode);
	return client.invoke(new require_tl_generated_api.Api.stories.SendStory({
		peer,
		media: await _toStoryMedia(client, params.media),
		caption,
		entities,
		privacyRules: params.privacyRules ?? [new require_tl_generated_api.Api.InputPrivacyValueAllowAll()],
		pinned: params.pinned,
		noforwards: params.noforwards,
		period: params.period,
		mediaAreas: params.mediaAreas,
		fwdFromId: params.fwdFromId ? await client.getInputEntity(params.fwdFromId) : void 0,
		fwdFromStory: params.fwdFromStory,
		fwdModified: params.fwdModified,
		albums: params.albums,
		music: params.music,
		randomId: require_Helpers.generateRandomBigInt()
	}));
}
/** @hidden */
async function editStory(client, entity, storyId, params) {
	const peer = await client.getInputEntity(entity);
	let caption = params.caption;
	let entities = params.entities;
	if (caption != void 0 && entities == void 0) [caption, entities] = await require_client_methods_messageParse._parseMessageText(client, caption, params.parseMode);
	return client.invoke(new require_tl_generated_api.Api.stories.EditStory({
		peer,
		id: storyId,
		media: params.media ? await _toStoryMedia(client, params.media) : void 0,
		caption,
		entities,
		privacyRules: params.privacyRules,
		mediaAreas: params.mediaAreas,
		music: params.music
	}));
}
/** @hidden */
async function deleteStories(client, entity, ids) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.stories.DeleteStories({
		peer,
		id: Array.isArray(ids) ? ids : [ids]
	}));
}
/** @hidden */
async function toggleStoriesPinned(client, entity, ids, pinned = true) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.stories.TogglePinned({
		peer,
		id: Array.isArray(ids) ? ids : [ids],
		pinned
	}));
}
/** @hidden */
async function canSendStory(client, entity) {
	const peer = await client.getInputEntity(entity);
	return client.api.stories.canSendStory({ peer });
}
/** @hidden */
async function getAllStories(client, params = {}) {
	return client.api.stories.getAllStories({
		next: params.next,
		hidden: params.hidden,
		state: params.state
	});
}
/** @hidden */
async function getPeerStories(client, entity) {
	const peer = await client.getInputEntity(entity);
	return client.api.stories.getPeerStories({ peer });
}
/** @hidden */
async function getStoriesByID(client, entity, ids) {
	const peer = await client.getInputEntity(entity);
	return client.api.stories.getStoriesByID({
		peer,
		id: Array.isArray(ids) ? ids : [ids]
	});
}
/** @hidden */
async function getPinnedStories(client, entity, params = {}) {
	const peer = await client.getInputEntity(entity);
	return client.api.stories.getPinnedStories({
		peer,
		offsetId: params.offsetId ?? 0,
		limit: params.limit ?? 100
	});
}
/** @hidden */
async function getStoriesArchive(client, entity, params = {}) {
	const peer = await client.getInputEntity(entity);
	return client.api.stories.getStoriesArchive({
		peer,
		offsetId: params.offsetId ?? 0,
		limit: params.limit ?? 100
	});
}
/** @hidden */
async function readStories(client, entity, maxId) {
	const peer = await client.getInputEntity(entity);
	return client.api.stories.readStories({
		peer,
		maxId: maxId ?? 0
	});
}
/** @hidden */
async function incrementStoryViews(client, entity, ids) {
	const peer = await client.getInputEntity(entity);
	return client.api.stories.incrementStoryViews({
		peer,
		id: Array.isArray(ids) ? ids : [ids]
	});
}
/** @hidden */
async function getStoryViewsList(client, entity, storyId, params = {}) {
	const peer = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.stories.GetStoryViewsList({
		peer,
		id: storyId,
		justContacts: params.justContacts,
		reactionsFirst: params.reactionsFirst,
		forwardsFirst: params.forwardsFirst,
		q: params.search,
		offset: params.offset ?? "",
		limit: params.limit ?? 100
	}));
}
/** @hidden */
async function exportStoryLink(client, entity, storyId) {
	const peer = await client.getInputEntity(entity);
	return client.api.stories.exportStoryLink({
		peer,
		id: storyId
	});
}
/** @hidden */
async function sendStoryReaction(client, entity, storyId, reaction, params = {}) {
	const peer = await client.getInputEntity(entity);
	let resolved;
	if (reaction == void 0) resolved = new require_tl_generated_api.Api.ReactionEmpty();
	else if (typeof reaction === "string") resolved = new require_tl_generated_api.Api.ReactionEmoji({ emoticon: reaction });
	else if (reaction instanceof require_tl_generated_api.Api.ReactionEmoji || reaction instanceof require_tl_generated_api.Api.ReactionCustomEmoji || reaction instanceof require_tl_generated_api.Api.ReactionPaid || reaction instanceof require_tl_generated_api.Api.ReactionEmpty) resolved = reaction;
	else resolved = new require_tl_generated_api.Api.ReactionCustomEmoji({ documentId: reaction });
	return client.invoke(new require_tl_generated_api.Api.stories.SendReaction({
		peer,
		storyId,
		reaction: resolved,
		addToRecent: params.addToRecent
	}));
}
exports.canSendStory = canSendStory;
exports.deleteStories = deleteStories;
exports.editStory = editStory;
exports.exportStoryLink = exportStoryLink;
exports.getAllStories = getAllStories;
exports.getPeerStories = getPeerStories;
exports.getPinnedStories = getPinnedStories;
exports.getStoriesArchive = getStoriesArchive;
exports.getStoriesByID = getStoriesByID;
exports.getStoryViewsList = getStoryViewsList;
exports.incrementStoryViews = incrementStoryViews;
exports.readStories = readStories;
exports.sendStory = sendStory;
exports.sendStoryReaction = sendStoryReaction;
Object.defineProperty(exports, "stories_exports", {
	enumerable: true,
	get: function() {
		return stories_exports;
	}
});
exports.toggleStoriesPinned = toggleStoriesPinned;
