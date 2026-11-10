Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_network_mtproto_containerPacker = require("../network/mtproto/containerPacker.js");
// teleproto/extensions/MessagePacker.ts
const USE_INVOKE_AFTER_WITH = /* @__PURE__ */ new Set([
	"messages.SendMessage",
	"messages.SendMedia",
	"messages.SendMultiMedia",
	"messages.ForwardMessages",
	"messages.SendInlineBotResult"
]);
var MessagePacker = class {
	constructor(state, logger) {
		this._state = state;
		this._queue = [];
		this._pendingStates = [];
		this._ready = new Promise((resolve) => {
			this.setReady = resolve;
		});
		this._log = logger;
	}
	values() {
		return this._queue;
	}
	get length() {
		return this._queue.length + this._pendingStates.length;
	}
	append(state, setReady = true, atStart = false) {
		if (state && USE_INVOKE_AFTER_WITH.has(state.request.className)) {
			if (atStart) {
				for (let i = 0; i < this._queue.length; i++) if (USE_INVOKE_AFTER_WITH.has(this._queue[i]?.request.className)) {
					this._queue[i].after = state;
					break;
				}
			} else for (let i = this._queue.length - 1; i >= 0; i--) if (USE_INVOKE_AFTER_WITH.has(this._queue[i]?.request.className)) {
				state.after = this._queue[i];
				break;
			}
		}
		if (atStart) this._queue.unshift(state);
		else this._queue.push(state);
		if (setReady && this.setReady) this.setReady(true);
		if (state && state.request.CONSTRUCTOR_ID !== 1658238041) {
			this._pendingStates.push(state);
			state.promise.catch((err) => {}).finally(() => {
				this._pendingStates = this._pendingStates.filter((s) => s !== state);
			});
		}
	}
	prepend(states) {
		states.reverse().forEach((state) => {
			this.append(state, false, true);
		});
		if (this.setReady) this.setReady(true);
	}
	extend(states) {
		states.forEach((state) => {
			this.append(state, false);
		});
		if (this.setReady) this.setReady(true);
	}
	clear() {
		this._queue = [];
		this.append(void 0);
	}
	async wait() {
		if (!this._queue.length) {
			this._ready = new Promise((resolve) => {
				this.setReady = resolve;
			});
			await this._ready;
		}
	}
	async get() {
		if (!this._queue[this._queue.length - 1]) {
			this._queue = this._queue.filter(Boolean);
			return;
		}
		this._queue = this._queue.filter(Boolean);
		return await require_network_mtproto_containerPacker.packMessages(this._state, [this._queue]) ?? null;
	}
};
exports.MessagePacker = MessagePacker;
