Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("./_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("./platform/buffer/index.js");
const require_platform_crypto_index = require("./platform/crypto/index.js");
require("./tl/index.js");
const require_Helpers = require("./Helpers.js");
const require_tl_generated_api = require("./tl/generated/api.js");
require("./platform/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/Password.ts
var Password_exports = /* @__PURE__ */ require_runtime.__exportAll({
	computeCheck: () => computeCheck,
	computeDigest: () => computeDigest
});
const SIZE_FOR_HASH = 256;
/**
*
*
* @param prime{BigInteger}
* @param g{BigInteger}
*/
/**
*
* @param primeBytes{Buffer}
* @param g{number}
*/
function checkPrimeAndGood(primeBytes, g) {
	if (require_platform_buffer_index.Buffer.from([
		199,
		28,
		174,
		185,
		198,
		177,
		201,
		4,
		142,
		108,
		82,
		47,
		112,
		241,
		63,
		115,
		152,
		13,
		64,
		35,
		142,
		62,
		33,
		193,
		73,
		52,
		208,
		55,
		86,
		61,
		147,
		15,
		72,
		25,
		138,
		10,
		167,
		193,
		64,
		88,
		34,
		148,
		147,
		210,
		37,
		48,
		244,
		219,
		250,
		51,
		111,
		110,
		10,
		201,
		37,
		19,
		149,
		67,
		174,
		212,
		76,
		206,
		124,
		55,
		32,
		253,
		81,
		246,
		148,
		88,
		112,
		90,
		198,
		140,
		212,
		254,
		107,
		107,
		19,
		171,
		220,
		151,
		70,
		81,
		41,
		105,
		50,
		132,
		84,
		241,
		143,
		175,
		140,
		89,
		95,
		100,
		36,
		119,
		254,
		150,
		187,
		42,
		148,
		29,
		91,
		205,
		29,
		74,
		200,
		204,
		73,
		136,
		7,
		8,
		250,
		155,
		55,
		142,
		60,
		79,
		58,
		144,
		96,
		190,
		230,
		124,
		249,
		164,
		164,
		166,
		149,
		129,
		16,
		81,
		144,
		126,
		22,
		39,
		83,
		181,
		107,
		15,
		107,
		65,
		13,
		186,
		116,
		216,
		168,
		75,
		42,
		20,
		179,
		20,
		78,
		14,
		241,
		40,
		71,
		84,
		253,
		23,
		237,
		149,
		13,
		89,
		101,
		180,
		185,
		221,
		70,
		88,
		45,
		177,
		23,
		141,
		22,
		156,
		107,
		196,
		101,
		176,
		214,
		255,
		156,
		163,
		146,
		143,
		239,
		91,
		154,
		228,
		228,
		24,
		252,
		21,
		232,
		62,
		190,
		160,
		248,
		127,
		169,
		255,
		94,
		237,
		112,
		5,
		13,
		237,
		40,
		73,
		244,
		123,
		249,
		89,
		217,
		86,
		133,
		12,
		233,
		41,
		133,
		31,
		13,
		129,
		21,
		246,
		53,
		177,
		5,
		238,
		46,
		78,
		21,
		208,
		75,
		36,
		84,
		191,
		111,
		79,
		173,
		240,
		52,
		177,
		4,
		3,
		17,
		156,
		216,
		227,
		185,
		47,
		204,
		91
	]).equals(primeBytes)) {
		if ([
			3,
			4,
			5,
			7
		].includes(g)) return;
	}
	throw new Error("Changing passwords unsupported");
}
/**
*
* @param number{BigInteger}
* @param p{BigInteger}
* @returns {boolean}
*/
function isGoodLarge(number, p) {
	return number.greater((0, big_integer.default)(0)) && p.subtract(number).greater((0, big_integer.default)(0));
}
/**
*
* @param number {Buffer}
* @returns {Buffer}
*/
function numBytesForHash(number) {
	return require_platform_buffer_index.Buffer.concat([require_platform_buffer_index.Buffer.alloc(SIZE_FOR_HASH - number.length), number]);
}
/**
*
* @param g {bigInt}
* @returns {Buffer}
*/
function bigNumForHash(g) {
	return require_Helpers.readBufferFromBigInt(g, SIZE_FOR_HASH, false);
}
/**
*
* @param modexp {BigInteger}
* @param prime {BigInteger}
* @returns {Boolean}
*/
function isGoodModExpFirst(modexp, prime) {
	const diff = prime.subtract(modexp);
	const minDiffBitsCount = 1984;
	return !(diff.lesser((0, big_integer.default)(0)) || diff.bitLength().toJSNumber() < minDiffBitsCount || modexp.bitLength().toJSNumber() < minDiffBitsCount || Math.floor((modexp.bitLength().toJSNumber() + 7) / 8) > 256);
}
function xor(a, b) {
	const length = Math.min(a.length, b.length);
	for (let i = 0; i < length; i++) a[i] = a[i] ^ b[i];
	return a;
}
/**
*
* @param password{Buffer}
* @param salt{Buffer}
* @param iterations{number}
* @returns {*}
*/
async function pbkdf2sha512(password, salt, iterations) {
	return require_platform_crypto_index.pbkdf2(password, salt, iterations, 64, "sha512");
}
/**
*
* @param algo {constructors.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow}
* @param password
* @returns {Buffer|*}
*/
async function computeHash(algo, password) {
	const hash1 = await require_Helpers.sha256(require_platform_buffer_index.Buffer.concat([
		algo.salt1,
		require_platform_buffer_index.Buffer.from(password, "utf-8"),
		algo.salt1
	]));
	const hash3 = await pbkdf2sha512(await require_Helpers.sha256(require_platform_buffer_index.Buffer.concat([
		algo.salt2,
		hash1,
		algo.salt2
	])), algo.salt1, 1e5);
	return require_Helpers.sha256(require_platform_buffer_index.Buffer.concat([
		algo.salt2,
		hash3,
		algo.salt2
	]));
}
/**
*
* @param algo {constructors.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow}
* @param password
*/
async function computeDigest(algo, password) {
	try {
		checkPrimeAndGood(algo.p, algo.g);
	} catch (e) {
		throw new Error("bad p/g in password");
	}
	return bigNumForHash(require_Helpers.modExp((0, big_integer.default)(algo.g), require_Helpers.readBigIntFromBuffer(await computeHash(algo, password), false), require_Helpers.readBigIntFromBuffer(algo.p, false)));
}
/**
*
* @param request {constructors.account.Password}
* @param password {string}
*/
async function computeCheck(request, password) {
	const algo = request.currentAlgo;
	if (!(algo instanceof require_tl_generated_api.Api.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow)) throw new Error(`Unsupported password algorithm ${algo?.className}`);
	const srp_B = request.srp_B;
	const srpId = request.srpId;
	if (!srp_B || !srpId) throw new Error(`Undefined srp_b  ${request}`);
	const pwHash = await computeHash(algo, password);
	const p = require_Helpers.readBigIntFromBuffer(algo.p, false);
	const g = algo.g;
	const B = require_Helpers.readBigIntFromBuffer(srp_B, false);
	try {
		checkPrimeAndGood(algo.p, g);
	} catch (e) {
		throw new Error("bad /g in password");
	}
	if (!isGoodLarge(B, p)) throw new Error("bad b in check");
	const x = require_Helpers.readBigIntFromBuffer(pwHash, false);
	const pForHash = numBytesForHash(algo.p);
	const gForHash = bigNumForHash((0, big_integer.default)(g));
	const bForHash = numBytesForHash(srp_B);
	const gX = require_Helpers.modExp((0, big_integer.default)(g), x, p);
	const k = require_Helpers.readBigIntFromBuffer(await require_Helpers.sha256(require_platform_buffer_index.Buffer.concat([pForHash, gForHash])), false);
	const kgX = require_Helpers.bigIntMod(k.multiply(gX), p);
	const generateAndCheckRandom = async () => {
		const randomSize = 256;
		while (true) {
			const random = require_Helpers.generateRandomBytes(randomSize);
			const a = require_Helpers.readBigIntFromBuffer(random, false);
			const A = require_Helpers.modExp((0, big_integer.default)(g), a, p);
			if (isGoodModExpFirst(A, p)) {
				const aForHash = bigNumForHash(A);
				const u = require_Helpers.readBigIntFromBuffer(await require_Helpers.sha256(require_platform_buffer_index.Buffer.concat([aForHash, bForHash])), false);
				if (u.greater((0, big_integer.default)(0))) return {
					a,
					aForHash,
					u
				};
			}
		}
	};
	const { a, aForHash, u } = await generateAndCheckRandom();
	const gB = require_Helpers.bigIntMod(B.subtract(kgX), p);
	if (!isGoodModExpFirst(gB, p)) throw new Error("bad gB");
	const ux = u.multiply(x);
	const aUx = a.add(ux);
	const S = require_Helpers.modExp(gB, aUx, p);
	const [K, pSha, gSha, salt1Sha, salt2Sha] = await Promise.all([
		require_Helpers.sha256(bigNumForHash(S)),
		require_Helpers.sha256(pForHash),
		require_Helpers.sha256(gForHash),
		require_Helpers.sha256(algo.salt1),
		require_Helpers.sha256(algo.salt2)
	]);
	const M1 = await require_Helpers.sha256(require_platform_buffer_index.Buffer.concat([
		xor(pSha, gSha),
		salt1Sha,
		salt2Sha,
		aForHash,
		bForHash,
		K
	]));
	return new require_tl_generated_api.Api.InputCheckPasswordSRP({
		srpId,
		A: require_platform_buffer_index.Buffer.from(aForHash),
		M1
	});
}
Object.defineProperty(exports, "Password_exports", {
	enumerable: true,
	get: function() {
		return Password_exports;
	}
});
exports.computeCheck = computeCheck;
exports.computeDigest = computeDigest;
