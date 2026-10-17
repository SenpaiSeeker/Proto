"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PtsWaiter = exports.WAIT_FOR_SKIPPED_TIMEOUT_MS = void 0;
exports.WAIT_FOR_SKIPPED_TIMEOUT_MS = 500;
class PtsWaiter {
    constructor(host) {
        this.host = host;
        this.good = 0;
        this.initialized = false;
        this.requestingFlag = false;
        this.waitingForSkipped = false;
        this.waitingForShortPoll = false;
        this.skippedKey = 0;
        this.queue = [];
    }
    inited() { return this.initialized; }
    current() { return this.good; }
    init(pts, preservePending = false) {
        this.good = pts;
        this.initialized = true;
        if (!preservePending)
            this.clearSkippedUpdates();
    }
    requesting() { return this.requestingFlag; }
    setRequesting(value) {
        this.requestingFlag = value;
        if (value)
            this.setWaitingForSkipped(-1);
        else
            this.applySkippedUpdates();
    }
    isWaitingForSkipped() { return this.waitingForSkipped; }
    isWaitingForShortPoll() { return this.waitingForShortPoll; }
    setWaitingForSkipped(ms) {
        this.waitingForSkipped = ms >= 0;
        if (ms >= 0 || !this.waitingForShortPoll)
            this.host.onWaitForSkipped(ms);
    }
    setWaitingForShortPoll(ms) {
        this.waitingForShortPoll = ms >= 0;
        if (ms >= 0)
            this.host.onWaitForShortPoll(ms);
        else if (!this.waitingForSkipped)
            this.host.onWaitForSkipped(-1);
    }
    updated(pts, count, payload) {
        if (!Number.isSafeInteger(pts) || !Number.isSafeInteger(count) || pts < 0 || count < 0) {
            this.setWaitingForSkipped(1);
            return false;
        }
        if (!this.initialized)
            this.init(Math.max(0, pts - count));
        if (pts < this.good || (count > 0 && pts === this.good))
            return false;
        if (!this.requestingFlag && this.good + count === pts) {
            this.good = pts;
            return true;
        }
        if (count > 0 && this.queue.some((entry) => entry.pts === pts && entry.count === count))
            return false;
        this.queue.push({ pts, count, tieBreaker: ++this.skippedKey, ...payload });
        this.queue.sort((a, b) => a.pts - b.pts || b.count - a.count || a.tieBreaker - b.tieBreaker);
        if (!this.requestingFlag)
            this.setWaitingForSkipped(this.good + count > pts ? 1 : exports.WAIT_FOR_SKIPPED_TIMEOUT_MS);
        return false;
    }
    updateAndApply(pts, count, payload, applyUpdate, applyUpdates) {
        const entry = { ...payload, applyUpdate, applyUpdates };
        if (!this.updated(pts, count, entry))
            return false;
        this.apply(entry);
        this.applySkippedUpdates(applyUpdate, applyUpdates);
        return true;
    }
    applySkippedUpdates(applyUpdate, applyUpdates) {
        if (this.requestingFlag)
            return;
        while (this.queue.length) {
            const entry = this.queue[0];
            if (entry.pts < this.good || (entry.count > 0 && entry.pts === this.good)) {
                this.queue.shift();
                continue;
            }
            if (this.good + entry.count !== entry.pts)
                break;
            this.queue.shift();
            this.good = entry.pts;
            this.apply({ ...entry, applyUpdate: entry.applyUpdate ?? applyUpdate, applyUpdates: entry.applyUpdates ?? applyUpdates });
        }
        this.setWaitingForSkipped(this.queue.length ? exports.WAIT_FOR_SKIPPED_TIMEOUT_MS : -1);
    }
    clearSkippedUpdates() {
        this.queue.length = 0;
        this.setWaitingForSkipped(-1);
    }
    apply(entry) {
        this.host.onApplied?.(this.good);
        if (entry.tag === "update" && entry.update)
            entry.applyUpdate?.(entry.update);
        else if (entry.tag === "updates" && entry.updates)
            entry.applyUpdates?.(entry.updates);
    }
}
exports.PtsWaiter = PtsWaiter;
