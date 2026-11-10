Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../platform/buffer/index.js");
const require_Helpers = require("../Helpers.js");
const require_tl_binary_Reader = require("../tl/binary/Reader.js");
require("../platform/index.js");
// teleproto/crypto/AuthKey.ts
var AuthKey = class AuthKey {
	constructor(value, hash) {
		if (!hash || !value) return;
		this._key = value;
		this._hash = hash;
		const reader = new require_tl_binary_Reader.Reader(hash);
		this.auxHash = reader.readLong(false);
		reader.read(4);
		this.keyId = reader.readLong(false);
	}
	async setKey(value) {
		if (!value) {
			this._key = this.auxHash = this.keyId = this._hash = void 0;
			return;
		}
		if (value instanceof AuthKey) {
			this._key = value._key;
			this.auxHash = value.auxHash;
			this.keyId = value.keyId;
			this._hash = value._hash;
			return;
		}
		this._key = value;
		this._hash = await require_Helpers.sha1(this._key);
		const reader = new require_tl_binary_Reader.Reader(this._hash);
		this.auxHash = reader.readLong(false);
		reader.read(4);
		this.keyId = reader.readLong(false);
	}
	async waitForKey() {
		while (!this.keyId) {
			if (!this._key) throw new Error("Auth key is unset");
			await require_Helpers.sleep(20);
		}
	}
	getKey() {
		return this._key;
	}
	/**
	* Calculates the new nonce hash based on the current class fields' values
	* @param newNonce
	* @param number
	* @returns {bigInt.BigInteger}
	*/
	async calcNewNonceHash(newNonce, number) {
		if (this.auxHash) {
			const nonce = require_Helpers.toSignedLittleBuffer(newNonce, 32);
			const n = require_platform_buffer_index.Buffer.alloc(1);
			n.writeUInt8(number, 0);
			const data = require_platform_buffer_index.Buffer.concat([nonce, require_platform_buffer_index.Buffer.concat([n, require_Helpers.readBufferFromBigInt(this.auxHash, 8, true)])]);
			const shaData = (await require_Helpers.sha1(data)).slice(4, 20);
			return require_Helpers.readBigIntFromBuffer(shaData, true, true);
		}
		throw new Error("Auth key not set");
	}
	equals(other) {
		return other instanceof this.constructor && this._key && require_platform_buffer_index.Buffer.isBuffer(other.getKey()) && other.getKey()?.equals(this._key);
	}
};
exports.AuthKey = AuthKey;
