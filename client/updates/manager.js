"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManager = void 0;
const channelScheduler_1 = require("./channelScheduler");
const tl_1 = require("../../tl");
const utils = __importStar(require("../../Utils"));
const Helpers_1 = require("../../Helpers");
const dispatch_1 = require("./dispatch");
const ptsWaiter_1 = require("./ptsWaiter");
const NO_UPDATES_TIMEOUT_MS = 15 * 60 * 1000;
const FAIL_DIFFERENCE_INITIAL_S = 1;
const FAIL_DIFFERENCE_CAP_S = 64;
const CHANNEL_DIFFERENCE_LIMIT = 100;
const RECENT_MESSAGE_BUFFER_SIZE = 1000;
const MAX_PENDING_SEQ = 1000;
const DIFFERENCE_DEADLINE_MS = 120_000;
function isCommonPtsUpdate(update) {
    return (update instanceof tl_1.Api.UpdateNewMessage ||
        update instanceof tl_1.Api.UpdateDeleteMessages ||
        update instanceof tl_1.Api.UpdateReadHistoryInbox ||
        update instanceof tl_1.Api.UpdateReadHistoryOutbox ||
        update instanceof tl_1.Api.UpdateWebPage ||
        update instanceof tl_1.Api.UpdateReadMessagesContents ||
        update instanceof tl_1.Api.UpdateEditMessage ||
        update instanceof tl_1.Api.UpdateFolderPeers ||
        update instanceof tl_1.Api.UpdatePinnedMessages);
}
function isChannelPtsUpdate(update) {
    return (update instanceof tl_1.Api.UpdateNewChannelMessage ||
        update instanceof tl_1.Api.UpdateEditChannelMessage ||
        update instanceof tl_1.Api.UpdateDeleteChannelMessages ||
        update instanceof tl_1.Api.UpdateChannelWebPage ||
        update instanceof tl_1.Api.UpdatePinnedChannelMessages);
}
function getChannelId(update) {
    const u = update;
    if (u.channelId)
        return u.channelId.toString();
    const peer = u.message?.peerId;
    if (peer instanceof tl_1.Api.PeerChannel)
        return peer.channelId.toString();
    return undefined;
}
function hasQts(update) {
    return typeof update.qts === "number";
}
class UpdateManager {
    constructor(client) {
        this.lastUpdateTime = 0;
        this.beforeState = [];
        this.channels = new Map();
        this.pendingSeq = [];
        this.recentMessageKeys = new Set();
        this.recentMessageQueue = [];
        this.fetchingDifference = false;
        this.failTimeoutS = FAIL_DIFFERENCE_INITIAL_S;
        this.channelFailTimeoutS = new Map();
        this.channelFailRetryTimers = new Map();
        this.watchedChannels = new Map();
        this.channelRequests = new WeakSet();
        this.running = false;
        this.generation = 0;
        this.client = client;
        this.channelScheduler = new channelScheduler_1.ChannelScheduler(client._channelPollRequestInterval, client._channelPollConcurrency);
        this.globalPts = this.makeGlobalWaiter();
        this.qts = this.makeGlobalWaiter(true);
    }
    start() {
        if (this.running)
            return;
        this.running = true;
        this.channelScheduler.start();
        this.client.updates._resume();
    }
    get isRunning() {
        return this.running;
    }
    /** Clears account-specific positions after disconnect and session deletion. @hidden */
    reset() {
        this.state = undefined;
        this.lastUpdateTime = 0;
        this.channels.clear();
        this.recentMessageKeys.clear();
        this.recentMessageQueue.length = 0;
        this.globalPts.init(0);
        this.qts.init(0);
    }
    stop() {
        this.running = false;
        this.generation++;
        this.channelScheduler.stop();
        this.client.updates._pause();
        this.initializing = undefined;
        this.beforeState.length = 0;
        this.qts.clearSkippedUpdates();
        this.qts.setRequesting(false);
        this.globalPts.clearSkippedUpdates();
        this.globalPts.setRequesting(false);
        if (this.globalPtsTimer) {
            clearTimeout(this.globalPtsTimer);
            this.globalPtsTimer = undefined;
        }
        if (this.failRetryTimer) {
            clearTimeout(this.failRetryTimer);
            this.failRetryTimer = undefined;
        }
        if (this.seqGapTimer) {
            clearTimeout(this.seqGapTimer);
            this.seqGapTimer = undefined;
        }
        for (const t of this.channelFailRetryTimers.values())
            clearTimeout(t);
        this.channelFailRetryTimers.clear();
        for (const tracker of this.channels.values()) {
            if (tracker.timer)
                clearTimeout(tracker.timer);
            if (tracker.pollTimer)
                clearTimeout(tracker.pollTimer);
            tracker.timer = undefined;
            tracker.pollTimer = undefined;
            tracker.initializing = undefined;
            tracker.difference = undefined;
            tracker.nextPollAt = undefined;
            tracker.pts.clearSkippedUpdates();
            tracker.pts.setRequesting(false);
        }
        if (this.client._destroyed)
            this.channels.clear();
        this.watchedChannels.clear();
        this.pendingSeq.length = 0;
        this.fetchingDifference = false;
        this.failTimeoutS = FAIL_DIFFERENCE_INITIAL_S;
        this.channelFailTimeoutS.clear();
    }
    onUpdates(update, noDispatch = false) {
        if (!this.running)
            return;
        try {
            this.lastUpdateTime = Date.now();
            this.client._entityCache.add(update);
            void this.saveEntities(update);
            if (noDispatch)
                this.markNoDispatch(update);
            const raw = update instanceof tl_1.Api.UpdateShort ? update.update : update;
            const stateful = update instanceof tl_1.Api.Updates || update instanceof tl_1.Api.UpdatesCombined ||
                update instanceof tl_1.Api.UpdateShortMessage || update instanceof tl_1.Api.UpdateShortChatMessage ||
                update instanceof tl_1.Api.UpdateShortSentMessage || update instanceof tl_1.Api.UpdatesTooLong ||
                isCommonPtsUpdate(raw) || isChannelPtsUpdate(raw) || hasQts(raw);
            if (!this.state && stateful) {
                this.beforeState.push(update);
                void this.ensureState();
                return;
            }
            if (update instanceof tl_1.Api.Updates || update instanceof tl_1.Api.UpdatesCombined) {
                this.handleContainer(update);
            }
            else if (update instanceof tl_1.Api.UpdateShort) {
                this.feedUpdate(update.update, { others: null });
            }
            else if (update instanceof tl_1.Api.UpdateShortMessage || update instanceof tl_1.Api.UpdateShortChatMessage) {
                this.handleShortMessage(update);
            }
            else if (update instanceof tl_1.Api.UpdateShortSentMessage) {
                this.handleShortSentMessage(update);
            }
            else if (update.className === "UpdatesTooLong") {
                this.client._log.warn("Received UpdatesTooLong, requesting common difference");
                this.scheduleCommonDifference();
            }
            else {
                this.feedUpdate(update, { others: null });
            }
        }
        catch (e) {
            this.client._log.error(`Error in onUpdates: ${e}`);
        }
    }
    markNoDispatch(update) {
        const mark = (obj) => Object.defineProperty(obj, "_noDispatch", {
            value: true,
            configurable: true,
        });
        mark(update);
        if (update instanceof tl_1.Api.Updates || update instanceof tl_1.Api.UpdatesCombined) {
            for (const u of update.updates)
                mark(u);
        }
        else if (update instanceof tl_1.Api.UpdateShort) {
            mark(update.update);
        }
    }
    handleShortSentMessage(update) {
        if (!this.state)
            return;
        this.globalPts.updateAndApply(update.pts, update.ptsCount, { tag: "update", update: update }, () => {
            if (this.state)
                this.state.pts = this.globalPts.current();
        }, () => { });
        this.state.date = Math.max(this.state.date, update.date);
    }
    applyAffected(pts, ptsCount, channelId) {
        if (!this.running || !this.state)
            return;
        if (channelId) {
            const tracker = this.getOrCreateChannel(channelId);
            if (!tracker.pts.inited()) {
                tracker.pts.init(pts);
                return;
            }
            tracker.pts.updateAndApply(pts, ptsCount, { tag: "update" }, () => { }, () => { });
            return;
        }
        this.globalPts.updateAndApply(pts, ptsCount, { tag: "update" }, () => { }, () => { });
        this.state.pts = this.globalPts.current();
    }
    async catchUp() {
        const generation = this.generation;
        if (!this.isCurrent(generation) || this.client.updates.authorizationError)
            return;
        try {
            if (!this.state) {
                await this.ensureState();
                return;
            }
            this.client._log.debug("Catching up on missed updates...");
            await this.fetchCommonDifference();
            this.client._log.debug("Catch up complete");
        }
        catch (e) {
            if (!this.isCurrent(generation))
                return;
            if (this.client.updates._suspendAuthorization(e))
                return;
            this.client._log.error(`Error during catch up: ${e}`);
        }
    }
    async watchChannel(channelId, inputChannel, signal) {
        if (signal?.aborted)
            return;
        const generation = this.generation;
        if (!this.isCurrent(generation))
            throw new Error("Update manager is stopped");
        const watching = this.watchedChannels.get(channelId) ?? 0;
        this.watchedChannels.set(channelId, watching + 1);
        const tracker = this.getOrCreateChannel(channelId);
        tracker.inputChannel = inputChannel;
        let released = false;
        const release = () => {
            if (released)
                return;
            released = true;
            if (this.isCurrent(generation) && this.channels.get(channelId) === tracker) {
                this.releaseChannel(channelId);
            }
        };
        if (!tracker.initializing && (watching === 0 || !tracker.pts.inited())) {
            const task = (async () => {
                if (!tracker.pts.inited()) {
                    const pts = await this.readChannelPts(inputChannel);
                    if (!this.isCurrent(generation) || !this.watchedChannels.has(channelId) ||
                        this.channels.get(channelId) !== tracker)
                        return;
                    if (!tracker.pts.inited())
                        tracker.pts.init(pts);
                }
                await this.fetchChannelDifference(channelId, { keepAlive: true });
            })();
            tracker.initializing = task;
            void task.finally(() => {
                if (tracker.initializing === task)
                    tracker.initializing = undefined;
            }).catch(() => { });
        }
        let onAbort;
        try {
            const task = tracker.initializing ?? Promise.resolve();
            if (signal) {
                await new Promise((resolve, reject) => {
                    onAbort = () => {
                        release();
                        signal.removeEventListener("abort", onAbort);
                        resolve();
                    };
                    signal.addEventListener("abort", onAbort, { once: true });
                    if (signal.aborted)
                        onAbort();
                    task.then(resolve, reject);
                });
            }
            else {
                await task;
            }
        }
        catch (error) {
            release();
            if (onAbort)
                signal?.removeEventListener("abort", onAbort);
            throw error;
        }
    }
    releaseChannel(channelId) {
        const watching = this.watchedChannels.get(channelId);
        if (!watching)
            return;
        if (watching > 1) {
            this.watchedChannels.set(channelId, watching - 1);
            return;
        }
        this.watchedChannels.delete(channelId);
        this.channelScheduler.cancel(channelId);
        const retry = this.channelFailRetryTimers.get(channelId);
        if (retry)
            clearTimeout(retry);
        this.channelFailRetryTimers.delete(channelId);
        this.channelFailTimeoutS.delete(channelId);
        const tracker = this.channels.get(channelId);
        if (tracker)
            tracker.nextPollAt = undefined;
        if (tracker?.pollTimer) {
            clearTimeout(tracker.pollTimer);
            tracker.pollTimer = undefined;
        }
    }
    watchedChannelIds() {
        return [...this.watchedChannels.keys()];
    }
    get polling() {
        return {
            ...this.channelScheduler.state,
            channels: this.watchedChannelIds().map((channelId) => {
                const tracker = this.channels.get(channelId);
                return {
                    channelId,
                    lastPolledAt: tracker?.lastPolledAt,
                    lastDelayMs: tracker?.lastDelayMs,
                    nextPollAt: tracker?.nextPollAt,
                };
            }),
        };
    }
    /** @hidden */
    handleChannelFloodWait(request, seconds) {
        if (!this.channelRequests.has(request))
            return false;
        if (Number.isFinite(seconds) && seconds > 0)
            this.channelScheduler.pause(seconds * 1000);
        return true;
    }
    invokeChannel(channelId, create) {
        const generation = this.generation;
        const queuedAt = Date.now();
        return this.channelScheduler.schedule(channelId, async () => {
            if (!this.isCurrent(generation))
                throw new channelScheduler_1.ChannelPollCancelledError();
            if (this.client.updates.authorizationError)
                throw this.client.updates.authorizationError;
            const request = create();
            this.channelRequests.add(request);
            const tracker = this.channels.get(channelId);
            if (tracker && request instanceof tl_1.Api.updates.GetChannelDifference) {
                tracker.pts.setRequesting(true);
                tracker.lastPolledAt = Date.now();
                tracker.lastDelayMs = tracker.lastPolledAt - queuedAt;
            }
            try {
                return await this.client.invoke(request);
            }
            catch (error) {
                if (this.isCurrent(generation)) {
                    this.client.updates._suspendAuthorization(error);
                    const flood = error;
                    if (/^FLOOD_(?:PREMIUM_)?WAIT(?:_|$)/.test(flood.errorMessage ?? "")) {
                        this.handleChannelFloodWait(request, flood.seconds ?? 0);
                    }
                }
                throw error;
            }
            finally {
                this.channelRequests.delete(request);
            }
        });
    }
    async readChannelPts(inputChannel) {
        const channelId = inputChannel.channelId.toString();
        const full = await this.invokeChannel(channelId, () => new tl_1.Api.channels.GetFullChannel({ channel: inputChannel }));
        this.client._entityCache.add(full);
        if (!(full.fullChat instanceof tl_1.Api.ChannelFull)) {
            throw new Error("Cannot read the channel pts to start watching it");
        }
        return full.fullChat.pts;
    }
    async ensureState() {
        if (this.initializing)
            return this.initializing;
        const generation = this.generation;
        if (this.state || !this.isCurrent(generation) || this.client.updates.authorizationError)
            return;
        const task = (async () => {
            try {
                const state = await this.client.api.updates.getState();
                if (!this.isCurrent(generation))
                    return;
                this.refreshFromState(state);
                this.lastUpdateTime = Date.now();
                const pending = this.beforeState.splice(0);
                for (const update of pending)
                    this.onUpdates(update);
            }
            catch (error) {
                if (this.isCurrent(generation))
                    this.client.updates._suspendAuthorization(error);
            }
        })();
        this.initializing = task;
        try {
            await task;
        }
        finally {
            if (this.initializing === task)
                this.initializing = undefined;
        }
    }
    refreshFromState(state) {
        if (this.state) {
            this.state.pts = state.pts;
            this.state.qts = state.qts;
            this.state.date = state.date;
            this.state.seq = state.seq;
        }
        else {
            this.state = { pts: state.pts, qts: state.qts, date: state.date, seq: state.seq };
        }
        this.globalPts.init(state.pts);
        this.qts.init(state.qts);
    }
    isStale() {
        return Boolean(this.state) && Date.now() - this.lastUpdateTime > NO_UPDATES_TIMEOUT_MS;
    }
    async recoverIfStale() {
        if (!this.isStale())
            return;
        this.client._log.debug("No updates for 15 minutes, fetching difference");
        await this.fetchCommonDifference();
        this.lastUpdateTime = Date.now();
    }
    handleContainer(update) {
        const payload = { others: update.updates, entities: this.collectEntities(update.users, update.chats) };
        const remaining = [];
        for (const item of update.updates) {
            if (isCommonPtsUpdate(item) || isChannelPtsUpdate(item) || hasQts(item) || item instanceof tl_1.Api.UpdateChannelTooLong) {
                this.feedUpdate(item, payload);
            }
            else {
                remaining.push(item);
            }
        }
        this.applySeq({ update, updates: remaining, payload, seqStart: "seqStart" in update ? update.seqStart : update.seq, seq: update.seq });
        this.drainPendingSeq();
    }
    applySeq(entry) {
        if (!this.state)
            return;
        const { seqStart, seq, update } = entry;
        if (seqStart !== 0 && seqStart <= this.state.seq)
            return;
        if (this.fetchingDifference || (seqStart !== 0 && seqStart > this.state.seq + 1)) {
            if (seqStart === 0 || !this.pendingSeq.some((pending) => pending.seqStart === seqStart && pending.seq === seq)) {
                if (this.pendingSeq.length >= MAX_PENDING_SEQ)
                    this.pendingSeq.shift();
                this.pendingSeq.push(entry);
            }
            if (!this.fetchingDifference)
                this.armSeqGapTimer();
            return;
        }
        for (const item of entry.updates)
            this.feedUpdate(item, entry.payload);
        if (seq !== 0)
            this.state.seq = seq;
        this.state.date = Math.max(this.state.date, update.date);
    }
    armSeqGapTimer() {
        if (this.seqGapTimer)
            return;
        this.seqGapTimer = setTimeout(() => {
            this.seqGapTimer = undefined;
            this.client._log.debug("Seq gap was not filled in time; requesting difference");
            this.scheduleCommonDifference();
        }, ptsWaiter_1.WAIT_FOR_SKIPPED_TIMEOUT_MS);
    }
    handleShortMessage(update) {
        if (!this.state) {
            this.dispatch(update, { others: null });
            return;
        }
        const applied = this.globalPts.updateAndApply(update.pts, update.ptsCount, { tag: "update", update: update }, (u) => {
            if (this.state)
                this.state.pts = this.globalPts.current();
            this.dispatch(u, { others: null });
        }, () => {
        });
        if (applied) {
            this.state.date = Math.max(this.state.date, update.date);
        }
    }
    feedUpdate(update, payload) {
        if (!this.state) {
            this.dispatch(update, payload);
            return;
        }
        if (update instanceof tl_1.Api.UpdateChannelTooLong) {
            void this.recoverChannel(update);
            return;
        }
        if (isCommonPtsUpdate(update)) {
            const u = update;
            this.globalPts.updateAndApply(u.pts, u.ptsCount, { tag: "update", update }, (applied) => {
                if (this.state)
                    this.state.pts = this.globalPts.current();
                this.dispatch(applied, payload);
            }, () => { });
            return;
        }
        if (isChannelPtsUpdate(update)) {
            const u = update;
            const channelId = getChannelId(update);
            if (!channelId || !u.pts || !u.ptsCount) {
                this.dispatch(update, payload);
                return;
            }
            const tracker = this.getOrCreateChannel(channelId);
            if (!tracker.pts.inited()) {
                tracker.pts.init(u.pts);
                this.dispatch(update, payload);
                return;
            }
            tracker.pts.updateAndApply(u.pts, u.ptsCount, { tag: "update", update }, (applied) => this.dispatch(applied, payload), () => { });
            return;
        }
        if (hasQts(update)) {
            this.qts.updateAndApply(update.qts, 1, { tag: "update", update }, (applied) => {
                if (this.state)
                    this.state.qts = this.qts.current();
                this.dispatch(applied, payload);
            }, () => { });
            return;
        }
        this.dispatch(update, payload);
    }
    isCurrent(generation) {
        return this.running && this.generation === generation;
    }
    async recoverChannel(update, fromDifference = false) {
        const channelId = update.channelId.toString();
        const tracker = this.getOrCreateChannel(channelId);
        if (!tracker.pts.inited()) {
            if (!fromDifference) {
                this.scheduleCommonDifference();
                return;
            }
            tracker.pts.init(1);
        }
        else if (update.pts !== undefined && tracker.pts.current() >= update.pts) {
            return;
        }
        await this.fetchChannelDifference(channelId);
    }
    dispatch(update, payload) {
        if (!this.running)
            return;
        if (this.isDuplicateMessage(update)) {
            this.client._log.debug("Skip duplicate message update (already dispatched)");
            return;
        }
        if (update._noDispatch) {
            return;
        }
        update._entities = payload.entities ?? new Map();
        (0, dispatch_1._dispatchUpdate)(this.client, { update }).catch((e) => this.client._log.error(`Error dispatching update: ${e}`));
    }
    isDuplicateMessage(update) {
        if (!(update instanceof tl_1.Api.UpdateNewMessage) &&
            !(update instanceof tl_1.Api.UpdateNewChannelMessage)) {
            return false;
        }
        const message = update.message;
        if (message?.id == undefined || message.peerId == undefined)
            return false;
        let peerId;
        try {
            peerId = utils.getPeerId(message.peerId);
        }
        catch {
            return false;
        }
        const key = `${peerId}:${message.id}`;
        if (this.recentMessageKeys.has(key))
            return true;
        this.recentMessageKeys.add(key);
        this.recentMessageQueue.push(key);
        if (this.recentMessageQueue.length > RECENT_MESSAGE_BUFFER_SIZE) {
            const old = this.recentMessageQueue.shift();
            this.recentMessageKeys.delete(old);
        }
        return false;
    }
    async saveEntities(tlo) {
        try {
            await this.client.session.processEntities(tlo);
        }
        catch (e) {
            this.client._log.warn(`session.processEntities failed: ${e}`);
        }
    }
    collectEntities(users, chats) {
        const entities = new Map();
        for (const x of [...users, ...chats]) {
            try {
                entities.set(utils.getPeerId(x), x);
            }
            catch {
            }
        }
        return entities;
    }
    makeGlobalWaiter(secondary = false) {
        const timer = secondary ? "qtsTimer" : "globalPtsTimer";
        const host = {
            onApplied: (pts) => {
                if (this.state)
                    this.state[secondary ? "qts" : "pts"] = pts;
            },
            onWaitForSkipped: (ms) => {
                if (ms < 0) {
                    if (this[timer]) {
                        clearTimeout(this[timer]);
                        this[timer] = undefined;
                    }
                    return;
                }
                if (this[timer]) {
                    if (ms > 1)
                        return;
                    clearTimeout(this[timer]);
                }
                this[timer] = setTimeout(() => {
                    this[timer] = undefined;
                    this.scheduleCommonDifference();
                }, ms);
            },
            onWaitForShortPoll: () => {
            },
        };
        return new ptsWaiter_1.PtsWaiter(host);
    }
    getOrCreateChannel(channelId) {
        let tracker = this.channels.get(channelId);
        if (tracker)
            return tracker;
        const host = {
            onWaitForSkipped: (ms) => {
                const t = this.channels.get(channelId);
                if (!t)
                    return;
                if (ms < 0) {
                    if (t.timer) {
                        clearTimeout(t.timer);
                        t.timer = undefined;
                    }
                    return;
                }
                if (t.timer) {
                    if (ms > 1)
                        return;
                    clearTimeout(t.timer);
                }
                t.timer = setTimeout(() => {
                    t.timer = undefined;
                    void this.fetchChannelDifference(channelId);
                }, ms);
            },
            onWaitForShortPoll: () => { },
        };
        tracker = { pts: new ptsWaiter_1.PtsWaiter(host) };
        this.channels.set(channelId, tracker);
        return tracker;
    }
    scheduleCommonDifference() {
        if (!this.state) {
            void this.ensureState();
            return;
        }
        if (this.fetchingDifference)
            return;
        if (this.failRetryTimer)
            return;
        void this.fetchCommonDifference();
    }
    async fetchCommonDifference() {
        const generation = this.generation;
        if (!this.isCurrent(generation) || this.client.updates.authorizationError || this.fetchingDifference || this.failRetryTimer || !this.state)
            return;
        this.fetchingDifference = true;
        this.globalPts.setRequesting(true);
        this.qts.setRequesting(true);
        let failed = false;
        try {
            await this.fetchDifferenceLoop(generation);
            if (!this.isCurrent(generation))
                return;
            this.failTimeoutS = FAIL_DIFFERENCE_INITIAL_S;
        }
        catch (e) {
            if (!this.isCurrent(generation))
                return;
            if (this.client.updates._suspendAuthorization(e))
                return;
            const msg = e?.errorMessage;
            if (msg === "PERSISTENT_TIMESTAMP_INVALID") {
                this.client._log.warn("Common pts is invalid; reinitializing update state");
                this.state = undefined;
                void this.ensureState();
            }
            else {
                failed = true;
                this.client._log.warn(`fetchCommonDifference: ${e}`);
            }
        }
        finally {
            if (this.isCurrent(generation)) {
                if (this.state) {
                    this.globalPts.init(this.state.pts, true);
                    this.qts.init(this.state.qts, true);
                }
                this.fetchingDifference = false;
                this.globalPts.setRequesting(false);
                this.qts.setRequesting(false);
            }
        }
        if (failed && this.running) {
            const delayMs = this.failTimeoutS * 1000;
            this.bumpFailTimeout();
            this.client._log.debug(`Retry common difference in ${delayMs}ms`);
            this.failRetryTimer = setTimeout(() => {
                this.failRetryTimer = undefined;
                this.scheduleCommonDifference();
            }, delayMs);
        }
        this.drainPendingSeq();
    }
    async fetchDifferenceLoop(generation) {
        if (!this.state)
            return;
        let fetching = true;
        while (fetching && this.isCurrent(generation)) {
            const diff = await withDeadline(this.client.api.updates.getDifference({
                pts: this.state.pts,
                date: this.state.date,
                qts: this.state.qts,
            }), DIFFERENCE_DEADLINE_MS, "updates.getDifference");
            if (!this.isCurrent(generation))
                return;
            if (diff instanceof tl_1.Api.updates.DifferenceEmpty) {
                this.state.date = diff.date;
                this.state.seq = diff.seq;
                fetching = false;
            }
            else if (diff instanceof tl_1.Api.updates.Difference) {
                await this.processDifference(diff, generation);
                if (!this.isCurrent(generation))
                    return;
                this.state = { pts: diff.state.pts, qts: diff.state.qts, date: diff.state.date, seq: diff.state.seq };
                fetching = false;
            }
            else if (diff instanceof tl_1.Api.updates.DifferenceSlice) {
                await this.processDifference(diff, generation);
                if (!this.isCurrent(generation))
                    return;
                this.state = { pts: diff.intermediateState.pts, qts: diff.intermediateState.qts, date: diff.intermediateState.date, seq: diff.intermediateState.seq };
            }
            else if (diff instanceof tl_1.Api.updates.DifferenceTooLong) {
                if (diff.pts <= this.state.pts)
                    throw new Error("getDifference did not advance PTS");
                this.state.pts = diff.pts;
                this.client._log.warn("getDifference: too long, some updates may be lost");
            }
        }
    }
    async processDifference(diff, generation = this.generation) {
        const entities = this.collectEntities(diff.users, diff.chats);
        this.client._entityCache.add(diff);
        await this.saveEntities(diff);
        if (!this.isCurrent(generation))
            return;
        for (const message of diff.newMessages) {
            if (message instanceof tl_1.Api.Message || message instanceof tl_1.Api.MessageService) {
                this.dispatch(new tl_1.Api.UpdateNewMessage({ message, pts: 0, ptsCount: 0 }), { others: null, entities });
            }
        }
        for (const message of diff.newEncryptedMessages) {
            this.dispatch(new tl_1.Api.UpdateNewEncryptedMessage({ message, qts: 0 }), { others: null, entities });
        }
        for (const update of diff.otherUpdates) {
            if (update instanceof tl_1.Api.UpdateChannelTooLong) {
                await this.recoverChannel(update, true);
                if (!this.isCurrent(generation))
                    return;
            }
            else if (isChannelPtsUpdate(update)) {
                this.feedUpdate(update, { others: diff.otherUpdates, entities });
            }
            else {
                this.dispatch(update, { others: diff.otherUpdates, entities });
            }
        }
    }
    drainPendingSeq() {
        if (!this.state || this.fetchingDifference)
            return;
        this.pendingSeq.sort((a, b) => a.seqStart - b.seqStart);
        while (this.pendingSeq.length) {
            const entry = this.pendingSeq[0];
            if (entry.seqStart !== 0 && entry.seqStart > this.state.seq + 1)
                break;
            this.pendingSeq.shift();
            this.applySeq(entry);
        }
        if (!this.pendingSeq.length && this.seqGapTimer) {
            clearTimeout(this.seqGapTimer);
            this.seqGapTimer = undefined;
        }
        else if (this.pendingSeq.length) {
            this.armSeqGapTimer();
        }
    }
    fetchChannelDifference(channelId, opts = {}) {
        const tracker = this.channels.get(channelId);
        if (!tracker)
            return Promise.resolve();
        if (tracker.difference)
            return tracker.difference;
        const task = this.fetchChannelDifferenceOnce(channelId, opts);
        tracker.difference = task;
        void task.finally(() => {
            if (tracker.difference === task)
                tracker.difference = undefined;
        }).catch(() => { });
        return task;
    }
    async fetchChannelDifferenceOnce(channelId, opts = {}) {
        const generation = this.generation;
        if (!this.isCurrent(generation) || this.client.updates.authorizationError)
            return;
        const tracker = this.channels.get(channelId);
        if (!tracker || tracker.pts.requesting())
            return;
        if (!tracker.pts.inited())
            return;
        if (this.channelFailRetryTimers.has(channelId))
            return;
        const current = () => this.isCurrent(generation) && this.channels.get(channelId) === tracker;
        const active = () => current() && (!opts.keepAlive || this.watchedChannels.has(channelId));
        if (tracker.pollTimer) {
            clearTimeout(tracker.pollTimer);
            tracker.pollTimer = undefined;
        }
        tracker.nextPollAt = undefined;
        let failed = false;
        let serverTimeoutS;
        try {
            const inputChannel = await this.resolveChannel(channelId, tracker);
            if (!active())
                return;
            if (!inputChannel) {
                this.client._log.warn(`Cannot resolve channel ${channelId}; skipping diff`);
                return;
            }
            tracker.inputChannel = inputChannel;
            let fetching = true;
            while (fetching && active()) {
                const diff = await this.invokeChannel(channelId, () => new tl_1.Api.updates.GetChannelDifference({
                    channel: inputChannel,
                    filter: new tl_1.Api.ChannelMessagesFilterEmpty(),
                    pts: tracker.pts.current(),
                    limit: CHANNEL_DIFFERENCE_LIMIT,
                    force: opts.keepAlive ? undefined : true,
                }));
                if (!active())
                    return;
                if (diff.timeout !== undefined)
                    serverTimeoutS = diff.timeout;
                if (diff instanceof tl_1.Api.updates.ChannelDifferenceEmpty) {
                    if (diff.pts)
                        tracker.pts.init(diff.pts, true);
                    fetching = !diff.final;
                }
                else if (diff instanceof tl_1.Api.updates.ChannelDifference) {
                    const entities = this.collectEntities(diff.users, diff.chats);
                    this.client._entityCache.add(diff);
                    await this.saveEntities(diff);
                    if (!active())
                        return;
                    for (const message of diff.newMessages) {
                        if (message instanceof tl_1.Api.Message || message instanceof tl_1.Api.MessageService) {
                            this.dispatch(new tl_1.Api.UpdateNewChannelMessage({ message, pts: 0, ptsCount: 0 }), { others: null, entities });
                        }
                    }
                    for (const update of diff.otherUpdates) {
                        this.dispatch(update, { others: diff.otherUpdates, entities });
                    }
                    tracker.pts.init(diff.pts, true);
                    fetching = !diff.final;
                }
                else if (diff instanceof tl_1.Api.updates.ChannelDifferenceTooLong) {
                    this.client._log.warn(`Channel ${channelId} difference too long`);
                    if (diff.dialog instanceof tl_1.Api.Dialog && diff.dialog.pts !== undefined) {
                        tracker.pts.init(diff.dialog.pts, true);
                    }
                    const entities = this.collectEntities(diff.users, diff.chats);
                    this.client._entityCache.add(diff);
                    await this.saveEntities(diff);
                    if (!active())
                        return;
                    const included = diff.messages.filter((m) => m instanceof tl_1.Api.Message || m instanceof tl_1.Api.MessageService);
                    included.sort((a, b) => a.id - b.id);
                    for (const message of included) {
                        this.dispatch(new tl_1.Api.UpdateNewChannelMessage({ message, pts: 0, ptsCount: 0 }), { others: null, entities });
                    }
                    fetching = !diff.final;
                }
            }
            this.channelFailTimeoutS.delete(channelId);
        }
        catch (e) {
            if (!active() || e instanceof channelScheduler_1.ChannelPollCancelledError)
                return;
            if (this.client.updates._suspendAuthorization(e))
                return;
            const msg = e?.errorMessage;
            if (msg === "CHANNEL_PRIVATE" || msg === "CHANNEL_INVALID") {
                this.client._log.info(`Channel ${channelId} is inaccessible (${msg}); dropping difference tracking`);
                this.dropChannel(channelId);
                return;
            }
            if (msg === "PERSISTENT_TIMESTAMP_INVALID") {
                this.client._log.warn(`Channel ${channelId} pts is invalid; resetting tracker`);
                this.dropChannel(channelId);
                return;
            }
            failed = true;
            this.client._log.warn(`fetchChannelDifference ${channelId}: ${e}`);
        }
        finally {
            if (current())
                tracker.pts.setRequesting(false);
        }
        if (!active())
            return;
        if (!failed)
            this.scheduleChannelPoll(channelId, serverTimeoutS);
        if (failed && this.running && (!opts.keepAlive || this.watchedChannels.has(channelId))) {
            const delayMs = Math.max((this.channelFailTimeoutS.get(channelId) ?? FAIL_DIFFERENCE_INITIAL_S) * 1000, (this.channelScheduler.state.pausedUntil ?? 0) - Date.now());
            tracker.nextPollAt = Date.now() + delayMs;
            this.bumpChannelFailTimeout(channelId);
            this.client._log.debug(`Retry channel ${channelId} difference in ${delayMs}ms`);
            const timer = setTimeout(() => {
                this.channelFailRetryTimers.delete(channelId);
                void this.fetchChannelDifference(channelId, opts);
            }, delayMs);
            this.channelFailRetryTimers.set(channelId, timer);
        }
    }
    async resolveChannel(channelId, tracker) {
        if (tracker.inputChannel)
            return tracker.inputChannel;
        try {
            const peer = new tl_1.Api.PeerChannel({ channelId: (0, Helpers_1.returnBigInt)(channelId) });
            const input = await this.client.getInputEntity(peer);
            if (input instanceof tl_1.Api.InputPeerChannel) {
                return new tl_1.Api.InputChannel({ channelId: input.channelId, accessHash: input.accessHash });
            }
        }
        catch {
        }
        return undefined;
    }
    scheduleChannelPoll(channelId, serverTimeoutS) {
        if (!this.running || !this.watchedChannels.has(channelId))
            return;
        const tracker = this.channels.get(channelId);
        if (!tracker)
            return;
        if (tracker.pollTimer)
            clearTimeout(tracker.pollTimer);
        const delayMs = serverTimeoutS !== undefined && serverTimeoutS > 0
            ? serverTimeoutS * 1000
            : this.client._channelPollInterval;
        tracker.nextPollAt = Date.now() + delayMs;
        tracker.pollTimer = setTimeout(() => {
            tracker.pollTimer = undefined;
            void this.fetchChannelDifference(channelId, { keepAlive: true });
        }, delayMs);
    }
    bumpFailTimeout() {
        if (this.failTimeoutS < FAIL_DIFFERENCE_CAP_S) {
            this.failTimeoutS = Math.min(this.failTimeoutS * 2, FAIL_DIFFERENCE_CAP_S);
        }
    }
    dropChannel(channelId) {
        this.watchedChannels.delete(channelId);
        this.channelScheduler.cancel(channelId);
        const tracker = this.channels.get(channelId);
        if (tracker) {
            if (tracker.timer)
                clearTimeout(tracker.timer);
            if (tracker.pollTimer)
                clearTimeout(tracker.pollTimer);
            tracker.pts.clearSkippedUpdates();
            this.channels.delete(channelId);
        }
        const retry = this.channelFailRetryTimers.get(channelId);
        if (retry) {
            clearTimeout(retry);
            this.channelFailRetryTimers.delete(channelId);
        }
        this.channelFailTimeoutS.delete(channelId);
    }
    bumpChannelFailTimeout(channelId) {
        const cur = this.channelFailTimeoutS.get(channelId) ?? FAIL_DIFFERENCE_INITIAL_S;
        if (cur < FAIL_DIFFERENCE_CAP_S) {
            this.channelFailTimeoutS.set(channelId, Math.min(cur * 2, FAIL_DIFFERENCE_CAP_S));
        }
    }
}
exports.UpdateManager = UpdateManager;
function withDeadline(promise, ms, what) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            promise.catch(() => { });
            reject(new Error(`${what} timed out after ${ms}ms`));
        }, ms);
        promise.then((value) => {
            clearTimeout(timer);
            resolve(value);
        }, (error) => {
            clearTimeout(timer);
            reject(error);
        });
    });
}
