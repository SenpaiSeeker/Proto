Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_platform_crypto_index = require("../../platform/crypto/index.js");
require("../../platform/index.js");
// teleproto/client/files/CdnSource.ts
var CdnHashMismatchError = class extends Error {
	constructor(offset) {
		super(`CDN file hash mismatch at offset ${offset}`);
		this.name = "CdnHashMismatchError";
	}
};
var CdnSource = class {
	constructor(redirect, fetchHashes) {
		this.fetchHashes = fetchHashes;
		this.hashes = /* @__PURE__ */ new Map();
		this.partial = /* @__PURE__ */ new Map();
		this.dcId = redirect.dcId;
		this.fileToken = redirect.fileToken;
		this.key = redirect.encryptionKey;
		this.iv = redirect.encryptionIv;
		this.addHashes(redirect.fileHashes);
	}
	addHashes(hashes) {
		for (const item of hashes) this.hashes.set(item.offset.toJSNumber(), {
			limit: item.limit,
			hash: require_platform_buffer_index.Buffer.from(item.hash)
		});
	}
	decrypt(offset, data) {
		const iv = require_platform_buffer_index.Buffer.from(this.iv);
		iv.writeUInt32BE(offset / 16 >>> 0, 12);
		const cipher = require_platform_crypto_index.aesCtr(this.key, iv);
		try {
			return cipher.update(data);
		} finally {
			cipher.dispose();
		}
	}
	async verify(offset, data) {
		const end = offset + data.length;
		let position = offset;
		while (position < end) {
			const [start, range] = await this.rangeAt(position);
			const rangeEnd = start + range.limit;
			const pieceEnd = Math.min(rangeEnd, end);
			if (start >= offset && rangeEnd <= end) this.check(start, range, data.subarray(start - offset, rangeEnd - offset));
			else this.collect(start, range, position, data.subarray(position - offset, pieceEnd - offset));
			position = pieceEnd;
		}
	}
	async rangeAt(position) {
		let requested = false;
		for (;;) {
			const found = this.find(position);
			if (found) return found;
			if (this.fetching) {
				await this.fetching.catch(() => {});
				continue;
			}
			if (requested) throw new Error(`Telegram returned no CDN hash for offset ${position}`);
			requested = true;
			this.fetching = this.fetchHashes(position).then((hashes) => this.addHashes(hashes)).finally(() => this.fetching = void 0);
			await this.fetching;
		}
	}
	find(position) {
		for (const [start, range] of this.hashes) if (start <= position && position < start + range.limit) return [start, range];
	}
	collect(start, range, offset, data) {
		let pending = this.partial.get(start);
		if (!pending) this.partial.set(start, pending = {
			pieces: [],
			bytes: 0
		});
		pending.pieces.push({
			offset,
			data: require_platform_buffer_index.Buffer.from(data)
		});
		pending.bytes += data.length;
		if (pending.bytes < range.limit) return;
		this.partial.delete(start);
		const whole = require_platform_buffer_index.Buffer.concat(pending.pieces.sort((a, b) => a.offset - b.offset).map((piece) => piece.data));
		this.check(start, range, whole);
	}
	check(start, range, data) {
		if (!require_platform_crypto_index.hash("sha256", data).equals(range.hash)) throw new CdnHashMismatchError(start);
	}
};
exports.CdnHashMismatchError = CdnHashMismatchError;
exports.CdnSource = CdnSource;
