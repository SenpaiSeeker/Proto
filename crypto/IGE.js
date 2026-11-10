Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../platform/buffer/index.js");
const require_platform_crypto_index = require("../platform/crypto/index.js");
require("../platform/index.js");
const require_Helpers = require("../Helpers.js");
// teleproto/crypto/IGE.ts
const BLOCK_SIZE = 16;
var IGE = class {
	constructor(key, iv) {
		if (key.length !== 32) throw new Error("Key must be 32 bytes (AES-256)");
		if (iv.length !== 32) throw new Error("IV must be 32 bytes (2 * block size)");
		this.cipher = require_platform_crypto_index.aesIge(key);
		this.iv = iv;
	}
	encryptIge(plainText, output) {
		const padding = plainText.length % BLOCK_SIZE;
		if (padding !== 0) plainText = require_platform_buffer_index.Buffer.concat([plainText, require_Helpers.generateRandomBytes(BLOCK_SIZE - padding)]);
		return this.cipher.encrypt(plainText, this.iv, output);
	}
	decryptIge(cipherText, output) {
		if (cipherText.length % BLOCK_SIZE !== 0) throw new Error("Cipher text must be multiple of 16 bytes");
		return this.cipher.decrypt(cipherText, this.iv, output);
	}
	static backend() {
		const probe = require_platform_crypto_index.aesIge(require_platform_buffer_index.Buffer.alloc(32));
		const { backend } = probe;
		probe.dispose();
		return backend;
	}
	dispose() {
		this.cipher.dispose();
	}
};
exports.IGE = IGE;
