Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_tl_binary_Writer = require("./Writer.js");
require("../../platform/index.js");
// teleproto/tl/binary/serialize.ts
function serializeBytes(data) {
	if (typeof data !== "string" && !require_platform_buffer_index.Buffer.isBuffer(data)) throw new Error(`Bytes or str expected, not ${typeof data}`);
	const writer = new require_tl_binary_Writer.Writer();
	writer.bytes(data);
	return writer.finish();
}
function serializeDate(dt) {
	const buffer = require_platform_buffer_index.Buffer.alloc(4);
	if (!dt) return buffer;
	if (dt instanceof Date) dt = Math.floor((Date.now() - dt.getTime()) / 1e3);
	if (typeof dt !== "number") throw new Error(`Cannot interpret "${String(dt)}" as a date`);
	buffer.writeInt32LE(dt, 0);
	return buffer;
}
exports.serializeBytes = serializeBytes;
exports.serializeDate = serializeDate;
