Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_platform_crypto_index = require("../../platform/crypto/index.js");
const require_platform_events_index = require("../../platform/events/index.js");
const require_platform_net_index = require("../../platform/net/index.js");
const require_platform_timers_index = require("../../platform/timers/index.js");
const require_network_transport_socket_ByteStream = require("./socket/ByteStream.js");
require("../../platform/index.js");
const require_network_transport_MTProxyTransport = require("./MTProxyTransport.js");
const require_network_transport_Transport = require("./Transport.js");
// teleproto/network/transport/WebProxyTransport.ts
const WINDOW = 4194304;
const MAX_BATCH = 2097152;
const MAX_PAYLOAD = 1048576;
const CHUNK = 65536;
const MAX_QUEUE = 33554432;
const MAX_STREAM_QUEUE = 8388608;
const MAX_ITEMS = 8192;
function base64url(data) {
	return data.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function configure(options) {
	const input = options.server.trim().replace(/^https:\/\//i, "");
	const slash = input.indexOf("/");
	const hostInput = (slash < 0 ? input : input.slice(0, slash)).replace(/\.$/, "");
	const path = slash < 0 ? "" : input.slice(slash + 1);
	if (!hostInput || /[\s:@?#%\\]/.test(hostInput) || path && (path.length > 128 || !/^[A-Za-z0-9][A-Za-z0-9_-]*(\/[A-Za-z0-9][A-Za-z0-9_-]*)*$/.test(path))) throw new Error("WEB proxy requires a hostname and optional canonical base path");
	const host = new URL(`https://${hostInput}`).hostname;
	if (require_platform_net_index.isIP(host) || host.length > 253 || !host.includes(".") || !host.split(".").every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) throw new Error("WEB proxy requires a DNS hostname");
	const encoded = options.secret;
	let secret;
	if (/^(?:[a-fA-F0-9]{2})+$/.test(encoded)) secret = require_platform_buffer_index.Buffer.from(encoded, "hex");
	else if (/^[A-Za-z0-9+/_-]+={0,2}$/.test(encoded)) {
		secret = require_platform_buffer_index.Buffer.from(encoded, "base64");
		if (base64url(secret) !== encoded.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")) throw new Error("Invalid WEB proxy secret encoding");
	} else throw new Error("Invalid WEB proxy secret encoding");
	if (secret.length >= 17 && secret[0] === 112) secret = secret.subarray(1);
	if (secret.length !== 16 && !(secret.length === 17 && secret[0] === 221)) throw new Error("WEB proxy requires a plain or dd secret; fake TLS secrets are unsupported");
	const connectTimeoutMs = options.connectTimeoutMs ?? 3e4;
	const requestTimeoutMs = options.requestTimeoutMs ?? 9e4;
	const maxStreams = options.maxStreams ?? 32;
	for (const value of [
		connectTimeoutMs,
		requestTimeoutMs,
		maxStreams
	]) if (!Number.isSafeInteger(value) || value <= 0 || value > 2147483647) throw new Error("Invalid WEB proxy limit");
	if (maxStreams > 256) throw new Error("WEB proxy maxStreams cannot exceed 256");
	const context = path ? `tdesktop-web-proxy-bridge-v2\n${host}\n${path}` : `tdesktop-web-proxy-bridge-v1\n${host}`;
	const capability = base64url(require_platform_crypto_index.hmac("sha256", secret, context));
	return {
		host,
		base: `https://${host}/${path ? path + "/" : ""}`,
		secret: secret.toString("hex"),
		capability,
		connectTimeoutMs,
		requestTimeoutMs,
		maxStreams,
		webSocket: options.webSocket
	};
}
function frame(type, id, payload = require_platform_buffer_index.Buffer.alloc(0)) {
	const result = require_platform_buffer_index.Buffer.allocUnsafe(8 + payload.length);
	result[0] = type;
	result.writeUIntBE(id, 1, 3);
	result.writeUInt32BE(payload.length, 4);
	payload.copy(result, 8);
	return result;
}
function parseFrames(data) {
	if (!data.length || data.length > MAX_BATCH) throw new Error("Invalid WEB proxy batch size");
	const frames = [];
	for (let offset = 0; offset < data.length;) {
		if (data.length - offset < 8 || frames.length >= 4096) throw new Error("Invalid WEB proxy frame batch");
		const type = data[offset], id = data.readUIntBE(offset + 1, 3), size = data.readUInt32BE(offset + 4);
		const end = offset + 8 + size;
		if (size > MAX_PAYLOAD || end > data.length) throw new Error("Invalid WEB proxy frame length");
		frames.push({
			type,
			id,
			payload: data.subarray(offset + 8, end)
		});
		offset = end;
	}
	return frames;
}
function token(value) {
	if (!value || !/^[A-Za-z0-9_-]{43}$/.test(value) || base64url(require_platform_buffer_index.Buffer.from(value, "base64")) !== value) throw new Error("Invalid WEB proxy token");
	return value;
}
const closedError = () => /* @__PURE__ */ new Error("WEB proxy connection closed");
var RelayTransport = class {
	constructor(config) {
		this.config = config;
		this.streams = /* @__PURE__ */ new Map();
		this.controller = new AbortController();
		this.lanes = /* @__PURE__ */ new Map();
		this.closed = false;
		this.outgoing = 0;
		this.incoming = 0;
		this.incomingItems = 0;
		this.nextId = 1;
		this.batchLimit = MAX_BATCH;
		this.tombstones = /* @__PURE__ */ new Set();
		this.pumpQueued = false;
		require_platform_events_index.setMaxListeners(config.maxStreams * 3 + 16, this.controller.signal);
	}
	async open(stream) {
		if (this.closed) throw closedError();
		const closingLanes = [...this.lanes.keys()].filter((id) => id !== 0 && !this.streams.has(id)).length;
		if (this.streams.size + closingLanes >= this.config.maxStreams || this.nextId > 16777215) throw new Error("WEB proxy stream limit reached");
		stream.id = this.nextId++;
		this.streams.set(stream.id, stream);
		try {
			await (this.startTask ??= this.start());
			if (this.closed || stream.closed) throw closedError();
			const lane = this.getLane(this.isLanes() ? stream.id : 0);
			this.enqueue(lane, frame(1, stream.id));
			stream.opened = true;
		} catch (error) {
			await stream.close();
			throw error;
		}
	}
	async start() {
		const timer = setTimeout(() => this.fail(/* @__PURE__ */ new Error("WEB proxy startup timed out")), this.config.connectTimeoutMs);
		try {
			const page = await this.request(`?bridge=${this.config.capability}`, "GET", void 0, void 0, {}, MAX_BATCH);
			if (page.status !== 200) throw new Error("WEB proxy bootstrap rejected");
			const html = page.body.toString("utf8");
			const bootstrap = token(/\bbootstrap\s*=\s*"([A-Za-z0-9_-]+)"/.exec(html)?.[1] ?? null);
			const mode = /\bcarrierMode\s*=\s*"([a-z-]+)"/.exec(html)?.[1];
			const limit = Number(/\bbatchLimit\s*=\s*(\d+)/.exec(html)?.[1]);
			if (![
				"https",
				"https-lanes",
				"websocket",
				"websocket-lanes"
			].includes(mode ?? "") || !Number.isSafeInteger(limit) || limit < 64 || limit > MAX_BATCH) throw new Error("Unsupported WEB proxy bootstrap format");
			this.mode = mode;
			this.batchLimit = limit;
			const response = await this.request("api/v1/session", "POST", bootstrap, frame(16, 0, require_platform_buffer_index.Buffer.from([1])), {}, 64);
			if (response.status !== 200) throw new Error("WEB proxy session rejected");
			this.sessionToken = token(response.headers.get("X-Session-Token"));
			if (response.headers.get("X-Carrier-Mode") !== mode) throw new Error("WEB proxy carrier mismatch");
			const welcome = parseFrames(response.body);
			if (welcome.length !== 1 || welcome[0].type !== 17 || welcome[0].id !== 0 || welcome[0].payload.length || response.headers.get("X-Down-Cursor") !== "0") throw new Error("Invalid WEB proxy welcome");
			if (this.closed) throw closedError();
			const lane = this.getLane(0);
			if (mode === "websocket") await this.openWebSocket(lane);
			else if (mode === "https" || mode === "https-lanes") this.poll(lane);
			this.watchdog = setInterval(() => {
				const now = Date.now();
				for (const entry of this.lanes.values()) if ((entry.bytes || entry.socket?.bufferedAmount) && now - entry.progress > this.config.requestTimeoutMs) {
					this.fail(/* @__PURE__ */ new Error("WEB proxy carrier stalled"));
					return;
				}
				for (const stream of this.streams.values()) if (stream.outgoing.bytes && now - stream.progress > this.config.requestTimeoutMs) {
					this.fail(/* @__PURE__ */ new Error("WEB proxy stream stalled"));
					return;
				}
			}, 1e3);
			this.watchdog.unref?.();
		} catch (error) {
			this.fail(error instanceof Error ? error : /* @__PURE__ */ new Error("WEB proxy startup failed"));
			throw error;
		} finally {
			clearTimeout(timer);
		}
	}
	isLanes() {
		return this.mode === "https-lanes" || this.mode === "websocket-lanes";
	}
	getLane(id) {
		let lane = this.lanes.get(id);
		if (!lane) {
			lane = {
				id,
				frames: [],
				bytes: 0,
				running: false,
				polling: false,
				ready: false,
				closed: false,
				sequence: 1,
				cursor: "0",
				progress: Date.now(),
				controller: new AbortController()
			};
			this.lanes.set(id, lane);
		}
		return lane;
	}
	budget(extra = 0) {
		let bytes = this.outgoing + extra, items = 0;
		for (const lane of this.lanes.values()) {
			bytes += lane.bytes + (lane.socket?.bufferedAmount ?? 0);
			items += lane.frames.length;
		}
		for (const stream of this.streams.values()) items += stream.outgoing.items;
		return bytes + items * 256 <= MAX_QUEUE && items < MAX_ITEMS;
	}
	enqueue(lane, data) {
		if (this.closed || lane.closed) throw closedError();
		if (!this.budget(data.length + 256)) {
			this.fail(/* @__PURE__ */ new Error("WEB proxy send queue exceeded"));
			throw closedError();
		}
		if (!lane.bytes) lane.progress = Date.now();
		lane.frames.push(data);
		lane.bytes += data.length;
		queueMicrotask(() => this.sendLane(lane));
	}
	wake() {
		if (this.pumpQueued || this.closed) return;
		this.pumpQueued = true;
		require_platform_timers_index.immediate(() => {
			this.pumpQueued = false;
			if (this.closed) return;
			try {
				let frames = 0, again = true;
				while (again && frames < 128) {
					again = false;
					for (const stream of this.streams.values()) {
						if (!stream.opened || stream.closed) continue;
						const lane = this.getLane(this.isLanes() ? stream.id : 0);
						if (stream.grant) {
							const value = require_platform_buffer_index.Buffer.allocUnsafe(4);
							value.writeUInt32BE(stream.grant);
							stream.receiveCredit += stream.grant;
							stream.grant = 0;
							this.enqueue(lane, frame(4, stream.id, value));
							frames++;
						}
						if (!stream.outgoing.bytes || !stream.sendCredit || lane.bytes >= this.batchLimit) continue;
						if ((lane.socket?.bufferedAmount ?? 0) >= this.batchLimit) {
							this.waitWebSocket();
							continue;
						}
						const data = stream.outgoing.take(Math.min(CHUNK, this.batchLimit - 8, stream.sendCredit));
						this.outgoing -= data.length;
						stream.sendCredit -= data.length;
						stream.progress = Date.now();
						this.enqueue(lane, frame(2, stream.id, data));
						frames++;
						again = true;
					}
				}
				if (again) this.wake();
			} catch (error) {
				this.fail(error instanceof Error ? error : closedError());
			}
		});
	}
	batch(lane) {
		let size = 0, count = 0;
		while (count < lane.frames.length && count < 4096 && size + lane.frames[count].length <= this.batchLimit) size += lane.frames[count++].length;
		if (!count) throw new Error("WEB proxy frame exceeds carrier batch limit");
		return require_platform_buffer_index.Buffer.concat(lane.frames.splice(0, count), size);
	}
	sendLane(lane) {
		if (this.closed || lane.closed || lane.running || !lane.frames.length) return;
		lane.running = true;
		(async () => {
			const websocket = this.mode === "websocket" || this.mode === "websocket-lanes";
			if (websocket && !lane.ready) await this.openWebSocket(lane);
			while (!this.closed && !lane.closed && lane.frames.length) {
				if (websocket && lane.socket.bufferedAmount >= this.batchLimit) {
					this.waitWebSocket();
					break;
				}
				const data = this.batch(lane);
				if (websocket) lane.socket.send(data);
				else {
					const sequence = String(lane.sequence);
					const headers = { "X-Up-Seq": sequence };
					if (this.isLanes()) headers["X-Lane-ID"] = String(lane.id);
					const response = await this.request("api/v1/up", "POST", this.sessionToken, data, headers, 64, lane.controller.signal);
					if (response.status !== 204 || response.headers.get("X-Up-Ack") !== sequence) throw new Error("WEB proxy uplink rejected");
					lane.sequence++;
					if (!Number.isSafeInteger(lane.sequence)) throw new Error("WEB proxy sequence exhausted");
					if (this.isLanes() && lane.id && !lane.polling) this.poll(lane);
				}
				lane.bytes -= data.length;
				lane.progress = Date.now();
				this.wake();
				if (this.mode === "websocket-lanes" && !this.streams.has(lane.id) && !lane.frames.length) {
					this.finishLane(lane);
					return;
				}
			}
		})().catch((error) => {
			if (!lane.closed) this.fail(error instanceof Error ? error : closedError());
		}).finally(() => {
			lane.running = false;
		});
	}
	waitWebSocket() {
		if (this.wsTimer || this.closed) return;
		this.wsTimer = setTimeout(() => {
			this.wsTimer = void 0;
			for (const lane of this.lanes.values()) this.sendLane(lane);
			this.wake();
		}, 10);
	}
	poll(lane) {
		if (lane.polling || lane.closed || this.closed) return;
		lane.polling = true;
		(async () => {
			while (!this.closed && !lane.closed) {
				const headers = { "X-Down-Cursor": lane.cursor };
				if (this.isLanes()) headers["X-Lane-ID"] = String(lane.id);
				const response = await this.request("api/v1/down", "POST", this.sessionToken, void 0, headers, MAX_BATCH, lane.controller.signal);
				if (this.closed || lane.closed) return;
				const cursor = response.headers.get("X-Down-Cursor");
				if (response.status === 204) {
					if (response.body.length || cursor !== lane.cursor) throw new Error("Invalid WEB proxy idle cursor");
				} else if (response.status === 200) {
					if (!cursor || !/^(0|[1-9]\d*)$/.test(cursor) || BigInt(cursor) !== BigInt(lane.cursor) + BigInt(1)) throw new Error("Invalid WEB proxy downlink cursor");
					this.receive(response.body, this.isLanes() ? lane.id : void 0);
					lane.cursor = cursor;
				} else throw new Error("WEB proxy downlink rejected");
				if (response.headers.get("X-Lane-Closed") === "1") {
					if (!this.isLanes() || !lane.id || response.body.length || this.streams.has(lane.id)) throw new Error("Invalid WEB proxy lane closure");
					this.finishLane(lane);
					return;
				}
				if (response.status === 204) await require_platform_timers_index.sleep(10, { signal: lane.controller.signal });
			}
		})().catch((error) => {
			if (!lane.closed) this.fail(error instanceof Error ? error : closedError());
		});
	}
	async openWebSocket(lane) {
		const Ctor = this.config.webSocket ?? globalThis.WebSocket;
		if (!Ctor) throw new Error("WEB proxy websocket profiles require Node.js 22+ or proxy.webSocket");
		const protocol = this.mode === "websocket-lanes" ? `tproxy-lane-v1.${this.sessionToken}.${lane.id}` : `tproxy-v1.${this.sessionToken}`;
		const socket = new Ctor(this.config.base.replace(/^https:/, "wss:") + "api/v1/ws", protocol);
		socket.binaryType = "arraybuffer";
		lane.socket = socket;
		await new Promise((resolve, reject) => {
			const abort = () => {
				cleanup();
				reject(closedError());
			};
			this.controller.signal.addEventListener("abort", abort, { once: true });
			lane.controller.signal.addEventListener("abort", abort, { once: true });
			const timer = setTimeout(() => {
				cleanup();
				reject(/* @__PURE__ */ new Error("WEB proxy WebSocket timed out"));
				socket.close();
			}, this.config.connectTimeoutMs);
			const cleanup = () => {
				clearTimeout(timer);
				this.controller.signal.removeEventListener("abort", abort);
				lane.controller.signal.removeEventListener("abort", abort);
			};
			socket.onopen = () => {
				cleanup();
				if (this.closed || lane.closed || socket.protocol !== protocol) {
					socket.close();
					reject(/* @__PURE__ */ new Error("WEB proxy WebSocket handshake rejected"));
					return;
				}
				lane.ready = true;
				resolve();
			};
			socket.onmessage = (event) => {
				try {
					if (this.closed || lane.closed) return;
					if (!lane.ready || typeof event.data === "string" || !(event.data instanceof ArrayBuffer)) throw new Error("Invalid WEB proxy WebSocket message");
					this.receive(require_platform_buffer_index.Buffer.from(event.data), this.isLanes() ? lane.id : void 0);
				} catch (error) {
					this.fail(error instanceof Error ? error : closedError());
				}
			};
			const failed = () => {
				cleanup();
				reject(/* @__PURE__ */ new Error("WEB proxy WebSocket disconnected"));
				if (this.closed || lane.closed) return;
				if (this.mode === "websocket-lanes" && lane.ready) this.drop(lane.id, closedError(), false);
				else this.fail(closedError());
			};
			socket.onerror = failed;
			socket.onclose = failed;
		});
	}
	receive(data, laneId) {
		for (const entry of parseFrames(data)) {
			const { type, id, payload } = entry;
			if (laneId !== void 0 && id !== laneId) throw new Error("Cross-lane WEB proxy frame");
			if (type === 5 && id === 0 && this.mode !== "websocket-lanes") {
				if (payload.length + 8 > this.batchLimit) throw new Error("Oversized WEB proxy ping");
				this.enqueue(this.getLane(0), frame(6, 0, payload));
				continue;
			}
			if (type === 31 && id === 0) throw new Error("WEB proxy relay ended the session");
			if (!id || ![
				2,
				3,
				4
			].includes(type) || type === 2 && !payload.length || type === 3 && payload.length || type === 4 && (payload.length !== 4 || !payload.readUInt32BE())) throw new Error("Invalid WEB proxy stream frame");
			const stream = this.streams.get(id);
			if (!stream) {
				if (this.tombstones.has(id)) continue;
				throw new Error("Unknown WEB proxy stream");
			}
			if (!stream.opened) throw new Error("WEB proxy data before stream open");
			if (type === 3) {
				this.drop(id, closedError(), false);
				continue;
			}
			if (type === 4) {
				stream.sendCredit += payload.readUInt32BE();
				if (stream.sendCredit > WINDOW) throw new Error("WEB proxy send credit overflow");
				this.wake();
			} else {
				if (payload.length > stream.receiveCredit || stream.incoming.items >= 1024 || this.incoming + payload.length + (this.incomingItems + 1) * 256 > MAX_QUEUE) throw new Error("WEB proxy receive window exceeded");
				stream.receiveCredit -= payload.length;
				this.incoming += payload.length;
				this.incomingItems++;
				stream.incoming.push(require_platform_buffer_index.Buffer.from(payload));
				stream.notify();
			}
		}
	}
	drop(id, error, sendClose) {
		const stream = this.streams.get(id);
		if (!stream) return;
		this.streams.delete(id);
		this.outgoing -= stream.outgoing.bytes;
		this.incoming -= stream.incoming.bytes;
		this.incomingItems -= stream.incoming.items;
		stream.end(error);
		this.tombstones.add(id);
		if (this.tombstones.size > 4096) this.tombstones.delete(this.tombstones.values().next().value);
		const lane = this.lanes.get(this.isLanes() ? id : 0);
		if (!this.closed && lane) {
			lane.frames = lane.frames.filter((data) => {
				if (data.readUIntBE(1, 3) !== id || data[0] === 1) return true;
				lane.bytes -= data.length;
				return false;
			});
			if (sendClose && stream.opened) try {
				this.enqueue(lane, frame(3, id));
			} catch {}
			if (this.mode === "websocket-lanes" && !sendClose) this.finishLane(lane);
		}
		if (!this.streams.size) this.close();
	}
	finishLane(lane) {
		lane.closed = true;
		lane.controller.abort();
		lane.frames = [];
		lane.bytes = 0;
		if (lane.socket) {
			lane.socket.onopen = lane.socket.onmessage = lane.socket.onclose = lane.socket.onerror = null;
			lane.socket.close();
		}
		this.lanes.delete(lane.id);
	}
	fail(error) {
		if (this.closed) return;
		this.closed = true;
		for (const stream of this.streams.values()) stream.end(error);
		this.streams.clear();
		this.outgoing = 0;
		this.incoming = 0;
		this.incomingItems = 0;
		this.close();
	}
	close() {
		if (this.closeTask) return this.closeTask;
		this.closed = true;
		this.controller.abort();
		if (this.watchdog) clearInterval(this.watchdog);
		if (this.wsTimer) clearTimeout(this.wsTimer);
		for (const lane of this.lanes.values()) this.finishLane(lane);
		for (const stream of this.streams.values()) stream.end(closedError());
		this.streams.clear();
		this.tombstones.clear();
		const bearer = this.sessionToken;
		this.sessionToken = void 0;
		this.closeTask = (async () => {
			if (!bearer) return;
			const controller = new AbortController();
			const timeout = setTimeout(() => controller.abort(), 2e3);
			try {
				await (await fetch(this.config.base + "api/v1/session", {
					method: "DELETE",
					redirect: "error",
					credentials: "omit",
					headers: { Authorization: `Bearer ${bearer}` },
					signal: controller.signal
				})).body?.cancel();
			} catch {} finally {
				clearTimeout(timeout);
			}
		})();
		return this.closeTask;
	}
	async request(path, method, bearer, body, headers = {}, limit = MAX_BATCH, signal) {
		const deadline = Date.now() + this.config.requestTimeoutMs;
		let attempts = 0;
		while (!this.closed && !signal?.aborted) {
			const controller = new AbortController();
			const abort = () => controller.abort();
			this.controller.signal.addEventListener("abort", abort, { once: true });
			signal?.addEventListener("abort", abort, { once: true });
			const timer = setTimeout(abort, Math.max(1, deadline - Date.now()));
			let wait = Math.min(250 * 2 ** attempts, 5e3);
			try {
				const response = await fetch(this.config.base + path, {
					method,
					redirect: "error",
					credentials: "omit",
					referrerPolicy: "no-referrer",
					signal: controller.signal,
					headers: {
						...headers,
						...bearer ? { Authorization: `Bearer ${bearer}` } : {},
						...body ? { "Content-Type": "application/octet-stream" } : {}
					},
					body: body ? new Uint8Array(body) : void 0
				});
				if (response.status === 503) {
					const retry = response.headers.get("Retry-After");
					if (retry) {
						const seconds = Number(retry);
						wait = Number.isFinite(seconds) ? seconds * 1e3 : Date.parse(retry) - Date.now();
					}
					if (!Number.isFinite(wait)) wait = 1e3;
					wait = Math.max(250, Math.min(wait, 3e4));
					await response.body?.cancel();
				} else {
					const reader = response.body?.getReader();
					const chunks = [];
					let size = 0;
					if (reader) try {
						while (true) {
							const item = await reader.read();
							if (item.done) break;
							size += item.value.byteLength;
							if (size > limit || chunks.length >= 4096) {
								controller.abort();
								throw new Error("WEB proxy response exceeds limit");
							}
							chunks.push(require_platform_buffer_index.Buffer.from(item.value));
						}
					} finally {
						reader.releaseLock();
					}
					return {
						status: response.status,
						headers: response.headers,
						body: require_platform_buffer_index.Buffer.concat(chunks, size)
					};
				}
			} catch {
				if (this.closed || signal?.aborted) throw closedError();
				if (++attempts >= 5) throw new Error("WEB proxy HTTP request failed");
			} finally {
				clearTimeout(timer);
				this.controller.signal.removeEventListener("abort", abort);
				signal?.removeEventListener("abort", abort);
			}
			if (Date.now() + wait >= deadline) throw new Error("WEB proxy HTTP retry deadline exceeded");
			await require_platform_timers_index.sleep(wait, { signal: this.controller.signal });
		}
		throw closedError();
	}
};
var RelaySocket = class {
	constructor(transport) {
		this.transport = transport;
		this.incoming = new require_network_transport_socket_ByteStream.ByteQueue();
		this.outgoing = new require_network_transport_socket_ByteStream.ByteQueue();
		this.id = 0;
		this.closed = false;
		this.opened = false;
		this.sendCredit = WINDOW;
		this.receiveCredit = WINDOW;
		this.grant = 0;
		this.progress = Date.now();
		this.reading = false;
	}
	async connect(_port, _ip, _testServers) {
		if (this.closed || this.id) throw new Error("WEB proxy socket cannot be reused");
		await this.transport.open(this);
	}
	notify() {
		this.wakeRead?.();
		this.wakeRead = void 0;
	}
	end(error) {
		this.closed = true;
		this.error = error;
		this.incoming.clear();
		this.outgoing.clear();
		this.notify();
	}
	async read(n) {
		if (!Number.isSafeInteger(n) || n < 0) throw new RangeError("Invalid WEB proxy read size");
		if (this.reading) throw new Error("Concurrent WEB proxy reads are unsupported");
		this.reading = true;
		try {
			if (this.closed) throw this.error ?? closedError();
			if (!n) return require_platform_buffer_index.Buffer.alloc(0);
			while (!this.incoming.bytes && !this.closed) await new Promise((resolve) => {
				this.wakeRead = resolve;
			});
			if (this.closed) throw this.error ?? closedError();
			const items = this.incoming.items;
			const data = this.incoming.take(n);
			this.transport.incoming -= data.length;
			this.transport.incomingItems -= items - this.incoming.items;
			this.grant += data.length;
			this.transport.wake();
			return data;
		} finally {
			this.reading = false;
		}
	}
	async readExactly(n) {
		if (!Number.isSafeInteger(n) || n < 0 || n > 67108864) throw new RangeError("Invalid WEB proxy read size");
		const out = require_platform_buffer_index.Buffer.allocUnsafe(n);
		for (let offset = 0; offset < n;) {
			const part = await this.read(n - offset);
			part.copy(out, offset);
			offset += part.length;
		}
		return out;
	}
	write(data) {
		if (this.closed || !this.opened) throw this.error ?? closedError();
		if (!data.length) return;
		if (this.outgoing.bytes + data.length > MAX_STREAM_QUEUE || this.outgoing.items >= 1024 || !this.transport.budget(data.length + 256)) {
			this.transport.drop(this.id, /* @__PURE__ */ new Error("WEB proxy stream send queue exceeded"), true);
			throw closedError();
		}
		if (!this.outgoing.bytes) this.progress = Date.now();
		this.outgoing.push(require_platform_buffer_index.Buffer.from(data));
		this.transport.outgoing += data.length;
		this.transport.wake();
	}
	async close() {
		if (!this.closed) {
			if (this.id) this.transport.drop(this.id, closedError(), true);
			else this.end(closedError());
		}
		if (!this.transport.streams.size) await this.transport.close();
	}
};
function createWebProxySocket(options) {
	const config = configure(options);
	let transport;
	class WebProxySocket extends RelaySocket {
		constructor() {
			if (!transport || transport.closed) transport = new RelayTransport(config);
			super(transport);
		}
	}
	return {
		socket: WebProxySocket,
		host: config.host,
		secret: config.secret
	};
}
/** Connects to Telegram through a WEB relay. Experimental. */
var WebProxyTransport = class extends require_network_transport_Transport.Transport {
	constructor(options) {
		super();
		this.options = options;
	}
	resolve(connection) {
		const web = createWebProxySocket(this.options);
		const framing = require_network_transport_MTProxyTransport.mtproxyConnection(web.host, 443, require_network_transport_MTProxyTransport.parseProxySecret(web.secret));
		return {
			connection: require_network_transport_Transport.ownFraming("WebProxyTransport", framing, connection),
			socket: web.socket,
			clientProxy: {
				address: web.host,
				port: 443
			},
			proxied: true
		};
	}
};
exports.WebProxyTransport = WebProxyTransport;
exports.createWebProxySocket = createWebProxySocket;
