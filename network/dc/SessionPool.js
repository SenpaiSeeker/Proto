Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_timers_index = require("../../platform/timers/index.js");
require("../../platform/index.js");
const require_crypto_AuthKey = require("../../crypto/AuthKey.js");
const require_network_mtproto_tempKeyBinding = require("../mtproto/tempKeyBinding.js");
const require_network_dc_SessionSlot = require("./SessionSlot.js");
const require_network_dc_dcId = require("./dcId.js");
// teleproto/network/dc/SessionPool.ts
var SessionPool = class {
	constructor(client, opts) {
		this.client = client;
		this.opts = opts;
		this.slots = /* @__PURE__ */ new Map();
		this.keyCreation = /* @__PURE__ */ new Map();
		this.lastStartAt = /* @__PURE__ */ new Map();
		this.closed = false;
	}
	dcenter(dcId) {
		return this.client._dcenters.get(dcId, this.client.session.getAuthKey(dcId));
	}
	getSession(shiftedDcId) {
		if (this.closed) throw new Error("Network is closed");
		let slot = this.slots.get(shiftedDcId);
		if (!slot || slot.state === "dead") {
			slot = this.createSlot(shiftedDcId);
			this.slots.set(shiftedDcId, slot);
		}
		return slot;
	}
	async lease(dcId) {
		const slot = this.getSession(dcId);
		const sender = await slot.ensureConnected();
		slot.enter();
		let released = false;
		return {
			sender,
			release: () => {
				if (released) return;
				released = true;
				slot.leave();
			}
		};
	}
	removeSession(shiftedDcId) {
		const slot = this.slots.get(shiftedDcId);
		if (!slot) return;
		this.slots.delete(shiftedDcId);
		slot.markDead("manual").catch(() => {});
	}
	async purge() {
		await this.retire("manual");
	}
	async close() {
		this.closed = true;
		await this.retire("pool-closed");
	}
	async retire(reason) {
		const slots = [...this.slots.values()];
		this.slots.clear();
		await Promise.all(slots.map((slot) => slot.markDead(reason).catch(() => {})));
	}
	createSlot(shiftedDcId) {
		const dcId = require_network_dc_dcId.bareDcId(shiftedDcId);
		const dc = this.dcenter(dcId);
		const slot = new require_network_dc_SessionSlot.SessionSlot({
			dcId,
			idleTimeoutMs: this.opts.idleTimeoutMs,
			connect: () => {
				if (this.hasKey(dc)) return this.start(shiftedDcId, slot, dc);
				const ours = (this.keyCreation.get(dcId) ?? Promise.resolve()).then(() => this.start(shiftedDcId, slot, dc));
				this.keyCreation.set(dcId, ours.catch(() => {}));
				return ours;
			}
		});
		return slot;
	}
	hasKey(dc) {
		return !!dc.authKey.getKey() || !!this.client.session.getAuthKey(dc.dcId)?.getKey();
	}
	async start(shiftedDcId, slot, dc) {
		const gap = this.opts.sessionStartupDelayMs;
		const last = this.lastStartAt.get(shiftedDcId) ?? 0;
		const wait = gap - (Date.now() - last);
		if (gap > 0 && last > 0 && wait > 0) await require_platform_timers_index.sleep(wait);
		try {
			const dcId = dc.dcId;
			const sessionKey = this.client.session.getAuthKey(dcId)?.getKey();
			const ownKey = dc.authKey.getKey();
			const isHome = dcId === this.client.session.dcId;
			if (sessionKey && (!ownKey || isHome && !sessionKey.equals(ownKey))) await dc.authKey.setKey(sessionKey);
			const media = require_network_dc_dcId.isMediaDcId(shiftedDcId) && !this.client._addresses.isCdn(dcId);
			const mediaCluster = require_network_dc_dcId.isDownloadDcId(shiftedDcId) || require_network_dc_dcId.isDownloadSmallDcId(shiftedDcId);
			const pfs = media && this.client._usePfs() && !dc.pfsFailed && !!dc.authKey.getKey();
			const log = this.client._log;
			const session = this.client._makeSender(dcId, (_dc, reason) => this.onBreak(shiftedDcId, slot, dc, reason), pfs ? new require_crypto_AuthKey.AuthKey() : dc.authKey, true, pfs ? {
				permAuthKey: dc.authKey,
				dcParam: -(dcId + (this.client._testServers ? 1e4 : 0)),
				expiresIn: require_network_mtproto_tempKeyBinding.tempKeyLifetime(),
				onFailed: (error) => {
					dc.pfsFailed = true;
					log.info(`Temporary key binding failed for dc ${dcId}, media sessions use the permanent key (${error instanceof Error ? error.message : error})`);
				}
			} : void 0, media);
			return await this.client._connectSender(session, dcId, void 0, mediaCluster);
		} finally {
			this.lastStartAt.set(shiftedDcId, Date.now());
		}
	}
	onBreak(shiftedDcId, slot, dc, reason = "disconnected") {
		if (this.slots.get(shiftedDcId) === slot) this.slots.delete(shiftedDcId);
		if (reason !== "disconnected") dc.unauthorize();
		if (reason === "auth-broken" && dc.dcId !== this.client.session.dcId) {
			dc.authKey.setKey(void 0).catch(() => {});
			this.client.session.setAuthKey(void 0, dc.dcId);
		}
		slot.markDead(reason === "disconnected" ? "disconnected" : "auth-broken").catch(() => {});
	}
};
exports.SessionPool = SessionPool;
