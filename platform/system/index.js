Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
let _platform_system = require("#platform/system");
_platform_system = require_runtime.__toESM(_platform_system);
// teleproto/platform/system/index.ts
var system_exports = /* @__PURE__ */ require_runtime.__exportAll({
	deviceModel: () => deviceModel,
	systemVersion: () => systemVersion
});
const { deviceModel, systemVersion } = _platform_system;
exports.deviceModel = deviceModel;
exports.systemVersion = systemVersion;
Object.defineProperty(exports, "system_exports", {
	enumerable: true,
	get: function() {
		return system_exports;
	}
});
