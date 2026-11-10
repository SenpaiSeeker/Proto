Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_network_connection_Obfuscation = require("../../../network/connection/Obfuscation.js");
const require_network_connection_IntermediateCodec = require("../../../network/connection/IntermediateCodec.js");
// teleproto/compat/network/connection/TCPMTProxy.ts
/** @deprecated The proxy picks its own framing: pass `proxy` or an `MTProxyTransport` without `connection`. */
var TCPMTProxy = class extends require_network_connection_Obfuscation.ConnectionTCPObfuscated {};
/** @deprecated The proxy picks its own framing: pass `proxy` or an `MTProxyTransport` without `connection`. */
var ConnectionTCPMTProxyAbridged = class extends TCPMTProxy {};
function isLegacyProxyConnection(connection) {
	return typeof connection === "function" && connection.prototype instanceof TCPMTProxy;
}
exports.ConnectionTCPMTProxyAbridged = ConnectionTCPMTProxyAbridged;
exports.PaddedIntermediatePacketCodec = require_network_connection_IntermediateCodec.PaddedIntermediatePacketCodec;
exports.TCPMTProxy = TCPMTProxy;
exports.isLegacyProxyConnection = isLegacyProxyConnection;
