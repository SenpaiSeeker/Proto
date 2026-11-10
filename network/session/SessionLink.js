Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_errors_Common = require("../../errors/Common.js");
require("../../errors/index.js");
// teleproto/network/session/SessionLink.ts
const TICK_MS = 1e3;
const STALL_MS = 5e3;
function closeReason(error) {
	if (error instanceof require_errors_Common.InvalidBufferError) {
		if (error.code === 404) return "bad-key";
		if (error.code === 429) return "flood";
	}
	return "lost";
}
var SessionLink = class {
	constructor(connection, host, gated) {
		this.connection = connection;
		this.host = host;
		this.connectedAt = Date.now();
		this.lastPongAt = Date.now();
		this.lastPingAt = 0;
		this.readMark = Date.now();
		this.markedAt = Date.now();
		this.replyDeadline = 0;
		this.lastTickAt = Date.now();
		this.gated = gated;
		this.closed = new Promise((resolve) => {
			this.resolveClosed = resolve;
		});
	}
	get isClosed() {
		return this.closeInfo !== void 0;
	}
	get lastReadAt() {
		const socketRead = this.connection.socket.lastDataAt ?? 0;
		return socketRead > this.markedAt ? Math.max(this.readMark, socketRead) : this.readMark;
	}
	get quietUntil() {
		return this.replyDeadline;
	}
	start() {
		this.timer = setInterval(() => {
			const now = Date.now();
			const stalled = now - this.lastTickAt > STALL_MS;
			this.lastTickAt = now;
			this.host.tick(this, now, stalled);
		}, TICK_MS);
		this.timer.unref?.();
		this.readLoop();
		this.writeLoop();
	}
	open() {
		this.gated = false;
		this.host.wake();
	}
	markRead(at) {
		this.readMark = at;
		this.markedAt = Date.now();
	}
	expectReplyBy(deadline) {
		this.replyDeadline = Math.max(this.replyDeadline, deadline);
	}
	close(reason, error) {
		if (this.closeInfo) return;
		this.closeInfo = {
			reason,
			error
		};
		clearInterval(this.timer);
		this.connection.disconnect().catch(() => {});
		this.host.wake();
		this.resolveClosed(this.closeInfo);
	}
	async writeLoop() {
		while (!this.isClosed) {
			const packet = await this.host.nextPacket(this);
			if (!packet) continue;
			try {
				await this.connection.send(packet.data);
			} catch (error) {
				this.host.onSendFailed(packet);
				this.close("lost", error);
				return;
			}
			this.host.onSent(this, packet);
		}
	}
	async readLoop() {
		while (!this.isClosed) {
			let body;
			try {
				body = await this.connection.recv();
			} catch (error) {
				this.close(closeReason(error), error);
				return;
			}
			this.markRead(Date.now());
			try {
				await this.host.receive(this, body);
			} catch (error) {
				this.close("lost", error);
				return;
			}
		}
	}
};
exports.SessionLink = SessionLink;
