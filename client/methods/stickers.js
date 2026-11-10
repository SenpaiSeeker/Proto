Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_Utils = require("../../Utils.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../tl/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/client/methods/stickers.ts
var stickers_exports = /* @__PURE__ */ require_runtime.__exportAll({
	clearRecentStickers: () => clearRecentStickers,
	faveSticker: () => faveSticker,
	getAllStickers: () => getAllStickers,
	getCustomEmojiDocuments: () => getCustomEmojiDocuments,
	getFavedStickers: () => getFavedStickers,
	getRecentStickers: () => getRecentStickers,
	getStickerSet: () => getStickerSet,
	installStickerSet: () => installStickerSet,
	saveRecentSticker: () => saveRecentSticker,
	uninstallStickerSet: () => uninstallStickerSet
});
function _toInputStickerSet(set) {
	if (typeof set === "string") return new require_tl_generated_api.Api.InputStickerSetShortName({ shortName: set });
	return set;
}
/** @hidden */
async function getStickerSet(client, set) {
	return client.invoke(new require_tl_generated_api.Api.messages.GetStickerSet({
		stickerset: _toInputStickerSet(set),
		hash: 0
	}));
}
/** @hidden */
async function getAllStickers(client) {
	return client.api.messages.getAllStickers({ hash: big_integer.default.zero });
}
/** @hidden */
async function installStickerSet(client, set, params = {}) {
	return client.invoke(new require_tl_generated_api.Api.messages.InstallStickerSet({
		stickerset: _toInputStickerSet(set),
		archived: params.archived ?? false
	}));
}
/** @hidden */
async function uninstallStickerSet(client, set) {
	return client.invoke(new require_tl_generated_api.Api.messages.UninstallStickerSet({ stickerset: _toInputStickerSet(set) }));
}
/** @hidden */
async function getRecentStickers(client, params = {}) {
	return client.api.messages.getRecentStickers({
		hash: big_integer.default.zero,
		attached: params.attached
	});
}
/** @hidden */
async function saveRecentSticker(client, document, params = {}) {
	return client.invoke(new require_tl_generated_api.Api.messages.SaveRecentSticker({
		id: require_Utils.getInputDocument(document),
		unsave: params.unsave ?? false,
		attached: params.attached
	}));
}
/** @hidden */
async function clearRecentStickers(client, params = {}) {
	return client.api.messages.clearRecentStickers({ attached: params.attached });
}
/** @hidden */
async function getFavedStickers(client) {
	return client.api.messages.getFavedStickers({ hash: big_integer.default.zero });
}
/** @hidden */
async function faveSticker(client, document, params = {}) {
	return client.invoke(new require_tl_generated_api.Api.messages.FaveSticker({
		id: require_Utils.getInputDocument(document),
		unfave: params.unfave ?? false
	}));
}
/** @hidden */
async function getCustomEmojiDocuments(client, documentIds) {
	return client.api.messages.getCustomEmojiDocuments({ documentId: documentIds });
}
exports.clearRecentStickers = clearRecentStickers;
exports.faveSticker = faveSticker;
exports.getAllStickers = getAllStickers;
exports.getCustomEmojiDocuments = getCustomEmojiDocuments;
exports.getFavedStickers = getFavedStickers;
exports.getRecentStickers = getRecentStickers;
exports.getStickerSet = getStickerSet;
exports.installStickerSet = installStickerSet;
exports.saveRecentSticker = saveRecentSticker;
Object.defineProperty(exports, "stickers_exports", {
	enumerable: true,
	get: function() {
		return stickers_exports;
	}
});
exports.uninstallStickerSet = uninstallStickerSet;
