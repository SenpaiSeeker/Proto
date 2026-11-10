Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_network_connection_Obfuscation = require("../network/connection/Obfuscation.js");
const require_network_transport_MTProxyTransport = require("../network/transport/MTProxyTransport.js");
const require_network_transport_Transport = require("../network/transport/Transport.js");
const require_compat_network_connection_TCPMTProxy = require("./network/connection/TCPMTProxy.js");
// teleproto/compat/LegacySocketTransport.ts
/** Runs a legacy `networkSocket` factory as a {@link Transport}. */
var LegacySocketTransport = class extends require_network_transport_Transport.Transport {
	constructor(factory, proxy) {
		super();
		this.factory = factory;
		this.proxy = proxy;
		if (proxy && "WEB" in proxy) throw new Error("WEB proxy requires its own socket: remove networkSocket");
	}
	resolve(connection) {
		const { factory, proxy } = this;
		const socket = function(keepAliveInterval) {
			return new factory(proxy, keepAliveInterval);
		};
		if (proxy && "MTProxy" in proxy) {
			if (connection && !require_compat_network_connection_TCPMTProxy.isLegacyProxyConnection(connection)) throw new Error("MTProxy uses its own packet framing: remove the connection option");
			return {
				connection: require_network_transport_MTProxyTransport.mtproxyConnection(proxy.ip, proxy.port, require_network_transport_MTProxyTransport.parseProxySecret(proxy.secret)),
				socket,
				clientProxy: {
					address: proxy.ip,
					port: proxy.port
				},
				proxied: true,
				webSocket: !!factory.isWebSocket
			};
		}
		return {
			connection: connection ?? require_network_connection_Obfuscation.ConnectionTCPObfuscated,
			socket,
			proxied: !!proxy,
			webSocket: !!factory.isWebSocket
		};
	}
};
exports.LegacySocketTransport = LegacySocketTransport;
