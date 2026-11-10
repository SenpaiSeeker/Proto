Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../../platform/buffer/index.js");
const require_network_transport_socket_ByteStream = require("./ByteStream.js");
require("../../../platform/index.js");
// teleproto/network/transport/socket/WebSocketSocket.ts
const SEND_HIGH_WATER = 1 << 20;
var WebSocketSocket = class WebSocketSocket {
	constructor() {
		this.stream = new require_network_transport_socket_ByteStream.ByteStream();
		this.stream.end();
	}
	get lastDataAt() {
		return this.stream.lastDataAt;
	}
	create(url, protocols) {
		const impl = this.constructor.webSocketImpl ?? WebSocketSocket.webSocketImpl ?? globalThis.WebSocket;
		if (!impl) throw new Error("No WebSocket implementation found: run on Node.js 22+ or a browser, or override WebSocketTransport.webSocket() to return one");
		return new impl(url, protocols);
	}
	async connect(port, ip, testServers = false) {
		const url = `${port === 443 ? "wss" : "ws"}://${ip}:${port}/apiws${testServers ? "_test" : ""}`;
		const socket = this.create(url, "binary");
		const stream = this.stream = new require_network_transport_socket_ByteStream.ByteStream();
		socket.binaryType = "arraybuffer";
		this.socket = socket;
		socket.onmessage = (ev) => stream.push(typeof ev.data === "string" ? require_platform_buffer_index.Buffer.from(ev.data) : require_platform_buffer_index.Buffer.from(new Uint8Array(ev.data)));
		await new Promise((resolve, reject) => {
			socket.onopen = () => resolve();
			socket.onerror = () => {
				const error = /* @__PURE__ */ new Error(`WebSocket connection to ${url} failed`);
				stream.end(error);
				reject(error);
			};
			socket.onclose = () => {
				const error = new require_network_transport_socket_ByteStream.SocketClosedError("WebSocket was closed");
				stream.end(error);
				reject(error);
			};
		});
	}
	read(n) {
		return this.stream.read(n);
	}
	readExactly(n) {
		return this.stream.readExactly(n);
	}
	async write(data) {
		if (this.stream.closed || !this.socket) throw new require_network_transport_socket_ByteStream.SocketClosedError("WebSocket was closed");
		const socket = this.socket;
		socket.send(data);
		while (!this.stream.closed && this.socket === socket && (socket.bufferedAmount ?? 0) > SEND_HIGH_WATER) await new Promise((resolve) => setTimeout(resolve, 2));
	}
	async close() {
		const socket = this.socket;
		this.socket = void 0;
		this.stream.end();
		socket?.close();
	}
	toString() {
		return "WebSocketSocket";
	}
};
exports.WebSocketSocket = WebSocketSocket;
