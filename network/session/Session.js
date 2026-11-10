Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_platform_timers_index = require("../../platform/timers/index.js");
require("../../platform/index.js");
const require_crypto_AuthKey = require("../../crypto/AuthKey.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../tl/index.js");
const require_errors_RPCBaseErrors = require("../../errors/RPCBaseErrors.js");
const require_errors_Common = require("../../errors/Common.js");
const require_errors_ProxyRejectedError = require("../../errors/ProxyRejectedError.js");
const require_tl_runtime_Registry = require("../../tl/runtime/Registry.js");
const require_extensions_Deferred = require("../../extensions/Deferred.js");
require("../../errors/index.js");
const require_network_mtproto_authKeyExchange = require("../mtproto/authKeyExchange.js");
const require_network_mtproto_PlainSender = require("../mtproto/PlainSender.js");
const require_network_mtproto_SessionState = require("../mtproto/SessionState.js");
const require_network_mtproto_PendingRequests = require("../mtproto/PendingRequests.js");
const require_network_mtproto_MessageRouter = require("../mtproto/MessageRouter.js");
const require_network_mtproto_RequestState = require("../mtproto/RequestState.js");
const require_network_mtproto_containerPacker = require("../mtproto/containerPacker.js");
const require_network_mtproto_SaltPool = require("../mtproto/SaltPool.js");
const require_network_mtproto_tempKeyBinding = require("../mtproto/tempKeyBinding.js");
const require_network_session_RequestQueue = require("./RequestQueue.js");
const require_network_session_SessionLink = require("./SessionLink.js");
const require_network_session_ConnectThrottle = require("./ConnectThrottle.js");
const require_network_session_UpdateConnectionState = require("./UpdateConnectionState.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/network/session/Session.ts
const DEFAULT_CONNECT_TIMEOUT_S = 10;
const SEND_BYTES_PER_SECOND = 8192;
const SEND_SILENCE_CAP_MS = 64e3;
const ACTIVITY_WINDOW_MS = 1e4;
const ACK_DELAY_MS = 3e4;
const MAX_PENDING_ACKS = 100;
const STUCK_QUERY_S = 60;
const MAX_IDS_PER_MESSAGE = 8192;
const TEMP_KEY_REFRESH_MARGIN_S = 3600;
const THROTTLE_HOLD_MS = 9e4;
var SessionStopped = class extends Error {
	constructor(cause, reason, broken) {
		super(cause.message);
		this.cause = cause;
		this.reason = reason;
		this.broken = broken;
	}
};
var Session = class {
	constructor(authKey, opts) {
		this.pending = new require_network_mtproto_PendingRequests.PendingRequests();
		this._needsInitConnection = true;
		this.queue = new require_network_session_RequestQueue.RequestQueue();
		this.ownSalts = new require_network_mtproto_SaltPool.SaltPool();
		this.acks = [];
		this.probes = /* @__PURE__ */ new Map();
		this.status = "disconnected";
		this.failures = 0;
		this.keyRejections = 0;
		this.firstAckAt = 0;
		this.rtt = 0;
		this.jitter = 0;
		this.online = false;
		this.throttledUntil = 0;
		this.lastActivityAt = 0;
		this.opts = opts;
		this.log = opts.logger;
		this.dcId = opts.dcId;
		this.isMain = opts.isMainSender;
		this._updateCallback = opts.updateCallback;
		this.throttle = opts.throttle ?? new require_network_session_ConnectThrottle.ConnectThrottle();
		this.authKey = authKey ?? new require_crypto_AuthKey.AuthKey();
		this.state = new require_network_mtproto_SessionState.SessionState(this.authKey, this.log, opts.securityChecks ?? true);
		this.router = new require_network_mtproto_MessageRouter.MessageRouter(this);
	}
	get lifecycle() {
		return this.status;
	}
	isConnected() {
		return this.status === "connected";
	}
	get isConnecting() {
		return this.status === "connecting";
	}
	get isReconnecting() {
		return this.status === "reconnecting";
	}
	get userDisconnected() {
		return this.status === "dead";
	}
	get _disconnected() {
		return this.status !== "connected";
	}
	get hasPendingWork() {
		return this.queue.requests.length > 0 || this.pending.size > 0;
	}
	get lastReadAt() {
		return this.link?.lastReadAt ?? 0;
	}
	async connect(connection, force = false) {
		if (this.status === "connected" && !force) return false;
		if (this.run && !force) {
			await this.run.ready.promise;
			return true;
		}
		this.endRun();
		this.connection = connection;
		const run = {
			abort: new AbortController(),
			ready: new require_extensions_Deferred.default()
		};
		run.ready.promise.catch(() => {});
		this.run = run;
		this.supervise(run, connection);
		await run.ready.promise;
		return true;
	}
	async disconnect() {
		const wasLive = this.status !== "dead";
		this.status = "dead";
		this.endRun();
		const link = this.link;
		this.link = void 0;
		link?.close("restart");
		await this.connection?.disconnect().catch(() => {});
		if (wasLive) this.announce("disconnect");
		this.failAll(/* @__PURE__ */ new Error(`Disconnected from dc ${this.dcId}`));
	}
	reconnect() {
		this.link?.close("restart");
	}
	send(request) {
		const state = new require_network_mtproto_RequestState.RequestState(request);
		this.addStateToQueue(state);
		return state.promise;
	}
	addStateToQueue(state) {
		if (state.cancelled) return;
		if (this.status === "dead") {
			state.reject(/* @__PURE__ */ new Error(`Cannot send ${state.request.className}: sender for dc ${this.dcId} is disconnected`));
			return;
		}
		this.lastActivityAt = Date.now();
		this.queue.push(state);
	}
	cancelRequest(state, reason) {
		state.cancelled = true;
		this.queue.remove(state);
		if (state.msgId && this.pending.take(state.msgId)) this.queue.pushService(new require_network_mtproto_RequestState.RequestState(new require_tl_generated_api.Api.RpcDropAnswer({ reqMsgId: state.msgId })));
		state.reject(reason);
		state.finished.resolve();
	}
	async supervise(run, connection) {
		const signal = run.abort.signal;
		let established = false;
		this.setStatus("connecting");
		while (!signal.aborted) {
			this.throttle.setOnline(this.wantsOnline(Date.now()));
			const attemptAt = this.throttle.nextAttemptAt();
			if (attemptAt > Date.now() && !await this.wait(attemptAt - Date.now(), signal)) return;
			this.throttle.attempt();
			let link;
			try {
				link = await this.open(connection, signal);
			} catch (error) {
				if (signal.aborted) return;
				if (error instanceof SessionStopped) return this.stop(error.cause, error.reason, error.broken);
				const failure = error instanceof Error ? error : new Error(String(error));
				this.failures++;
				const limit = established ? this.opts.reconnectRetries ?? Infinity : this.opts.retries ?? Infinity;
				if (error instanceof require_errors_ProxyRejectedError.ProxyRejectedError || this.failures > limit) return this.stop(failure, "disconnected", established);
				this.log.warn(`Connection to dc ${this.dcId} via ${connection} failed (attempt ${this.failures}): ${failure.message}`);
				if (!established) {
					if (this.failures === 1) this.announceState(require_network_session_UpdateConnectionState.UpdateConnectionState.disconnected);
					await this.opts.client._errorHandler?.(failure);
				}
				connection = this.opts.nextConnection?.() ?? connection.clone();
				this.connection = connection;
				continue;
			}
			this.throttle.connected();
			this.link = link;
			this.log.debug(`Session for dc ${this.dcId} is up via ${connection}`);
			this.setStatus("connected");
			this.announce("connect");
			if (established) {
				this.probeUnanswered();
				Promise.resolve(this.opts.autoReconnectCallback?.()).catch((error) => this.log.error(`Reconnect handler failed for dc ${this.dcId}`, error));
			} else run.ready.resolve();
			established = true;
			const closed = await link.closed;
			if (this.link === link) this.link = void 0;
			this.dropServiceRequests(closed);
			if (signal.aborted) return;
			this.log.info(`Connection to dc ${this.dcId} closed (${closed.reason}${closed.error ? `: ${closed.error}` : ""})`);
			this.announce("disconnect");
			if (closed.reason === "flood") this.throttle.transportFlooded();
			const next = await this.afterClose(closed, connection);
			if (!next || signal.aborted) return;
			if (!(this.opts.autoReconnect ?? true)) return this.stop(/* @__PURE__ */ new Error(`Connection to dc ${this.dcId} was lost`), "disconnected", false);
			this.failures++;
			if (this.failures > (this.opts.reconnectRetries ?? Infinity)) return this.stop(/* @__PURE__ */ new Error("Maximum reconnection retries reached. Aborting!"), "disconnected", true);
			this.setStatus("reconnecting");
			connection = next.rotate && this.opts.nextConnection ? this.opts.nextConnection() : connection.clone();
			this.connection = connection;
		}
	}
	dropServiceRequests(closed) {
		const error = /* @__PURE__ */ new Error(`Connection to dc ${this.dcId} closed (${closed.reason})`);
		for (const state of this.pending.values()) {
			if (!this.queue.isService(state)) continue;
			this.pending.delete(state.msgId);
			state.reject(error);
		}
		this.probes.clear();
	}
	async open(connection, signal) {
		await this.dial(connection);
		let link;
		try {
			if (signal.aborted) throw new Error("Connection attempt cancelled");
			await this.ensureKey(connection);
			if (signal.aborted) throw new Error("Connection attempt cancelled");
			if (this.state.salt.isZero() && !this.opts.tempBinding && this.opts.dcenter && !this.opts.dcenter.salt.isZero()) this.state.salt = this.opts.dcenter.salt;
			link = new require_network_session_SessionLink.SessionLink(connection, this, !!this.opts.tempBinding && !this.tempKey?.bound);
			this.link = link;
			this.jitter = Math.random() * 5;
			this.setOnline(link, this.wantsOnline(Date.now()), Date.now());
			link.start();
			if (link.gated) await this.bind(link);
			return link;
		} catch (error) {
			link?.close("restart");
			await connection.disconnect().catch(() => {});
			throw error;
		}
	}
	async dial(connection) {
		const timeout = this.opts.connectTimeout;
		const seconds = typeof timeout === "number" && timeout > 0 ? timeout : DEFAULT_CONNECT_TIMEOUT_S;
		const dial = connection.connect();
		dial.catch(() => {});
		let timer;
		try {
			await Promise.race([dial, new Promise((_, reject) => {
				timer = setTimeout(() => reject(/* @__PURE__ */ new Error(`Connection to ${connection} timed out after ${seconds}s`)), seconds * 1e3);
			})]);
		} catch (error) {
			await connection.disconnect().catch(() => {});
			throw error;
		} finally {
			clearTimeout(timer);
		}
	}
	serverNow() {
		return Date.now() / 1e3 + this.state.timeOffset;
	}
	async ensureKey(connection) {
		const temp = this.opts.tempBinding;
		if (temp && this.authKey.getKey()) {
			if (!(this.tempKey?.bound && this.serverNow() < this.tempKey.expiresAt - TEMP_KEY_REFRESH_MARGIN_S)) {
				this.tempKey = void 0;
				await this.authKey.setKey(void 0);
			}
		}
		if (this.authKey.getKey()) return;
		this.log.debug(`Creating ${temp ? "a temporary" : "an"} auth key for dc ${this.dcId}`);
		const result = await require_network_mtproto_authKeyExchange.doAuthentication(new require_network_mtproto_PlainSender.PlainSender(connection, this.log), this.log, temp ? {
			expiresIn: temp.expiresIn,
			dc: temp.dcParam
		} : void 0);
		await this.authKey.setKey(result.authKey);
		this.state.timeOffset = result.timeOffset;
		this.restartSession();
		this.state.salt = result.serverSalt;
		if (temp) this.tempKey = {
			expiresAt: Math.floor(this.serverNow()) + temp.expiresIn,
			bound: false
		};
		else await this.opts.authKeyCallback?.(this.authKey, this.dcId);
	}
	async bind(link) {
		const temp = this.opts.tempBinding;
		const msgId = this.state.newMsgId();
		const request = new require_network_mtproto_RequestState.RequestState(require_network_mtproto_tempKeyBinding.buildBindTempAuthKeyRequest(temp.permAuthKey, this.authKey, this.state.sessionId, msgId, this.tempKey.expiresAt));
		request.forcedMsgId = msgId;
		this.queue.pushService(request);
		let answer;
		try {
			answer = await Promise.race([request.promise, link.closed.then((closed) => {
				throw new Error(`Connection closed while binding the temporary key (${closed.reason})`);
			})]);
		} catch (error) {
			if (request.msgId) this.pending.delete(request.msgId);
			if (link.isClosed) throw error;
			temp.onFailed(error);
			throw new SessionStopped(error instanceof Error ? error : new Error(String(error)), "rekey", false);
		}
		if (answer !== true) {
			const error = /* @__PURE__ */ new Error(`bindTempAuthKey answered ${answer}`);
			temp.onFailed(error);
			throw new SessionStopped(error, "rekey", false);
		}
		this.tempKey.bound = true;
		this._needsInitConnection = true;
		this.log.debug(`Bound temporary key for dc ${this.dcId}`);
		link.open();
	}
	async afterClose(closed, connection) {
		switch (closed.reason) {
			case "bad-key": return this.onBadKey(connection);
			case "flood":
				this.log.warn(`dc ${this.dcId} refused the connection: too many connections from this address`);
				return { rotate: false };
			case "restart": return { rotate: false };
			default: return { rotate: this.failures > 0 };
		}
	}
	async onBadKey(connection) {
		if (this.opts.tempBinding) {
			this.log.info(`Temporary key for dc ${this.dcId} is unknown to the server, creating a new one`);
			this.tempKey = void 0;
			return { rotate: false };
		}
		if (this.keyRejections++ === 0) {
			this.log.info(`dc ${this.dcId} did not recognise the auth key, retrying on a fresh session`);
			this.restartSession();
			return { rotate: false };
		}
		if (!this.isMain) {
			this.stop(/* @__PURE__ */ new Error(`Authorization key for dc ${this.dcId} was rejected by the server`), "auth-broken", false);
			return;
		}
		if (await this.opts.client._validateAuthKey(this.dcId, this.authKey, connection) !== false) {
			this.log.info(`dc ${this.dcId} confirmed the auth key, keeping it`);
			this.keyRejections = 0;
			this.restartSession();
			return { rotate: false };
		}
		this.log.warn(`dc ${this.dcId} does not know the auth key, dropping it`);
		this.announceState(require_network_session_UpdateConnectionState.UpdateConnectionState.broken);
		await this.authKey.setKey(void 0);
		await Promise.resolve(this.opts.authKeyCallback?.(void 0, this.dcId)).catch(() => {});
		return { rotate: false };
	}
	stop(error, reason, broken) {
		const wasDead = this.status === "dead";
		const run = this.run;
		this.status = "dead";
		run?.ready.reject(error);
		this.endRun();
		const link = this.link;
		this.link = void 0;
		link?.close("restart");
		this.connection?.disconnect().catch(() => {});
		if (broken) this.announceState(require_network_session_UpdateConnectionState.UpdateConnectionState.broken);
		if (!this.isMain && !wasDead) this.opts.onConnectionBreak?.(this.dcId, reason);
		this.failAll(error);
	}
	endRun() {
		const run = this.run;
		this.run = void 0;
		run?.abort.abort();
		run?.ready.reject(/* @__PURE__ */ new Error("Connection attempt cancelled"));
	}
	async wait(ms, signal) {
		if (ms <= 0) return !signal.aborted;
		try {
			await require_platform_timers_index.sleep(ms, { signal });
			return true;
		} catch {
			return false;
		}
	}
	setStatus(status) {
		this.status = status;
		if (status === "connecting" || status === "reconnecting") this.opts.lifecycleCallback?.(status);
	}
	announce(event) {
		this.opts.lifecycleCallback?.(event);
		this.announceState(event === "connect" ? require_network_session_UpdateConnectionState.UpdateConnectionState.connected : require_network_session_UpdateConnectionState.UpdateConnectionState.disconnected);
	}
	announceState(state) {
		this._updateCallback?.(this.opts.client, new require_network_session_UpdateConnectionState.UpdateConnectionState(state));
	}
	failAll(error) {
		for (const state of this.pending.values()) state.reject(error);
		this.pending.clear();
		this.queue.rejectAll(error);
		this.probes.clear();
		this.acks.length = 0;
	}
	restartSession() {
		this.state.reset();
		this.router.reset();
		this.acks.length = 0;
		this.probes.clear();
		this._needsInitConnection = true;
		const resend = [];
		for (const state of this.pending.values()) if (this.queue.isService(state)) state.reject(/* @__PURE__ */ new Error(`Session for dc ${this.dcId} was reset`));
		else resend.push(state);
		this.pending.clear();
		this.queue.requeue(resend);
	}
	async nextPacket(link) {
		while (!link.isClosed) {
			if (!link.gated) this.refreshSalt();
			const hasWork = this.queue.service.length > 0 || !link.gated && this.queue.requests.length > 0;
			if (this.acks.length && (hasWork || this.acksDue(Date.now()))) this.flushAcks();
			if (hasWork && !link.gated && this.mayPing(link, Date.now())) this.sendPing(link);
			if (!this.queue.next(!link.gated)) {
				await this.queue.waitForWork();
				continue;
			}
			if (!link.gated) this.wrapInitConnection();
			const packed = await require_network_mtproto_containerPacker.packMessages(this.state, link.gated ? [this.queue.service] : [this.queue.service, this.queue.requests]);
			if (!packed) continue;
			let data;
			try {
				data = await this.state.encryptMessageData(packed.data, link.connection.usesRandomPadding);
			} catch (error) {
				this.queue.requeue(packed.batch);
				link.close("lost", error);
				return;
			}
			if (link.isClosed) {
				this.queue.requeue(packed.batch);
				return;
			}
			this.log.debug(`Sending ${packed.batch.map((state) => state.request.className).join(",")} to dc ${this.dcId}`);
			return {
				batch: packed.batch,
				data
			};
		}
	}
	onSent(link, packet) {
		const sentAt = Date.now();
		let expectsReply = false;
		for (const state of packet.batch) {
			state.sentAt = sentAt;
			if (!state.cancelled && require_network_mtproto_RequestState.expectsAnswer(state.request)) {
				this.pending.add(state);
				expectsReply = true;
			}
		}
		if (expectsReply) link.expectReplyBy(sentAt + Math.min(SEND_SILENCE_CAP_MS, packet.data.length / SEND_BYTES_PER_SECOND * 1e3));
	}
	onSendFailed(packet) {
		this.queue.requeue(packet.batch);
	}
	async receive(link, body) {
		let message;
		try {
			message = await this.state.decryptMessageData(body);
		} catch (error) {
			if (error instanceof require_network_mtproto_SessionState.DuplicateMessageError) return this.ack(error.msgId);
			if (error instanceof require_network_mtproto_SessionState.InvalidAuthKeyError) return link.close("bad-key", error);
			if (error instanceof require_errors_Common.TypeNotFoundError) return this.onUnknownType(error);
			this.log.warn(`Dropped a packet from dc ${this.dcId}: ${error}`);
			return;
		}
		link.lastPongAt = Date.now();
		this.failures = 0;
		this.keyRejections = 0;
		if (this.isMain) this.opts.client._lastReceivedAt = Date.now();
		try {
			await this.router.route(message);
		} catch (error) {
			if (error instanceof require_errors_Common.TypeNotFoundError) return this.onUnknownType(error);
			if (error instanceof require_errors_RPCBaseErrors.RPCError) return;
			this.log.error(`Failed to handle a message from dc ${this.dcId}`, error);
			await this.opts.client._errorHandler?.(error);
		}
	}
	hasQueries() {
		return this.queue.requests.length > 0 || this.pending.values().some((state) => !this.queue.isService(state));
	}
	wantsOnline(now) {
		return this.hasQueries() || now - this.lastActivityAt < ACTIVITY_WINDOW_MS;
	}
	setOnline(link, online, now) {
		const needPing = online || !this.online;
		this.online = online;
		const timers = this.timers(now);
		if (needPing) {
			link.lastPongAt = now - (timers.pingDisconnect - timers.rtt) * 1e3;
			link.markRead(now - (timers.readDisconnect - timers.rtt) * 1e3);
		} else {
			link.lastPongAt = now;
			link.markRead(now);
		}
		link.lastPingAt = 0;
	}
	timers(now) {
		const online = this.online && now >= this.throttledUntil;
		const rtt = Math.max(2, this.rtt * 1.5 + 1);
		const offline = 135 + this.jitter;
		return {
			rtt,
			readDisconnect: online ? rtt * 3.5 : offline,
			pingDisconnect: online && this.isMain ? rtt * 2.5 : offline,
			pingMay: online ? rtt * .5 : 30 + this.jitter,
			pingMust: online ? rtt : 60 + this.jitter
		};
	}
	mayPing(link, now) {
		return link.lastPingAt === 0 || now - link.lastPingAt > this.timers(now).pingMay * 1e3;
	}
	tick(link, now, stalled) {
		if (this.tempKey?.bound && this.serverNow() >= this.tempKey.expiresAt - TEMP_KEY_REFRESH_MARGIN_S) {
			this.log.info(`Temporary key for dc ${this.dcId} is about to expire, renewing it`);
			return link.close("restart");
		}
		if (stalled) return this.resume(link, now);
		const online = this.wantsOnline(now);
		if (online !== this.online) this.setOnline(link, online, now);
		const timers = this.timers(now);
		const grace = link.quietUntil;
		if (now > Math.max(link.lastPongAt + timers.pingDisconnect * 1e3, grace)) return link.close("lost", /* @__PURE__ */ new Error(`Ping timeout of ${timers.pingDisconnect.toFixed(1)}s expired`));
		if (now > Math.max(link.lastReadAt + timers.readDisconnect * 1e3, grace)) return link.close("lost", /* @__PURE__ */ new Error(`Read timeout of ${timers.readDisconnect.toFixed(1)}s expired`));
		if (this.isMain && now - link.connectedAt > STUCK_QUERY_S * 1e3) {
			const stuckBefore = now - (STUCK_QUERY_S + timers.rtt) * 1e3;
			if (this.pending.values().some((state) => !this.queue.isService(state) && (state.sentAt ?? now) < stuckBefore)) return link.close("lost", /* @__PURE__ */ new Error(`A request to dc ${this.dcId} got no answer for ${STUCK_QUERY_S}s`));
		}
		if (!link.gated && (link.lastPingAt === 0 || now - link.lastPingAt > timers.pingMust * 1e3)) this.sendPing(link);
		if (this.acks.length && this.acksDue(now)) this.queue.notify();
	}
	resume(link, now) {
		this.throttledUntil = now + THROTTLE_HOLD_MS;
		const timers = this.timers(now);
		const unanswered = link.lastPingAt > link.lastPongAt;
		if (unanswered && now - link.lastPingAt > timers.pingDisconnect * 1e3) return link.close("lost", /* @__PURE__ */ new Error(`Ping got no answer for ${((now - link.lastPingAt) / 1e3).toFixed(1)}s while timers were suspended`));
		this.log.debug(`Timers on dc ${this.dcId} were suspended, checking the connection with a ping`);
		link.lastPongAt = Math.max(link.lastPongAt, now - (timers.pingDisconnect - timers.rtt) * 1e3);
		link.markRead(Math.max(link.lastReadAt, now - (timers.readDisconnect - timers.rtt) * 1e3));
		if (!link.gated && !unanswered) this.sendPing(link);
	}
	wake() {
		this.queue.notify();
	}
	ack(msgId) {
		if (!this.acks.length) this.firstAckAt = Date.now();
		this.acks.push(msgId);
		if (this.acks.length >= MAX_PENDING_ACKS) this.queue.notify();
	}
	acksDue(now) {
		return this.acks.length >= MAX_PENDING_ACKS || now - this.firstAckAt >= ACK_DELAY_MS;
	}
	flushAcks() {
		const msgIds = this.acks.splice(0, MAX_IDS_PER_MESSAGE);
		this.queue.pushService(new require_network_mtproto_RequestState.RequestState(new require_tl_generated_api.Api.MsgsAck({ msgIds })));
		if (this.acks.length) this.firstAckAt = Date.now();
	}
	sendService(request) {
		this.queue.pushService(new require_network_mtproto_RequestState.RequestState(request));
	}
	requeue(states) {
		this.queue.requeue(states);
	}
	resendBefore(firstMsgId) {
		const stale = this.pending.values().filter((state) => !this.queue.isService(state) && (state.containerId ?? state.msgId).lesser(firstMsgId));
		if (!stale.length) return;
		for (const state of stale) this.pending.delete(state.msgId);
		this.log.info(`Resending ${stale.length} request(s) on dc ${this.dcId} after the server started a new session`);
		this.queue.requeue(stale);
	}
	get saltPool() {
		return this.opts.tempBinding || !this.opts.dcenter ? this.ownSalts : this.opts.dcenter.salts;
	}
	setSalt(salt) {
		this.state.salt = salt;
		if (!this.opts.tempBinding) this.opts.dcenter?.updateSalt(salt);
	}
	badSalt(salt) {
		this.saltPool.clear();
		this.setSalt(salt);
	}
	refreshSalt() {
		const pool = this.saltPool;
		const salt = pool.current(this.serverNow());
		if (salt && !salt.equals(this.state.salt)) this.setSalt(salt);
		if (!pool.needsRefill()) return;
		pool.beginRefill();
		const request = new require_network_mtproto_RequestState.RequestState(new require_tl_generated_api.Api.GetFutureSalts({ num: 64 }));
		request.promise.then((result) => {
			pool.endRefill(result);
			this.log.debug(`Received ${pool.count} future salts for dc ${this.dcId}`);
		}, () => pool.endRefill());
		this.queue.pushService(request);
	}
	requireInit() {
		this._needsInitConnection = true;
	}
	initAnswered() {
		this._needsInitConnection = false;
	}
	authLost(error) {
		if (this.isMain) return;
		this.log.info(`Authorization is not imported on dc ${this.dcId} (${error.errorMessage}), re-importing`);
		this.stop(/* @__PURE__ */ new Error(`Authorization for dc ${this.dcId} was not imported`), "rekey", false);
	}
	tempKeyRejected() {
		if (!this.opts.tempBinding) return;
		this.tempKey = void 0;
		this.link?.close("restart");
	}
	stateInfo(reqMsgId, info) {
		let ids;
		for (const [probe, probed] of this.probes) if (probe.msgId?.equals(reqMsgId)) {
			ids = probed;
			this.probes.delete(probe);
			break;
		}
		if (!ids) return;
		const resend = [];
		ids.forEach((id, index) => {
			const status = (info[index] ?? 0) & 7;
			if (status < 1 || status > 3) return;
			const state = this.pending.get(id);
			if (!state || this.queue.isService(state)) return;
			this.pending.delete(id);
			resend.push(state);
		});
		if (!resend.length) return;
		this.log.info(`Resending ${resend.length} request(s) dc ${this.dcId} never received`);
		this.queue.requeue(resend);
	}
	update(update) {
		this._updateCallback?.(this.opts.client, update);
	}
	onUnknownType(error) {
		if (this.isMain) this.opts.client.updateManager.catchUp();
		this.log.info(`Skipping unknown constructor ${error.invalidConstructorId} from dc ${this.dcId}`);
	}
	wrapInitConnection() {
		if (!this._needsInitConnection) return;
		for (const state of this.queue.requests) {
			if (state.cancelled || state.initWrapped) continue;
			if (!require_network_mtproto_containerPacker.isContentRelated(state.request) || state.request instanceof require_tl_generated_api.Api.InvokeWithLayer) continue;
			state.request = new require_tl_generated_api.Api.InvokeWithLayer({
				layer: require_tl_runtime_Registry.LAYER,
				query: this.opts.client._buildInitConnection(state.request)
			});
			state.data = state.request.getBytes();
			state.initWrapped = true;
		}
	}
	sendPing(link) {
		const sentAt = Date.now();
		link.lastPingAt = sentAt;
		const ping = new require_network_mtproto_RequestState.RequestState(new require_tl_generated_api.Api.PingDelayDisconnect({
			pingId: big_integer.default.randBetween("-9223372036854775808", "9223372036854775807"),
			disconnectDelay: Math.floor(this.timers(sentAt).pingDisconnect + 2)
		}));
		ping.promise.then(() => {
			const sample = (Date.now() - sentAt) / 1e3;
			this.rtt = this.rtt ? this.rtt * .8 + sample * .2 : sample;
		}, () => {
			if (link.lastPingAt === sentAt) link.lastPingAt = 0;
		});
		this.queue.pushService(ping);
	}
	probeUnanswered() {
		let ids = [];
		const flush = () => {
			const probe = new require_network_mtproto_RequestState.RequestState(new require_tl_generated_api.Api.MsgsStateReq({ msgIds: ids }));
			this.probes.set(probe, ids);
			this.queue.pushService(probe);
			ids = [];
		};
		for (const state of this.pending.values()) {
			if (!state.msgId || this.queue.isService(state)) continue;
			ids.push(state.msgId);
			if (ids.length === MAX_IDS_PER_MESSAGE) flush();
		}
		if (ids.length) flush();
	}
};
exports.Session = Session;
