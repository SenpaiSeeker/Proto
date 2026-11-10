Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
let _platform_storage = require("#platform/storage");
_platform_storage = require_runtime.__toESM(_platform_storage);
// teleproto/platform/storage/index.ts
var storage_exports = /* @__PURE__ */ require_runtime.__exportAll({ open: () => open });
const { open } = _platform_storage;
exports.open = open;
Object.defineProperty(exports, "storage_exports", {
	enumerable: true,
	get: function() {
		return storage_exports;
	}
});
