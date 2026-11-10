Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("../buffer/index.js");
let cifrante = require("cifrante");
// teleproto/platform/crypto/index.ts
var crypto_exports = /* @__PURE__ */ require_runtime.__exportAll({
	aesCtr: () => aesCtr,
	aesIge: () => aesIge,
	createCipher: () => createCipher,
	createDecipher: () => createDecipher,
	createHash: () => createHash,
	createHmac: () => createHmac,
	factor: () => factor,
	gcd: () => gcd,
	hash: () => hash,
	hmac: () => hmac,
	isSafePrime: () => isSafePrime,
	modPow: () => modPow,
	pbkdf2: () => pbkdf2,
	pbkdf2Sync: () => pbkdf2Sync,
	randomBytes: () => randomBytes,
	randomFill: () => randomFill,
	randomInt: () => randomInt,
	rsaPublicKey: () => rsaPublicKey,
	x25519PublicKey: () => x25519PublicKey
});
const HASHES = {
	md5: cifrante.md5,
	sha1: cifrante.sha1,
	sha256: cifrante.sha256,
	sha384: cifrante.sha384,
	sha512: cifrante.sha512
};
const HMACS = { ...cifrante.hmac };
const CTR_ALGORITHM = /^aes-(128|192|256)-ctr$/i;
function toBuffer(bytes) {
	return require_platform_buffer_index.Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}
function bigintBytes(value) {
	const hex = value.toString(16);
	return require_platform_buffer_index.Buffer.from(hex.length % 2 ? `0${hex}` : hex, "hex");
}
function algorithmName(table, algorithm) {
	const name = algorithm.toLowerCase();
	if (!Object.hasOwn(table, name)) throw new Error(`Unsupported digest algorithm ${algorithm}`);
	return name;
}
function pick(table, algorithm) {
	return table[algorithmName(table, algorithm)];
}
function hasher(state) {
	const wrapped = {
		update(data) {
			state.update(data);
			return wrapped;
		},
		digest: () => toBuffer(state.digest())
	};
	return wrapped;
}
function randomBytes(count) {
	return toBuffer((0, cifrante.random)(count));
}
function randomInt(max) {
	return cifrante.random.int(max);
}
function randomFill(buffer, offset, length) {
	cifrante.random.fill(buffer, offset, length);
}
function createHash(algorithm) {
	return hasher(pick(HASHES, algorithm).sync.create());
}
function hash(algorithm, data) {
	return toBuffer(pick(HASHES, algorithm).sync(data));
}
function createHmac(algorithm, key) {
	return hasher(pick(HMACS, algorithm).sync.create(key));
}
function hmac(algorithm, key, data) {
	return toBuffer(pick(HMACS, algorithm).sync(key, data));
}
function kdfHash(digest) {
	return algorithmName(HMACS, digest);
}
async function pbkdf2(password, salt, iterations, length, digest) {
	return toBuffer(await cifrante.kdf.pbkdf2(password, salt, {
		hash: kdfHash(digest),
		iterations,
		length
	}));
}
function pbkdf2Sync(password, salt, iterations, length, digest) {
	return toBuffer(cifrante.kdf.pbkdf2.sync(password, salt, {
		hash: kdfHash(digest),
		iterations,
		length
	}));
}
function streamCipher(algorithm, key, iv) {
	if (!CTR_ALGORITHM.test(algorithm)) throw new Error(`Unsupported cipher algorithm ${algorithm}`);
	const state = aesCtr(key, iv);
	return {
		update: (data) => state.update(data),
		final: () => require_platform_buffer_index.Buffer.alloc(0)
	};
}
function createCipher(algorithm, key, iv) {
	return streamCipher(algorithm, key, iv);
}
function createDecipher(algorithm, key, iv) {
	return streamCipher(algorithm, key, iv);
}
function aesIge(key) {
	const cipher = cifrante.aes.ige(key);
	return {
		backend: cipher.backend,
		encrypt: (data, iv, output) => toBuffer(cipher.encryptSync(data, {
			iv,
			output
		})),
		decrypt: (data, iv, output) => toBuffer(cipher.decryptSync(data, {
			iv,
			output
		})),
		dispose: () => cipher.dispose()
	};
}
function aesCtr(key, iv) {
	const cipher = cifrante.aes.ctr(key);
	const state = cipher.create({ iv });
	cipher.dispose();
	return {
		update: (data, output) => toBuffer(state.update(data, output)),
		dispose: () => state.dispose()
	};
}
function rsaPublicKey(pem) {
	const { n, e } = cifrante.rsa.publicKey(pem);
	return {
		n: bigintBytes(n),
		e: bigintBytes(e)
	};
}
function x25519PublicKey() {
	return toBuffer(cifrante.x25519.keys.sync().publicKey);
}
function modPow(base, exponent, modulus) {
	return cifrante.math.modPow(base, exponent, modulus);
}
function gcd(a, b) {
	return cifrante.math.gcd(a, b);
}
function factor(value) {
	return cifrante.math.factor(value);
}
function isSafePrime(value) {
	return cifrante.math.isSafePrime(value);
}
exports.aesCtr = aesCtr;
exports.aesIge = aesIge;
exports.createCipher = createCipher;
exports.createDecipher = createDecipher;
exports.createHash = createHash;
exports.createHmac = createHmac;
Object.defineProperty(exports, "crypto_exports", {
	enumerable: true,
	get: function() {
		return crypto_exports;
	}
});
exports.factor = factor;
exports.gcd = gcd;
exports.hash = hash;
exports.hmac = hmac;
exports.isSafePrime = isSafePrime;
exports.modPow = modPow;
exports.pbkdf2 = pbkdf2;
exports.pbkdf2Sync = pbkdf2Sync;
exports.randomBytes = randomBytes;
exports.randomFill = randomFill;
exports.randomInt = randomInt;
exports.rsaPublicKey = rsaPublicKey;
exports.x25519PublicKey = x25519PublicKey;
