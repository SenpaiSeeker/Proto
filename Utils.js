Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("./_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("./platform/buffer/index.js");
const require_Helpers = require("./Helpers.js");
require("./tl/api.js");
const require_tl_generated_api = require("./tl/generated/api.js");
require("./platform/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
let mime = require("mime");
mime = require_runtime.__toESM(mime);
// teleproto/Utils.ts
var Utils_exports = /* @__PURE__ */ require_runtime.__exportAll({
	_getEntityPair: () => _getEntityPair,
	_photoSizeByteCount: () => _photoSizeByteCount,
	chunks: () => chunks,
	decodeWaveform: () => decodeWaveform,
	encodeWaveform: () => encodeWaveform,
	getAppropriatedPartSize: () => getAppropriatedPartSize,
	getAttributes: () => getAttributes,
	getDisplayName: () => getDisplayName,
	getExtension: () => getExtension,
	getFileInfo: () => getFileInfo,
	getInnerText: () => getInnerText,
	getInputChannel: () => getInputChannel,
	getInputChatPhoto: () => getInputChatPhoto,
	getInputDialog: () => getInputDialog,
	getInputDocument: () => getInputDocument,
	getInputGeo: () => getInputGeo,
	getInputMedia: () => getInputMedia,
	getInputMessage: () => getInputMessage,
	getInputPeer: () => getInputPeer,
	getInputPhoto: () => getInputPhoto,
	getInputUser: () => getInputUser,
	getMessageId: () => getMessageId,
	getPeer: () => getPeer,
	getPeerId: () => getPeerId,
	isAudio: () => isAudio,
	isGif: () => isGif,
	isImage: () => isImage,
	packBotFileId: () => packBotFileId,
	parseID: () => parseID,
	parsePhone: () => parsePhone,
	parseUsername: () => parseUsername,
	resolveBotFileId: () => resolveBotFileId,
	resolveId: () => resolveId,
	resolveInviteLink: () => resolveInviteLink,
	rtrim: () => rtrim,
	splitText: () => splitText,
	strippedPhotoToJpg: () => strippedPhotoToJpg
});
function getFileInfo(fileLocation) {
	if (!fileLocation || !fileLocation.SUBCLASS_OF_ID) _raiseCastFail(fileLocation, "InputFileLocation");
	if (fileLocation.SUBCLASS_OF_ID == require_Helpers.unionId("InputFileLocation")) return {
		dcId: void 0,
		location: fileLocation,
		size: void 0
	};
	let location = fileLocation;
	if (location instanceof require_tl_generated_api.Api.Message) location = location.media;
	if (location instanceof require_tl_generated_api.Api.MessageMediaDocument) location = location.document;
	else if (location instanceof require_tl_generated_api.Api.MessageMediaPhoto) location = location.photo;
	if (location instanceof require_tl_generated_api.Api.Document) return {
		dcId: location.dcId,
		location: new require_tl_generated_api.Api.InputDocumentFileLocation({
			id: location.id,
			accessHash: location.accessHash,
			fileReference: location.fileReference,
			thumbSize: ""
		}),
		size: location.size
	};
	else if (location instanceof require_tl_generated_api.Api.Photo) return {
		dcId: location.dcId,
		location: new require_tl_generated_api.Api.InputPhotoFileLocation({
			id: location.id,
			accessHash: location.accessHash,
			fileReference: location.fileReference,
			thumbSize: location.sizes[location.sizes.length - 1].type
		}),
		size: (0, big_integer.default)(_photoSizeByteCount(location.sizes[location.sizes.length - 1]) || 0)
	};
	_raiseCastFail(fileLocation, "InputFileLocation");
}
/**
* Turns the given iterable into chunks of the specified size,
* which is 100 by default since that's what Telegram uses the most.
*/
function* chunks(arr, size = 100) {
	for (let i = 0; i < arr.length; i += size) yield arr.slice(i, i + size);
}
const USERNAME_RE = /* @__PURE__ */ new RegExp("@|(?:https?:\\/\\/)?(?:www\\.)?(?:telegram\\.(?:me|dog)|t\\.me)\\/(@|joinchat\\/)?", "i");
const JPEG_HEADER = require_platform_buffer_index.Buffer.from("ffd8ffe000104a46494600010100000100010000ffdb004300281c1e231e19282321232d2b28303c64413c37373c7b585d4964918099968f808c8aa0b4e6c3a0aadaad8a8cc8ffcbdaeef5ffffff9bc1fffffffaffe6fdfff8ffdb0043012b2d2d3c353c76414176f8a58ca5f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8ffc00011080000000003012200021101031101ffc4001f0000010501010101010100000000000000000102030405060708090a0bffc400b5100002010303020403050504040000017d01020300041105122131410613516107227114328191a1082342b1c11552d1f02433627282090a161718191a25262728292a3435363738393a434445464748494a535455565758595a636465666768696a737475767778797a838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae1e2e3e4e5e6e7e8e9eaf1f2f3f4f5f6f7f8f9faffc4001f0100030101010101010101010000000000000102030405060708090a0bffc400b51100020102040403040705040400010277000102031104052131061241510761711322328108144291a1b1c109233352f0156272d10a162434e125f11718191a262728292a35363738393a434445464748494a535455565758595a636465666768696a737475767778797a82838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae2e3e4e5e6e7e8e9eaf2f3f4f5f6f7f8f9faffda000c03010002110311003f00", "hex");
const JPEG_FOOTER = require_platform_buffer_index.Buffer.from("ffd9", "hex");
const TG_JOIN_RE = /* @__PURE__ */ new RegExp("tg:\\/\\/(join)\\?invite=", "i");
const VALID_USERNAME_RE = /* @__PURE__ */ new RegExp("^([a-z]((?!__)[\\w\\d]){2,30}[a-z\\d]|gif|vid|pic|bing|wiki|imdb|bold|vote|like|coub)$", "i");
function _raiseCastFail(entity, target) {
	let toWrite = entity;
	if (typeof entity === "object" && "className" in entity) toWrite = entity.className;
	throw new Error(`Cannot cast ${toWrite} to any kind of ${target}`);
}
/**
Gets the input peer for the given "entity" (user, chat or channel).

A ``TypeError`` is raised if the given entity isn't a supported type
or if ``check_hash is True`` but the entity's ``accessHash is None``
*or* the entity contains ``min`` information. In this case, the hash
cannot be used for general purposes, and thus is not returned to avoid
any issues which can derive from invalid access hashes.

Note that ``checkHash`` **is ignored** if an input peer is already
passed since in that case we assume the user knows what they're doing.
This is key to getting entities by explicitly passing ``hash = 0``.

* @param entity
* @param allowSelf
* @param checkHash
*/
function getInputPeer(entity, allowSelf = true, checkHash = true) {
	if (entity.SUBCLASS_OF_ID === void 0) {
		if (allowSelf && "inputEntity" in entity) return entity.inputEntity;
		else if ("entity" in entity) return getInputPeer(entity.entity);
		else _raiseCastFail(entity, "InputPeer");
	}
	if (entity.SUBCLASS_OF_ID === require_Helpers.unionId("InputPeer")) return entity;
	if (entity instanceof require_tl_generated_api.Api.User) {
		if (entity.self && allowSelf) return new require_tl_generated_api.Api.InputPeerSelf();
		else if (entity.accessHash !== void 0 && !entity.min || !checkHash) return new require_tl_generated_api.Api.InputPeerUser({
			userId: entity.id,
			accessHash: entity.accessHash || (0, big_integer.default)(0)
		});
		else throw new Error("User without accessHash or min cannot be input");
	}
	if (entity instanceof require_tl_generated_api.Api.Chat || entity instanceof require_tl_generated_api.Api.ChatEmpty || entity instanceof require_tl_generated_api.Api.ChatForbidden) return new require_tl_generated_api.Api.InputPeerChat({ chatId: entity.id });
	if (entity instanceof require_tl_generated_api.Api.Channel || entity instanceof require_tl_generated_api.Api.Community) {
		if (entity.accessHash !== void 0 && !entity.min || !checkHash) return new require_tl_generated_api.Api.InputPeerChannel({
			channelId: entity.id,
			accessHash: entity.accessHash || (0, big_integer.default)(0)
		});
		else throw new TypeError("Channel without accessHash or min info cannot be input");
	}
	if (entity instanceof require_tl_generated_api.Api.ChannelForbidden || entity instanceof require_tl_generated_api.Api.CommunityForbidden) return new require_tl_generated_api.Api.InputPeerChannel({
		channelId: entity.id,
		accessHash: entity.accessHash || (0, big_integer.default)(0)
	});
	if (entity instanceof require_tl_generated_api.Api.InputUser) return new require_tl_generated_api.Api.InputPeerUser({
		userId: entity.userId,
		accessHash: entity.accessHash
	});
	if (entity instanceof require_tl_generated_api.Api.InputChannel) return new require_tl_generated_api.Api.InputPeerChannel({
		channelId: entity.channelId,
		accessHash: entity.accessHash
	});
	if (entity instanceof require_tl_generated_api.Api.UserEmpty) return new require_tl_generated_api.Api.InputPeerEmpty();
	if (entity instanceof require_tl_generated_api.Api.UserFull) return getInputPeer(entity.id);
	if (entity instanceof require_tl_generated_api.Api.ChatFull) return new require_tl_generated_api.Api.InputPeerChat({ chatId: entity.id });
	if (entity instanceof require_tl_generated_api.Api.PeerChat) return new require_tl_generated_api.Api.InputPeerChat({ chatId: entity.chatId });
	_raiseCastFail(entity, "InputPeer");
}
function _photoSizeByteCount(size) {
	if (size instanceof require_tl_generated_api.Api.PhotoSize) return size.size;
	else if (size instanceof require_tl_generated_api.Api.PhotoStrippedSize) {
		if (size.bytes.length < 3 || size.bytes[0] != 1) return size.bytes.length;
		return size.bytes.length + 622;
	} else if (size instanceof require_tl_generated_api.Api.PhotoCachedSize) return size.bytes.length;
	else if (size instanceof require_tl_generated_api.Api.PhotoSizeEmpty) return 0;
	else if (size instanceof require_tl_generated_api.Api.PhotoSizeProgressive) return size.sizes[size.sizes.length - 1];
	else return;
}
function _getEntityPair(entityId, entities, cache, getInputPeerFunction = getInputPeer) {
	const entity = entities.get(entityId);
	let inputEntity;
	try {
		inputEntity = cache.get(entityId);
	} catch (e) {
		try {
			inputEntity = getInputPeerFunction(entity);
		} catch (e) {}
	}
	return [entity, inputEntity];
}
function getInnerText(text, entities) {
	const result = [];
	entities.forEach(function(value, key) {
		const start = value.offset;
		const end = value.offset + value.length;
		result.push(text.slice(start, end));
	});
	return result;
}
/**
Similar to :meth:`get_input_peer`, but for :tl:`InputChannel`'s alone.

.. important::

This method does not validate for invalid general-purpose access
hashes, unlike `get_input_peer`. Consider using instead:
``get_input_channel(get_input_peer(channel))``.

* @param entity
* @returns {InputChannel|*}
*/
function getInputChannel(entity) {
	if (typeof entity === "string" || typeof entity == "number" || typeof entity == "bigint" || big_integer.default.isInstance(entity)) _raiseCastFail(entity, "InputChannel");
	if (entity.SUBCLASS_OF_ID === void 0) _raiseCastFail(entity, "InputChannel");
	if (entity.SUBCLASS_OF_ID === require_Helpers.unionId("InputChannel")) return entity;
	if (entity instanceof require_tl_generated_api.Api.Channel || entity instanceof require_tl_generated_api.Api.ChannelForbidden || entity instanceof require_tl_generated_api.Api.Community || entity instanceof require_tl_generated_api.Api.CommunityForbidden) return new require_tl_generated_api.Api.InputChannel({
		channelId: entity.id,
		accessHash: entity.accessHash || big_integer.default.zero
	});
	if (entity instanceof require_tl_generated_api.Api.InputPeerChannel) return new require_tl_generated_api.Api.InputChannel({
		channelId: entity.channelId,
		accessHash: entity.accessHash
	});
	if (entity instanceof require_tl_generated_api.Api.InputPeerChannelFromMessage) return new require_tl_generated_api.Api.InputChannelFromMessage({
		peer: entity.peer,
		msgId: entity.msgId,
		channelId: entity.channelId
	});
	_raiseCastFail(entity, "InputChannel");
}
/**
Similar to :meth:`getInputPeer`, but for :tl:`InputUser`'s alone.

.. important::

This method does not validate for invalid general-purpose access
hashes, unlike `get_input_peer`. Consider using instead:
``get_input_channel(get_input_peer(channel))``.

* @param entity
*/
function getInputUser(entity) {
	if (typeof entity === "string" || typeof entity == "number" || typeof entity == "bigint" || big_integer.default.isInstance(entity)) _raiseCastFail(entity, "InputUser");
	if (entity.SUBCLASS_OF_ID === void 0) _raiseCastFail(entity, "InputUser");
	if (entity.SUBCLASS_OF_ID === require_Helpers.unionId("InputUser")) return entity;
	if (entity instanceof require_tl_generated_api.Api.User) {
		if (entity.self) return new require_tl_generated_api.Api.InputUserSelf();
		else return new require_tl_generated_api.Api.InputUser({
			userId: entity.id,
			accessHash: entity.accessHash || big_integer.default.zero
		});
	}
	if (entity instanceof require_tl_generated_api.Api.InputPeerSelf) return new require_tl_generated_api.Api.InputUserSelf();
	if (entity instanceof require_tl_generated_api.Api.UserEmpty || entity instanceof require_tl_generated_api.Api.InputPeerEmpty) return new require_tl_generated_api.Api.InputUserEmpty();
	if (entity instanceof require_tl_generated_api.Api.UserFull) return getInputUser(entity);
	if (entity instanceof require_tl_generated_api.Api.InputPeerUser) return new require_tl_generated_api.Api.InputUser({
		userId: entity.userId,
		accessHash: entity.accessHash
	});
	if (entity instanceof require_tl_generated_api.Api.InputPeerUserFromMessage) return new require_tl_generated_api.Api.InputUserFromMessage({
		userId: entity.userId,
		peer: entity.peer,
		msgId: entity.msgId
	});
	_raiseCastFail(entity, "InputUser");
}
/**
Similar to :meth:`get_input_peer`, but for dialogs
* @param dialog
*/
/**
*  Similar to :meth:`get_input_peer`, but for input messages.
*/
function getInputMessage(message) {
	if (typeof message === "number") return new require_tl_generated_api.Api.InputMessageID({ id: message });
	if (message === void 0 || message.SUBCLASS_OF_ID === void 0) _raiseCastFail(message, "InputMessage");
	if (message.SUBCLASS_OF_ID === require_Helpers.unionId("InputMessage")) return message;
	else if (message.SUBCLASS_OF_ID === require_Helpers.unionId("Message")) return new require_tl_generated_api.Api.InputMessageID({ id: message.id });
	_raiseCastFail(message, "InputMessage");
}
/**
*  Similar to :meth:`get_input_peer`, but for input messages.
*/
function getInputChatPhoto(photo) {
	if (photo === void 0 || photo.SUBCLASS_OF_ID === void 0) _raiseCastFail(photo, "InputChatPhoto");
	if (photo.SUBCLASS_OF_ID === require_Helpers.unionId("InputChatPhoto")) return photo;
	else if (photo.SUBCLASS_OF_ID === require_Helpers.unionId("InputFile")) return new require_tl_generated_api.Api.InputChatUploadedPhoto({ file: photo });
	photo = getInputPhoto(photo);
	if (photo instanceof require_tl_generated_api.Api.InputPhoto) return new require_tl_generated_api.Api.InputChatPhoto({ id: photo });
	else if (photo instanceof require_tl_generated_api.Api.InputPhotoEmpty) return new require_tl_generated_api.Api.InputChatPhotoEmpty();
	_raiseCastFail(photo, "InputChatPhoto");
}
/**
* Adds the JPG header and footer to a stripped image.
* Ported from https://github.com/telegramdesktop/tdesktop/blob/bec39d89e19670eb436dc794a8f20b657cb87c71/Telegram/SourceFiles/ui/image/image.cpp#L225

* @param stripped - the stripped image bytes
* @returns the JPG image bytes
*/
function strippedPhotoToJpg(stripped) {
	if (stripped.length < 3 || stripped[0] !== 1) return stripped;
	const header = require_platform_buffer_index.Buffer.from(JPEG_HEADER);
	header[164] = stripped[1];
	header[166] = stripped[2];
	return require_platform_buffer_index.Buffer.concat([
		header,
		stripped.slice(3),
		JPEG_FOOTER
	]);
}
/**
*  Similar to :meth:`get_input_peer`, but for photos
*/
function getInputPhoto(photo) {
	if (photo.SUBCLASS_OF_ID === void 0) _raiseCastFail(photo, "InputPhoto");
	if (photo.SUBCLASS_OF_ID === require_Helpers.unionId("InputPhoto")) return photo;
	if (photo instanceof require_tl_generated_api.Api.Message) photo = photo.media;
	if (photo instanceof require_tl_generated_api.Api.photos.Photo || photo instanceof require_tl_generated_api.Api.MessageMediaPhoto) photo = photo.photo;
	if (photo instanceof require_tl_generated_api.Api.Photo) return new require_tl_generated_api.Api.InputPhoto({
		id: photo.id,
		accessHash: photo.accessHash,
		fileReference: photo.fileReference
	});
	if (photo instanceof require_tl_generated_api.Api.PhotoEmpty) return new require_tl_generated_api.Api.InputPhotoEmpty();
	if (photo instanceof require_tl_generated_api.Api.messages.ChatFull) photo = photo.fullChat;
	if (photo instanceof require_tl_generated_api.Api.ChannelFull) return getInputPhoto(photo.chatPhoto);
	else if (photo instanceof require_tl_generated_api.Api.UserFull) return getInputPhoto(photo.profilePhoto);
	else if (photo instanceof require_tl_generated_api.Api.Channel || photo instanceof require_tl_generated_api.Api.Chat || photo instanceof require_tl_generated_api.Api.User || photo instanceof require_tl_generated_api.Api.Community) return getInputPhoto(photo.photo);
	if (photo instanceof require_tl_generated_api.Api.UserEmpty || photo instanceof require_tl_generated_api.Api.ChatEmpty || photo instanceof require_tl_generated_api.Api.ChatForbidden || photo instanceof require_tl_generated_api.Api.ChannelForbidden || photo instanceof require_tl_generated_api.Api.CommunityForbidden) return new require_tl_generated_api.Api.InputPhotoEmpty();
	_raiseCastFail(photo, "InputPhoto");
}
/**
*  Similar to :meth:`get_input_peer`, but for documents
*/
function getInputDocument(document) {
	if (document.SUBCLASS_OF_ID === void 0) _raiseCastFail(document, "InputDocument");
	if (document.SUBCLASS_OF_ID === require_Helpers.unionId("InputDocument")) return document;
	if (document instanceof require_tl_generated_api.Api.Document) return new require_tl_generated_api.Api.InputDocument({
		id: document.id,
		accessHash: document.accessHash,
		fileReference: document.fileReference
	});
	if (document instanceof require_tl_generated_api.Api.DocumentEmpty) return new require_tl_generated_api.Api.InputDocumentEmpty();
	if (document instanceof require_tl_generated_api.Api.MessageMediaDocument) return getInputDocument(document.document);
	if (document instanceof require_tl_generated_api.Api.Message) return getInputDocument(document.media);
	_raiseCastFail(document, "InputDocument");
}
/**
*  Returns `True` if the file has an audio mime type.
*/
function isAudio(file) {
	const ext = _getExtension(file);
	if (!ext) return (_getMetadata(file).get("mimeType") || "").startsWith("audio/");
	else {
		file = "a" + ext;
		return (mime.default.getType(file) || "").startsWith("audio/");
	}
}
/**
*  Returns `True` if the file has an image mime type.
*/
function isImage(file) {
	const ext = _getExtension(file).toLowerCase();
	return ext.endsWith(".png") || ext.endsWith(".jpg") || ext.endsWith(".jpeg");
}
function getExtension(media) {
	try {
		getInputPhoto(media);
		return ".jpg";
	} catch (e) {}
	if (media instanceof require_tl_generated_api.Api.UserProfilePhoto || media instanceof require_tl_generated_api.Api.ChatPhoto) return ".jpg";
	if (media instanceof require_tl_generated_api.Api.MessageMediaDocument) media = media.document;
	if (media instanceof require_tl_generated_api.Api.Document || media instanceof require_tl_generated_api.Api.WebDocument || media instanceof require_tl_generated_api.Api.WebDocumentNoProxy) {
		if (media.mimeType === "application/octet-stream") return "";
		else return mime.default.getExtension(media.mimeType) || "";
	}
	return "";
}
/**
* Gets the extension for the given file, which can be either a
* str or an ``open()``'ed file (which has a ``.name`` attribute).
*/
function _getExtension(file) {
	if (typeof file === "string") return "." + file.split(".").pop();
	else if ("name" in file) return _getExtension(file.name);
	else return getExtension(file);
}
function _getMetadata(file) {
	return /* @__PURE__ */ new Map();
}
function isVideo(file) {
	const ext = _getExtension(file);
	if (!ext) {
		const metadata = _getMetadata(file);
		if (metadata.has("mimeType")) return metadata.get("mimeType")?.startsWith("video/") || false;
		else return false;
	} else {
		file = "a" + ext;
		return (mime.default.getType(file) || "").startsWith("video/");
	}
}
/**
Get a list of attributes for the given file and
the mime type as a tuple ([attribute], mime_type).
*/
function getAttributes(file, { attributes = null, mimeType = void 0, forceDocument = false, voiceNote = false, videoNote = false, supportsStreaming = false, thumb = null }) {
	const name = typeof file == "string" ? file : "name" in file ? file.name || "unnamed" : "unnamed";
	if (mimeType === void 0) mimeType = mime.default.getType(name) || "application/octet-stream";
	const attrObj = /* @__PURE__ */ new Map();
	attrObj.set(require_tl_generated_api.Api.DocumentAttributeFilename, new require_tl_generated_api.Api.DocumentAttributeFilename({ fileName: name.split(/[\\/]/).pop() || "" }));
	if (isAudio(file)) {
		const m = _getMetadata(file);
		attrObj.set(require_tl_generated_api.Api.DocumentAttributeAudio, new require_tl_generated_api.Api.DocumentAttributeAudio({
			voice: voiceNote,
			title: m.has("title") ? m.get("title") : void 0,
			performer: m.has("author") ? m.get("author") : void 0,
			duration: Number.parseInt(m.get("duration") ?? "0")
		}));
	}
	if (!forceDocument && isVideo(file)) {
		let doc;
		if (thumb) {
			const t_m = _getMetadata(thumb);
			const width = Number.parseInt(t_m?.get("width") || "1");
			const height = Number.parseInt(t_m?.get("height") || "1");
			doc = new require_tl_generated_api.Api.DocumentAttributeVideo({
				duration: 0,
				h: height,
				w: width,
				roundMessage: videoNote,
				supportsStreaming
			});
		} else {
			const m = _getMetadata(file);
			doc = new require_tl_generated_api.Api.DocumentAttributeVideo({
				roundMessage: videoNote,
				w: Number.parseInt(m.get("width") ?? "1"),
				h: Number.parseInt(m.get("height") ?? "1"),
				duration: Number.parseInt(m.get("duration") ?? "0"),
				supportsStreaming
			});
		}
		attrObj.set(require_tl_generated_api.Api.DocumentAttributeVideo, doc);
	}
	if (videoNote) {
		if (attrObj.has(require_tl_generated_api.Api.DocumentAttributeAudio)) attrObj.get(require_tl_generated_api.Api.DocumentAttributeAudio).voice = true;
		else attrObj.set(require_tl_generated_api.Api.DocumentAttributeAudio, new require_tl_generated_api.Api.DocumentAttributeAudio({
			duration: 0,
			voice: true
		}));
	}
	if (attributes) for (const a of attributes) attrObj.set(a.constructor, a);
	return {
		attrs: Array.from(attrObj.values()),
		mimeType
	};
}
/**
*  Similar to :meth:`get_input_peer`, but for geo points
*/
function getInputGeo(geo) {
	if (geo === void 0 || geo.SUBCLASS_OF_ID === void 0) _raiseCastFail(geo, "InputGeoPoint");
	if (geo.SUBCLASS_OF_ID === require_Helpers.unionId("InputGeoPoint")) return geo;
	if (geo instanceof require_tl_generated_api.Api.GeoPoint) return new require_tl_generated_api.Api.InputGeoPoint({
		lat: geo.lat,
		long: geo.long
	});
	if (geo instanceof require_tl_generated_api.Api.GeoPointEmpty) return new require_tl_generated_api.Api.InputGeoPointEmpty();
	if (geo instanceof require_tl_generated_api.Api.MessageMediaGeo) return getInputGeo(geo.geo);
	if (geo instanceof require_tl_generated_api.Api.Message) return getInputGeo(geo.media);
	_raiseCastFail(geo, "InputGeoPoint");
}
/**
*
Similar to :meth:`get_input_peer`, but for media.

If the media is :tl:`InputFile` and ``is_photo`` is known to be `True`,
it will be treated as an :tl:`InputMediaUploadedPhoto`. Else, the rest
of parameters will indicate how to treat it.
* @param media - the media to convert
* @param params - how to treat an uploaded file
* @param params.isPhoto - whether it's a photo or not
*/
function getInputMedia(media, { isPhoto = false, attributes = void 0, forceDocument = false, voiceNote = false, videoNote = false, supportsStreaming = false, spoiler = void 0, ttlSeconds = void 0, videoCover = void 0, videoTimestamp = void 0, nosoundVideo = void 0 } = {}) {
	if (media.SUBCLASS_OF_ID === void 0) _raiseCastFail(media, "InputMedia");
	if (media.SUBCLASS_OF_ID === require_Helpers.unionId("InputMedia")) return media;
	else if (media.SUBCLASS_OF_ID === require_Helpers.unionId("InputPhoto")) return new require_tl_generated_api.Api.InputMediaPhoto({
		id: media,
		spoiler,
		ttlSeconds
	});
	else if (media.SUBCLASS_OF_ID === require_Helpers.unionId("InputDocument")) return new require_tl_generated_api.Api.InputMediaDocument({
		id: media,
		spoiler,
		ttlSeconds,
		videoCover,
		videoTimestamp
	});
	if (media instanceof require_tl_generated_api.Api.MessageMediaPhoto) return new require_tl_generated_api.Api.InputMediaPhoto({
		id: getInputPhoto(media.photo),
		spoiler,
		ttlSeconds: ttlSeconds ?? media.ttlSeconds
	});
	if (media instanceof require_tl_generated_api.Api.Photo || media instanceof require_tl_generated_api.Api.photos.Photo || media instanceof require_tl_generated_api.Api.PhotoEmpty) return new require_tl_generated_api.Api.InputMediaPhoto({
		id: getInputPhoto(media),
		spoiler,
		ttlSeconds
	});
	if (media instanceof require_tl_generated_api.Api.MessageMediaDocument) return new require_tl_generated_api.Api.InputMediaDocument({
		id: getInputDocument(media.document),
		spoiler,
		ttlSeconds: ttlSeconds ?? media.ttlSeconds,
		videoCover,
		videoTimestamp
	});
	if (media instanceof require_tl_generated_api.Api.Document || media instanceof require_tl_generated_api.Api.DocumentEmpty) return new require_tl_generated_api.Api.InputMediaDocument({
		id: getInputDocument(media),
		spoiler,
		ttlSeconds,
		videoCover,
		videoTimestamp
	});
	if (media instanceof require_tl_generated_api.Api.InputFile || media instanceof require_tl_generated_api.Api.InputFileBig) {
		if (isPhoto) return new require_tl_generated_api.Api.InputMediaUploadedPhoto({
			file: media,
			spoiler,
			ttlSeconds
		});
		else {
			const { attrs, mimeType } = getAttributes(media, {
				attributes,
				forceDocument,
				voiceNote,
				videoNote,
				supportsStreaming
			});
			return new require_tl_generated_api.Api.InputMediaUploadedDocument({
				file: media,
				mimeType,
				attributes: attrs,
				forceFile: forceDocument,
				spoiler,
				ttlSeconds,
				videoCover,
				videoTimestamp,
				nosoundVideo
			});
		}
	}
	if (media instanceof require_tl_generated_api.Api.MessageMediaGame) return new require_tl_generated_api.Api.InputMediaGame({ id: new require_tl_generated_api.Api.InputGameID({
		id: media.game.id,
		accessHash: media.game.accessHash
	}) });
	if (media instanceof require_tl_generated_api.Api.MessageMediaContact) return new require_tl_generated_api.Api.InputMediaContact({
		phoneNumber: media.phoneNumber,
		firstName: media.firstName,
		lastName: media.lastName,
		vcard: ""
	});
	if (media instanceof require_tl_generated_api.Api.MessageMediaGeo) return new require_tl_generated_api.Api.InputMediaGeoPoint({ geoPoint: getInputGeo(media.geo) });
	if (media instanceof require_tl_generated_api.Api.MessageMediaVenue) return new require_tl_generated_api.Api.InputMediaVenue({
		geoPoint: getInputGeo(media.geo),
		title: media.title,
		address: media.address,
		provider: media.provider,
		venueId: media.venueId,
		venueType: ""
	});
	if (media instanceof require_tl_generated_api.Api.MessageMediaDice) return new require_tl_generated_api.Api.InputMediaDice({ emoticon: media.emoticon });
	if (media instanceof require_tl_generated_api.Api.MessageMediaEmpty || media instanceof require_tl_generated_api.Api.MessageMediaUnsupported || media instanceof require_tl_generated_api.Api.ChatPhotoEmpty || media instanceof require_tl_generated_api.Api.UserProfilePhotoEmpty || media instanceof require_tl_generated_api.Api.ChatPhoto || media instanceof require_tl_generated_api.Api.UserProfilePhoto) return new require_tl_generated_api.Api.InputMediaEmpty();
	if (media instanceof require_tl_generated_api.Api.Message) return getInputMedia(media.media, { isPhoto });
	if (media instanceof require_tl_generated_api.Api.MessageMediaPoll) {
		let correctAnswers;
		if (media.poll.quiz) {
			if (!media.results.results) throw new Error("Cannot cast unanswered quiz to any kind of InputMedia.");
			correctAnswers = [];
			for (const r of media.results.results) if (r.correct) correctAnswers.push(r.option);
		} else correctAnswers = void 0;
		const pollWithInputAnswers = new require_tl_generated_api.Api.Poll({
			id: media.poll.id,
			question: media.poll.question,
			answers: media.poll.answers.map((a) => {
				if (!(a instanceof require_tl_generated_api.Api.PollAnswer)) return a;
				return new require_tl_generated_api.Api.PollAnswer({
					text: a.text,
					option: a.option,
					media: a.media ? getInputMedia(a.media) : void 0,
					addedBy: a.addedBy,
					date: a.date
				});
			}),
			closed: media.poll.closed,
			publicVoters: media.poll.publicVoters,
			multipleChoice: media.poll.multipleChoice,
			quiz: media.poll.quiz,
			openAnswers: media.poll.openAnswers,
			revotingDisabled: media.poll.revotingDisabled,
			shuffleAnswers: media.poll.shuffleAnswers,
			hideResultsUntilClose: media.poll.hideResultsUntilClose,
			creator: media.poll.creator,
			closePeriod: media.poll.closePeriod,
			closeDate: media.poll.closeDate,
			hash: media.poll.hash
		});
		return new require_tl_generated_api.Api.InputMediaPoll({
			poll: pollWithInputAnswers,
			correctAnswers,
			solution: media.results.solution,
			solutionEntities: media.results.solutionEntities,
			attachedMedia: media.attachedMedia ? getInputMedia(media.attachedMedia) : void 0,
			solutionMedia: media.results.solutionMedia ? getInputMedia(media.results.solutionMedia) : void 0
		});
	}
	if (media instanceof require_tl_generated_api.Api.Poll) return new require_tl_generated_api.Api.InputMediaPoll({ poll: media });
	_raiseCastFail(media, "InputMedia");
}
/**
* Gets the appropriated part size when uploading or downloading files,
* given an initial file size.
* @param fileSize
* @returns {Number}
*/
function getAppropriatedPartSize(fileSize) {
	if (fileSize.lesser(104857600)) return 128;
	if (fileSize.lesser(786432e3)) return 256;
	return 512;
}
function getPeer(peer) {
	if (!peer) _raiseCastFail(peer, "undefined");
	if (typeof peer === "string") _raiseCastFail(peer, "peer");
	if (typeof peer == "number" || typeof peer == "bigint") peer = require_Helpers.returnBigInt(peer);
	try {
		if (big_integer.default.isInstance(peer)) {
			const res = resolveId(peer);
			if (res[1] === require_tl_generated_api.Api.PeerChannel) return new require_tl_generated_api.Api.PeerChannel({ channelId: res[0] });
			else if (res[1] === require_tl_generated_api.Api.PeerChat) return new require_tl_generated_api.Api.PeerChat({ chatId: res[0] });
			else return new require_tl_generated_api.Api.PeerUser({ userId: res[0] });
		}
		if (peer.SUBCLASS_OF_ID === void 0) throw new Error();
		if (peer.SUBCLASS_OF_ID === require_Helpers.unionId("Peer")) return peer;
		else if (peer instanceof require_tl_generated_api.Api.contacts.ResolvedPeer || peer instanceof require_tl_generated_api.Api.InputNotifyPeer || peer instanceof require_tl_generated_api.Api.TopPeer || peer instanceof require_tl_generated_api.Api.Dialog || peer instanceof require_tl_generated_api.Api.DialogPeer) return peer.peer;
		else if (peer instanceof require_tl_generated_api.Api.ChannelFull || peer instanceof require_tl_generated_api.Api.CommunityFull) return new require_tl_generated_api.Api.PeerChannel({ channelId: peer.id });
		else if (peer instanceof require_tl_generated_api.Api.DialogCommunity || peer instanceof require_tl_generated_api.Api.DialogPeerCommunity || peer instanceof require_tl_generated_api.Api.NotifyCommunity) return new require_tl_generated_api.Api.PeerChannel({ channelId: peer.communityId });
		else if (peer instanceof require_tl_generated_api.Api.InputDialogPeerCommunity || peer instanceof require_tl_generated_api.Api.InputNotifyCommunity) return getPeer(peer.community);
		if (peer.SUBCLASS_OF_ID === require_Helpers.unionId("ChatParticipant") || peer.SUBCLASS_OF_ID === require_Helpers.unionId("ChannelParticipant")) {
			if ("userId" in peer) return new require_tl_generated_api.Api.PeerUser({ userId: peer.userId });
		}
		peer = getInputPeer(peer, false, false);
		if (peer instanceof require_tl_generated_api.Api.InputPeerUser) return new require_tl_generated_api.Api.PeerUser({ userId: peer.userId });
		else if (peer instanceof require_tl_generated_api.Api.InputPeerChat) return new require_tl_generated_api.Api.PeerChat({ chatId: peer.chatId });
		else if (peer instanceof require_tl_generated_api.Api.InputPeerChannel) return new require_tl_generated_api.Api.PeerChannel({ channelId: peer.channelId });
	} catch (e) {}
	_raiseCastFail(peer, "peer");
}
/**
Convert the given peer into its marked ID by default.

This "mark" comes from the "bot api" format, and with it the peer type
can be identified back. User ID is left unmodified, chat ID is negated,
and channel ID is prefixed with -100:

* ``userId``
* ``-chatId``
* ``-100channel_id``

The original ID and the peer type class can be returned with
a call to :meth:`resolve_id(marked_id)`.
* @param peer
* @param addMark
*/
function getPeerId(peer, addMark = true) {
	if (typeof peer == "string" && parseID(peer)) peer = require_Helpers.returnBigInt(peer);
	if (big_integer.default.isInstance(peer)) return addMark ? peer.toString() : resolveId(peer)[0].toString();
	if (peer instanceof require_tl_generated_api.Api.InputPeerSelf) _raiseCastFail(peer, "int (you might want to use client.get_peer_id)");
	try {
		peer = getPeer(peer);
	} catch (e) {
		_raiseCastFail(peer, "int");
	}
	if (peer instanceof require_tl_generated_api.Api.PeerUser) return peer.userId.toString();
	else if (peer instanceof require_tl_generated_api.Api.PeerChat) {
		const chatId = resolveId(require_Helpers.returnBigInt(peer.chatId))[0];
		return addMark ? chatId.negate().toString() : chatId.toString();
	} else if (typeof peer == "object" && "channelId" in peer) {
		const channelId = resolveId(require_Helpers.returnBigInt(peer.channelId))[0];
		return addMark ? "-100" + channelId.toString() : channelId.toString();
	}
	_raiseCastFail(peer, "int");
}
/**
* Given a marked ID, returns the original ID and its :tl:`Peer` type.
* @param markedId
*/
function resolveId(markedId) {
	if (markedId.greaterOrEquals(big_integer.default.zero)) return [markedId, require_tl_generated_api.Api.PeerUser];
	const m = markedId.toString().match(/-100([^0]\d*)/);
	if (m) return [(0, big_integer.default)(m[1]), require_tl_generated_api.Api.PeerChannel];
	return [markedId.negate(), require_tl_generated_api.Api.PeerChat];
}
/**
* returns an entity pair
* @param entityId
* @param entities
* @param cache
* @param getInputPeer
* @returns {{inputEntity: *, entity: *}}
* @private
*/
function getMessageId(message) {
	if (!message) return;
	else if (typeof message === "number") return message;
	else if (message.SUBCLASS_OF_ID === require_Helpers.unionId("Message") || "id" in message) return message.id;
	else throw new Error(`Invalid message type: ${message.constructor.name}`);
}
/**
* Parses the given phone, or returns `undefined` if it's invalid.
* @param phone
*/
function parsePhone(phone) {
	phone = phone.toString().replace(/[()\s-]/gm, "");
	if (phone.startsWith("+") && phone.split("+").length - 1 == 1) return !isNaN(Number(phone)) ? phone.replace("+", "") : void 0;
}
/**
* Parses a string ID into a big int
* @param id
*/
function parseID(id) {
	return /^(-?[0-9][0-9]*)$/.test(id) ? (0, big_integer.default)(id) : void 0;
}
/**
* Parses a Telegram invite link and extracts the hash.
* Supports formats like:
* - https://t.me/joinchat/HASH
* - https://t.me/+HASH
* - tg://join?invite=HASH
* @param link The invite link
* @returns The invite hash, or undefined if not a valid invite link
*/
function resolveInviteLink(link) {
	if (!link) return;
	link = link.trim();
	const tmeMatch = link.match(/(?:https?:\/\/)?(?:www\.)?(?:telegram\.(?:me|dog)|t\.me)\/(?:joinchat\/|\+)([a-zA-Z0-9_-]+)/i);
	if (tmeMatch) return tmeMatch[1];
	const tgMatch = link.match(/tg:\/\/join\?invite=([a-zA-Z0-9_-]+)/i);
	if (tgMatch) return tgMatch[1];
}
/**
Parses the given username or channel access hash, given
a string, username or URL. Returns a tuple consisting of
both the stripped, lowercase username and whether it is
a joinchat/ hash (in which case is not lowercase'd).

Returns ``(undefined, false)`` if the ``username`` or link is not valid.

* @param username {string}
*/
function parseUsername(username) {
	username = username.trim();
	const m = username.match(USERNAME_RE) || username.match(TG_JOIN_RE);
	if (m) {
		username = username.replace(m[0], "");
		if (m[1]) return {
			username,
			isInvite: true
		};
		else username = rtrim(username, "/");
	}
	if (username.match(VALID_USERNAME_RE)) return {
		username: username.toLowerCase(),
		isInvite: false
	};
	else return {
		username: void 0,
		isInvite: false
	};
}
function rtrim(s, mask) {
	while (~mask.indexOf(s[s.length - 1])) s = s.slice(0, -1);
	return s;
}
/**
* Gets the display name for the given :tl:`User`,
:tl:`Chat` or :tl:`Channel`. Returns an empty string otherwise
* @param entity
*/
function getDisplayName(entity) {
	if (entity instanceof require_tl_generated_api.Api.User) {
		if (entity.lastName && entity.firstName) return `${entity.firstName} ${entity.lastName}`;
		else if (entity.firstName) return entity.firstName;
		else if (entity.lastName) return entity.lastName;
		else return "";
	} else if (entity instanceof require_tl_generated_api.Api.Chat || entity instanceof require_tl_generated_api.Api.Channel || entity instanceof require_tl_generated_api.Api.Community || entity instanceof require_tl_generated_api.Api.CommunityForbidden) return entity.title;
	return "";
}
/**
* Returns `True` if the file is a GIF.
*/
function isGif(file) {
	if (_getExtension(file).toLowerCase() === ".gif") return true;
	return (_getMetadata(file).get("mimeType") || "") === "image/gif";
}
/**
* Encodes the given array of 5-bit values into a waveform bytestring.
* Used for voice message waveforms.
* @param waveform Array of numbers (0-31, 5 bits each)
* @returns Buffer with encoded waveform
*/
function encodeWaveform(waveform) {
	const bitCount = waveform.length * 5;
	const byteCount = Math.floor((bitCount + 7) / 8);
	const result = require_platform_buffer_index.Buffer.alloc(byteCount);
	let bitPos = 0;
	for (const value of waveform) {
		const bytePos = Math.floor(bitPos / 8);
		const shift = bitPos % 8;
		result[bytePos] |= (value & 31) << shift;
		if (shift > 3 && bytePos + 1 < byteCount) result[bytePos + 1] |= (value & 31) >> 8 - shift;
		bitPos += 5;
	}
	return result;
}
/**
* Decodes a waveform bytestring into an array of 5-bit values.
* @param waveform Buffer with encoded waveform
* @param valueCount Number of values to decode (default: calculated from buffer size)
* @returns Array of numbers (0-31)
*/
function decodeWaveform(waveform, valueCount) {
	if (!waveform || waveform.length === 0) return [];
	const bitCount = waveform.length * 8;
	const count = valueCount ?? Math.floor(bitCount / 5);
	const result = [];
	let bitPos = 0;
	for (let i = 0; i < count; i++) {
		const bytePos = Math.floor(bitPos / 8);
		const shift = bitPos % 8;
		let value = waveform[bytePos] >> shift & 31;
		if (shift > 3 && bytePos + 1 < waveform.length) value |= waveform[bytePos + 1] << 8 - shift & 31;
		result.push(value);
		bitPos += 5;
	}
	return result;
}
/**
* Splits a message text while preserving formatting entities.
* Useful for sending messages that exceed Telegram's character limit.
* @param text The text to split
* @param entities The formatting entities
* @param limit Maximum length per chunk (default: 4096)
* @returns Array of [text, entities] tuples
*/
function splitText(text, entities = [], limit = 4096) {
	if (text.length <= limit) return [[text, entities]];
	const result = [];
	let offset = 0;
	while (offset < text.length) {
		let end = Math.min(offset + limit, text.length);
		if (end < text.length) {
			const newlinePos = text.lastIndexOf("\n", end);
			const spacePos = text.lastIndexOf(" ", end);
			if (newlinePos > offset + limit / 2) end = newlinePos + 1;
			else if (spacePos > offset + limit / 2) end = spacePos + 1;
		}
		const chunk = text.slice(offset, end);
		const chunkEntities = [];
		for (const entity of entities) {
			const entityEnd = entity.offset + entity.length;
			if (entityEnd <= offset) continue;
			if (entity.offset >= end) continue;
			const newOffset = Math.max(0, entity.offset - offset);
			const newLength = Math.min(entity.length, end - offset - newOffset, entityEnd - offset - newOffset);
			if (newLength > 0) {
				const clonedEntity = Object.assign(Object.create(Object.getPrototypeOf(entity)), entity, {
					offset: newOffset,
					length: newLength
				});
				chunkEntities.push(clonedEntity);
			}
		}
		result.push([chunk, chunkEntities]);
		offset = end;
	}
	return result;
}
/**
* Similar to getInputPeer, but for InputDialogPeer.
* @param dialog The dialog to convert
*/
function getInputDialog(dialog) {
	if (dialog.inputDialog) return dialog.inputDialog;
	if (dialog.SUBCLASS_OF_ID === void 0) _raiseCastFail(dialog, "InputDialogPeer");
	if (dialog.SUBCLASS_OF_ID === require_Helpers.unionId("InputDialogPeer")) return dialog;
	if (dialog instanceof require_tl_generated_api.Api.Community || dialog instanceof require_tl_generated_api.Api.CommunityForbidden) return new require_tl_generated_api.Api.InputDialogPeerCommunity({ community: getInputChannel(getInputPeer(dialog)) });
	if (dialog.SUBCLASS_OF_ID === require_Helpers.unionId("InputPeer")) return new require_tl_generated_api.Api.InputDialogPeer({ peer: dialog });
	try {
		return new require_tl_generated_api.Api.InputDialogPeer({ peer: getInputPeer(dialog) });
	} catch (e) {
		_raiseCastFail(dialog, "InputDialogPeer");
	}
}
const FILE_REFERENCE_FLAG = 16777216;
const WEB_LOCATION_FLAG = 33554432;
function _rleDecodeFileId(data) {
	const result = [];
	let i = 0;
	while (i < data.length) if (data[i] === 0 && i + 1 < data.length) {
		const count = data[i + 1];
		for (let j = 0; j < count; j++) result.push(0);
		i += 2;
	} else {
		result.push(data[i]);
		i += 1;
	}
	return require_platform_buffer_index.Buffer.from(result);
}
function _rleEncodeFileId(data) {
	const result = [];
	let i = 0;
	while (i < data.length) if (data[i] === 0) {
		let count = 0;
		while (i < data.length && data[i] === 0 && count < 255) {
			count++;
			i++;
		}
		result.push(0, count);
	} else {
		result.push(data[i]);
		i++;
	}
	return require_platform_buffer_index.Buffer.from(result);
}
/**
* Decodes a bot API file_id into the corresponding InputDocument/InputPhoto.
* @param fileId The bot API file_id string
* @returns InputDocument, InputPhoto, or undefined if decoding fails
*/
function resolveBotFileId(fileId) {
	try {
		const data = require_platform_buffer_index.Buffer.from(fileId.replace(/-/g, "+").replace(/_/g, "/"), "base64");
		if (data.length < 8) return;
		const decoded = _rleDecodeFileId(data);
		if (!decoded || decoded.length < 8) return;
		let offset = 0;
		const fileType = decoded.readUInt32LE(offset);
		offset += 4;
		offset += 4;
		const hasFileReference = (fileType & FILE_REFERENCE_FLAG) !== 0;
		const hasWebLocation = (fileType & WEB_LOCATION_FLAG) !== 0;
		const actualFileType = fileType & 16777215;
		if (hasWebLocation) return;
		let fileReference = require_platform_buffer_index.Buffer.alloc(0);
		if (hasFileReference && offset < decoded.length) {
			const refLength = decoded[offset];
			offset += 1;
			if (offset + refLength <= decoded.length) {
				fileReference = require_platform_buffer_index.Buffer.from(decoded.subarray(offset, offset + refLength));
				offset += refLength;
			}
		}
		if (offset + 16 > decoded.length) return;
		const id = decoded.readBigInt64LE(offset);
		offset += 8;
		const accessHash = decoded.readBigInt64LE(offset);
		if (actualFileType === 2 || actualFileType === 1) return new require_tl_generated_api.Api.InputPhoto({
			id: (0, big_integer.default)(id.toString()),
			accessHash: (0, big_integer.default)(accessHash.toString()),
			fileReference
		});
		else return new require_tl_generated_api.Api.InputDocument({
			id: (0, big_integer.default)(id.toString()),
			accessHash: (0, big_integer.default)(accessHash.toString()),
			fileReference
		});
	} catch (e) {
		return;
	}
}
/**
* Encodes a document or photo into a bot API file_id.
* @param media The media object (Document, Photo, etc.)
* @returns The encoded file_id string, or undefined if encoding fails
*/
function packBotFileId(media) {
	try {
		let id;
		let accessHash;
		let fileReference = require_platform_buffer_index.Buffer.alloc(0);
		let fileType;
		let dcId = 0;
		if (media instanceof require_tl_generated_api.Api.Document) {
			id = media.id;
			accessHash = media.accessHash;
			fileReference = require_platform_buffer_index.Buffer.from(media.fileReference);
			dcId = media.dcId;
			if (media.mimeType === "audio/ogg") fileType = 3;
			else if (media.mimeType?.startsWith("audio/")) fileType = 9;
			else if (media.mimeType?.startsWith("video/")) fileType = media.attributes?.some((a) => a instanceof require_tl_generated_api.Api.DocumentAttributeVideo && a.roundMessage) ? 13 : 4;
			else if (media.mimeType === "application/x-tgsticker" || media.mimeType === "image/webp") fileType = 8;
			else if (media.mimeType === "video/mp4" || media.mimeType === "image/gif") fileType = 10;
			else fileType = 5;
		} else if (media instanceof require_tl_generated_api.Api.Photo) {
			id = media.id;
			accessHash = media.accessHash;
			fileReference = require_platform_buffer_index.Buffer.from(media.fileReference);
			dcId = media.dcId;
			fileType = 2;
		} else if (media instanceof require_tl_generated_api.Api.InputDocument) {
			id = media.id;
			accessHash = media.accessHash;
			fileReference = media.fileReference ? require_platform_buffer_index.Buffer.from(media.fileReference) : require_platform_buffer_index.Buffer.alloc(0);
			fileType = 5;
		} else if (media instanceof require_tl_generated_api.Api.InputPhoto) {
			id = media.id;
			accessHash = media.accessHash;
			fileReference = media.fileReference ? require_platform_buffer_index.Buffer.from(media.fileReference) : require_platform_buffer_index.Buffer.alloc(0);
			fileType = 2;
		} else return;
		const hasFileRef = fileReference.length > 0;
		const typeWithFlags = fileType | (hasFileRef ? FILE_REFERENCE_FLAG : 0);
		const bufferSize = 8 + (hasFileRef ? 1 + fileReference.length : 0) + 8 + 8;
		const buffer = require_platform_buffer_index.Buffer.alloc(bufferSize);
		let offset = 0;
		buffer.writeUInt32LE(typeWithFlags, offset);
		offset += 4;
		buffer.writeUInt32LE(dcId, offset);
		offset += 4;
		if (hasFileRef) {
			buffer.writeUInt8(fileReference.length, offset);
			offset += 1;
			fileReference.copy(buffer, offset);
			offset += fileReference.length;
		}
		buffer.writeBigInt64LE(BigInt(id.toString()), offset);
		offset += 8;
		buffer.writeBigInt64LE(BigInt(accessHash.toString()), offset);
		return _rleEncodeFileId(buffer).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	} catch (e) {
		return;
	}
}
/**
* check if a given item is an array like or not
* @param item
* @returns {boolean}
*/
Object.defineProperty(exports, "Utils_exports", {
	enumerable: true,
	get: function() {
		return Utils_exports;
	}
});
exports._getEntityPair = _getEntityPair;
exports._photoSizeByteCount = _photoSizeByteCount;
exports.chunks = chunks;
exports.decodeWaveform = decodeWaveform;
exports.encodeWaveform = encodeWaveform;
exports.getAppropriatedPartSize = getAppropriatedPartSize;
exports.getAttributes = getAttributes;
exports.getDisplayName = getDisplayName;
exports.getExtension = getExtension;
exports.getFileInfo = getFileInfo;
exports.getInnerText = getInnerText;
exports.getInputChannel = getInputChannel;
exports.getInputChatPhoto = getInputChatPhoto;
exports.getInputDialog = getInputDialog;
exports.getInputDocument = getInputDocument;
exports.getInputGeo = getInputGeo;
exports.getInputMedia = getInputMedia;
exports.getInputMessage = getInputMessage;
exports.getInputPeer = getInputPeer;
exports.getInputPhoto = getInputPhoto;
exports.getInputUser = getInputUser;
exports.getMessageId = getMessageId;
exports.getPeer = getPeer;
exports.getPeerId = getPeerId;
exports.isAudio = isAudio;
exports.isGif = isGif;
exports.isImage = isImage;
exports.packBotFileId = packBotFileId;
exports.parseID = parseID;
exports.parsePhone = parsePhone;
exports.parseUsername = parseUsername;
exports.resolveBotFileId = resolveBotFileId;
exports.resolveId = resolveId;
exports.resolveInviteLink = resolveInviteLink;
exports.rtrim = rtrim;
exports.splitText = splitText;
exports.strippedPhotoToJpg = strippedPhotoToJpg;
