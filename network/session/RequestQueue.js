Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../tl/index.js");
// teleproto/network/session/RequestQueue.ts
const ORDERED_REQUESTS = /* @__PURE__ */ new Set([
	"messages.SendMessage",
	"messages.SendMedia",
	"messages.SendMultiMedia",
	"messages.ForwardMessages",
	"messages.SendInlineBotResult"
]);
var RequestQueue = class {
	constructor() {
		this.requests = [];
		this.service = [];
		this.serviceStates = /* @__PURE__ */ new WeakSet();
	}
	get size() {
		return this.requests.length + this.service.length;
	}
	isService(state) {
		return this.serviceStates.has(state);
	}
	push(state) {
		if (ORDERED_REQUESTS.has(state.request.className)) {
			for (let i = this.requests.length - 1; i >= 0; i--) if (ORDERED_REQUESTS.has(this.requests[i].request.className)) {
				state.after = this.requests[i];
				break;
			}
		}
		this.requests.push(state);
		this.notify();
	}
	pushService(state) {
		this.serviceStates.add(state);
		this.service.push(state);
		this.notify();
	}
	requeue(states) {
		const requests = [];
		const service = [];
		for (const state of states) {
			if (state.cancelled) continue;
			state.msgId = void 0;
			state.containerId = void 0;
			(this.isService(state) ? service : requests).push(state);
		}
		this.service.unshift(...service);
		this.requests.unshift(...requests);
		this.notify();
	}
	remove(state) {
		const index = this.requests.indexOf(state);
		if (index >= 0) this.requests.splice(index, 1);
	}
	next(includeRequests) {
		if (this.service.length) return this.service;
		if (includeRequests && this.requests.length) return this.requests;
	}
	waitForWork() {
		return new Promise((resolve) => {
			this.wake = resolve;
		});
	}
	notify() {
		const wake = this.wake;
		this.wake = void 0;
		wake?.();
	}
	rejectAll(error) {
		for (const state of [...this.requests, ...this.service]) if (!(state.request instanceof require_tl_generated_api.Api.MsgsAck)) state.reject(error);
		this.requests.length = 0;
		this.service.length = 0;
	}
};
exports.RequestQueue = RequestQueue;
