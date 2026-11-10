Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_net_index = require("../../../platform/net/index.js");
require("../../../platform/index.js");
const require_network_transport_socket_ByteStream = require("./ByteStream.js");
// teleproto/network/transport/socket/NetSocket.ts
const DEFAULT_KEEP_ALIVE_INTERVAL = 3e4;
var NetSocket = class {
	constructor(keepAliveInterval) {
		this.stream = new require_network_transport_socket_ByteStream.ByteStream();
		this.keepAliveInterval = keepAliveInterval ?? DEFAULT_KEEP_ALIVE_INTERVAL;
		this.stream.end();
	}
	get lastDataAt() {
		return this.stream.lastDataAt;
	}
	async openTunnel(_port, _ip) {}
	async connect(port, ip) {
		const stream = this.stream = new require_network_transport_socket_ByteStream.ByteStream();
		const tunnel = await this.openTunnel(port, ip);
		const direct = tunnel ? void 0 : require_platform_net_index.createSocket();
		const socket = tunnel?.socket ?? direct;
		this.socket = socket;
		if (tunnel?.head?.length) stream.push(tunnel.head);
		socket.on("data", (chunk) => stream.push(chunk));
		socket.on("close", () => stream.end());
		await new Promise((resolve, reject) => {
			const fail = (error) => {
				stream.end(error);
				reject(error);
			};
			socket.once("error", fail);
			const ready = () => {
				socket.off("error", fail);
				socket.on("error", (error) => stream.end(error));
				socket.setNoDelay?.(true);
				socket.setKeepAlive?.(this.keepAliveInterval > 0, Math.max(0, this.keepAliveInterval));
				resolve();
			};
			if (direct) direct.connect(port, ip, ready);
			else ready();
		});
	}
	read(n) {
		return this.stream.read(n);
	}
	readExactly(n) {
		return this.stream.readExactly(n);
	}
	async write(data) {
		if (this.stream.closed || !this.socket) throw new require_network_transport_socket_ByteStream.SocketClosedError("NetSocket was closed");
		const socket = this.socket;
		if (socket.write(data) !== false) return;
		await new Promise((resolve, reject) => {
			const cleanup = () => {
				socket.removeListener("drain", onDrain);
				socket.removeListener("error", onError);
				socket.removeListener("close", onClose);
			};
			const onDrain = () => {
				cleanup();
				resolve();
			};
			const onError = (error) => {
				cleanup();
				reject(error);
			};
			const onClose = () => {
				cleanup();
				reject(new require_network_transport_socket_ByteStream.SocketClosedError("NetSocket was closed"));
			};
			socket.once("drain", onDrain);
			socket.once("error", onError);
			socket.once("close", onClose);
		});
	}
	async close() {
		const socket = this.socket;
		this.socket = void 0;
		this.stream.end();
		if (!socket || socket.destroyed) return;
		const closed = new Promise((resolve) => socket.once("close", () => resolve()));
		socket.destroy();
		socket.unref?.();
		await closed;
	}
	toString() {
		return "NetSocket";
	}
};
exports.NetSocket = NetSocket;
