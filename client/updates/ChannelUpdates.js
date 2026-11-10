Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
require("../../tl/index.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_Helpers = require("../../Helpers.js");
const require_client_updates_ChannelScheduler = require("./ChannelScheduler.js");
const require_client_updates_PtsWaiter = require("./PtsWaiter.js");
const require_client_updates_updateKinds = require("./updateKinds.js");
// teleproto/client/updates/ChannelUpdates.ts
const DIFFERENCE_LIMIT_USER = 100;
const DIFFERENCE_LIMIT_BOT = 1e5;
const PEER_DIALOGS_BATCH = 100;
const PEER_DIALOGS_KEY = "peerDialogs";
const JOINED_POLL_MS = 6e4;
const PROBE_MAX_PAGES = 50;
const FLOOD_WAIT = /^FLOOD_(?:PREMIUM_)?WAIT(?:_|$)/;
var ChannelUpdates = class {
	constructor(host) {
		this.host = host;
		this.trackers = /* @__PURE__ */ new Map();
		this.stored = /* @__PURE__ */ new Map();
		this.watched = /* @__PURE__ */ new Map();
		this.requests = /* @__PURE__ */ new WeakSet();
		this.ptsRequests = /* @__PURE__ */ new Map();
		this.scheduler = new require_client_updates_ChannelScheduler.ChannelScheduler(host.client._channelPollRequestInterval, host.client._channelPollConcurrency);
	}
	get client() {
		return this.host.client;
	}
	start() {
		this.scheduler.start();
	}
	stop() {
		this.scheduler.stop();
		for (const tracker of this.trackers.values()) {
			clearTimeout(tracker.gapTimer);
			clearTimeout(tracker.pollTimer);
			clearTimeout(tracker.retryTimer);
			tracker.gapTimer = tracker.pollTimer = tracker.retryTimer = void 0;
			tracker.initializing = tracker.difference = tracker.nextPollAt = void 0;
			tracker.retryDelayS = 0;
			tracker.pts.clearSkippedUpdates();
			tracker.pts.setRequesting(false);
		}
		if (this.client._destroyed) this.trackers.clear();
		this.watched.clear();
	}
	reset() {
		this.trackers.clear();
		this.stored.clear();
	}
	restore(channels) {
		for (const [channelId, pts] of Object.entries(channels ?? {})) this.stored.set(channelId, pts);
	}
	snapshot() {
		const channels = Object.fromEntries(this.stored);
		for (const [channelId, tracker] of this.trackers) if (tracker.pts.inited()) channels[channelId] = tracker.pts.current();
		return channels;
	}
	feed(update, payload) {
		const channelId = require_client_updates_updateKinds.channelIdOf(update);
		if (!channelId || !update.pts) {
			this.host.dispatch(update, payload);
			return;
		}
		const tracker = this.tracker(channelId);
		if (!tracker.pts.inited()) {
			const stored = this.stored.get(channelId);
			if (stored === void 0) {
				tracker.pts.init(update.pts);
				this.host.saveState();
				this.deliver(tracker, update, payload);
				return;
			}
			tracker.pts.init(stored);
		}
		tracker.pts.updateAndApply(update.pts, update.ptsCount, {
			tag: "update",
			update
		}, (applied) => {
			this.host.saveState();
			this.deliver(tracker, applied, payload);
		}, () => {});
	}
	applyAffected(channelId, pts, ptsCount) {
		const tracker = this.tracker(channelId);
		if (!tracker.pts.inited()) {
			tracker.pts.init(pts);
			this.host.saveState();
			return;
		}
		tracker.pts.updateAndApply(pts, ptsCount, { tag: "update" }, () => this.host.saveState(), () => {});
	}
	tooLong(update, fromDifference) {
		const channelId = update.channelId.toString();
		const existing = this.trackers.get(channelId);
		const known = existing?.pts.inited() ? existing.pts.current() : this.stored.get(channelId);
		if (known !== void 0) {
			if (update.pts && update.pts <= known) return;
			const tracker = this.tracker(channelId);
			if (!tracker.pts.inited()) tracker.pts.init(known);
			tracker.catchingUp = true;
			this.fetchDifference(channelId);
			return;
		}
		if (!fromDifference) {
			this.host.requestDifference();
			return;
		}
		const tracker = this.tracker(channelId);
		tracker.pts.init(1);
		tracker.catchingUp = true;
		this.fetchDifference(channelId);
	}
	async watch(channelId, inputChannel, signal) {
		if (signal?.aborted) return;
		const generation = this.host.generation;
		if (!this.host.isCurrent(generation)) throw new Error("Update manager is stopped");
		const watching = this.watched.get(channelId) ?? 0;
		this.watched.set(channelId, watching + 1);
		const tracker = this.tracker(channelId);
		tracker.inputChannel = inputChannel;
		let released = false;
		const release = () => {
			if (released) return;
			released = true;
			if (this.host.isCurrent(generation) && this.trackers.get(channelId) === tracker) this.release(channelId);
		};
		if (!tracker.initializing && (watching === 0 || !tracker.pts.inited())) {
			const task = (async () => {
				if (tracker.pts.inited() || this.stored.has(channelId)) tracker.catchingUp = true;
				if (!tracker.pts.inited()) {
					const pts = await this.readPts(channelId, tracker, inputChannel);
					if (!this.host.isCurrent(generation) || !this.watched.has(channelId) || this.trackers.get(channelId) !== tracker) return;
					if (!tracker.pts.inited()) tracker.pts.init(pts);
					this.host.saveState();
				}
				await this.fetchDifference(channelId);
			})();
			tracker.initializing = task;
			task.finally(() => {
				if (tracker.initializing === task) tracker.initializing = void 0;
			}).catch(() => {});
		}
		const task = tracker.initializing ?? Promise.resolve();
		if (!signal) {
			await task.catch((error) => {
				release();
				throw error;
			});
			return;
		}
		await new Promise((resolve, reject) => {
			const onAbort = () => {
				release();
				resolve();
			};
			signal.addEventListener("abort", onAbort, { once: true });
			task.then(resolve, (error) => {
				signal.removeEventListener("abort", onAbort);
				release();
				reject(error);
			});
		});
	}
	release(channelId) {
		const watching = this.watched.get(channelId);
		if (!watching) return;
		if (watching > 1) {
			this.watched.set(channelId, watching - 1);
			return;
		}
		this.watched.delete(channelId);
		this.scheduler.cancel(channelId);
		const tracker = this.trackers.get(channelId);
		if (!tracker) return;
		clearTimeout(tracker.pollTimer);
		tracker.pollTimer = tracker.nextPollAt = void 0;
	}
	watchedIds() {
		return [...this.watched.keys()];
	}
	get polling() {
		return {
			...this.scheduler.state,
			channels: this.watchedIds().map((channelId) => {
				const tracker = this.trackers.get(channelId);
				return {
					channelId,
					lastPolledAt: tracker?.lastPolledAt,
					lastDelayMs: tracker?.lastDelayMs,
					nextPollAt: tracker?.nextPollAt
				};
			})
		};
	}
	handleFloodWait(request, seconds) {
		if (!this.requests.has(request)) return false;
		if (Number.isFinite(seconds) && seconds > 0) this.scheduler.pause(seconds * 1e3);
		return true;
	}
	tracker(channelId) {
		let tracker = this.trackers.get(channelId);
		if (tracker) return tracker;
		const created = {
			retryDelayS: 0,
			pts: new require_client_updates_PtsWaiter.PtsWaiter({ onWaitForSkipped: (ms) => {
				clearTimeout(created.gapTimer);
				created.gapTimer = void 0;
				if (ms < 0) return;
				created.gapTimer = setTimeout(() => {
					created.gapTimer = void 0;
					created.catchingUp = true;
					this.fetchDifference(channelId);
				}, Math.min(ms, 1));
			} })
		};
		this.trackers.set(channelId, created);
		return created;
	}
	invoke(channelId, create, poll = true) {
		const generation = this.host.generation;
		return this.schedule(channelId, create, poll, generation).catch((error) => {
			if (!FLOOD_WAIT.test(error?.errorMessage ?? "") || !this.host.isCurrent(generation)) throw error;
			return this.invoke(channelId, create, poll);
		});
	}
	schedule(channelId, create, poll, generation) {
		const queuedAt = Date.now();
		return this.scheduler.schedule(channelId, async () => {
			if (!this.host.isCurrent(generation)) throw new require_client_updates_ChannelScheduler.ChannelPollCancelledError();
			if (this.client.updates.authorizationError) throw this.client.updates.authorizationError;
			const request = create();
			this.requests.add(request);
			const tracker = this.trackers.get(channelId);
			if (poll && tracker && request instanceof require_tl_generated_api.Api.updates.GetChannelDifference) {
				tracker.pts.setRequesting(true);
				tracker.lastPolledAt = Date.now();
				tracker.lastDelayMs = tracker.lastPolledAt - queuedAt;
			}
			try {
				return await this.client.invoke(request);
			} catch (error) {
				if (this.host.isCurrent(generation)) {
					this.client.updates._suspendAuthorization(error);
					const flood = error;
					if (FLOOD_WAIT.test(flood.errorMessage ?? "")) this.handleFloodWait(request, flood.seconds ?? 0);
				}
				throw error;
			} finally {
				this.requests.delete(request);
			}
		});
	}
	async readPts(channelId, tracker, inputChannel) {
		const stored = this.stored.get(channelId);
		if (stored) return stored;
		if (!this.client._bot && inputChannel instanceof require_tl_generated_api.Api.InputChannel) {
			const start = await this.peerDialogPts(channelId, inputChannel);
			tracker.joined = start.joined;
			if (start.pts) return start.pts;
		}
		return this.probePts(channelId, inputChannel);
	}
	peerDialogPts(channelId, input) {
		return new Promise((resolve) => {
			const pending = this.ptsRequests.get(channelId);
			if (pending) pending.waiters.push(resolve);
			else this.ptsRequests.set(channelId, {
				input,
				waiters: [resolve]
			});
			this.ptsBatch ??= this.loadPeerDialogs().finally(() => {
				this.ptsBatch = void 0;
			});
		});
	}
	async loadPeerDialogs() {
		while (this.ptsRequests.size) {
			let batch = [];
			const found = /* @__PURE__ */ new Map();
			try {
				const result = await this.invoke(PEER_DIALOGS_KEY, () => {
					if (!batch.length) {
						batch = [...this.ptsRequests].slice(0, PEER_DIALOGS_BATCH);
						for (const [channelId] of batch) this.ptsRequests.delete(channelId);
					}
					return new require_tl_generated_api.Api.messages.GetPeerDialogs({ peers: batch.map(([, request]) => new require_tl_generated_api.Api.InputPeerChannel({
						channelId: request.input.channelId,
						accessHash: request.input.accessHash
					})) });
				}, false);
				this.client._entityCache.add(result);
				await this.host.saveEntities(result);
				for (const dialog of result.dialogs) if (dialog instanceof require_tl_generated_api.Api.Dialog && dialog.peer instanceof require_tl_generated_api.Api.PeerChannel && dialog.pts) found.set(dialog.peer.channelId.toString(), dialog.pts);
			} catch (error) {
				if (!batch.length) {
					batch = [...this.ptsRequests];
					this.ptsRequests.clear();
				}
				this.client._log.debug(`messages.getPeerDialogs failed, probing ${batch.length} channels: ${error}`);
			}
			for (const [channelId, request] of batch) {
				const pts = found.get(channelId);
				for (const waiter of request.waiters) waiter({
					pts,
					joined: pts !== void 0
				});
			}
		}
	}
	async probePts(channelId, inputChannel) {
		let pts = 1;
		let limit = 1;
		for (let page = 0; page < PROBE_MAX_PAGES; page++) {
			const diff = await this.invoke(channelId, () => new require_tl_generated_api.Api.updates.GetChannelDifference({
				channel: inputChannel,
				filter: new require_tl_generated_api.Api.ChannelMessagesFilterEmpty(),
				pts,
				limit,
				force: true
			}), false);
			this.client._entityCache.add(diff);
			if (diff instanceof require_tl_generated_api.Api.updates.ChannelDifferenceTooLong) return diff.dialog instanceof require_tl_generated_api.Api.Dialog && diff.dialog.pts ? diff.dialog.pts : pts;
			pts = Math.max(diff.pts, pts);
			if (diff instanceof require_tl_generated_api.Api.updates.ChannelDifferenceEmpty || diff.final) return pts;
			limit = this.client._bot ? DIFFERENCE_LIMIT_BOT : DIFFERENCE_LIMIT_USER;
		}
		return pts;
	}
	deliver(tracker, update, payload) {
		const message = update.message;
		if (message?.id !== void 0 && (update instanceof require_tl_generated_api.Api.UpdateNewChannelMessage || update instanceof require_tl_generated_api.Api.UpdateNewMessage)) tracker.lastMessageId = Math.max(tracker.lastMessageId ?? 0, message.id);
		this.host.dispatch(update, payload);
	}
	fetchDifference(channelId) {
		const tracker = this.trackers.get(channelId);
		if (!tracker) return Promise.resolve();
		if (tracker.difference) return tracker.difference;
		const task = this.fetchDifferenceOnce(channelId, tracker);
		tracker.difference = task;
		task.finally(() => {
			if (tracker.difference === task) tracker.difference = void 0;
		}).catch(() => {});
		return task;
	}
	async fetchDifferenceOnce(channelId, tracker) {
		const generation = this.host.generation;
		if (!this.host.isCurrent(generation) || this.client.updates.authorizationError) return;
		if (tracker.pts.requesting() || !tracker.pts.inited()) return;
		const current = () => this.host.isCurrent(generation) && this.trackers.get(channelId) === tracker;
		clearTimeout(tracker.pollTimer);
		clearTimeout(tracker.retryTimer);
		tracker.pollTimer = tracker.retryTimer = tracker.nextPollAt = void 0;
		let failed = false;
		let reset = false;
		let serverTimeoutS;
		try {
			const resolved = await this.resolve(channelId, tracker);
			if (!current()) return;
			if (resolved.kind === "invalid") {
				this.client._log.info(`Channel ${channelId} is inaccessible (${resolved.reason}); dropping difference tracking`);
				this.drop(channelId);
				return;
			}
			if (resolved.kind === "transient") {
				const failures = (tracker.resolveFailures ?? 0) + 1;
				tracker.resolveFailures = failures;
				if (failures >= 3) {
					this.client._log.info(`Channel ${channelId} could not be resolved after ${failures} attempts; dropping difference tracking`);
					this.drop(channelId);
					return;
				}
				if (failures === 1) this.client._log.warn(`Cannot resolve channel ${channelId}; retrying (${failures}/3)`);
				else this.client._log.debug(`Cannot resolve channel ${channelId}; retrying (${failures}/3)`);
				failed = true;
			} else {
				tracker.resolveFailures = 0;
				const inputChannel = resolved.input;
				tracker.inputChannel = inputChannel;
				for (;;) {
					const requestPts = tracker.pts.current();
					const limit = requestPts > 0 ? this.client._bot ? DIFFERENCE_LIMIT_BOT : DIFFERENCE_LIMIT_USER : 1;
					const diff = await this.invoke(channelId, () => new require_tl_generated_api.Api.updates.GetChannelDifference({
						channel: inputChannel,
						filter: new require_tl_generated_api.Api.ChannelMessagesFilterEmpty(),
						pts: Math.max(requestPts, 1),
						limit,
						force: true
					}));
					if (!current()) return;
					serverTimeoutS = diff.timeout;
					await this.applyDifference(channelId, tracker, requestPts, diff);
					if (!current()) return;
					this.host.saveState();
					if (diff.final) break;
				}
				tracker.catchingUp = false;
				tracker.retryDelayS = 0;
			}
		} catch (error) {
			if (!current() || error instanceof require_client_updates_ChannelScheduler.ChannelPollCancelledError) return;
			if (this.client.updates._suspendAuthorization(error)) return;
			const message = error?.errorMessage;
			if (message === "CHANNEL_PRIVATE" || message === "CHANNEL_INVALID") {
				this.client._log.info(`Channel ${channelId} is inaccessible (${message}), dropping it`);
				this.drop(channelId);
				return;
			}
			if (message === "PERSISTENT_TIMESTAMP_INVALID") reset = true;
			failed = true;
			this.client._log.warn(`updates.getChannelDifference for ${channelId} failed: ${error}`);
		} finally {
			if (current()) tracker.pts.setRequesting(false);
		}
		if (!current()) return;
		if (reset) await this.resetPts(channelId, tracker, current);
		if (!current()) return;
		if (failed) this.scheduleRetry(channelId, tracker);
		else this.schedulePoll(channelId, tracker, serverTimeoutS);
	}
	async resetPts(channelId, tracker, current) {
		this.stored.delete(channelId);
		const inputChannel = tracker.inputChannel;
		if (!inputChannel) return;
		try {
			const pts = await this.probePts(channelId, inputChannel);
			if (!current()) return;
			this.client._log.info(`Channel ${channelId} pts was reset to ${pts}`);
			tracker.pts.init(pts, true);
			this.host.saveState();
		} catch (error) {
			if (current()) this.client._log.warn(`Cannot reset pts of channel ${channelId}: ${error}`);
		}
	}
	async applyDifference(channelId, tracker, requestPts, diff) {
		if (diff instanceof require_tl_generated_api.Api.updates.ChannelDifferenceEmpty) {
			tracker.pts.init(Math.max(diff.pts, requestPts), true);
			return;
		}
		this.client._entityCache.add(diff);
		await this.host.saveEntities(diff);
		if (diff instanceof require_tl_generated_api.Api.updates.ChannelDifference) {
			const entities = require_client_updates_updateKinds.collectEntities(diff.users, diff.chats);
			const missed = tracker.catchingUp;
			for (const message of diff.newMessages.filter(require_client_updates_updateKinds.isMessage).sort((a, b) => a.id - b.id)) this.deliver(tracker, new require_tl_generated_api.Api.UpdateNewChannelMessage({
				message,
				pts: 0,
				ptsCount: 0
			}), {
				others: null,
				entities,
				missed
			});
			for (const update of diff.otherUpdates) this.host.dispatch(update, {
				others: diff.otherUpdates,
				entities,
				missed
			});
			tracker.pts.init(diff.pts > requestPts ? diff.pts : requestPts + 1, true);
			return;
		}
		const dialogPts = diff.dialog instanceof require_tl_generated_api.Api.Dialog ? diff.dialog.pts : void 0;
		const next = dialogPts !== void 0 && dialogPts > requestPts ? dialogPts : requestPts + 1;
		const seen = tracker.lastMessageId;
		const recent = seen === void 0 ? [] : diff.messages.filter(require_client_updates_updateKinds.isMessage).filter((message) => message.id > seen).sort((a, b) => a.id - b.id);
		this.client._log.warn(`Channel ${channelId} difference is too long, delivering ${recent.length} recent messages and skipping to pts ${next}`);
		const entities = require_client_updates_updateKinds.collectEntities(diff.users, diff.chats);
		for (const message of recent) this.deliver(tracker, new require_tl_generated_api.Api.UpdateNewChannelMessage({
			message,
			pts: 0,
			ptsCount: 0
		}), {
			others: null,
			entities,
			missed: true
		});
		tracker.pts.init(next, true);
	}
	scheduleRetry(channelId, tracker) {
		tracker.retryDelayS = require_client_updates_updateKinds.nextRetryDelaySeconds(tracker.retryDelayS);
		const delayMs = Math.max(tracker.retryDelayS * 1e3 * (.8 + Math.random() * .4), (this.scheduler.state.pausedUntil ?? 0) - Date.now());
		tracker.nextPollAt = Date.now() + delayMs;
		tracker.retryTimer = setTimeout(() => {
			tracker.retryTimer = void 0;
			this.fetchDifference(channelId);
		}, delayMs);
	}
	schedulePoll(channelId, tracker, serverTimeoutS) {
		if (!this.watched.has(channelId)) return;
		clearTimeout(tracker.pollTimer);
		const baseMs = serverTimeoutS && serverTimeoutS > 0 ? serverTimeoutS * 1e3 : this.client._channelPollInterval;
		const delayMs = tracker.joined ? Math.max(baseMs, JOINED_POLL_MS) : baseMs;
		tracker.nextPollAt = Date.now() + delayMs;
		tracker.pollTimer = setTimeout(() => {
			tracker.pollTimer = void 0;
			this.fetchDifference(channelId);
		}, delayMs);
	}
	async resolve(channelId, tracker) {
		if (tracker.inputChannel) return {
			kind: "ok",
			input: tracker.inputChannel
		};
		try {
			const input = await this.client.getInputEntity(new require_tl_generated_api.Api.PeerChannel({ channelId: require_Helpers.returnBigInt(channelId) }));
			if (input instanceof require_tl_generated_api.Api.InputPeerChannel) return {
				kind: "ok",
				input: new require_tl_generated_api.Api.InputChannel({
					channelId: input.channelId,
					accessHash: input.accessHash
				})
			};
			return { kind: "transient" };
		} catch (error) {
			const failure = error;
			const reason = failure.cause?.errorMessage ?? failure.errorMessage;
			if (reason === "CHANNEL_INVALID" || reason === "CHANNEL_PRIVATE") return {
				kind: "invalid",
				reason
			};
			return { kind: "transient" };
		}
	}
	drop(channelId) {
		this.watched.delete(channelId);
		this.scheduler.cancel(channelId);
		this.stored.delete(channelId);
		const tracker = this.trackers.get(channelId);
		if (!tracker) return;
		clearTimeout(tracker.gapTimer);
		clearTimeout(tracker.pollTimer);
		clearTimeout(tracker.retryTimer);
		tracker.pts.clearSkippedUpdates();
		this.trackers.delete(channelId);
		this.host.saveState();
	}
};
exports.ChannelUpdates = ChannelUpdates;
