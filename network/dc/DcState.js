Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_crypto_AuthKey = require("../../crypto/AuthKey.js");
const require_network_mtproto_SaltPool = require("../mtproto/SaltPool.js");
const require_network_session_ConnectThrottle = require("../session/ConnectThrottle.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/network/dc/DcState.ts
var DcState = class {
	constructor(dcId, authKey) {
		this.dcId = dcId;
		this.salts = new require_network_mtproto_SaltPool.SaltPool();
		this.throttle = new require_network_session_ConnectThrottle.ConnectThrottle();
		this.mediaThrottle = new require_network_session_ConnectThrottle.ConnectThrottle();
		this.salt = big_integer.default.zero;
		this.pfsFailed = false;
		this.authKey = authKey ?? new require_crypto_AuthKey.AuthKey();
		this.authorized = !!this.authKey.getKey();
	}
	updateSalt(salt) {
		if (salt && !salt.isZero()) this.salt = salt;
	}
	unauthorize() {
		this.authorized = false;
	}
	authorize(importAuthorization) {
		if (this.authorized) return Promise.resolve();
		this.importing ??= importAuthorization().then(() => {
			this.authorized = true;
		}).finally(() => {
			this.importing = void 0;
		});
		return this.importing;
	}
};
var DcStateRegistry = class {
	constructor() {
		this.states = /* @__PURE__ */ new Map();
	}
	get(dcId, seedKey) {
		let state = this.states.get(dcId);
		if (!state) {
			state = new DcState(dcId, seedKey);
			this.states.set(dcId, state);
		}
		return state;
	}
	clear() {
		this.states.clear();
	}
};
exports.DcState = DcState;
exports.DcStateRegistry = DcStateRegistry;
