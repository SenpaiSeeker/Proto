Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_network_transport_socket_WebSocketSocket = require("../../network/transport/socket/WebSocketSocket.js");
// teleproto/compat/extensions/PromisedWebSockets.ts
const ALL = 2147483647;
/** @deprecated Use {@link WebSocketTransport}. */
var PromisedWebSockets = class extends require_network_transport_socket_WebSocketSocket.WebSocketSocket {
	static {
		this.isWebSocket = true;
	}
	constructor(proxy, _keepAliveInterval) {
		super();
		if (proxy && !("MTProxy" in proxy)) throw new Error("Socks proxies are not supported over the WebSocket transport");
	}
	readAll() {
		return this.read(ALL);
	}
	toString() {
		return "PromisedWebSockets";
	}
};
exports.PromisedWebSockets = PromisedWebSockets;
