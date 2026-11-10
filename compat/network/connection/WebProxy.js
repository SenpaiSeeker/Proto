Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_compat_network_connection_TCPMTProxy = require("./TCPMTProxy.js");
const require_network_transport_WebProxyTransport = require("../../../network/transport/WebProxyTransport.js");
// teleproto/compat/network/connection/WebProxy.ts
/** @deprecated The WEB proxy picks its own framing: pass `proxy.WEB` or a `WebProxyTransport` without `connection`. */
var ConnectionWebProxy = class extends require_compat_network_connection_TCPMTProxy.TCPMTProxy {};
exports.ConnectionWebProxy = ConnectionWebProxy;
exports.createWebProxySocket = require_network_transport_WebProxyTransport.createWebProxySocket;
