Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_crypto_index = require("../platform/crypto/index.js");
require("../platform/index.js");
// teleproto/crypto/crypto.ts
var CTR = class {
	constructor(key, iv, algorithm) {
		this.cipher = require_platform_crypto_index.createCipher(algorithm, key, iv);
		this.decipher = require_platform_crypto_index.createDecipher(algorithm, key, iv);
	}
	update(plainText) {
		return this.encrypt(plainText);
	}
	encrypt(plainText) {
		return this.cipher.update(plainText);
	}
	decrypt(cipherText) {
		return this.decipher.update(cipherText);
	}
};
function createDecipher(algorithm, key, iv) {
	if (algorithm.includes("ECB")) throw new Error("ECB mode is not supported");
	return new CTR(key, iv, algorithm);
}
function createCipher(algorithm, key, iv) {
	if (algorithm.includes("ECB")) throw new Error("ECB mode is not supported");
	return new CTR(key, iv, algorithm);
}
function randomBytes(count) {
	return require_platform_crypto_index.randomBytes(count);
}
var Hash = class {
	constructor(algorithm) {
		this.hash = require_platform_crypto_index.createHash(algorithm);
	}
	update(data) {
		this.hash.update(data);
	}
	digest() {
		return this.hash.digest();
	}
};
function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	return require_platform_crypto_index.pbkdf2Sync(password, salt, iterations, keylen, digest);
}
function createHash(algorithm) {
	return new Hash(algorithm);
}
exports.CTR = CTR;
exports.Hash = Hash;
exports.createCipher = createCipher;
exports.createDecipher = createDecipher;
exports.createHash = createHash;
exports.pbkdf2Sync = pbkdf2Sync;
exports.randomBytes = randomBytes;
