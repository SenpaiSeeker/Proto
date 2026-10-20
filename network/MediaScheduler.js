"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaScheduler = exports.MediaAbortError = exports.CdnRedirectError = exports.DEFAULT_MEDIA_SCHEDULER_OPTIONS = void 0;
const tl_1 = require("../tl");
const BalancePolicy_1 = require("./BalancePolicy");
const core_types_1 = require("./core_types");
const SenderSlot_1 = require("./SenderSlot");
const errors_1 = require("../errors");
const ONE_MB = 1024 * 1024;
const MIN_CHUNK = 4096;
const LIMITED_UPLOAD_DCS = new Set([2, 4]);
const LIMITED_UPLOAD_SESSIONS = 4;
const PACE_REQUESTS_PER_SEC = 4096;
const PACE_MIN_WAIT_MS = 1;
const PACE_IDLE_RESET_MS = 1000;
const SERVER_RETRY_CAP_MS = 16_000;
exports.DEFAULT_MEDIA_SCHEDULER_OPTIONS = {
    partSize: 512 * 1024,
    requestRetries: 5,
    requestDeadlineMs: 15_000,
    cdnSupported: false,
    download: BalancePolicy_1.DOWNLOAD_BALANCE,
    upload: BalancePolicy_1.UPLOAD_BALANCE,
};
class CdnRedirectError extends Error {
    constructor(redirect) {
        super("upload.fileCdnRedirect");
        this.redirect = redirect;
        this.name = "CdnRedirectError";
    }
}
exports.CdnRedirectError = CdnRedirectError;
class MediaAbortError extends Error {
    constructor() {
        super("Media operation aborted");
        this.name = "MediaAbortError";
    }
}
exports.MediaAbortError = MediaAbortError;
class DcBalance {
    constructor(dcId, kind, opts) {
        this.dcId = dcId;
        this.kind = kind;
        this.shiftedById = new Map();
        this.waiters = [];
        this.completed = 0;
        this._nextSendAt = 0;
        this._pauseUntil = 0;
        if (kind === "upload" && LIMITED_UPLOAD_DCS.has(dcId)) {
            opts = {
                ...opts,
                sessions: Math.min(opts.sessions, LIMITED_UPLOAD_SESSIONS),
                inFlight: Math.max(opts.inFlight, Math.ceil((opts.sessions * opts.inFlight) /
                    Math.min(opts.sessions, LIMITED_UPLOAD_SESSIONS))),
            };
        }
        this.policy = new BalancePolicy_1.BalancePolicy(opts);
        this.policy.sessionIds.forEach((id, i) => {
            this.shiftedById.set(id, kind === "download" ? (0, core_types_1.downloadDcId)(dcId, i) : (0, core_types_1.uploadDcId)(dcId, i));
        });
    }
    async pace(signal) {
        const now = Date.now();
        if (now - this._nextSendAt > PACE_IDLE_RESET_MS) {
            this._nextSendAt = now;
        }
        const at = Math.max(now, this._nextSendAt, this._pauseUntil);
        this._nextSendAt = at + 1000 / PACE_REQUESTS_PER_SEC;
        const wait = at - now;
        if (wait >= PACE_MIN_WAIT_MS)
            await sleepOrAbort(wait, signal);
    }
    pauseFor(ms) {
        const until = Date.now() + Math.max(0, ms);
        if (until > this._pauseUntil)
            this._pauseUntil = until;
        if (until > this._nextSendAt)
            this._nextSendAt = until;
    }
    async waitPause(signal) {
        const wait = this._pauseUntil - Date.now();
        if (wait > 0)
            await sleepOrAbort(wait, signal);
    }
    wakeOne() {
        const w = this.waiters.shift();
        if (w)
            w();
    }
    wakeAll() {
        for (const w of this.waiters.splice(0))
            w();
    }
}
class MediaScheduler {
    constructor(client, network, opts) {
        this._balances = new Map();
        this._closed = false;
        this._client = client;
        this._network = network;
        const merged = {
            ...exports.DEFAULT_MEDIA_SCHEDULER_OPTIONS,
            ...(opts || {}),
            download: { ...exports.DEFAULT_MEDIA_SCHEDULER_OPTIONS.download },
            upload: { ...exports.DEFAULT_MEDIA_SCHEDULER_OPTIONS.upload },
        };
        if (opts && typeof opts === "object") {
            if (opts.inflightPerDc && opts.inflightPerDc > 0) {
                merged.download.inFlight = opts.inflightPerDc;
                merged.upload.inFlight = opts.inflightPerDc;
            }
            if (opts.sessions && opts.sessions > 0) {
                merged.download.sessions = opts.sessions;
                merged.upload.sessions = opts.sessions;
            }
            if (opts.download) {
                merged.download = (0, BalancePolicy_1.normalizeBalanceOptions)(opts.download, merged.download);
            }
            if (opts.upload) {
                merged.upload = (0, BalancePolicy_1.normalizeBalanceOptions)(opts.upload, merged.upload);
            }
        }
        if (merged.partSize > ONE_MB)
            merged.partSize = ONE_MB;
        if (merged.partSize % MIN_CHUNK !== 0) {
            throw new Error("partSize must be a multiple of 4096");
        }
        merged.download.partSize = merged.partSize;
        merged.download = (0, BalancePolicy_1.normalizeBalanceOptions)(merged.download, merged.download);
        merged.upload = (0, BalancePolicy_1.normalizeBalanceOptions)(merged.upload, merged.upload);
        this.opts = merged;
    }
    _balance(dcId, kind) {
        const key = `${dcId}:${kind}`;
        let b = this._balances.get(key);
        if (!b) {
            b = new DcBalance(dcId, kind, kind === "download" ? this.opts.download : this.opts.upload);
            this._balances.set(key, b);
        }
        return b;
    }
    async getFile(dcId, location, offset, limit, signal, onMigrate) {
        const request = new tl_1.Api.upload.GetFile({
            location,
            offset,
            limit,
            precise: false,
            cdnSupported: this.opts.cdnSupported,
        });
        let currentDc = dcId;
        let migrations = 0;
        const retry = this._retryState("download", currentDc);
        while (true) {
            if (signal?.aborted)
                throw new MediaAbortError();
            try {
                const result = await this._run(currentDc, "download", limit, request, signal, retry.retried || migrations > 0);
                if (result instanceof tl_1.Api.upload.FileCdnRedirect) {
                    throw new CdnRedirectError(result);
                }
                return result.bytes;
            }
            catch (err) {
                if (err instanceof CdnRedirectError)
                    throw err;
                if (err instanceof errors_1.FileMigrateError) {
                    if (++migrations >= this.opts.requestRetries)
                        throw err;
                    currentDc = err.newDc;
                    onMigrate?.(currentDc);
                    retry.moveTo(currentDc);
                    continue;
                }
                await sleepOrAbort(retry.check(err), signal);
            }
        }
    }
    async savePart(dcId, request, signal) {
        const size = request.bytes.length;
        const retry = this._retryState("upload", dcId);
        while (true) {
            if (signal?.aborted)
                throw new MediaAbortError();
            try {
                return await this._run(dcId, "upload", size, request, signal, retry.retried);
            }
            catch (err) {
                await sleepOrAbort(retry.check(err), signal);
            }
        }
    }
    _retryState(kind, dcId) {
        let balance = this._balance(dcId, kind);
        let seen = balance.completed;
        let failures = 0;
        let floods = 0;
        const limit = this.opts.requestRetries;
        return {
            get retried() {
                return failures > 0 || floods > 0;
            },
            moveTo: (newDc) => {
                balance = this._balance(newDc, kind);
                seen = balance.completed;
                failures = 0;
            },
            check(err) {
                if (err instanceof MediaAbortError)
                    throw err;
                if (isFlood(err)) {
                    floods++;
                    return Math.max(1, floodSeconds(err)) * 1000;
                }
                const lost = isTransportFailure(err);
                if (!lost && !isServerFailure(err))
                    throw err;
                if (balance.completed !== seen) {
                    seen = balance.completed;
                    failures = 0;
                }
                if (++failures >= limit)
                    throw err;
                return lost
                    ? 0
                    : Math.min(SERVER_RETRY_CAP_MS, 1000 * 2 ** (failures - 1));
            },
        };
    }
    async _run(dcId, kind, bytes, request, signal, priority = false) {
        if (this._closed)
            throw new Error("MediaScheduler is closed");
        const b = this._balance(dcId, kind);
        if (kind === "download")
            await b.pace(signal);
        else
            await b.waitPause(signal);
        let id = b.policy.pick(bytes);
        while (id < 0) {
            if (signal?.aborted)
                throw new MediaAbortError();
            await new Promise((resolve, reject) => {
                let off;
                const ticket = () => {
                    off?.();
                    resolve();
                };
                if (signal) {
                    if (signal.aborted)
                        return reject(new MediaAbortError());
                    off = onAbort(signal, (err) => {
                        const i = b.waiters.indexOf(ticket);
                        if (i >= 0)
                            b.waiters.splice(i, 1);
                        reject(err);
                    });
                }
                if (priority)
                    b.waiters.unshift(ticket);
                else
                    b.waiters.push(ticket);
            });
            id = b.policy.pick(bytes);
        }
        const { wasFull } = b.policy.start(id, bytes);
        const shiftedId = b.shiftedById.get(id);
        const started = Date.now();
        const slot = this._network.getSession(shiftedId);
        slot.enter();
        try {
            const sender = await slot.ensureConnected().catch((err) => {
                if (err instanceof SenderSlot_1.SlotRemovedError || err instanceof errors_1.ProxyRejectedError)
                    throw err;
                this._client._log.info(`${kind} session ${shiftedId} on dc ${dcId} could not connect: ${err?.message ?? err}`);
                slot.markDead("disconnected").catch(() => { });
                throw new SenderSlot_1.SlotRemovedError("disconnected");
            });
            const result = await awaitReply(sender.send(request), slot, signal);
            b.policy.succeed(id, bytes, wasFull, Date.now() - started);
            b.completed++;
            return result;
        }
        catch (err) {
            if (isFlood(err)) {
                const seconds = Math.max(1, floodSeconds(err));
                b.pauseFor(seconds * 1000);
                this._client._log.debug(`${kind} on dc ${dcId} hit ${err?.errorMessage ?? "FLOOD_WAIT"}, pausing ${seconds}s`);
            }
            b.policy.release(id, bytes);
            throw err;
        }
        finally {
            slot.leave();
            b.wakeOne();
        }
    }
    async purge() {
        this._balances.clear();
    }
    async close() {
        this._closed = true;
        for (const b of this._balances.values())
            b.wakeAll();
        this._balances.clear();
    }
}
exports.MediaScheduler = MediaScheduler;
const abortHooks = new WeakMap();
function onAbort(signal, hook) {
    let hooks = abortHooks.get(signal);
    if (!hooks) {
        const own = new Set();
        hooks = own;
        abortHooks.set(signal, own);
        signal.addEventListener("abort", () => {
            const pending = [...own];
            own.clear();
            for (const fn of pending)
                fn(new MediaAbortError());
        }, { once: true });
    }
    const own = hooks;
    own.add(hook);
    return () => own.delete(hook);
}
function isFlood(err) {
    return (err instanceof errors_1.FloodWaitError ||
        err instanceof errors_1.FloodTestPhoneWaitError ||
        err?.errorMessage?.startsWith?.("FLOOD_WAIT_") ||
        err?.errorMessage?.startsWith?.("FLOOD_PREMIUM_WAIT_"));
}
function isTransportFailure(err) {
    return (err instanceof SenderSlot_1.SlotRemovedError ||
        err?.errorMessage === "AUTH_KEY_UNREGISTERED");
}
function isServerFailure(err) {
    return (err instanceof errors_1.ServerError ||
        err instanceof errors_1.TimedOutError ||
        err?.errorMessage === "TIMEOUT" ||
        (typeof err?.code === "number" && (err.code >= 500 || err.code < 0)));
}
function floodSeconds(err) {
    if (typeof err?.seconds === "number")
        return err.seconds;
    const tail = err?.errorMessage?.split?.("_")?.pop?.();
    const n = Number(tail);
    return Number.isFinite(n) && n > 0 ? n : 1;
}
async function awaitReply(req, slot, signal) {
    let unsub;
    let off;
    const death = new Promise((_, reject) => {
        unsub = slot.onDeath((reason) => reject(new SenderSlot_1.SlotRemovedError(reason)));
    });
    const races = [death, req];
    if (signal) {
        races.push(new Promise((_, reject) => {
            if (signal.aborted)
                return reject(new MediaAbortError());
            off = onAbort(signal, reject);
        }));
    }
    try {
        return await Promise.race(races);
    }
    finally {
        unsub?.();
        off?.();
    }
}
async function sleepOrAbort(ms, signal) {
    if (ms <= 0)
        return;
    await new Promise((resolve, reject) => {
        let off;
        const t = setTimeout(() => {
            off?.();
            resolve();
        }, ms);
        if (signal) {
            if (signal.aborted) {
                clearTimeout(t);
                reject(new MediaAbortError());
                return;
            }
            off = onAbort(signal, (err) => {
                clearTimeout(t);
                reject(err);
            });
        }
    });
}
