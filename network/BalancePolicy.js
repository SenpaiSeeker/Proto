"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalancePolicy = exports.UPLOAD_BALANCE = exports.DOWNLOAD_BALANCE = void 0;
exports.normalizeBalanceOptions = normalizeBalanceOptions;
exports.DOWNLOAD_BALANCE = {
    partSize: 512 * 1024,
    sessions: 8,
    inFlight: 8,
};
exports.UPLOAD_BALANCE = {
    partSize: 512 * 1024,
    sessions: 8,
    inFlight: 8,
};
function normalizeBalanceOptions(opts, base) {
    const partSize = opts.partSize && opts.partSize > 0 ? opts.partSize : base.partSize;
    const sessions = Math.max(1, opts.sessions ?? opts.startSessions ?? base.sessions);
    const inFlight = Math.max(1, opts.inFlight ??
        (opts.startWindow && opts.startWindow > 0
            ? Math.round(opts.startWindow / partSize)
            : base.inFlight));
    return { ...base, ...opts, partSize, sessions, inFlight };
}
class BalancePolicy {
    constructor(opts, _now = Date.now) {
        this._sessions = [];
        this._nextId = 0;
        this.opts = normalizeBalanceOptions(opts, opts);
        this._window = this.opts.inFlight * this.opts.partSize;
        for (let i = 0; i < this.opts.sessions; i++) {
            this._sessions.push(this._fresh());
        }
    }
    _fresh() {
        return { id: this._nextId++, requested: 0 };
    }
    _byId(id) {
        return this._sessions.find((s) => s.id === id);
    }
    get sessionCount() {
        return this._sessions.length;
    }
    get sessionIds() {
        return this._sessions.map((s) => s.id);
    }
    get window() {
        return this._window;
    }
    pick(bytes) {
        let best = -1;
        let bestLoad = Infinity;
        for (const s of this._sessions) {
            const fits = s.requested === 0 || s.requested + bytes <= this._window;
            if (fits && s.requested < bestLoad) {
                best = s.id;
                bestLoad = s.requested;
            }
        }
        return best;
    }
    start(id, bytes) {
        const s = this._byId(id);
        if (!s)
            return { wasFull: false };
        s.requested += bytes;
        return { wasFull: s.requested >= this._window };
    }
    succeed(id, bytes, _wasFull = false, _durationMs = 0) {
        this.release(id, bytes);
        return { addedSession: false, addedId: -1 };
    }
    fail(id, bytes) {
        this.release(id, bytes);
        return { removedId: -1 };
    }
    replace(id) {
        const s = this._byId(id);
        if (!s)
            return -1;
        const fresh = this._fresh();
        this._sessions.splice(this._sessions.indexOf(s), 1, fresh);
        return fresh.id;
    }
    remove(id) {
        return this.replace(id) >= 0;
    }
    release(id, bytes) {
        const s = this._byId(id);
        if (s)
            s.requested = Math.max(0, s.requested - bytes);
    }
    get totalRequested() {
        return this._sessions.reduce((a, s) => a + s.requested, 0);
    }
}
exports.BalancePolicy = BalancePolicy;
