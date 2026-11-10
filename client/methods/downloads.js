Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_platform_crypto_index = require("../../platform/crypto/index.js");
const require_platform_fs_index = require("../../platform/fs/index.js");
require("../../tl/index.js");
const require_Utils = require("../../Utils.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../errors/index.js");
const require_errors_FileErrors = require("../../errors/FileErrors.js");
const require_client_files_FileDownloader = require("../files/FileDownloader.js");
const require_client_files_FileTransfers = require("../files/FileTransfers.js");
const require_client_files_PartsManager = require("../files/PartsManager.js");
const require_client_files_sinks = require("../files/sinks.js");
require("../../platform/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/client/methods/downloads.ts
var downloads_exports = /* @__PURE__ */ require_runtime.__exportAll({
	_downloadCachedPhotoSize: () => _downloadCachedPhotoSize,
	_downloadContact: () => _downloadContact,
	_downloadDocument: () => _downloadDocument,
	_downloadPhoto: () => _downloadPhoto,
	_downloadWebDocument: () => _downloadWebDocument,
	downloadFile: () => downloadFile,
	downloadMedia: () => downloadMedia,
	downloadProfilePhoto: () => downloadProfilePhoto,
	iterDownload: () => iterDownload
});
const MIN_CHUNK_SIZE = 4096;
const ONE_MB = 1048576;
const ITER_AHEAD_BYTES = 4 * ONE_MB;
function explicitPartSize(partSizeKb) {
	if (!partSizeKb || partSizeKb <= 0) return void 0;
	const size = Math.min(Math.floor(partSizeKb * 1024), ONE_MB);
	if (size % MIN_CHUNK_SIZE !== 0) throw new Error("partSizeKb must be a multiple of 4 (KB)");
	return size;
}
const HASH_BLOCK = 131072;
var FileHashChecker = class {
	constructor(client, location) {
		this.client = client;
		this.location = location;
		this._hashes = /* @__PURE__ */ new Map();
		this._unsupported = false;
		this.pending = require_platform_buffer_index.Buffer.alloc(0);
		this.pendingOffset = 0;
	}
	async verify(absOffset, data) {
		if (this._unsupported || !data.length) return;
		if (absOffset % HASH_BLOCK !== 0) return;
		for (let o = 0; o < data.length; o += HASH_BLOCK) {
			const abs = absOffset + o;
			let expected = this._hashes.get(abs);
			if (!expected) {
				await this._fetch(abs);
				expected = this._hashes.get(abs);
			}
			if (!expected) return;
			const block = data.subarray(o, Math.min(o + HASH_BLOCK, data.length));
			if (!require_platform_crypto_index.hash("sha256", block).equals(expected)) throw new Error(`File hash mismatch at offset ${abs} — corrupted part`);
		}
	}
	async feed(offset, data, final = false) {
		if (!this.pending.length) this.pendingOffset = offset;
		this.pending = this.pending.length ? require_platform_buffer_index.Buffer.concat([this.pending, data]) : data;
		const whole = final ? this.pending.length : this.pending.length - this.pending.length % HASH_BLOCK;
		if (!whole) return;
		await this.verify(this.pendingOffset, this.pending.subarray(0, whole));
		this.pendingOffset += whole;
		this.pending = this.pending.subarray(whole);
	}
	async _fetch(absOffset) {
		try {
			const res = await this.client.invoke(new require_tl_generated_api.Api.upload.GetFileHashes({
				location: this.location,
				offset: (0, big_integer.default)(absOffset)
			}));
			for (const h of res) this._hashes.set(h.offset.toJSNumber(), require_platform_buffer_index.Buffer.from(h.hash));
		} catch (e) {
			this._unsupported = true;
			this.client._log.debug(`getFileHashes unsupported: ${e}`);
		}
	}
};
/** @hidden */
async function downloadFile(client, inputLocation, { outputFile = void 0, partSizeKb = void 0, fileSize = void 0, progressCallback = void 0, dcId = void 0, msgData = void 0, verifyHashes = false, signal = void 0, requestTimeout = void 0 }) {
	const info = require_Utils.getFileInfo(inputLocation);
	const location = info.location ?? inputLocation;
	const totalSize = fileSize ?? info.size;
	const size = totalSize && totalSize.greater(0) ? totalSize.toJSNumber() : void 0;
	const abort = new AbortController();
	const forward = () => abort.abort();
	if (signal?.aborted) abort.abort();
	else signal?.addEventListener("abort", forward, { once: true });
	const timer = requestTimeout && requestTimeout > 0 ? setTimeout(forward, requestTimeout) : void 0;
	const dc = dcId ?? info.dcId ?? client.session.dcId;
	let release;
	try {
		release = await client._files.acquireDownload(dc, size, abort.signal);
	} catch (error) {
		clearTimeout(timer);
		signal?.removeEventListener("abort", forward);
		throw error;
	}
	const target = await require_client_files_sinks.openTarget(outputFile, size).catch((error) => {
		release?.();
		clearTimeout(timer);
		signal?.removeEventListener("abort", forward);
		throw error;
	});
	const hashes = verifyHashes ? new FileHashChecker(client, location) : void 0;
	const sink = hashes ? new require_client_files_sinks.OrderedSink(0, async (offset, data) => {
		await hashes.feed(offset, data);
		await target.write(offset, data);
	}) : target;
	let downloaded = 0;
	const downloader = new require_client_files_FileDownloader.FileDownloader(client._files, {
		location,
		dcId: dc,
		kind: require_client_files_FileTransfers.transferKindFor(size),
		size,
		partSize: explicitPartSize(partSizeKb) ?? require_client_files_PartsManager.choosePartSize(size, client._files.maxPartSize),
		cdn: client._files.cdnEnabled,
		onCdnUnavailable: (cdnDc) => client._log.info(`CDN dc ${cdnDc} is not announced in the config, downloading directly`),
		stagger: location instanceof require_tl_generated_api.Api.InputDocumentFileLocation && (size ?? 0) > ONE_MB,
		signal: abort.signal,
		sink,
		refreshLocation: msgData ? () => refreshFileLocation(client, location, msgData) : void 0,
		onBytes: async (bytes) => {
			downloaded += bytes;
			if (!progressCallback) return;
			if (progressCallback.isCanceled) {
				abort.abort();
				return;
			}
			await progressCallback((0, big_integer.default)(downloaded), (0, big_integer.default)(size ?? downloaded));
		}
	});
	try {
		await downloader.run();
		await hashes?.feed(downloaded, require_platform_buffer_index.Buffer.alloc(0), true);
		return await target.close();
	} catch (error) {
		await target.abort();
		if (error instanceof require_errors_FileErrors.MediaAbortError && progressCallback?.isCanceled) return void 0;
		throw error;
	} finally {
		release();
		clearTimeout(timer);
		signal?.removeEventListener("abort", forward);
	}
}
async function refreshFileLocation(client, location, [chat, id]) {
	const [message] = await client.getMessages(chat, { ids: id });
	const media = message?.media;
	const fresh = media instanceof require_tl_generated_api.Api.MessageMediaDocument ? media.document : media instanceof require_tl_generated_api.Api.MessageMediaPhoto ? media.photo : void 0;
	if (!(fresh instanceof require_tl_generated_api.Api.Document || fresh instanceof require_tl_generated_api.Api.Photo)) return void 0;
	if (location instanceof require_tl_generated_api.Api.InputDocumentFileLocation || location instanceof require_tl_generated_api.Api.InputPhotoFileLocation) {
		if (!location.id.equals(fresh.id)) return void 0;
		const Location = location.constructor;
		return new Location({
			...location.originalArgs,
			fileReference: fresh.fileReference
		});
	}
}
/** @hidden */
async function downloadMedia(client, messageOrMedia, outputFile, thumb, progressCallback, extra) {
	let msgData;
	let date;
	let media;
	if (messageOrMedia instanceof require_tl_generated_api.Api.Message) {
		media = messageOrMedia.media;
		date = messageOrMedia.date;
		msgData = messageOrMedia.inputChat ? [messageOrMedia.inputChat, messageOrMedia.id] : void 0;
	} else {
		media = messageOrMedia;
		date = Date.now();
	}
	if (typeof media == "string") throw new Error("not implemented");
	if (media instanceof require_tl_generated_api.Api.UserProfilePhoto || media instanceof require_tl_generated_api.Api.ChatPhoto) throw new Error(`${media.className} cannot be downloaded from the photo object alone its file location is bound to the owner: use client.downloadProfilePhoto(entity)`);
	if (media instanceof require_tl_generated_api.Api.MessageMediaWebPage) {
		if (media.webpage instanceof require_tl_generated_api.Api.WebPage) media = media.webpage.document || media.webpage.photo;
	}
	if (media instanceof require_tl_generated_api.Api.MessageMediaPhoto || media instanceof require_tl_generated_api.Api.Photo) return _downloadPhoto(client, media, outputFile, date, thumb, progressCallback, extra);
	else if (media instanceof require_tl_generated_api.Api.MessageMediaDocument || media instanceof require_tl_generated_api.Api.Document) return _downloadDocument(client, media, outputFile, date, thumb, progressCallback, msgData, extra);
	else if (media instanceof require_tl_generated_api.Api.MessageMediaContact) return _downloadContact(client, media, {
		outputFile,
		...extra
	});
	else if (media instanceof require_tl_generated_api.Api.WebDocument || media instanceof require_tl_generated_api.Api.WebDocumentNoProxy) return _downloadWebDocument(client, media, {
		outputFile,
		progressCallback,
		...extra
	});
	else if (!media) return;
	else throw new Error(`Cannot download media of type ${media.className ?? typeof media}`);
}
/** @hidden */
async function _downloadDocument(client, doc, outputFile, date, thumb, progressCallback, msgData, extra) {
	if (doc instanceof require_tl_generated_api.Api.MessageMediaDocument) {
		if (!doc.document) return require_platform_buffer_index.Buffer.alloc(0);
		doc = doc.document;
	}
	if (!(doc instanceof require_tl_generated_api.Api.Document)) return require_platform_buffer_index.Buffer.alloc(0);
	let size;
	if (thumb == void 0) outputFile = await getProperFilename(outputFile, "document", "." + (require_Utils.getExtension(doc) || "bin"), date);
	else {
		outputFile = await getProperFilename(outputFile, "photo", ".jpg", date);
		size = getThumb(doc.thumbs || [], thumb);
		if (size instanceof require_tl_generated_api.Api.PhotoCachedSize || size instanceof require_tl_generated_api.Api.PhotoStrippedSize) return _downloadCachedPhotoSize(size, outputFile);
	}
	return await downloadFile(client, new require_tl_generated_api.Api.InputDocumentFileLocation({
		id: doc.id,
		accessHash: doc.accessHash,
		fileReference: doc.fileReference,
		thumbSize: size && "type" in size ? size.type : ""
	}), {
		outputFile,
		fileSize: size && "size" in size ? (0, big_integer.default)(size.size) : doc.size,
		progressCallback,
		dcId: doc.dcId,
		msgData,
		signal: extra?.signal,
		requestTimeout: extra?.requestTimeout
	});
}
/** @hidden */
async function _downloadContact(_client, media, args) {
	const vcard = media.vcard || [
		"BEGIN:VCARD",
		"VERSION:4.0",
		`N:${media.lastName};${media.firstName};;;`,
		`FN:${[media.firstName, media.lastName].filter(Boolean).join(" ")}`,
		`TEL;TYPE=cell:${media.phoneNumber}`,
		"END:VCARD"
	].join("\r\n");
	const data = require_platform_buffer_index.Buffer.from(vcard, "utf8");
	const target = await require_client_files_sinks.openTarget(args.outputFile, data.length);
	await target.write(0, data);
	return target.close();
}
const WEB_FILE_PART = 131072;
/** @hidden */
async function _downloadWebDocument(client, media, args) {
	const target = await require_client_files_sinks.openTarget(args.outputFile, media.size || void 0);
	try {
		if (media instanceof require_tl_generated_api.Api.WebDocumentNoProxy) {
			const response = await fetch(media.url, { signal: args.signal });
			if (!response.ok) throw new Error(`Fetching ${media.url} failed with HTTP ${response.status}`);
			const data = require_platform_buffer_index.Buffer.from(await response.arrayBuffer());
			await target.write(0, data);
			await args.progressCallback?.((0, big_integer.default)(data.length), (0, big_integer.default)(data.length));
			return await target.close();
		}
		if (!client._config) await client.getDC(client.session.dcId);
		const dcId = client._config?.webfileDcId ?? client.session.dcId;
		const location = new require_tl_generated_api.Api.InputWebFileLocation({
			url: media.url,
			accessHash: media.accessHash
		});
		let offset = 0;
		for (;;) {
			const part = await client._files.run("download", dcId, () => new require_tl_generated_api.Api.upload.GetWebFile({
				location,
				offset,
				limit: WEB_FILE_PART
			}), args.signal);
			if (part.bytes.length) await target.write(offset, part.bytes);
			offset += part.bytes.length;
			await args.progressCallback?.((0, big_integer.default)(offset), (0, big_integer.default)(part.size || media.size || offset));
			if (part.bytes.length < WEB_FILE_PART || part.size && offset >= part.size) break;
		}
		return await target.close();
	} catch (error) {
		await target.abort();
		throw error;
	}
}
/** @hidden */
function getThumb(thumbs, thumb) {
	function sortThumb(thumb) {
		if (thumb instanceof require_tl_generated_api.Api.PhotoStrippedSize) return thumb.bytes.length;
		if (thumb instanceof require_tl_generated_api.Api.PhotoCachedSize) return thumb.bytes.length;
		if (thumb instanceof require_tl_generated_api.Api.PhotoSize) return thumb.size;
		if (thumb instanceof require_tl_generated_api.Api.PhotoSizeProgressive) return Math.max(...thumb.sizes);
		if (thumb instanceof require_tl_generated_api.Api.VideoSize) return thumb.size;
		return 0;
	}
	thumbs = thumbs.sort((a, b) => sortThumb(a) - sortThumb(b));
	const correctThumbs = [];
	for (const t of thumbs) if (!(t instanceof require_tl_generated_api.Api.PhotoPathSize)) correctThumbs.push(t);
	if (thumb == void 0) return correctThumbs.pop();
	else if (typeof thumb == "number") return correctThumbs[thumb];
	else if (typeof thumb == "string") {
		for (const t of correctThumbs) if ("type" in t && t.type == thumb) return t;
	} else if (thumb instanceof require_tl_generated_api.Api.PhotoSize || thumb instanceof require_tl_generated_api.Api.PhotoCachedSize || thumb instanceof require_tl_generated_api.Api.PhotoStrippedSize || thumb instanceof require_tl_generated_api.Api.VideoSize) return thumb;
}
/** @hidden */
async function _downloadCachedPhotoSize(size, outputFile) {
	let data;
	if (size instanceof require_tl_generated_api.Api.PhotoStrippedSize) data = require_Utils.strippedPhotoToJpg(size.bytes);
	else data = size.bytes;
	const target = await require_client_files_sinks.openTarget(outputFile, data.length);
	try {
		await target.write(0, data);
		return await target.close();
	} catch (err) {
		await target.abort();
		throw err;
	}
}
async function getProperFilename(file, fileType, extension, date) {
	if (!file || typeof file != "string") return file;
	if (await require_platform_fs_index.isDirectoryAsync(file)) {
		const fullName = fileType + date + extension;
		return require_platform_fs_index.join(file, fullName);
	}
	return file;
}
/** @hidden */
async function _downloadPhoto(client, photo, file, date, thumb, progressCallback, extra) {
	if (photo instanceof require_tl_generated_api.Api.MessageMediaPhoto) {
		if (photo.photo instanceof require_tl_generated_api.Api.PhotoEmpty || !photo.photo) return require_platform_buffer_index.Buffer.alloc(0);
		photo = photo.photo;
	}
	if (!(photo instanceof require_tl_generated_api.Api.Photo)) return require_platform_buffer_index.Buffer.alloc(0);
	const size = getThumb([...photo.sizes || [], ...photo.videoSizes || []], thumb);
	if (!size || size instanceof require_tl_generated_api.Api.PhotoSizeEmpty) return require_platform_buffer_index.Buffer.alloc(0);
	if (!date) date = Date.now();
	file = await getProperFilename(file, "photo", ".jpg", date);
	if (size instanceof require_tl_generated_api.Api.PhotoCachedSize || size instanceof require_tl_generated_api.Api.PhotoStrippedSize) return _downloadCachedPhotoSize(size, file);
	let fileSize;
	if (size instanceof require_tl_generated_api.Api.PhotoSizeProgressive) fileSize = Math.max(...size.sizes);
	else fileSize = "size" in size ? size.size : 512;
	return downloadFile(client, new require_tl_generated_api.Api.InputPhotoFileLocation({
		id: photo.id,
		accessHash: photo.accessHash,
		fileReference: photo.fileReference,
		thumbSize: "type" in size ? size.type : ""
	}), {
		outputFile: file,
		fileSize: (0, big_integer.default)(fileSize),
		progressCallback,
		dcId: photo.dcId,
		signal: extra?.signal,
		requestTimeout: extra?.requestTimeout
	});
}
/** @hidden */
async function downloadProfilePhoto(client, entity, fileParams) {
	let photo;
	if (typeof entity == "object" && "photo" in entity) photo = entity.photo;
	else {
		entity = await client.getEntity(entity);
		if ("photo" in entity) photo = entity.photo;
		else throw new Error(`Could not get photo from ${entity ? entity.className : void 0}`);
	}
	let dcId;
	let loc;
	if (photo instanceof require_tl_generated_api.Api.UserProfilePhoto || photo instanceof require_tl_generated_api.Api.ChatPhoto) {
		dcId = photo.dcId;
		loc = new require_tl_generated_api.Api.InputPeerPhotoFileLocation({
			peer: require_Utils.getInputPeer(entity),
			photoId: photo.photoId,
			big: fileParams.isBig
		});
	} else return require_platform_buffer_index.Buffer.alloc(0);
	return client.downloadFile(loc, {
		outputFile: fileParams.outputFile,
		dcId,
		signal: fileParams.signal,
		requestTimeout: fileParams.requestTimeout
	});
}
/**
* Iterates over a file's contents chunk by chunk — streaming download
* without buffering the whole file in memory.
* @hidden
*/
async function* iterDownload(client, file, params = {}) {
	const info = require_Utils.getFileInfo(file);
	const requestSize = params.requestSize ?? 524288;
	if (requestSize % MIN_CHUNK_SIZE !== 0) throw new Error("requestSize must be divisible by 4096");
	const offset = typeof params.offset === "number" ? params.offset : params.offset?.toJSNumber() ?? 0;
	const aligned = ONE_MB % requestSize === 0;
	const origin = aligned ? offset - offset % requestSize : offset;
	let skip = offset - origin;
	const abort = new AbortController();
	const forward = () => abort.abort();
	if (params.signal?.aborted) abort.abort();
	else params.signal?.addEventListener("abort", forward, { once: true });
	const ready = /* @__PURE__ */ new Map();
	let wake;
	const notify = () => {
		const resolve = wake;
		wake = void 0;
		resolve?.();
	};
	let next = origin;
	const dc = params.dcId ?? info.dcId ?? client.session.dcId;
	const release = await client._files.acquireDownload(dc, info.size?.toJSNumber(), abort.signal);
	const downloader = new require_client_files_FileDownloader.FileDownloader(client._files, {
		location: info.location,
		dcId: dc,
		kind: "download",
		partSize: requestSize,
		offset: origin,
		limit: params.limit !== void 0 ? params.limit + skip : void 0,
		precise: !aligned,
		signal: abort.signal,
		sink: { write(partOffset, data) {
			ready.set(partOffset, data);
			notify();
		} }
	});
	downloader.setAheadLimit(offset + Math.max(ITER_AHEAD_BYTES, 4 * requestSize));
	let finished = false;
	let failure;
	downloader.run().then(() => finished = true, (error) => failure = error).finally(notify);
	try {
		for (;;) {
			const chunk = ready.get(next);
			if (chunk) {
				ready.delete(next);
				next += chunk.length;
				downloader.setAheadLimit(next + Math.max(ITER_AHEAD_BYTES, 4 * requestSize));
				const out = skip ? chunk.subarray(skip) : chunk;
				skip = 0;
				if (out.length) yield out;
				continue;
			}
			if (failure) throw failure instanceof require_errors_FileErrors.MediaAbortError ? new require_errors_FileErrors.MediaAbortError() : failure;
			if (finished) return;
			await new Promise((resolve) => wake = resolve);
		}
	} finally {
		release();
		abort.abort();
		params.signal?.removeEventListener("abort", forward);
	}
}
exports._downloadCachedPhotoSize = _downloadCachedPhotoSize;
exports._downloadContact = _downloadContact;
exports._downloadDocument = _downloadDocument;
exports._downloadPhoto = _downloadPhoto;
exports._downloadWebDocument = _downloadWebDocument;
exports.downloadFile = downloadFile;
exports.downloadMedia = downloadMedia;
exports.downloadProfilePhoto = downloadProfilePhoto;
Object.defineProperty(exports, "downloads_exports", {
	enumerable: true,
	get: function() {
		return downloads_exports;
	}
});
exports.iterDownload = iterDownload;
