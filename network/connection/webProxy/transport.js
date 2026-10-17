"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebProxySocket = createWebProxySocket;
const node_events_1 = require("node:events");
const promises_1 = require("node:timers/promises");
const protocol_1 = require("./protocol");
const closedError = () => new Error("WEB proxy connection closed");
class ByteQueue {
    constructor() {
        this.chunks = [];
        this.head = 0;
        this.offset = 0;
        this.bytes = 0;
    }
    get items() { return this.chunks.length - this.head; }
    push(data) { this.chunks.push(data); this.bytes += data.length; }
    take(count) {
        count = Math.min(count, this.bytes);
        const out = Buffer.allocUnsafe(count);
        let written = 0;
        while (written < count) {
            const chunk = this.chunks[this.head];
            const n = Math.min(count - written, chunk.length - this.offset);
            chunk.copy(out, written, this.offset, this.offset + n);
            written += n;
            this.offset += n;
            if (this.offset === chunk.length) {
                this.chunks[this.head++] = Buffer.alloc(0);
                this.offset = 0;
            }
        }
        this.bytes -= count;
        if (this.head >= 128 || !this.bytes) {
            this.chunks = this.chunks.slice(this.head);
            this.head = 0;
        }
        return out;
    }
    clear() { this.chunks = []; this.head = 0; this.offset = 0; this.bytes = 0; }
}
class RelayTransport {
    constructor(config) {
        this.config = config;
        this.streams = new Map();
        this.controller = new AbortController();
        this.lanes = new Map();
        this.closed = false;
        this.outgoing = 0;
        this.incoming = 0;
        this.incomingItems = 0;
        this.nextId = 1;
        this.batchLimit = protocol_1.MAX_BATCH;
        this.tombstones = new Set();
        this.pumpQueued = false;
        (0, node_events_1.setMaxListeners)(config.maxStreams * 3 + 16, this.controller.signal);
    }
    async open(stream) {
        if (this.closed)
            throw closedError();
        const closingLanes = [...this.lanes.keys()].filter(id => id !== 0 && !this.streams.has(id)).length;
        if (this.streams.size + closingLanes >= this.config.maxStreams || this.nextId > 0xffffff)
            throw new Error("WEB proxy stream limit reached");
        stream.id = this.nextId++;
        this.streams.set(stream.id, stream);
        try {
            await (this.startTask ??= this.start());
            if (this.closed || stream.closed)
                throw closedError();
            const lane = this.getLane(this.isLanes() ? stream.id : 0);
            this.enqueue(lane, (0, protocol_1.frame)(1 /* FrameType.Open */, stream.id));
            stream.opened = true;
        }
        catch (error) {
            await stream.close();
            throw error;
        }
    }
    async start() {
        const timer = setTimeout(() => this.fail(new Error("WEB proxy startup timed out")), this.config.connectTimeoutMs);
        try {
            const page = await this.request(`?bridge=${this.config.capability}`, "GET", undefined, undefined, {}, protocol_1.MAX_BATCH);
            if (page.status !== 200)
                throw new Error("WEB proxy bootstrap rejected");
            const html = page.body.toString("utf8");
            const bootstrap = (0, protocol_1.token)(/\bbootstrap\s*=\s*"([A-Za-z0-9_-]+)"/.exec(html)?.[1] ?? null);
            const mode = /\bcarrierMode\s*=\s*"([a-z-]+)"/.exec(html)?.[1];
            const limit = Number(/\bbatchLimit\s*=\s*(\d+)/.exec(html)?.[1]);
            if (!["https", "https-lanes", "websocket", "websocket-lanes"].includes(mode ?? "") ||
                !Number.isSafeInteger(limit) || limit < 64 || limit > protocol_1.MAX_BATCH) {
                throw new Error("Unsupported WEB proxy bootstrap format");
            }
            this.mode = mode;
            this.batchLimit = limit;
            const response = await this.request("api/v1/session", "POST", bootstrap, (0, protocol_1.frame)(16 /* FrameType.Hello */, 0, Buffer.from([1])), {}, 64);
            if (response.status !== 200)
                throw new Error("WEB proxy session rejected");
            this.sessionToken = (0, protocol_1.token)(response.headers.get("X-Session-Token"));
            if (response.headers.get("X-Carrier-Mode") !== mode)
                throw new Error("WEB proxy carrier mismatch");
            const welcome = (0, protocol_1.parseFrames)(response.body);
            if (welcome.length !== 1 || welcome[0].type !== 17 /* FrameType.Welcome */ || welcome[0].id !== 0 || welcome[0].payload.length ||
                response.headers.get("X-Down-Cursor") !== "0")
                throw new Error("Invalid WEB proxy welcome");
            if (this.closed)
                throw closedError();
            const lane = this.getLane(0);
            if (mode === "websocket")
                await this.openWebSocket(lane);
            else if (mode === "https" || mode === "https-lanes")
                this.poll(lane);
            this.watchdog = setInterval(() => {
                const now = Date.now();
                for (const entry of this.lanes.values()) {
                    if ((entry.bytes || entry.socket?.bufferedAmount) && now - entry.progress > this.config.requestTimeoutMs) {
                        this.fail(new Error("WEB proxy carrier stalled"));
                        return;
                    }
                }
                for (const stream of this.streams.values()) {
                    if (stream.outgoing.bytes && now - stream.progress > this.config.requestTimeoutMs) {
                        this.fail(new Error("WEB proxy stream stalled"));
                        return;
                    }
                }
            }, 1000);
            this.watchdog.unref?.();
        }
        catch (error) {
            this.fail(error instanceof Error ? error : new Error("WEB proxy startup failed"));
            throw error;
        }
        finally {
            clearTimeout(timer);
        }
    }
    isLanes() { return this.mode === "https-lanes" || this.mode === "websocket-lanes"; }
    getLane(id) {
        let lane = this.lanes.get(id);
        if (!lane) {
            lane = { id, frames: [], bytes: 0, running: false, polling: false, ready: false, closed: false,
                sequence: 1, cursor: "0", progress: Date.now(), controller: new AbortController() };
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
        for (const stream of this.streams.values())
            items += stream.outgoing.items;
        return bytes + items * 256 <= protocol_1.MAX_QUEUE && items < protocol_1.MAX_ITEMS;
    }
    enqueue(lane, data) {
        if (this.closed || lane.closed)
            throw closedError();
        if (!this.budget(data.length + 256)) {
            this.fail(new Error("WEB proxy send queue exceeded"));
            throw closedError();
        }
        if (!lane.bytes)
            lane.progress = Date.now();
        lane.frames.push(data);
        lane.bytes += data.length;
        queueMicrotask(() => this.sendLane(lane));
    }
    wake() {
        if (this.pumpQueued || this.closed)
            return;
        this.pumpQueued = true;
        setImmediate(() => {
            this.pumpQueued = false;
            if (this.closed)
                return;
            try {
                let frames = 0, again = true;
                while (again && frames < 128) {
                    again = false;
                    for (const stream of this.streams.values()) {
                        if (!stream.opened || stream.closed)
                            continue;
                        const lane = this.getLane(this.isLanes() ? stream.id : 0);
                        if (stream.grant) {
                            const value = Buffer.allocUnsafe(4);
                            value.writeUInt32BE(stream.grant);
                            stream.receiveCredit += stream.grant;
                            stream.grant = 0;
                            this.enqueue(lane, (0, protocol_1.frame)(4 /* FrameType.Window */, stream.id, value));
                            frames++;
                        }
                        if (!stream.outgoing.bytes || !stream.sendCredit || lane.bytes >= this.batchLimit)
                            continue;
                        if ((lane.socket?.bufferedAmount ?? 0) >= this.batchLimit) {
                            this.waitWebSocket();
                            continue;
                        }
                        const data = stream.outgoing.take(Math.min(protocol_1.CHUNK, this.batchLimit - 8, stream.sendCredit));
                        this.outgoing -= data.length;
                        stream.sendCredit -= data.length;
                        stream.progress = Date.now();
                        this.enqueue(lane, (0, protocol_1.frame)(2 /* FrameType.Data */, stream.id, data));
                        frames++;
                        again = true;
                    }
                }
                if (again)
                    this.wake();
            }
            catch (error) {
                this.fail(error instanceof Error ? error : closedError());
            }
        });
    }
    batch(lane) {
        let size = 0, count = 0;
        while (count < lane.frames.length && count < 4096 && size + lane.frames[count].length <= this.batchLimit)
            size += lane.frames[count++].length;
        if (!count)
            throw new Error("WEB proxy frame exceeds carrier batch limit");
        return Buffer.concat(lane.frames.splice(0, count), size);
    }
    sendLane(lane) {
        if (this.closed || lane.closed || lane.running || !lane.frames.length)
            return;
        lane.running = true;
        void (async () => {
            const websocket = this.mode === "websocket" || this.mode === "websocket-lanes";
            if (websocket && !lane.ready)
                await this.openWebSocket(lane);
            while (!this.closed && !lane.closed && lane.frames.length) {
                if (websocket && lane.socket.bufferedAmount >= this.batchLimit) {
                    this.waitWebSocket();
                    break;
                }
                const data = this.batch(lane);
                if (websocket)
                    lane.socket.send(data);
                else {
                    const sequence = String(lane.sequence);
                    const headers = { "X-Up-Seq": sequence };
                    if (this.isLanes())
                        headers["X-Lane-ID"] = String(lane.id);
                    const response = await this.request("api/v1/up", "POST", this.sessionToken, data, headers, 64, lane.controller.signal);
                    if (response.status !== 204 || response.headers.get("X-Up-Ack") !== sequence)
                        throw new Error("WEB proxy uplink rejected");
                    lane.sequence++;
                    if (!Number.isSafeInteger(lane.sequence))
                        throw new Error("WEB proxy sequence exhausted");
                    if (this.isLanes() && lane.id && !lane.polling)
                        this.poll(lane);
                }
                lane.bytes -= data.length;
                lane.progress = Date.now();
                this.wake();
                if (this.mode === "websocket-lanes" && !this.streams.has(lane.id) && !lane.frames.length) {
                    this.finishLane(lane);
                    return;
                }
            }
        })().catch(error => { if (!lane.closed)
            this.fail(error instanceof Error ? error : closedError()); })
            .finally(() => { lane.running = false; });
    }
    waitWebSocket() {
        if (this.wsTimer || this.closed)
            return;
        this.wsTimer = setTimeout(() => {
            this.wsTimer = undefined;
            for (const lane of this.lanes.values())
                this.sendLane(lane);
            this.wake();
        }, 10);
    }
    poll(lane) {
        if (lane.polling || lane.closed || this.closed)
            return;
        lane.polling = true;
        void (async () => {
            while (!this.closed && !lane.closed) {
                const headers = { "X-Down-Cursor": lane.cursor };
                if (this.isLanes())
                    headers["X-Lane-ID"] = String(lane.id);
                const response = await this.request("api/v1/down", "POST", this.sessionToken, undefined, headers, protocol_1.MAX_BATCH, lane.controller.signal);
                if (this.closed || lane.closed)
                    return;
                const cursor = response.headers.get("X-Down-Cursor");
                if (response.status === 204) {
                    if (response.body.length || cursor !== lane.cursor)
                        throw new Error("Invalid WEB proxy idle cursor");
                }
                else if (response.status === 200) {
                    if (!cursor || !/^(0|[1-9]\d*)$/.test(cursor) || BigInt(cursor) !== BigInt(lane.cursor) + BigInt(1))
                        throw new Error("Invalid WEB proxy downlink cursor");
                    this.receive(response.body, this.isLanes() ? lane.id : undefined);
                    lane.cursor = cursor;
                }
                else
                    throw new Error("WEB proxy downlink rejected");
                if (response.headers.get("X-Lane-Closed") === "1") {
                    if (!this.isLanes() || !lane.id || response.body.length || this.streams.has(lane.id))
                        throw new Error("Invalid WEB proxy lane closure");
                    this.finishLane(lane);
                    return;
                }
                if (response.status === 204)
                    await (0, promises_1.setTimeout)(10, undefined, { signal: lane.controller.signal });
            }
        })().catch(error => { if (!lane.closed)
            this.fail(error instanceof Error ? error : closedError()); });
    }
    async openWebSocket(lane) {
        const Ctor = this.config.webSocket ?? globalThis.WebSocket;
        if (!Ctor)
            throw new Error("WEB proxy websocket profiles require Node.js 22+ or proxy.webSocket");
        const protocol = this.mode === "websocket-lanes" ? `tproxy-lane-v1.${this.sessionToken}.${lane.id}` : `tproxy-v1.${this.sessionToken}`;
        const socket = new Ctor(this.config.base.replace(/^https:/, "wss:") + "api/v1/ws", protocol);
        socket.binaryType = "arraybuffer";
        lane.socket = socket;
        await new Promise((resolve, reject) => {
            const abort = () => { cleanup(); reject(closedError()); };
            this.controller.signal.addEventListener("abort", abort, { once: true });
            lane.controller.signal.addEventListener("abort", abort, { once: true });
            const timer = setTimeout(() => { cleanup(); reject(new Error("WEB proxy WebSocket timed out")); socket.close(); }, this.config.connectTimeoutMs);
            const cleanup = () => { clearTimeout(timer); this.controller.signal.removeEventListener("abort", abort); lane.controller.signal.removeEventListener("abort", abort); };
            socket.onopen = () => {
                cleanup();
                if (this.closed || lane.closed || socket.protocol !== protocol) {
                    socket.close();
                    reject(new Error("WEB proxy WebSocket handshake rejected"));
                    return;
                }
                lane.ready = true;
                resolve();
            };
            socket.onmessage = event => {
                try {
                    if (this.closed || lane.closed)
                        return;
                    if (!lane.ready || typeof event.data === "string" || !(event.data instanceof ArrayBuffer))
                        throw new Error("Invalid WEB proxy WebSocket message");
                    this.receive(Buffer.from(event.data), this.isLanes() ? lane.id : undefined);
                }
                catch (error) {
                    this.fail(error instanceof Error ? error : closedError());
                }
            };
            const failed = () => {
                cleanup();
                reject(new Error("WEB proxy WebSocket disconnected"));
                if (this.closed || lane.closed)
                    return;
                if (this.mode === "websocket-lanes" && lane.ready)
                    this.drop(lane.id, closedError(), false);
                else
                    this.fail(closedError());
            };
            socket.onerror = failed;
            socket.onclose = failed;
        });
    }
    receive(data, laneId) {
        for (const entry of (0, protocol_1.parseFrames)(data)) {
            const { type, id, payload } = entry;
            if (laneId !== undefined && id !== laneId)
                throw new Error("Cross-lane WEB proxy frame");
            if (type === 5 /* FrameType.Ping */ && id === 0 && this.mode !== "websocket-lanes") {
                if (payload.length + 8 > this.batchLimit)
                    throw new Error("Oversized WEB proxy ping");
                this.enqueue(this.getLane(0), (0, protocol_1.frame)(6 /* FrameType.Pong */, 0, payload));
                continue;
            }
            if (type === 31 /* FrameType.Bye */ && id === 0)
                throw new Error("WEB proxy relay ended the session");
            if (!id || ![2 /* FrameType.Data */, 3 /* FrameType.Close */, 4 /* FrameType.Window */].includes(type) ||
                (type === 2 /* FrameType.Data */ && !payload.length) || (type === 3 /* FrameType.Close */ && payload.length) ||
                (type === 4 /* FrameType.Window */ && (payload.length !== 4 || !payload.readUInt32BE())))
                throw new Error("Invalid WEB proxy stream frame");
            const stream = this.streams.get(id);
            if (!stream) {
                if (this.tombstones.has(id))
                    continue;
                throw new Error("Unknown WEB proxy stream");
            }
            if (!stream.opened)
                throw new Error("WEB proxy data before stream open");
            if (type === 3 /* FrameType.Close */) {
                this.drop(id, closedError(), false);
                continue;
            }
            if (type === 4 /* FrameType.Window */) {
                stream.sendCredit += payload.readUInt32BE();
                if (stream.sendCredit > protocol_1.WINDOW)
                    throw new Error("WEB proxy send credit overflow");
                this.wake();
            }
            else {
                if (payload.length > stream.receiveCredit || stream.incoming.items >= 1024 || this.incoming + payload.length + (this.incomingItems + 1) * 256 > protocol_1.MAX_QUEUE)
                    throw new Error("WEB proxy receive window exceeded");
                stream.receiveCredit -= payload.length;
                this.incoming += payload.length;
                this.incomingItems++;
                stream.incoming.push(Buffer.from(payload));
                stream.notify();
            }
        }
    }
    drop(id, error, sendClose) {
        const stream = this.streams.get(id);
        if (!stream)
            return;
        this.streams.delete(id);
        this.outgoing -= stream.outgoing.bytes;
        this.incoming -= stream.incoming.bytes;
        this.incomingItems -= stream.incoming.items;
        stream.end(error);
        this.tombstones.add(id);
        if (this.tombstones.size > 4096)
            this.tombstones.delete(this.tombstones.values().next().value);
        const lane = this.lanes.get(this.isLanes() ? id : 0);
        if (!this.closed && lane) {
            lane.frames = lane.frames.filter(data => {
                if (data.readUIntBE(1, 3) !== id || data[0] === 1 /* FrameType.Open */)
                    return true;
                lane.bytes -= data.length;
                return false;
            });
            if (sendClose && stream.opened) {
                try {
                    this.enqueue(lane, (0, protocol_1.frame)(3 /* FrameType.Close */, id));
                }
                catch { }
            }
            if (this.mode === "websocket-lanes" && !sendClose)
                this.finishLane(lane);
        }
        if (!this.streams.size)
            void this.close();
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
        if (this.closed)
            return;
        this.closed = true;
        for (const stream of this.streams.values())
            stream.end(error);
        this.streams.clear();
        this.outgoing = 0;
        this.incoming = 0;
        this.incomingItems = 0;
        void this.close();
    }
    close() {
        if (this.closeTask)
            return this.closeTask;
        this.closed = true;
        this.controller.abort();
        if (this.watchdog)
            clearInterval(this.watchdog);
        if (this.wsTimer)
            clearTimeout(this.wsTimer);
        for (const lane of this.lanes.values())
            this.finishLane(lane);
        for (const stream of this.streams.values())
            stream.end(closedError());
        this.streams.clear();
        this.tombstones.clear();
        const bearer = this.sessionToken;
        this.sessionToken = undefined;
        this.closeTask = (async () => {
            if (!bearer)
                return;
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 2000);
            try {
                const response = await fetch(this.config.base + "api/v1/session", { method: "DELETE", redirect: "error", credentials: "omit",
                    headers: { Authorization: `Bearer ${bearer}` }, signal: controller.signal });
                await response.body?.cancel();
            }
            catch { }
            finally {
                clearTimeout(timeout);
            }
        })();
        return this.closeTask;
    }
    async request(path, method, bearer, body, headers = {}, limit = protocol_1.MAX_BATCH, signal) {
        const deadline = Date.now() + this.config.requestTimeoutMs;
        let attempts = 0;
        while (!this.closed && !signal?.aborted) {
            const controller = new AbortController();
            const abort = () => controller.abort();
            this.controller.signal.addEventListener("abort", abort, { once: true });
            signal?.addEventListener("abort", abort, { once: true });
            const timer = setTimeout(abort, Math.max(1, deadline - Date.now()));
            let wait = Math.min(250 * 2 ** attempts, 5000);
            try {
                const response = await fetch(this.config.base + path, { method, redirect: "error", credentials: "omit",
                    referrerPolicy: "no-referrer", signal: controller.signal,
                    headers: { ...headers, ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}), ...(body ? { "Content-Type": "application/octet-stream" } : {}) },
                    body: body ? new Uint8Array(body) : undefined });
                if (response.status === 503) {
                    const retry = response.headers.get("Retry-After");
                    if (retry) {
                        const seconds = Number(retry);
                        wait = Number.isFinite(seconds) ? seconds * 1000 : Date.parse(retry) - Date.now();
                    }
                    if (!Number.isFinite(wait))
                        wait = 1000;
                    wait = Math.max(250, Math.min(wait, 30000));
                    await response.body?.cancel();
                }
                else {
                    const reader = response.body?.getReader();
                    const chunks = [];
                    let size = 0;
                    if (reader) {
                        try {
                            while (true) {
                                const item = await reader.read();
                                if (item.done)
                                    break;
                                size += item.value.byteLength;
                                if (size > limit || chunks.length >= 4096) {
                                    controller.abort();
                                    throw new Error("WEB proxy response exceeds limit");
                                }
                                chunks.push(Buffer.from(item.value));
                            }
                        }
                        finally {
                            reader.releaseLock();
                        }
                    }
                    return { status: response.status, headers: response.headers, body: Buffer.concat(chunks, size) };
                }
            }
            catch {
                if (this.closed || signal?.aborted)
                    throw closedError();
                if (++attempts >= 5)
                    throw new Error("WEB proxy HTTP request failed");
            }
            finally {
                clearTimeout(timer);
                this.controller.signal.removeEventListener("abort", abort);
                signal?.removeEventListener("abort", abort);
            }
            if (Date.now() + wait >= deadline)
                throw new Error("WEB proxy HTTP retry deadline exceeded");
            await (0, promises_1.setTimeout)(wait, undefined, { signal: this.controller.signal });
        }
        throw closedError();
    }
}
class RelaySocket {
    constructor(transport) {
        this.transport = transport;
        this.incoming = new ByteQueue();
        this.outgoing = new ByteQueue();
        this.id = 0;
        this.closed = false;
        this.opened = false;
        this.sendCredit = protocol_1.WINDOW;
        this.receiveCredit = protocol_1.WINDOW;
        this.grant = 0;
        this.progress = Date.now();
        this.reading = false;
    }
    async connect(_port, _ip, _testServers) {
        if (this.closed || this.id)
            throw new Error("WEB proxy socket cannot be reused");
        await this.transport.open(this);
    }
    notify() { this.wakeRead?.(); this.wakeRead = undefined; }
    end(error) { this.closed = true; this.error = error; this.incoming.clear(); this.outgoing.clear(); this.notify(); }
    async read(n) {
        if (!Number.isSafeInteger(n) || n < 0)
            throw new RangeError("Invalid WEB proxy read size");
        if (this.reading)
            throw new Error("Concurrent WEB proxy reads are unsupported");
        this.reading = true;
        try {
            if (this.closed)
                throw this.error ?? closedError();
            if (!n)
                return Buffer.alloc(0);
            while (!this.incoming.bytes && !this.closed)
                await new Promise(resolve => { this.wakeRead = resolve; });
            if (this.closed)
                throw this.error ?? closedError();
            const items = this.incoming.items;
            const data = this.incoming.take(n);
            this.transport.incoming -= data.length;
            this.transport.incomingItems -= items - this.incoming.items;
            this.grant += data.length;
            this.transport.wake();
            return data;
        }
        finally {
            this.reading = false;
        }
    }
    async readExactly(n) {
        if (!Number.isSafeInteger(n) || n < 0 || n > 64 * 1024 * 1024)
            throw new RangeError("Invalid WEB proxy read size");
        const out = Buffer.allocUnsafe(n);
        for (let offset = 0; offset < n;) {
            const part = await this.read(n - offset);
            part.copy(out, offset);
            offset += part.length;
        }
        return out;
    }
    async readAll() { return this.read(protocol_1.MAX_QUEUE); }
    write(data) {
        if (this.closed || !this.opened)
            throw this.error ?? closedError();
        if (!data.length)
            return;
        if (this.outgoing.bytes + data.length > protocol_1.MAX_STREAM_QUEUE || this.outgoing.items >= 1024 || !this.transport.budget(data.length + 256)) {
            this.transport.drop(this.id, new Error("WEB proxy stream send queue exceeded"), true);
            throw closedError();
        }
        if (!this.outgoing.bytes)
            this.progress = Date.now();
        this.outgoing.push(Buffer.from(data));
        this.transport.outgoing += data.length;
        this.transport.wake();
    }
    async close() {
        if (!this.closed) {
            if (this.id)
                this.transport.drop(this.id, closedError(), true);
            else
                this.end(closedError());
        }
        if (!this.transport.streams.size)
            await this.transport.close();
    }
}
/** Creates a client-scoped relay pool shared by main and media connections. */
function createWebProxySocket(options) {
    const config = (0, protocol_1.configure)(options);
    let transport;
    class WebProxySocket extends RelaySocket {
        constructor() {
            if (!transport || transport.closed)
                transport = new RelayTransport(config);
            super(transport);
        }
    }
    return { socket: WebProxySocket, host: config.host, secret: config.secret };
}
