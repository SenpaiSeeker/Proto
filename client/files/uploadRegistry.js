Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
require("../../platform/index.js");
// teleproto/client/files/uploadRegistry.ts
const uploaded = /* @__PURE__ */ new WeakMap();
function rememberUpload(input, file) {
	uploaded.set(input, file);
}
function findUploads(request) {
	const found = /* @__PURE__ */ new Set();
	const seen = /* @__PURE__ */ new Set();
	const visit = (value, depth) => {
		if (!value || typeof value !== "object" || depth > 8 || seen.has(value) || require_platform_buffer_index.Buffer.isBuffer(value)) return;
		seen.add(value);
		const known = uploaded.get(value);
		if (known) {
			found.add(known);
			return;
		}
		for (const child of Array.isArray(value) ? value : Object.values(value)) visit(child, depth + 1);
	};
	visit(request, 0);
	return [...found];
}
exports.findUploads = findUploads;
exports.rememberUpload = rememberUpload;
