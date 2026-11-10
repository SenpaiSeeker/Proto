Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_network_connection_Obfuscation = require("../connection/Obfuscation.js");
const require_network_transport_socket_NetSocket = require("./socket/NetSocket.js");
// teleproto/network/transport/Transport.ts
/**
* How the client reaches Telegram: directly, through a proxy or over WebSocket.
* A custom route implements {@link connect}; teleproto keeps the MTProto framing, obfuscation and reconnects.
*/
var Transport = class {
	/** @hidden */
	resolve(connection) {
		if (!this.connect) throw new Error(`${this.constructor.name} must implement connect()`);
		const connect = this.connect.bind(this);
		class StreamSocket extends require_network_transport_socket_NetSocket.NetSocket {
			async openTunnel(port, host) {
				return { socket: await connect({
					host,
					port
				}) };
			}
		}
		return {
			connection: connection ?? require_network_connection_Obfuscation.ConnectionTCPObfuscated,
			socket: StreamSocket
		};
	}
};
function ownFraming(transport, framing, requested) {
	if (requested && requested !== framing) throw new Error(`${transport} uses its own packet framing: remove the connection option`);
	return framing;
}
exports.Transport = Transport;
exports.ownFraming = ownFraming;
