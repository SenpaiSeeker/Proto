Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../_virtual/_rolldown/runtime.js");
require("./api.js");
const require_tl_generated_api = require("./generated/api.js");
const require_tl_binary_serialize = require("./binary/serialize.js");
const require_tl_runtime_Registry = require("./runtime/Registry.js");
// teleproto/tl/index.ts
var tl_exports = /* @__PURE__ */ require_runtime.__exportAll({
	Api: () => require_tl_generated_api.Api,
	LAYER: () => require_tl_runtime_Registry.LAYER,
	serializeBytes: () => require_tl_binary_serialize.serializeBytes,
	serializeDate: () => require_tl_binary_serialize.serializeDate,
	tlobjects: () => require_tl_runtime_Registry.tlobjects
});
exports.Api = require_tl_generated_api.Api;
exports.LAYER = require_tl_runtime_Registry.LAYER;
exports.serializeBytes = require_tl_binary_serialize.serializeBytes;
exports.serializeDate = require_tl_binary_serialize.serializeDate;
Object.defineProperty(exports, "tl_exports", {
	enumerable: true,
	get: function() {
		return tl_exports;
	}
});
exports.tlobjects = require_tl_runtime_Registry.tlobjects;
