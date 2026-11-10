Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_network_connection_Obfuscation = require("../connection/Obfuscation.js");
const require_network_transport_socket_WebSocketSocket = require("./socket/WebSocketSocket.js");
const require_network_transport_Transport = require("./Transport.js");
// teleproto/network/transport/WebSocketTransport.ts
/** Connects to Telegram over secure WebSocket. */
var WebSocketTransport = class extends require_network_transport_Transport.Transport {
	resolve(connection) {
		if (!this.webSocket) return {
			connection: connection ?? require_network_connection_Obfuscation.ConnectionTCPObfuscated,
			socket: require_network_transport_socket_WebSocketSocket.WebSocketSocket,
			webSocket: true
		};
		const create = this.webSocket.bind(this);
		class CustomWebSocket extends require_network_transport_socket_WebSocketSocket.WebSocketSocket {
			create(url, protocols) {
				return create(url, protocols);
			}
		}
		return {
			connection: connection ?? require_network_connection_Obfuscation.ConnectionTCPObfuscated,
			socket: CustomWebSocket,
			webSocket: true
		};
	}
};
exports.WebSocketTransport = WebSocketTransport;
