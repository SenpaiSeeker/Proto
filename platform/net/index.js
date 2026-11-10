Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
let _platform_net = require("#platform/net");
_platform_net = require_runtime.__toESM(_platform_net);
// teleproto/platform/net/index.ts
var net_exports = /* @__PURE__ */ require_runtime.__exportAll({
	createSocket: () => createSocket,
	httpConnect: () => httpConnect,
	isIP: () => isIP,
	socksConnect: () => socksConnect,
	tcp: () => tcp
});
const { tcp, createSocket, isIP, httpConnect, socksConnect } = _platform_net;
exports.createSocket = createSocket;
exports.httpConnect = httpConnect;
exports.isIP = isIP;
Object.defineProperty(exports, "net_exports", {
	enumerable: true,
	get: function() {
		return net_exports;
	}
});
exports.socksConnect = socksConnect;
exports.tcp = tcp;
