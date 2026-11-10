Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/platform/timers/index.ts
var timers_exports = /* @__PURE__ */ require("../../_virtual/_rolldown/runtime.js").__exportAll({
	immediate: () => immediate,
	sleep: () => sleep
});
function abortError(signal) {
	return Object.assign(/* @__PURE__ */ new Error("The operation was aborted"), {
		name: "AbortError",
		code: "ABORT_ERR",
		cause: signal.reason
	});
}
function sleep(ms, options = {}) {
	const { signal, ref = true } = options;
	if (signal?.aborted) return Promise.reject(abortError(signal));
	return new Promise((resolve, reject) => {
		const abort = () => {
			clearTimeout(timer);
			reject(abortError(signal));
		};
		const timer = setTimeout(() => {
			signal?.removeEventListener("abort", abort);
			resolve();
		}, ms);
		if (!ref) timer.unref?.();
		signal?.addEventListener("abort", abort, { once: true });
	});
}
function immediate(callback) {
	const native = globalThis.setImmediate;
	if (native) native(callback);
	else setTimeout(callback, 0);
}
exports.immediate = immediate;
exports.sleep = sleep;
Object.defineProperty(exports, "timers_exports", {
	enumerable: true,
	get: function() {
		return timers_exports;
	}
});
