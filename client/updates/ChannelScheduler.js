Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/client/updates/ChannelScheduler.ts
const MAX_GAP_FACTOR = 8;
const GAP_RECOVERY = .9;
var ChannelPollCancelledError = class extends Error {
	constructor() {
		super("Channel polling cancelled");
		this.name = "AbortError";
	}
};
var ChannelScheduler = class {
	constructor(interval, concurrency) {
		this.interval = interval;
		this.concurrency = concurrency;
		this.queue = [];
		this.active = /* @__PURE__ */ new Set();
		this.running = false;
		this.nextStartAt = 0;
		this.pausedUntil = 0;
		this.gap = interval;
	}
	start() {
		this.running = true;
		this.pump();
	}
	stop() {
		this.running = false;
		if (this.timer) clearTimeout(this.timer);
		this.timer = void 0;
		for (const job of [...this.queue, ...this.active]) job.reject(new ChannelPollCancelledError());
		this.queue.length = 0;
		this.active.clear();
	}
	cancel(channelId) {
		for (let index = this.queue.length - 1; index >= 0; index--) {
			const job = this.queue[index];
			if (job.channelId !== channelId) continue;
			this.queue.splice(index, 1);
			job.reject(new ChannelPollCancelledError());
		}
		this.pump();
	}
	pause(milliseconds) {
		this.pausedUntil = Math.max(this.pausedUntil, Date.now() + milliseconds);
		this.gap = Math.min(this.gap * 2, Math.max(this.interval, 1) * MAX_GAP_FACTOR);
		this.pump();
	}
	get state() {
		return {
			pendingRequests: this.queue.length,
			activeRequests: this.active.size,
			pausedUntil: this.pausedUntil > Date.now() ? this.pausedUntil : void 0,
			requestInterval: this.gap
		};
	}
	schedule(channelId, run) {
		if (!this.running) return Promise.reject(new ChannelPollCancelledError());
		return new Promise((resolve, reject) => {
			this.queue.push({
				channelId,
				run,
				resolve,
				reject
			});
			this.pump();
		});
	}
	pump() {
		if (this.timer) clearTimeout(this.timer);
		this.timer = void 0;
		if (!this.running || !this.queue.length || this.active.size >= this.concurrency) return;
		const index = this.queue.findIndex((job) => ![...this.active].some((active) => active.channelId === job.channelId));
		if (index < 0) return;
		const delay = Math.max(this.nextStartAt, this.pausedUntil) - Date.now();
		if (delay > 0) {
			this.timer = setTimeout(() => {
				this.timer = void 0;
				this.pump();
			}, Math.min(delay, 2147483647));
			return;
		}
		const [job] = this.queue.splice(index, 1);
		this.active.add(job);
		this.nextStartAt = Date.now() + this.gap;
		Promise.resolve().then(() => {
			if (!this.running || !this.active.has(job)) throw new ChannelPollCancelledError();
			return job.run();
		}).then((value) => {
			this.gap = Math.max(this.interval, this.gap * GAP_RECOVERY);
			job.resolve(value);
		}, job.reject).finally(() => {
			this.active.delete(job);
			this.pump();
		});
		this.pump();
	}
};
exports.ChannelPollCancelledError = ChannelPollCancelledError;
exports.ChannelScheduler = ChannelScheduler;
