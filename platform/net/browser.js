Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_net_ip = require("./ip.js");
// teleproto/platform/net/browser.ts
const tcp = false;
function unavailable() {
	return /* @__PURE__ */ new Error("TCP sockets are not available in this environment: use WebSocketTransport or WebProxyTransport");
}
function createSocket() {
	throw unavailable();
}
function httpConnect(_options) {
	return Promise.reject(unavailable());
}
function socksConnect(_options) {
	return Promise.reject(unavailable());
}
exports.createSocket = createSocket;
exports.httpConnect = httpConnect;
exports.isIP = require_platform_net_ip.isIP;
exports.socksConnect = socksConnect;
exports.tcp = tcp;
