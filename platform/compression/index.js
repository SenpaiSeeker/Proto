Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_platform_compression_crc32 = require("./crc32.js");
const require_platform_buffer_index = require("../buffer/index.js");
let cifrante = require("cifrante");
// teleproto/platform/compression/index.ts
var compression_exports = /* @__PURE__ */ require_runtime.__exportAll({
	crc32: () => crc32,
	gunzip: () => gunzip,
	gzip: () => gzip
});
function toBuffer(bytes) {
	return require_platform_buffer_index.Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}
function gzip(data) {
	return toBuffer(cifrante.gzip.compress.sync(data));
}
function gunzip(data) {
	return toBuffer(cifrante.gzip.decompress.sync(data));
}
function crc32(data, previous = 0) {
	return previous ? require_platform_compression_crc32.crc32(data, previous) : (0, cifrante.crc32)(data);
}
Object.defineProperty(exports, "compression_exports", {
	enumerable: true,
	get: function() {
		return compression_exports;
	}
});
exports.crc32 = crc32;
exports.gunzip = gunzip;
exports.gzip = gzip;
