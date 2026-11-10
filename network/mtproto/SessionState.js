Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_platform_crypto_index = require("../../platform/crypto/index.js");
const require_Helpers = require("../../Helpers.js");
require("../../platform/index.js");
const require_tl_core_GZIPPacked = require("../../tl/core/GZIPPacked.js");
const require_tl_core_TLMessage = require("../../tl/core/TLMessage.js");
require("../../tl/index.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../tl/core/index.js");
const require_errors_Common = require("../../errors/Common.js");
const require_tl_binary_Reader = require("../../tl/binary/Reader.js");
const require_crypto_IGE = require("../../crypto/IGE.js");
require("../../errors/index.js");
const require_network_mtproto_ReceivedIds = require("./ReceivedIds.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/network/mtproto/SessionState.ts
var DuplicateMessageError = class extends require_errors_Common.SecurityError {
	constructor(msgId) {
		super(`Duplicate message ${msgId}`);
		this.msgId = msgId;
	}
};
var InvalidAuthKeyError = class extends require_errors_Common.SecurityError {
	constructor() {
		super("Server replied with an invalid auth key");
	}
};
const PADDED_SIZES = [
	64,
	128,
	192,
	256,
	384,
	512,
	768,
	1024,
	1280
];
const MAX_MESSAGE_AGE_S = 300;
function paddedSize(size, randomPadding) {
	if (randomPadding) return size + require_platform_crypto_index.randomInt(256) + 12 + 15 & -16;
	const minimal = size + 12 + 15 & -16;
	return PADDED_SIZES.find((value) => minimal <= value) ?? Math.ceil((minimal - 1280) / 448) * 448 + 1280;
}
function msgIdTime(msgId) {
	return msgId.shiftRight(32).toJSNumber() + msgId.and(4294967295).toJSNumber() / 2 ** 32;
}
var SessionState = class {
	constructor(authKey, log, securityChecks = true) {
		this.authKey = authKey;
		this.log = log;
		this.securityChecks = securityChecks;
		this.timeOffset = 0;
		this.salt = big_integer.default.zero;
		this.id = big_integer.default.zero;
		this.sequence = 0;
		this.lastMsgId = big_integer.default.zero;
		this.receivedIds = new require_network_mtproto_ReceivedIds.ReceivedIdsManager();
		this.reset();
	}
	get sessionId() {
		return this.id;
	}
	hasReceived(msgId) {
		return this.receivedIds.has(msgId);
	}
	reset() {
		this.id = require_Helpers.generateRandomLong(true);
		this.sequence = 0;
		this.lastMsgId = big_integer.default.zero;
		this.receivedIds.clear();
	}
	calcKey(authKey, msgKey, client) {
		const x = client ? 0 : 8;
		const a = require_platform_crypto_index.createHash("sha256").update(msgKey).update(authKey.subarray(x, x + 36)).digest();
		const b = require_platform_crypto_index.createHash("sha256").update(authKey.subarray(x + 40, x + 76)).update(msgKey).digest();
		const key = require_platform_buffer_index.Buffer.allocUnsafe(32);
		a.copy(key, 0, 0, 8);
		b.copy(key, 8, 8, 24);
		a.copy(key, 24, 24, 32);
		const iv = require_platform_buffer_index.Buffer.allocUnsafe(32);
		b.copy(iv, 0, 0, 8);
		a.copy(iv, 8, 8, 24);
		b.copy(iv, 24, 24, 32);
		return {
			key,
			iv
		};
	}
	async writeDataAsMessage(buffer, data, contentRelated, afterId, forcedMsgId, compress = contentRelated) {
		const msgId = forcedMsgId ?? this.newMsgId();
		const seqNo = this.nextSeqNo(contentRelated);
		const payload = afterId ? this.invokeAfter(afterId, data) : data;
		const body = await require_tl_core_GZIPPacked.GZIPPacked.gzipIfSmaller(compress, payload);
		const header = require_platform_buffer_index.Buffer.allocUnsafe(16);
		require_Helpers.toSignedLittleBuffer(msgId, 8).copy(header, 0);
		header.writeInt32LE(seqNo, 8);
		header.writeInt32LE(body.length, 12);
		buffer.raw(header);
		buffer.raw(body);
		return msgId;
	}
	invokeAfter(afterId, data) {
		const header = require_platform_buffer_index.Buffer.allocUnsafe(12);
		header.writeUInt32LE(require_tl_generated_api.Api.InvokeAfterMsg.CONSTRUCTOR_ID, 0);
		require_Helpers.toSignedLittleBuffer(afterId, 8).copy(header, 4);
		return require_platform_buffer_index.Buffer.concat([header, data]);
	}
	async encryptMessageData(data, randomPadding = false) {
		if (!this.authKey) throw new Error("Auth key unset");
		await this.authKey.waitForKey();
		const authKey = this.authKey.getKey();
		const keyId = this.authKey.keyId;
		if (!authKey || !keyId) throw new Error("Auth key unset");
		const padLen = paddedSize(16 + data.length, randomPadding) - 16 - data.length;
		const packet = require_platform_buffer_index.Buffer.allocUnsafe(40 + data.length + padLen);
		const plain = packet.subarray(24);
		require_Helpers.toSignedLittleBuffer(this.salt, 8).copy(plain, 0);
		require_Helpers.toSignedLittleBuffer(this.id, 8).copy(plain, 8);
		data.copy(plain, 16);
		require_platform_crypto_index.randomFill(plain, 16 + data.length, padLen);
		const msgKey = require_platform_crypto_index.createHash("sha256").update(authKey.subarray(88, 120)).update(plain).digest().subarray(8, 24);
		const { iv, key } = this.calcKey(authKey, msgKey, true);
		require_Helpers.readBufferFromBigInt(keyId, 8).copy(packet, 0);
		msgKey.copy(packet, 8);
		const ige = new require_crypto_IGE.IGE(key, iv);
		ige.encryptIge(plain, plain);
		ige.dispose();
		return packet;
	}
	async decryptMessageData(body) {
		if (!this.authKey) throw new Error("Auth key unset");
		if (body.length < 8) throw new require_errors_Common.InvalidBufferError(body);
		const keyId = require_Helpers.readBigIntFromBuffer(body.subarray(0, 8));
		if (!this.authKey.keyId || keyId.neq(this.authKey.keyId)) throw new InvalidAuthKeyError();
		const authKey = this.authKey.getKey();
		if (!authKey) throw new InvalidAuthKeyError();
		if (body.length < 56 || (body.length - 24) % 16) throw new require_errors_Common.SecurityError("Invalid encrypted payload length");
		const msgKey = body.subarray(8, 24);
		const { iv, key } = this.calcKey(authKey, msgKey, false);
		const encrypted = body.subarray(24);
		const ige = new require_crypto_IGE.IGE(key, iv);
		const plain = ige.decryptIge(encrypted, encrypted);
		ige.dispose();
		const ourKey = require_platform_crypto_index.createHash("sha256").update(authKey.subarray(96, 128)).update(plain).digest();
		if (!msgKey.equals(ourKey.subarray(8, 24))) throw new require_errors_Common.SecurityError("Received msg_key doesn't match with expected one");
		const reader = new require_tl_binary_Reader.Reader(plain);
		reader.readLong();
		if (reader.readLong().neq(this.id) && this.securityChecks) throw new require_errors_Common.SecurityError("Server replied with a wrong session ID");
		const msgId = reader.readLong();
		const seqNo = reader.readInt();
		const length = reader.readInt();
		if (this.securityChecks) {
			const padding = plain.length - 32 - length;
			if (length < 0 || length % 4 || padding < 12 || padding > 1024) throw new require_errors_Common.SecurityError("Invalid message length");
			if (msgId.isEven()) throw new require_errors_Common.SecurityError(`Server sent an even msg_id ${msgId}`);
		}
		this.observeServerTime(msgId);
		const age = this.now() - msgIdTime(msgId);
		const registered = this.receivedIds.registerMsgId(msgId);
		this.receivedIds.shrink();
		if (this.securityChecks) {
			if (registered === "duplicate") throw new DuplicateMessageError(msgId);
			if (registered !== "success") throw new require_errors_Common.SecurityError(`Rejected message: ${registered}`);
			if (age > MAX_MESSAGE_AGE_S) throw new require_errors_Common.SecurityError(`Message ${msgId} is too old`);
			if (age < -30) throw new require_errors_Common.SecurityError(`Message ${msgId} is too far in the future`);
		}
		return new require_tl_core_TLMessage.TLMessage(msgId, seqNo, reader.tgReadObject());
	}
	now() {
		return Date.now() / 1e3 + this.timeOffset;
	}
	observeServerTime(msgId) {
		const offset = msgIdTime(msgId) - Date.now() / 1e3;
		if (offset > this.timeOffset) this.timeOffset = offset;
	}
	newMsgId() {
		const now = this.now();
		const seconds = Math.floor(now);
		const fraction = Math.floor((now - seconds) * 2 ** 32) & -4;
		let msgId = (0, big_integer.default)(seconds).shiftLeft(32).or((0, big_integer.default)(fraction >>> 0));
		if (this.lastMsgId.greaterOrEquals(msgId)) msgId = this.lastMsgId.add(4);
		this.lastMsgId = msgId;
		return msgId;
	}
	updateTimeOffset(correctMsgId) {
		const old = this.timeOffset;
		this.timeOffset = msgIdTime(correctMsgId) - Date.now() / 1e3;
		this.lastMsgId = big_integer.default.zero;
		this.log.debug(`Updated time offset from ${old.toFixed(3)}s to ${this.timeOffset.toFixed(3)}s`);
		return this.timeOffset;
	}
	nextSeqNo(contentRelated) {
		if (!contentRelated) return this.sequence * 2;
		return this.sequence++ * 2 + 1;
	}
};
exports.DuplicateMessageError = DuplicateMessageError;
exports.InvalidAuthKeyError = InvalidAuthKeyError;
exports.SessionState = SessionState;
