Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_platform_net_index = require("../../platform/net/index.js");
const require_network_connection_Obfuscation = require("../connection/Obfuscation.js");
const require_network_transport_socket_NetSocket = require("./socket/NetSocket.js");
const require_errors_ProxyRejectedError = require("../../errors/ProxyRejectedError.js");
const require_network_transport_Transport = require("./Transport.js");
require("../../platform/index.js");
// teleproto/network/transport/HttpProxyTransport.ts
async function openHttpTunnel(options, ip, port) {
	const target = ip.includes(":") ? `[${ip}]:${port}` : `${ip}:${port}`;
	const headers = { Host: target };
	if (options.username !== void 0) {
		const credentials = `${options.username}:${options.password ?? ""}`;
		headers["Proxy-Authorization"] = `Basic ${require_platform_buffer_index.Buffer.from(credentials).toString("base64")}`;
	}
	const seconds = options.timeout || 5;
	const response = await require_platform_net_index.httpConnect({
		host: options.host,
		port: options.port,
		tls: !!options.tls,
		target,
		headers,
		timeoutMs: seconds * 1e3,
		timeoutError: () => /* @__PURE__ */ new Error(`HTTP proxy ${options.host}:${options.port} did not answer within ${seconds}s`)
	});
	if (response.statusCode !== 200) {
		response.socket.destroy();
		const message = `HTTP proxy refused CONNECT to ${target}: ${response.statusCode} ${response.statusMessage ?? ""}`.trim();
		throw response.statusCode === 407 || response.statusCode === 403 ? new require_errors_ProxyRejectedError.ProxyRejectedError(message) : new Error(message);
	}
	return {
		socket: response.socket,
		head: response.head
	};
}
/** Connects to Telegram through an HTTP proxy that supports CONNECT tunnels. */
var HttpProxyTransport = class extends require_network_transport_Transport.Transport {
	constructor(options) {
		super();
		this.options = options;
	}
	resolve(connection) {
		const options = this.options;
		class HttpProxySocket extends require_network_transport_socket_NetSocket.NetSocket {
			openTunnel(port, ip) {
				return openHttpTunnel(options, ip, port);
			}
		}
		return {
			connection: connection ?? require_network_connection_Obfuscation.ConnectionTCPObfuscated,
			socket: HttpProxySocket,
			proxied: true
		};
	}
};
exports.HttpProxyTransport = HttpProxyTransport;
