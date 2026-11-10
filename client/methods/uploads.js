Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_platform_crypto_index = require("../../platform/crypto/index.js");
const require_platform_fs_index = require("../../platform/fs/index.js");
require("../../tl/index.js");
const require_Helpers = require("../../Helpers.js");
require("../../platform/index.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_Utils = require("../../Utils.js");
const require_errors_FileErrors = require("../../errors/FileErrors.js");
const require_client_methods_messageParse = require("./messageParse.js");
require("../../errors/index.js");
const require_client_files_FileUploader = require("../files/FileUploader.js");
const require_client_files_uploadRegistry = require("../files/uploadRegistry.js");
const require_client_files_PartsManager = require("../files/PartsManager.js");
// teleproto/client/methods/uploads.ts
var uploads_exports = /* @__PURE__ */ require_runtime.__exportAll({
	CustomFile: () => CustomFile,
	_fileToMedia: () => _fileToMedia,
	_resaveUploadedParts: () => _resaveUploadedParts,
	_sendAlbum: () => _sendAlbum,
	_toQuickReplyShortcut: () => _toQuickReplyShortcut,
	_toReplyObject: () => _toReplyObject,
	sendFile: () => sendFile,
	uploadFile: () => uploadFile
});
function isNamedBlob(value) {
	return typeof value === "object" && value !== null && typeof value.arrayBuffer === "function" && typeof value.name === "string" && typeof value.size === "number";
}
/**
* A custom file class compatible with File-like upload shape.<br/>
* You should use this whenever you want to upload a file.
*/
var CustomFile = class {
	constructor(name, size, path, buffer) {
		this.name = name;
		this.size = size;
		this.path = path;
		this.buffer = buffer;
	}
};
async function openUploadSource(file, size, maxBufferSize) {
	if (size > maxBufferSize && file instanceof CustomFile && file.path) {
		const handle = await require_platform_fs_index.open(file.path, "r");
		return {
			async read(offset, length) {
				const buffer = require_platform_buffer_index.Buffer.allocUnsafe(length);
				let read = 0;
				while (read < length) {
					const { bytesRead } = await handle.read(buffer, read, length - read, offset + read);
					if (!bytesRead) throw new Error(`${file.path} ended at ${offset + read} bytes, expected ${size}`);
					read += bytesRead;
				}
				return buffer;
			},
			close: () => handle.close()
		};
	}
	const buffer = require_platform_buffer_index.Buffer.from(await fileToBuffer(file));
	return {
		read: async (offset, length) => buffer.subarray(offset, offset + length),
		close: async () => {}
	};
}
/** @hidden */
async function uploadFile(client, fileParams) {
	const { file, onProgress, workers } = fileParams;
	const { name, size } = file;
	const fileId = require_Helpers.generateRandomLong(true);
	let partSize = require_client_files_PartsManager.choosePartSize(size, client._files.maxPartSize);
	const maxParts = await client._files.maxUploadParts();
	if (Math.ceil(size / 524288) > maxParts) throw new Error(`${name} is ${size} bytes, larger than the ${maxParts * require_client_files_PartsManager.MAX_PART_SIZE} bytes this account can upload`);
	if (Math.ceil(size / partSize) > maxParts) partSize = require_client_files_PartsManager.MAX_PART_SIZE;
	const maxBufferSize = fileParams.maxBufferSize || 20971519;
	const source = await openUploadSource(file, size, maxBufferSize);
	const abort = new AbortController();
	let uploaded = 0;
	onProgress?.(0);
	const uploader = new require_client_files_FileUploader.FileUploader(client._files, {
		fileId,
		size,
		partSize,
		dcId: client.session.dcId,
		maxInflight: workers && workers > 0 ? workers : void 0,
		read: (offset, length) => source.read(offset, length),
		signal: abort.signal,
		onPart: () => {
			if (!onProgress) return;
			if (onProgress.isCanceled) {
				abort.abort();
				return;
			}
			onProgress(++uploaded / uploader.partCount);
		}
	});
	try {
		await uploader.run();
		const parts = uploader.partCount;
		const input = uploader.isBig ? new require_tl_generated_api.Api.InputFileBig({
			id: fileId,
			parts,
			name
		}) : new require_tl_generated_api.Api.InputFile({
			id: fileId,
			parts,
			name,
			md5Checksum: require_platform_crypto_index.hash("md5", await source.read(0, size)).toString("hex")
		});
		require_client_files_uploadRegistry.rememberUpload(input, {
			fileId,
			size,
			partSize,
			partCount: parts,
			isBig: uploader.isBig,
			dcId: client.session.dcId,
			open: () => openUploadSource(file, size, maxBufferSize)
		});
		return input;
	} catch (error) {
		if (error instanceof require_errors_FileErrors.MediaAbortError && onProgress?.isCanceled) throw new Error("USER_CANCELED");
		throw error;
	} finally {
		await source.close();
	}
}
/** @hidden */
async function _resaveUploadedParts(client, request, part) {
	const files = require_client_files_uploadRegistry.findUploads(request);
	if (!files.length) return false;
	for (const file of files) {
		if (part !== "all" && part >= file.partCount) continue;
		const source = await file.open();
		try {
			if (part === "all") {
				await new require_client_files_FileUploader.FileUploader(client._files, {
					...file,
					read: (offset, length) => source.read(offset, length)
				}).run();
				continue;
			}
			const offset = part * file.partSize;
			const bytes = await source.read(offset, Math.min(file.partSize, file.size - offset));
			await client._files.run("upload", file.dcId, () => file.isBig ? new require_tl_generated_api.Api.upload.SaveBigFilePart({
				fileId: file.fileId,
				filePart: part,
				fileTotalParts: file.partCount,
				bytes
			}) : new require_tl_generated_api.Api.upload.SaveFilePart({
				fileId: file.fileId,
				filePart: part,
				bytes
			}));
		} finally {
			await source.close();
		}
	}
	client._log.info(`Re-saved ${part === "all" ? "all parts" : `part ${part}`} of ${files.length} uploaded file(s)`);
	return true;
}
/** @hidden */
function _toQuickReplyShortcut(shortcut) {
	if (shortcut == void 0) return;
	if (typeof shortcut === "string") return new require_tl_generated_api.Api.InputQuickReplyShortcut({ shortcut });
	if (typeof shortcut === "number") return new require_tl_generated_api.Api.InputQuickReplyShortcutId({ shortcutId: shortcut });
	return shortcut;
}
/** @hidden */
async function _toReplyObject(client, replyTo, topMsgId, quote) {
	if (replyTo != void 0 && typeof replyTo === "object" && replyTo.SUBCLASS_OF_ID === require_Helpers.unionId("InputReplyTo")) return replyTo;
	const replyToMsgId = replyTo != void 0 ? require_Utils.getMessageId(replyTo) : require_Utils.getMessageId(topMsgId);
	if (replyToMsgId == void 0) return;
	return new require_tl_generated_api.Api.InputReplyToMessage({
		replyToMsgId,
		topMsgId: replyTo != void 0 ? require_Utils.getMessageId(topMsgId) : void 0,
		quoteText: quote?.quoteText,
		quoteEntities: quote?.quoteEntities,
		quoteOffset: quote?.quoteOffset,
		replyToPeerId: quote?.replyToPeerId ? await client.getInputEntity(quote.replyToPeerId) : void 0
	});
}
/** @hidden */
async function _fileToMedia(client, { file, forceDocument, fileSize, progressCallback, attributes, thumb, voiceNote = false, videoNote = false, supportsStreaming = false, mimeType, asImage, workers, spoiler, ttlSeconds, nosoundVideo, videoCover, videoTimestamp }) {
	if (!file) return {
		fileHandle: void 0,
		media: void 0,
		image: void 0
	};
	const isImage$1 = require_Utils.isImage(file);
	if (asImage == void 0) asImage = isImage$1 && !forceDocument;
	if (typeof file == "object" && !require_platform_buffer_index.Buffer.isBuffer(file) && !(file instanceof require_tl_generated_api.Api.InputFile) && !(file instanceof require_tl_generated_api.Api.InputFileBig) && !(file instanceof CustomFile) && !isNamedBlob(file) && !("read" in file)) try {
		return {
			fileHandle: void 0,
			media: require_Utils.getInputMedia(file, {
				isPhoto: asImage,
				attributes,
				forceDocument,
				voiceNote,
				videoNote,
				supportsStreaming,
				spoiler,
				ttlSeconds,
				nosoundVideo,
				videoCover,
				videoTimestamp
			}),
			image: asImage
		};
	} catch (e) {
		return {
			fileHandle: void 0,
			media: void 0,
			image: isImage$1
		};
	}
	let media;
	let fileHandle;
	let createdFile;
	if (file instanceof require_tl_generated_api.Api.InputFile || file instanceof require_tl_generated_api.Api.InputFileBig) fileHandle = file;
	else if (typeof file == "string" && (file.startsWith("https://") || file.startsWith("http://"))) {
		if (asImage) media = new require_tl_generated_api.Api.InputMediaPhotoExternal({
			url: file,
			spoiler,
			ttlSeconds
		});
		else media = new require_tl_generated_api.Api.InputMediaDocumentExternal({
			url: file,
			spoiler,
			ttlSeconds,
			videoCover,
			videoTimestamp
		});
	} else if (!(typeof file == "string") || await require_platform_fs_index.isFile(file)) {
		if (typeof file == "string") createdFile = new CustomFile(require_platform_fs_index.basename(file), await require_platform_fs_index.size(file), file);
		else if (isNamedBlob(file) || file instanceof CustomFile) createdFile = file;
		else {
			const name = "name" in file && typeof file.name === "string" ? file.name : "unnamed";
			if (require_platform_buffer_index.Buffer.isBuffer(file)) createdFile = new CustomFile(name, file.length, "", file);
		}
		if (!createdFile) throw new Error(`Could not create file from ${JSON.stringify(file)}`);
		fileHandle = await uploadFile(client, {
			file: createdFile,
			onProgress: progressCallback,
			workers
		});
	} else throw new Error(`"Not a valid path nor a url ${file}`);
	if (media != void 0) {} else if (fileHandle == void 0) throw new Error(`Failed to convert ${file} to media. Not an existing file or an HTTP URL`);
	else if (asImage) media = new require_tl_generated_api.Api.InputMediaUploadedPhoto({
		file: fileHandle,
		spoiler,
		ttlSeconds
	});
	else {
		let res = require_Utils.getAttributes(file, {
			mimeType,
			attributes,
			forceDocument: forceDocument && !isImage$1,
			voiceNote,
			videoNote,
			supportsStreaming,
			thumb
		});
		attributes = res.attrs;
		mimeType = res.mimeType;
		let uploadedThumb;
		if (!thumb) uploadedThumb = void 0;
		else {
			if (typeof thumb == "string") uploadedThumb = new CustomFile(require_platform_fs_index.basename(thumb), await require_platform_fs_index.size(thumb), thumb);
			else if (isNamedBlob(thumb)) uploadedThumb = thumb;
			else {
				let name;
				if ("name" in thumb) name = thumb.name;
				else name = "unnamed";
				if (require_platform_buffer_index.Buffer.isBuffer(thumb)) uploadedThumb = new CustomFile(name, thumb.length, "", thumb);
			}
			if (!uploadedThumb) throw new Error(`Could not create file from ${file}`);
			uploadedThumb = await uploadFile(client, {
				file: uploadedThumb,
				workers: 1
			});
		}
		media = new require_tl_generated_api.Api.InputMediaUploadedDocument({
			file: fileHandle,
			mimeType,
			attributes,
			thumb: uploadedThumb,
			forceFile: forceDocument && !isImage$1,
			spoiler,
			ttlSeconds,
			nosoundVideo,
			videoCover,
			videoTimestamp
		});
	}
	return {
		fileHandle,
		media,
		image: asImage
	};
}
/** @hidden */
async function _sendAlbum(client, entity, { file, caption, formattingEntities, forceDocument = false, fileSize, clearDraft = false, progressCallback, replyTo, attributes, thumb, parseMode, voiceNote = false, videoNote = false, silent, supportsStreaming = false, scheduleDate, workers, noforwards, commentTo, topMsgId, sendAs, effect, invertMedia, background, updateStickersetsOrder, allowPaidFloodskip, allowPaidStars, quickReplyShortcut, quoteText, quoteEntities, quoteOffset, replyToPeerId, spoiler, ttlSeconds, nosoundVideo, videoCover, videoTimestamp }) {
	entity = await client.getInputEntity(entity);
	let files = [];
	if (!Array.isArray(file)) files = [file];
	else files = file;
	if (!Array.isArray(caption)) {
		if (!caption) caption = "";
		caption = [caption];
	}
	const captions = [];
	for (const [i, c] of caption.entries()) if (i === 0 && formattingEntities) captions.push([c || "", formattingEntities]);
	else captions.push(await require_client_methods_messageParse._parseMessageText(client, c, parseMode));
	if (commentTo != void 0) {
		const discussionData = await client.getCommentData(entity, commentTo);
		entity = discussionData.entity;
		replyTo = discussionData.replyTo;
	}
	if (!attributes) attributes = [];
	let index = 0;
	const albumFiles = [];
	for (const file of files) {
		let { fileHandle, media, image } = await _fileToMedia(client, {
			file,
			forceDocument,
			fileSize,
			progressCallback,
			attributes: attributes[index],
			thumb,
			voiceNote,
			videoNote,
			supportsStreaming,
			workers,
			spoiler,
			ttlSeconds,
			nosoundVideo,
			videoCover,
			videoTimestamp
		});
		index++;
		if (media instanceof require_tl_generated_api.Api.InputMediaUploadedPhoto || media instanceof require_tl_generated_api.Api.InputMediaPhotoExternal) {
			const r = await client.invoke(new require_tl_generated_api.Api.messages.UploadMedia({
				peer: entity,
				media
			}));
			if (r instanceof require_tl_generated_api.Api.MessageMediaPhoto) media = require_Utils.getInputMedia(r.photo, {
				spoiler,
				ttlSeconds
			});
		} else if (media instanceof require_tl_generated_api.Api.InputMediaUploadedDocument) {
			const r = await client.invoke(new require_tl_generated_api.Api.messages.UploadMedia({
				peer: entity,
				media
			}));
			if (r instanceof require_tl_generated_api.Api.MessageMediaDocument) media = require_Utils.getInputMedia(r.document, {
				spoiler,
				ttlSeconds,
				videoCover,
				videoTimestamp
			});
		}
		let text = "";
		let msgEntities = [];
		if (captions.length) [text, msgEntities] = captions.shift();
		albumFiles.push(new require_tl_generated_api.Api.InputSingleMedia({
			media,
			message: text,
			entities: msgEntities
		}));
	}
	const replyObject = await _toReplyObject(client, replyTo, topMsgId, {
		quoteText,
		quoteEntities,
		quoteOffset,
		replyToPeerId
	});
	const result = await client.invoke(new require_tl_generated_api.Api.messages.SendMultiMedia({
		peer: entity,
		replyTo: replyObject,
		multiMedia: albumFiles,
		silent,
		scheduleDate,
		clearDraft,
		noforwards,
		background,
		updateStickersetsOrder,
		allowPaidFloodskip,
		allowPaidStars,
		quickReplyShortcut: _toQuickReplyShortcut(quickReplyShortcut),
		sendAs: sendAs ? await client.getInputEntity(sendAs) : void 0,
		effect,
		invertMedia
	}));
	const randomIds = albumFiles.map((m) => m.randomId);
	return client._getResponseMessage(randomIds, result, entity);
}
/** @hidden */
async function sendFile(client, entity, { file, caption, forceDocument = false, fileSize, clearDraft = false, progressCallback, replyTo, attributes, thumb, parseMode, formattingEntities, voiceNote = false, videoNote = false, buttons, silent, supportsStreaming = false, scheduleDate, workers, noforwards, commentTo, topMsgId, sendAs, effect, invertMedia, background, updateStickersetsOrder, allowPaidFloodskip, allowPaidStars, scheduleRepeatPeriod, quickReplyShortcut, suggestedPost, quoteText, quoteEntities, quoteOffset, replyToPeerId, spoiler, ttlSeconds, nosoundVideo, videoCover, videoTimestamp }) {
	if (!file) throw new Error("You need to specify a file");
	if (!caption) caption = "";
	entity = await client.getInputEntity(entity);
	if (commentTo != void 0) {
		const discussionData = await client.getCommentData(entity, commentTo);
		entity = discussionData.entity;
		replyTo = discussionData.replyTo;
	}
	if (Array.isArray(file)) return await _sendAlbum(client, entity, {
		file,
		caption,
		formattingEntities,
		replyTo,
		parseMode,
		attributes,
		silent,
		scheduleDate,
		supportsStreaming,
		clearDraft,
		forceDocument,
		noforwards,
		topMsgId,
		fileSize,
		progressCallback,
		workers,
		thumb,
		voiceNote,
		videoNote,
		sendAs,
		effect,
		invertMedia,
		background,
		updateStickersetsOrder,
		allowPaidFloodskip,
		allowPaidStars,
		quickReplyShortcut,
		quoteText,
		quoteEntities,
		quoteOffset,
		replyToPeerId,
		spoiler,
		ttlSeconds,
		nosoundVideo,
		videoCover,
		videoTimestamp
	});
	if (Array.isArray(caption)) caption = caption[0] || "";
	let msgEntities;
	if (formattingEntities != void 0) msgEntities = formattingEntities;
	else [caption, msgEntities] = await require_client_methods_messageParse._parseMessageText(client, caption, parseMode);
	const { fileHandle, media, image } = await _fileToMedia(client, {
		file,
		forceDocument,
		fileSize,
		progressCallback,
		attributes,
		thumb,
		voiceNote,
		videoNote,
		supportsStreaming,
		workers,
		spoiler,
		ttlSeconds,
		nosoundVideo,
		videoCover,
		videoTimestamp
	});
	if (media == void 0) throw new Error(`Cannot use ${file} as file.`);
	const markup = client.buildReplyMarkup(buttons);
	const replyObject = await _toReplyObject(client, replyTo, topMsgId, {
		quoteText,
		quoteEntities,
		quoteOffset,
		replyToPeerId
	});
	const request = new require_tl_generated_api.Api.messages.SendMedia({
		peer: entity,
		media,
		replyTo: replyObject,
		message: caption,
		entities: msgEntities,
		replyMarkup: markup,
		silent,
		scheduleDate,
		scheduleRepeatPeriod,
		clearDraft,
		noforwards,
		background,
		updateStickersetsOrder,
		allowPaidFloodskip,
		allowPaidStars,
		quickReplyShortcut: _toQuickReplyShortcut(quickReplyShortcut),
		suggestedPost,
		sendAs: sendAs ? await client.getInputEntity(sendAs) : void 0,
		effect,
		invertMedia
	});
	const result = await client.invoke(request);
	return client._getResponseMessage(request, result, entity);
}
function fileToBuffer(file) {
	if (file instanceof CustomFile) {
		if (file.buffer != void 0) return file.buffer;
		else return require_platform_fs_index.readFile(file.path);
	} else if (isNamedBlob(file)) return file.arrayBuffer().then((ab) => require_platform_buffer_index.Buffer.from(ab));
	else throw new Error("Could not create buffer from file " + file);
}
exports.CustomFile = CustomFile;
exports._fileToMedia = _fileToMedia;
exports._resaveUploadedParts = _resaveUploadedParts;
exports._sendAlbum = _sendAlbum;
exports._toQuickReplyShortcut = _toQuickReplyShortcut;
exports._toReplyObject = _toReplyObject;
exports.sendFile = sendFile;
exports.uploadFile = uploadFile;
Object.defineProperty(exports, "uploads_exports", {
	enumerable: true,
	get: function() {
		return uploads_exports;
	}
});
