Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
let node_http = require("node:http");
node_http = require_runtime.__toESM(node_http);
let node_https = require("node:https");
node_https = require_runtime.__toESM(node_https);
let node_net = require("node:net");
node_net = require_runtime.__toESM(node_net);
let socks = require("socks");
// teleproto/platform/net/node.ts
const tcp = true;
function createSocket() {
	return new node_net.default.Socket();
}
function isIP(host) {
	return node_net.default.isIP(host);
}
function httpConnect(options) {
	const request = (options.tls ? node_https.default : node_http.default).request({
		host: options.host,
		port: options.port,
		method: "CONNECT",
		path: options.target,
		headers: options.headers,
		agent: false
	});
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => request.destroy(options.timeoutError()), options.timeoutMs);
		request.once("connect", (response, socket, head) => {
			clearTimeout(timer);
			resolve({
				statusCode: response.statusCode,
				statusMessage: response.statusMessage,
				socket,
				head
			});
		});
		request.once("error", (error) => {
			clearTimeout(timer);
			reject(error);
		});
		request.end();
	});
}
async function socksConnect(options) {
	return (await socks.SocksClient.createConnection({
		proxy: {
			host: options.host,
			port: options.port,
			type: options.version,
			userId: options.username,
			password: options.password
		},
		command: "connect",
		timeout: options.timeoutMs,
		destination: options.destination
	})).socket;
}
exports.createSocket = createSocket;
exports.httpConnect = httpConnect;
exports.isIP = isIP;
exports.socksConnect = socksConnect;
exports.tcp = tcp;
