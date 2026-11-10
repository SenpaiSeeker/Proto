Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../buffer/index.js");
// teleproto/platform/compression/crc32.ts
let table;
function crcTable() {
	const result = /* @__PURE__ */ new Uint32Array(256);
	for (let n = 0; n < 256; n++) {
		let c = n;
		for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
		result[n] = c;
	}
	return result;
}
function crc32(data, previous = 0) {
	table ??= crcTable();
	const bytes = typeof data === "string" ? require_platform_buffer_index.Buffer.from(data) : data;
	let crc = previous ^ -1;
	for (let index = 0; index < bytes.length; index++) crc = table[(crc ^ bytes[index]) & 255] ^ crc >>> 8;
	return (crc ^ -1) >>> 0;
}
exports.crc32 = crc32;
