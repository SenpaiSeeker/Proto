Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/network/dc/SessionSlot.ts
var SlotRemovedError = class extends Error {
	constructor(reason) {
		super(`sender slot removed: ${reason}`);
		this.reason = reason;
		this.name = "SlotRemovedError";
	}
};
var SessionSlot = class {
	constructor(opts) {
		this.opts = opts;
		this.deathListeners = /* @__PURE__ */ new Set();
		this.active = 0;
		this.dcId = opts.dcId;
	}
	get state() {
		if (this.dead) return "dead";
		if (this.session?.isConnected()) return "ready";
		if (this.connecting || this.session?.isReconnecting) return "connecting";
		return "idle";
	}
	get load() {
		return this.active;
	}
	get sender() {
		return this.session;
	}
	ensureConnected() {
		if (this.dead) return Promise.reject(new SlotRemovedError(this.dead));
		if (this.session && !this.session.userDisconnected) return Promise.resolve(this.session);
		this.connecting ??= this.open().finally(() => {
			this.connecting = void 0;
		});
		return this.connecting;
	}
	async open() {
		this.clearIdle();
		let session;
		try {
			session = await this.opts.connect(this);
		} catch (error) {
			if (this.dead && !(error instanceof SlotRemovedError)) throw new SlotRemovedError(this.dead);
			throw error;
		}
		if (this.dead) {
			await session.disconnect().catch(() => {});
			throw new SlotRemovedError(this.dead);
		}
		this.session = session;
		if (this.active === 0) this.armIdle();
		return session;
	}
	enter() {
		this.active++;
		this.clearIdle();
	}
	leave() {
		if (this.active > 0) this.active--;
		if (this.active === 0 && this.session) this.armIdle();
	}
	onDeath(listener) {
		if (this.dead) {
			listener(this.dead);
			return () => {};
		}
		this.deathListeners.add(listener);
		return () => this.deathListeners.delete(listener);
	}
	async markDead(reason) {
		if (this.dead) return;
		this.dead = reason;
		this.clearIdle();
		for (const listener of this.deathListeners) try {
			listener(reason);
		} catch {}
		this.deathListeners.clear();
		const session = this.session;
		this.session = void 0;
		await session?.disconnect().catch(() => {});
	}
	clearIdle() {
		clearTimeout(this.idleTimer);
		this.idleTimer = void 0;
	}
	armIdle() {
		this.clearIdle();
		if (this.dead || this.opts.idleTimeoutMs <= 0) return;
		this.idleTimer = setTimeout(() => this.idle(), this.opts.idleTimeoutMs);
		this.idleTimer.unref?.();
	}
	idle() {
		this.idleTimer = void 0;
		const session = this.session;
		if (this.dead || this.active > 0 || !session) return;
		if (session.hasPendingWork || session.isReconnecting) return this.armIdle();
		this.session = void 0;
		session.disconnect().catch(() => {});
	}
};
exports.SessionSlot = SessionSlot;
exports.SlotRemovedError = SlotRemovedError;
