Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_Helpers = require("../../Helpers.js");
const require_Utils = require("../../Utils.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../tl/index.js");
const require_client_methods_uploads = require("./uploads.js");
// teleproto/client/methods/account.ts
var account_exports = /* @__PURE__ */ require_runtime.__exportAll({
	deleteProfilePhotos: () => deleteProfilePhotos,
	getAccountTTL: () => getAccountTTL,
	getAuthorizations: () => getAuthorizations,
	getGlobalPrivacySettings: () => getGlobalPrivacySettings,
	getNotifySettings: () => getNotifySettings,
	getPrivacy: () => getPrivacy,
	getUserPhotos: () => getUserPhotos,
	resetAuthorization: () => resetAuthorization,
	setAccountTTL: () => setAccountTTL,
	setGlobalPrivacySettings: () => setGlobalPrivacySettings,
	setPrivacy: () => setPrivacy,
	updateNotifySettings: () => updateNotifySettings,
	updateProfile: () => updateProfile,
	updateProfilePhoto: () => updateProfilePhoto,
	updateStatus: () => updateStatus,
	updateUsername: () => updateUsername,
	uploadProfilePhoto: () => uploadProfilePhoto
});
/** @hidden */
async function updateProfile(client, params) {
	return client.api.account.updateProfile({
		firstName: params.firstName,
		lastName: params.lastName,
		about: params.about
	});
}
/** @hidden */
async function updateUsername(client, username) {
	return client.api.account.updateUsername({ username });
}
/** @hidden */
async function updateStatus(client, online = true) {
	return client.api.account.updateStatus({ offline: !online });
}
async function _toInputFile(client, file) {
	const { fileHandle } = await require_client_methods_uploads._fileToMedia(client, {
		file,
		asImage: true
	});
	if (!fileHandle) throw new Error(`Cannot upload ${file} as a profile photo`);
	return fileHandle;
}
/** @hidden */
async function uploadProfilePhoto(client, params) {
	return client.invoke(new require_tl_generated_api.Api.photos.UploadProfilePhoto({
		file: params.file ? await _toInputFile(client, params.file) : void 0,
		video: params.video ? await _toInputFile(client, params.video) : void 0,
		videoStartTs: params.videoStartTs,
		videoEmojiMarkup: params.videoEmojiMarkup,
		fallback: params.fallback,
		bot: params.bot ? await client.getInputEntity(params.bot) : void 0
	}));
}
/** @hidden */
async function updateProfilePhoto(client, photo, params = {}) {
	return client.invoke(new require_tl_generated_api.Api.photos.UpdateProfilePhoto({
		id: require_Utils.getInputPhoto(photo),
		fallback: params.fallback,
		bot: params.bot ? await client.getInputEntity(params.bot) : void 0
	}));
}
/** @hidden */
async function deleteProfilePhotos(client, photos) {
	return client.invoke(new require_tl_generated_api.Api.photos.DeletePhotos({ id: photos.map((photo) => require_Utils.getInputPhoto(photo)) }));
}
/** @hidden */
async function getUserPhotos(client, entity, params = {}) {
	const user = await client.getInputEntity(entity);
	const result = await client.invoke(new require_tl_generated_api.Api.photos.GetUserPhotos({
		userId: user,
		offset: params.offset ?? 0,
		maxId: params.maxId,
		limit: params.limit ?? 100
	}));
	const photos = new require_Helpers.TotalList();
	photos.push(...result.photos);
	photos.total = result instanceof require_tl_generated_api.Api.photos.PhotosSlice ? result.count : result.photos.length;
	return photos;
}
/** @hidden */
async function getAuthorizations(client) {
	return client.api.account.getAuthorizations({});
}
/**
* Terminates a session from {@link TelegramClient.getAuthorizations}. Pass no hash (or zero)
* to terminate ALL other sessions.
* @hidden
*/
async function resetAuthorization(client, hash) {
	if (hash == void 0 || hash.isZero()) return client.api.auth.resetAuthorizations({});
	return client.api.account.resetAuthorization({ hash });
}
/** @hidden */
async function getPrivacy(client, key) {
	return client.invoke(new require_tl_generated_api.Api.account.GetPrivacy({ key }));
}
/** @hidden */
async function setPrivacy(client, key, rules) {
	return client.invoke(new require_tl_generated_api.Api.account.SetPrivacy({
		key,
		rules
	}));
}
/** @hidden */
async function getNotifySettings(client, entity) {
	return client.invoke(new require_tl_generated_api.Api.account.GetNotifySettings({ peer: await client._getInputNotify(entity) }));
}
/** @hidden */
async function updateNotifySettings(client, entity, params) {
	return client.invoke(new require_tl_generated_api.Api.account.UpdateNotifySettings({
		peer: await client._getInputNotify(entity),
		settings: new require_tl_generated_api.Api.InputPeerNotifySettings({
			showPreviews: params.showPreviews,
			silent: params.silent,
			muteUntil: params.muteUntil,
			sound: params.sound,
			storiesMuted: params.storiesMuted,
			storiesHideSender: params.storiesHideSender,
			storiesSound: params.storiesSound
		})
	}));
}
/** @hidden */
async function getAccountTTL(client) {
	return (await client.api.account.getAccountTTL({})).days;
}
/** @hidden */
async function setAccountTTL(client, days) {
	return client.invoke(new require_tl_generated_api.Api.account.SetAccountTTL({ ttl: new require_tl_generated_api.Api.AccountDaysTTL({ days }) }));
}
/** @hidden */
async function getGlobalPrivacySettings(client) {
	return client.api.account.getGlobalPrivacySettings({});
}
/** @hidden */
async function setGlobalPrivacySettings(client, settings) {
	return client.invoke(new require_tl_generated_api.Api.account.SetGlobalPrivacySettings({ settings }));
}
Object.defineProperty(exports, "account_exports", {
	enumerable: true,
	get: function() {
		return account_exports;
	}
});
exports.deleteProfilePhotos = deleteProfilePhotos;
exports.getAccountTTL = getAccountTTL;
exports.getAuthorizations = getAuthorizations;
exports.getGlobalPrivacySettings = getGlobalPrivacySettings;
exports.getNotifySettings = getNotifySettings;
exports.getPrivacy = getPrivacy;
exports.getUserPhotos = getUserPhotos;
exports.resetAuthorization = resetAuthorization;
exports.setAccountTTL = setAccountTTL;
exports.setGlobalPrivacySettings = setGlobalPrivacySettings;
exports.setPrivacy = setPrivacy;
exports.updateNotifySettings = updateNotifySettings;
exports.updateProfile = updateProfile;
exports.updateProfilePhoto = updateProfilePhoto;
exports.updateStatus = updateStatus;
exports.updateUsername = updateUsername;
exports.uploadProfilePhoto = uploadProfilePhoto;
