Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("./_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("./platform/buffer/index.js");
const require_platform_compression_index = require("./platform/compression/index.js");
const require_platform_crypto_index = require("./platform/crypto/index.js");
const require_platform_timers_index = require("./platform/timers/index.js");
require("./platform/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/Helpers.ts
var Helpers_exports = /* @__PURE__ */ require_runtime.__exportAll({
	TotalList: () => TotalList,
	_EntityType: () => _EntityType,
	_entityType: () => _entityType,
	asBuffer: () => asBuffer,
	betterConsoleLog: () => betterConsoleLog,
	bigIntMod: () => bigIntMod,
	bufferXor: () => bufferXor,
	convertToLittle: () => convertToLittle,
	crc32: () => crc32,
	escapeRegex: () => escapeRegex,
	generateKeyDataFromNonce: () => generateKeyDataFromNonce,
	generateRandomBigInt: () => generateRandomBigInt,
	generateRandomBytes: () => generateRandomBytes,
	generateRandomLong: () => generateRandomLong,
	getByteArray: () => getByteArray,
	getMinBigInt: () => getMinBigInt,
	getRandomInt: () => getRandomInt,
	groupBy: () => groupBy,
	isArrayLike: () => isArrayLike,
	mod: () => mod,
	modExp: () => modExp,
	readBigIntFromBuffer: () => readBigIntFromBuffer,
	readBufferFromBigInt: () => readBufferFromBigInt,
	returnBigInt: () => returnBigInt,
	sha1: () => sha1,
	sha256: () => sha256,
	sleep: () => sleep,
	stripText: () => stripText,
	toSignedLittleBuffer: () => toSignedLittleBuffer,
	unionId: () => unionId
});
function asBuffer(bytes) {
	return require_platform_buffer_index.Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}
/**
* converts a buffer to big int
* @param buffer
* @param little
* @param signed
* @returns {bigInt.BigInteger}
*/
function readBigIntFromBuffer(buffer, little = true, signed = false) {
	if (!require_platform_buffer_index.Buffer.isBuffer(buffer)) {
		const view = buffer;
		buffer = require_platform_buffer_index.Buffer.from(view.buffer, view.byteOffset, view.byteLength);
	}
	if (buffer.length === 8) return (0, big_integer.default)(little ? signed ? buffer.readBigInt64LE(0) : buffer.readBigUInt64LE(0) : signed ? buffer.readBigInt64BE(0) : buffer.readBigUInt64BE(0));
	let count8b = buffer.length / 8 | 0;
	let bytesLeft = buffer.length - count8b * 8;
	const bi64 = BigInt(64);
	let resBigInt = BigInt(0);
	let i = count8b;
	while (i > 0) {
		resBigInt = (little ? buffer.readBigUInt64LE(buffer.length - (count8b - i + 1) * 8) : buffer.readBigUInt64BE((count8b - i) * 8)) + (resBigInt << bi64);
		--i;
	}
	const resBitLength = 8 * buffer.length;
	if (bytesLeft) {
		if (buffer.length < 8) {
			let buf8b = require_platform_buffer_index.Buffer.allocUnsafe(8);
			let writeIdx = little ? 0 : 8 - bytesLeft;
			buffer.copy(buf8b, writeIdx, 0, bytesLeft);
			buffer = buf8b;
		}
		let bi = little ? buffer.readBigUInt64LE(0) : buffer.readBigUInt64BE(buffer.length - 8);
		bi = BigInt.asUintN(8 * bytesLeft, bi);
		resBigInt = bi + (resBigInt << BigInt(8 * bytesLeft));
	}
	if (signed) resBigInt = BigInt.asIntN(resBitLength, resBigInt);
	return (0, big_integer.default)(resBigInt);
}
function escapeRegex(string) {
	return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function groupBy(list, keyGetter) {
	const map = /* @__PURE__ */ new Map();
	list.forEach((item) => {
		const key = keyGetter(item);
		const collection = map.get(key);
		if (!collection) map.set(key, [item]);
		else collection.push(item);
	});
	return map;
}
/**
* Outputs the object in a better way by hiding all the private methods/attributes.
* @param object - the class to use
*/
function betterConsoleLog(object) {
	const toPrint = {};
	for (const key in object) if (object.hasOwnProperty(key)) {
		if (!key.startsWith("_") && key != "originalArgs") toPrint[key] = object[key];
	}
	return toPrint;
}
/**
* Helper to find if a given object is an array (or similar)
*/
const isArrayLike = (x) => x && typeof x.length === "number" && typeof x !== "function" && typeof x !== "string";
/**
* Special case signed little ints
* @param big
* @param number
* @returns {Buffer}
*/
function toNativeBigInt(value) {
	if (typeof value === "bigint") return value;
	if (typeof value === "number") return BigInt(value);
	const wrapped = returnBigInt(value);
	return typeof wrapped.value === "bigint" ? wrapped.value : BigInt(String(wrapped));
}
function bitLengthOf(value) {
	let bits = 0;
	while (value > BigInt(4294967295)) {
		value >>= BigInt(32);
		bits += 32;
	}
	return bits + (32 - Math.clz32(Number(value)));
}
function writeUnsignedLE(buffer, value, offset, length) {
	let rest = value;
	for (let done = 0; done < length;) {
		const count = Math.min(8, length - done);
		if (count === 8) buffer.writeBigUInt64LE(BigInt.asUintN(64, rest), offset + done);
		else for (let i = 0; i < count; i++) buffer[offset + done + i] = Number(BigInt.asUintN(8, rest >> BigInt(8 * i)));
		rest >>= BigInt(8 * count);
		done += count;
	}
}
function toSignedLittleBuffer(big, number = 8) {
	const buffer = require_platform_buffer_index.Buffer.allocUnsafe(number);
	writeUnsignedLE(buffer, BigInt.asUintN(number * 8, toNativeBigInt(big)), 0, number);
	return buffer;
}
/**
* converts a big int to a buffer
* @param bigIntVar {BigInteger}
* @param bytesNumber
* @param little
* @param signed
* @returns {Buffer}
*/
function readBufferFromBigInt(bigIntVar, bytesNumber, little = true, signed = false) {
	const value = toNativeBigInt(bigIntVar);
	const bits = bytesNumber * 8;
	const negative = value < BigInt(0);
	const magnitude = negative ? -value - BigInt(1) : value;
	if (bytesNumber < Math.ceil(bitLengthOf(magnitude) / 8)) throw new Error("OverflowError: int too big to convert");
	if (!signed && negative) throw new Error("Cannot convert to unsigned");
	const buffer = require_platform_buffer_index.Buffer.allocUnsafe(bytesNumber);
	writeUnsignedLE(buffer, BigInt.asUintN(bits, value), 0, bytesNumber);
	return little ? buffer : buffer.reverse();
}
/**
* Generates a random long integer (8 bytes), which is optionally signed
* @returns {BigInteger}
*/
function generateRandomLong(signed = true) {
	return readBigIntFromBuffer(generateRandomBytes(8), true, signed);
}
/**
* Generates a random unsigned long integer (8 bytes)
* @returns {BigInteger}
*/
function generateRandomBigInt() {
	return generateRandomLong(false);
}
/**
* .... really javascript
* @param n {number}
* @param m {number}
* @returns {number}
*/
function mod(n, m) {
	return (n % m + m) % m;
}
/**
* returns a positive bigInt
* @param n {bigInt.BigInteger}
* @param m {bigInt.BigInteger}
* @returns {bigInt.BigInteger}
*/
function bigIntMod(n, m) {
	return n.remainder(m).add(m).remainder(m);
}
/**
* Generates a random bytes array
* @param count
* @returns {Buffer}
*/
function generateRandomBytes(count) {
	return require_platform_crypto_index.randomBytes(count);
}
/**
* Trims whitespace from both ends of the text and shifts the entities to match.
*/
function stripText(text, entities) {
	if (!entities || !entities.length) return text.trim();
	while (text && text[text.length - 1].trim() === "") {
		const e = entities[entities.length - 1];
		if (e.offset + e.length == text.length) {
			if (e.length == 1) {
				entities.pop();
				if (!entities.length) return text.trim();
			} else e.length -= 1;
		}
		text = text.slice(0, -1);
	}
	while (text && text[0].trim() === "") {
		for (let i = 0; i < entities.length; i++) {
			const e = entities[i];
			if (e.offset != 0) {
				e.offset--;
				continue;
			}
			if (e.length == 1) {
				entities.shift();
				if (!entities.length) return text.trimLeft();
			} else e.length -= 1;
		}
		text = text.slice(1);
	}
	return text;
}
/**
* Generates the key data corresponding to the given nonces
* @param serverNonceBigInt
* @param newNonceBigInt
* @returns {{key: Buffer, iv: Buffer}}
*/
async function generateKeyDataFromNonce(serverNonceBigInt, newNonceBigInt) {
	const serverNonce = toSignedLittleBuffer(serverNonceBigInt, 16);
	const newNonce = toSignedLittleBuffer(newNonceBigInt, 32);
	const [hash1, hash2, hash3] = await Promise.all([
		sha1(require_platform_buffer_index.Buffer.concat([newNonce, serverNonce])),
		sha1(require_platform_buffer_index.Buffer.concat([serverNonce, newNonce])),
		sha1(require_platform_buffer_index.Buffer.concat([newNonce, newNonce]))
	]);
	return {
		key: require_platform_buffer_index.Buffer.concat([hash1, hash2.slice(0, 12)]),
		iv: require_platform_buffer_index.Buffer.concat([
			hash2.slice(12, 20),
			hash3,
			newNonce.slice(0, 4)
		])
	};
}
function convertToLittle(buf) {
	const correct = require_platform_buffer_index.Buffer.alloc(buf.length * 4);
	for (let i = 0; i < buf.length; i++) correct.writeUInt32BE(buf[i], i * 4);
	return correct;
}
/**
* Calculates the SHA1 digest for the given data
* @param data
* @returns {Promise}
*/
function sha1(data) {
	return require_platform_crypto_index.hash("sha1", data);
}
/**
* Calculates the SHA256 digest for the given data
* @param data
* @returns {Promise}
*/
function sha256(data) {
	return require_platform_crypto_index.hash("sha256", data);
}
/**
* Fast mod pow for RSA calculation. a^b % n
* @param a
* @param b
* @param n
* @returns {bigInt.BigInteger}
*/
function modExp(a, b, n) {
	if (b.lesserOrEquals(big_integer.default.zero)) return big_integer.default.one;
	return (0, big_integer.default)(require_platform_crypto_index.modPow(BigInt(a.toString()), BigInt(b.toString()), BigInt(n.toString())).toString());
}
/**
* Gets the arbitrary-length byte array corresponding to the given integer
* @param integer {number,BigInteger}
* @param signed {boolean}
* @returns {Buffer}
*/
function getByteArray(integer, signed = false) {
	const bits = integer.toString(2).length;
	const byteLength = Math.floor((bits + 8 - 1) / 8);
	return readBufferFromBigInt(typeof integer == "number" ? (0, big_integer.default)(integer) : integer, byteLength, false, signed);
}
function returnBigInt(num) {
	if (big_integer.default.isInstance(num)) return num;
	if (typeof num == "number") return (0, big_integer.default)(num);
	if (typeof num == "bigint") return (0, big_integer.default)(num);
	return (0, big_integer.default)(num);
}
/**
* Helper function to return the smaller big int in an array
* @param arrayOfBigInts
*/
function getMinBigInt(arrayOfBigInts) {
	if (arrayOfBigInts.length == 0) return big_integer.default.zero;
	if (arrayOfBigInts.length == 1) return returnBigInt(arrayOfBigInts[0]);
	let smallest = returnBigInt(arrayOfBigInts[0]);
	for (let i = 1; i < arrayOfBigInts.length; i++) if (returnBigInt(arrayOfBigInts[i]).lesser(smallest)) smallest = returnBigInt(arrayOfBigInts[i]);
	return smallest;
}
/**
* returns a random int from min (inclusive) and max (inclusive)
* @param min
* @param max
* @returns {number}
*/
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
* Sleeps a specified amount of time
* @param ms time in milliseconds
* @param isUnref make a timer unref'ed
* @returns {Promise}
*/
const sleep = (ms, isUnref = false) => require_platform_timers_index.sleep(ms, { ref: !isUnref });
/**
* Helper to export two buffers of same length
* @returns {Buffer}
*/
function bufferXor(a, b) {
	const res = [];
	for (let i = 0; i < a.length; i++) res.push(a[i] ^ b[i]);
	return require_platform_buffer_index.Buffer.from(res);
}
function crc32(buf, previous = 0) {
	return require_platform_compression_index.crc32(buf, previous);
}
const unionIdCache = /* @__PURE__ */ new Map();
function unionId(name) {
	let id = unionIdCache.get(name);
	if (id === void 0) {
		id = crc32(name) >>> 0;
		unionIdCache.set(name, id);
	}
	return id;
}
var TotalList = class extends Array {
	constructor() {
		super();
		this.total = 0;
	}
};
const _EntityType = {
	USER: 0,
	CHAT: 1,
	CHANNEL: 2
};
Object.freeze(_EntityType);
function _entityType(entity) {
	if (typeof entity !== "object" || !("SUBCLASS_OF_ID" in entity)) throw new Error(`${entity} is not a TLObject, cannot determine entity type`);
	if (![
		unionId("Peer"),
		unionId("InputPeer"),
		unionId("InputUser"),
		unionId("InputChannel"),
		unionId("User"),
		unionId("Chat"),
		unionId("UserFull"),
		unionId("ChatFull")
	].includes(entity.SUBCLASS_OF_ID)) throw new Error(`${entity} does not have any entity type`);
	const name = entity.className;
	if (name.includes("User")) return _EntityType.USER;
	else if (name.includes("Chat")) return _EntityType.CHAT;
	else if (name.includes("Channel") || name.includes("Community")) return _EntityType.CHANNEL;
	else if (name.includes("Self")) return _EntityType.USER;
	throw new Error(`${entity} does not have any entity type`);
}
Object.defineProperty(exports, "Helpers_exports", {
	enumerable: true,
	get: function() {
		return Helpers_exports;
	}
});
exports.TotalList = TotalList;
exports._EntityType = _EntityType;
exports._entityType = _entityType;
exports.asBuffer = asBuffer;
exports.betterConsoleLog = betterConsoleLog;
exports.bigIntMod = bigIntMod;
exports.bufferXor = bufferXor;
exports.convertToLittle = convertToLittle;
exports.crc32 = crc32;
exports.escapeRegex = escapeRegex;
exports.generateKeyDataFromNonce = generateKeyDataFromNonce;
exports.generateRandomBigInt = generateRandomBigInt;
exports.generateRandomBytes = generateRandomBytes;
exports.generateRandomLong = generateRandomLong;
exports.getByteArray = getByteArray;
exports.getMinBigInt = getMinBigInt;
exports.getRandomInt = getRandomInt;
exports.groupBy = groupBy;
exports.isArrayLike = isArrayLike;
exports.mod = mod;
exports.modExp = modExp;
exports.readBigIntFromBuffer = readBigIntFromBuffer;
exports.readBufferFromBigInt = readBufferFromBigInt;
exports.returnBigInt = returnBigInt;
exports.sha1 = sha1;
exports.sha256 = sha256;
exports.sleep = sleep;
exports.stripText = stripText;
exports.toSignedLittleBuffer = toSignedLittleBuffer;
exports.unionId = unionId;
