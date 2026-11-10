Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_network_transport_socket_NetSocket = require("../../network/transport/socket/NetSocket.js");
const require_network_transport_SocksTransport = require("../../network/transport/SocksTransport.js");
// teleproto/compat/extensions/PromisedNetSockets.ts
const ALL = 2147483647;
/** @deprecated Use {@link TcpTransport} or {@link SocksTransport}. */
var PromisedNetSockets = class extends require_network_transport_socket_NetSocket.NetSocket {
	constructor(proxy, keepAliveInterval) {
		super(keepAliveInterval);
		this.proxy = proxy;
	}
	async openTunnel(port, ip) {
		const proxy = this.proxy;
		if (!proxy || !("socksType" in proxy)) return void 0;
		return require_network_transport_SocksTransport.openSocksTunnel({
			host: proxy.ip,
			port: proxy.port,
			version: proxy.socksType,
			username: proxy.username,
			password: proxy.password,
			timeout: proxy.timeout
		}, ip, port);
	}
	readAll() {
		return this.read(ALL);
	}
	toString() {
		return "PromisedNetSockets";
	}
};
exports.PromisedNetSockets = PromisedNetSockets;
