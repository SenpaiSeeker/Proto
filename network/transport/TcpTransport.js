Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_network_connection_Obfuscation = require("../connection/Obfuscation.js");
const require_network_transport_socket_NetSocket = require("./socket/NetSocket.js");
const require_network_transport_Transport = require("./Transport.js");
// teleproto/network/transport/TcpTransport.ts
/** Connects to Telegram directly over TCP. This is the default transport. */
var TcpTransport = class extends require_network_transport_Transport.Transport {
	resolve(connection) {
		return {
			connection: connection ?? require_network_connection_Obfuscation.ConnectionTCPObfuscated,
			socket: require_network_transport_socket_NetSocket.NetSocket
		};
	}
};
exports.TcpTransport = TcpTransport;
