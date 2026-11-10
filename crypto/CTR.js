Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../platform/buffer/index.js");
const require_platform_crypto_index = require("../platform/crypto/index.js");
require("../platform/index.js");
// teleproto/crypto/CTR.ts
var CTR = class {
	constructor(key, iv) {
		if (!require_platform_buffer_index.Buffer.isBuffer(key) || !require_platform_buffer_index.Buffer.isBuffer(iv) || iv.length !== 16) throw new Error("Key and iv need to be a buffer");
		this.state = require_platform_crypto_index.aesCtr(key, iv);
	}
	encrypt(data) {
		return this.state.update(data);
	}
	encryptInPlace(data) {
		this.state.update(data, data);
		return data;
	}
	dispose() {
		this.state.dispose();
	}
};
exports.CTR = CTR;
