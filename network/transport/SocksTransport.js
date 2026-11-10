Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_net_index = require("../../platform/net/index.js");
const require_network_connection_Obfuscation = require("../connection/Obfuscation.js");
const require_network_transport_socket_NetSocket = require("./socket/NetSocket.js");
const require_errors_ProxyRejectedError = require("../../errors/ProxyRejectedError.js");
const require_network_transport_Transport = require("./Transport.js");
require("../../platform/index.js");
// teleproto/network/transport/SocksTransport.ts
async function openSocksTunnel(options, ip, port) {
	try {
		return { socket: await require_platform_net_index.socksConnect({
			host: options.host,
			port: options.port,
			version: options.version,
			username: options.username,
			password: options.password,
			timeoutMs: (options.timeout || 5) * 1e3,
			destination: {
				host: ip,
				port
			}
		}) };
	} catch (error) {
		if (error instanceof Error && /Authentication failed/i.test(error.message)) throw new require_errors_ProxyRejectedError.ProxyRejectedError(`SOCKS5 proxy ${options.host}:${options.port} rejected the credentials`);
		throw error;
	}
}
/** Connects to Telegram through a SOCKS4 or SOCKS5 proxy. */
var SocksTransport = class extends require_network_transport_Transport.Transport {
	constructor(options) {
		super();
		this.options = options;
	}
	resolve(connection) {
		const options = this.options;
		class SocksSocket extends require_network_transport_socket_NetSocket.NetSocket {
			openTunnel(port, ip) {
				return openSocksTunnel(options, ip, port);
			}
		}
		return {
			connection: connection ?? require_network_connection_Obfuscation.ConnectionTCPObfuscated,
			socket: SocksSocket,
			proxied: true
		};
	}
};
exports.SocksTransport = SocksTransport;
exports.openSocksTunnel = openSocksTunnel;
