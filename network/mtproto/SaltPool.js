Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/network/mtproto/SaltPool.ts
const VALIDITY_MARGIN_S = 60;
const REFILL_INTERVAL_MS = 6e4;
var SaltPool = class {
	constructor() {
		this.salts = [];
		this.refilling = false;
		this.refilledAt = 0;
	}
	current(serverNow) {
		while (this.salts.length && this.salts[0].validUntil <= serverNow + VALIDITY_MARGIN_S) this.salts.shift();
		const first = this.salts[0];
		return first && first.validSince <= serverNow ? first.salt : void 0;
	}
	needsRefill(now = Date.now()) {
		return this.salts.length <= 1 && !this.refilling && now - this.refilledAt >= REFILL_INTERVAL_MS;
	}
	beginRefill(now = Date.now()) {
		this.refilling = true;
		this.refilledAt = now;
	}
	endRefill(result) {
		this.refilling = false;
		if (!result) return;
		this.salts = result.salts.map(({ validSince, validUntil, salt }) => ({
			validSince,
			validUntil,
			salt
		})).sort((a, b) => a.validSince - b.validSince);
	}
	get count() {
		return this.salts.length;
	}
	clear() {
		this.salts = [];
	}
};
exports.SaltPool = SaltPool;
