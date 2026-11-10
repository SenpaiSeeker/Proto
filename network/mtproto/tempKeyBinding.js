Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_platform_crypto_index = require("../../platform/crypto/index.js");
require("../../tl/index.js");
const require_crypto_IGE = require("../../crypto/IGE.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_Helpers = require("../../Helpers.js");
require("../../platform/index.js");
// teleproto/network/mtproto/tempKeyBinding.ts
function tempKeyLifetime() {
	return 82800 + Math.floor(Math.random() * 3600);
}
function sha1(data) {
	return require_platform_crypto_index.hash("sha1", data);
}
function calcKeyV1(authKey, msgKey) {
	const a = sha1(require_platform_buffer_index.Buffer.concat([msgKey, authKey.subarray(0, 32)]));
	const b = sha1(require_platform_buffer_index.Buffer.concat([
		authKey.subarray(32, 48),
		msgKey,
		authKey.subarray(48, 64)
	]));
	const c = sha1(require_platform_buffer_index.Buffer.concat([authKey.subarray(64, 96), msgKey]));
	const d = sha1(require_platform_buffer_index.Buffer.concat([msgKey, authKey.subarray(96, 128)]));
	return {
		key: require_platform_buffer_index.Buffer.concat([
			a.subarray(0, 8),
			b.subarray(8, 20),
			c.subarray(4, 16)
		]),
		iv: require_platform_buffer_index.Buffer.concat([
			a.subarray(8, 20),
			b.subarray(0, 8),
			c.subarray(16, 20),
			d.subarray(0, 8)
		])
	};
}
function buildBindTempAuthKeyRequest(permKey, tempKey, tempSessionId, msgId, expiresAt) {
	if (!permKey.getKey() || !permKey.keyId) throw new Error("bindTempAuthKey: permanent key is not ready");
	if (!tempKey.keyId) throw new Error("bindTempAuthKey: temporary key is not ready");
	const nonce = require_Helpers.generateRandomLong(true);
	const inner = new require_tl_generated_api.Api.BindAuthKeyInner({
		nonce,
		tempAuthKeyId: tempKey.keyId,
		permAuthKeyId: permKey.keyId,
		tempSessionId,
		expiresAt
	}).getBytes();
	const head = require_platform_buffer_index.Buffer.alloc(24);
	require_Helpers.generateRandomBytes(16).copy(head, 0);
	require_Helpers.toSignedLittleBuffer(msgId, 8).copy(head, 16);
	const meta = require_platform_buffer_index.Buffer.alloc(8);
	meta.writeInt32LE(0, 0);
	meta.writeInt32LE(inner.length, 4);
	let payload = require_platform_buffer_index.Buffer.concat([
		head,
		meta,
		inner
	]);
	const pad = (16 - payload.length % 16) % 16;
	if (pad) payload = require_platform_buffer_index.Buffer.concat([payload, require_Helpers.generateRandomBytes(pad)]);
	const msgKey = sha1(payload.subarray(0, 32 + inner.length)).subarray(4, 20);
	const { key, iv } = calcKeyV1(permKey.getKey(), msgKey);
	const ige = new require_crypto_IGE.IGE(key, iv);
	const encrypted = ige.encryptIge(payload, payload);
	ige.dispose();
	const encryptedMessage = require_platform_buffer_index.Buffer.concat([
		require_Helpers.toSignedLittleBuffer(permKey.keyId, 8),
		msgKey,
		encrypted
	]);
	return new require_tl_generated_api.Api.auth.BindTempAuthKey({
		permAuthKeyId: permKey.keyId,
		nonce,
		expiresAt,
		encryptedMessage
	});
}
exports.buildBindTempAuthKeyRequest = buildBindTempAuthKeyRequest;
exports.tempKeyLifetime = tempKeyLifetime;
