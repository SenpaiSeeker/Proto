Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
let _platform_events = require("#platform/events");
_platform_events = require_runtime.__toESM(_platform_events);
// teleproto/platform/events/index.ts
var events_exports = /* @__PURE__ */ require_runtime.__exportAll({ setMaxListeners: () => setMaxListeners });
const { setMaxListeners } = _platform_events;
Object.defineProperty(exports, "events_exports", {
	enumerable: true,
	get: function() {
		return events_exports;
	}
});
exports.setMaxListeners = setMaxListeners;
