Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let node_events = require("node:events");
// teleproto/platform/events/node.ts
function setMaxListeners(count, ...targets) {
	(0, node_events.setMaxListeners)(count, ...targets);
}
exports.setMaxListeners = setMaxListeners;
