Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
let node_os = require("node:os");
node_os = require_runtime.__toESM(node_os);
// teleproto/platform/system/node.ts
function deviceModel() {
	return node_os.default.type().toString();
}
function systemVersion() {
	return node_os.default.release().toString();
}
exports.deviceModel = deviceModel;
exports.systemVersion = systemVersion;
