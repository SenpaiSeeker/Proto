Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/crypto/converters.ts
/**
* Uint32Array -> ArrayBuffer (little-endian OS)
* Writes each uint32 in big-endian byte order for stable, platform-independent representation.
*/
function i2abLow(buf) {
	const out = new Uint8Array(buf.length * 4);
	let o = 0;
	for (let j = 0; j < buf.length; j++) {
		const v = buf[j] >>> 0;
		out[o++] = v >>> 24 & 255;
		out[o++] = v >>> 16 & 255;
		out[o++] = v >>> 8 & 255;
		out[o++] = v & 255;
	}
	return out.buffer;
}
/**
* Uint32Array -> ArrayBuffer (big-endian OS)
* Direct buffer view is already in the desired memory layout.
*/
function i2abBig(buf) {
	return buf.buffer;
}
/**
* ArrayBuffer -> Uint32Array (little-endian OS)
* Reads big-endian bytes into uint32 values.
*/
function ab2iLow(ab) {
	const src = ab instanceof Uint8Array ? ab : new Uint8Array(ab);
	const len = src.length;
	if (len % 4 !== 0) throw new RangeError("Byte length must be a multiple of 4");
	const out = new Uint32Array(len / 4);
	for (let i = 0, w = 0; i < len; i += 4) out[w++] = src[i] << 24 >>> 0 ^ src[i + 1] << 16 >>> 0 ^ src[i + 2] << 8 >>> 0 ^ src[i + 3] >>> 0;
	return out;
}
/**
* ArrayBuffer -> Uint32Array (big-endian OS)
*/
function ab2iBig(ab) {
	return ab instanceof Uint8Array ? new Uint32Array(ab.buffer, ab.byteOffset, Math.floor(ab.byteLength / 4)) : new Uint32Array(ab);
}
/** Runtime endianness check (true if big-endian). */
const isBigEndian = new Uint8Array(new Uint32Array([16909060]).buffer)[0] === 1;
const i2ab = isBigEndian ? i2abBig : i2abLow;
const ab2i = isBigEndian ? ab2iBig : ab2iLow;
exports.ab2i = ab2i;
exports.ab2iBig = ab2iBig;
exports.ab2iLow = ab2iLow;
exports.i2ab = i2ab;
exports.i2abBig = i2abBig;
exports.i2abLow = i2abLow;
exports.isBigEndian = isBigEndian;
