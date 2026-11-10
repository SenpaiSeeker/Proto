Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_core_GZIPPacked = require("./GZIPPacked.js");
const require_tl_core_MessageContainer = require("./MessageContainer.js");
const require_tl_core_RPCResult = require("./RPCResult.js");
const require_tl_core_TLMessage = require("./TLMessage.js");
// teleproto/tl/core/index.ts
const coreObjects = /* @__PURE__ */ new Map([
	[require_tl_core_RPCResult.RPCResult.CONSTRUCTOR_ID, require_tl_core_RPCResult.RPCResult],
	[require_tl_core_GZIPPacked.GZIPPacked.CONSTRUCTOR_ID, require_tl_core_GZIPPacked.GZIPPacked],
	[require_tl_core_MessageContainer.MessageContainer.CONSTRUCTOR_ID, require_tl_core_MessageContainer.MessageContainer]
]);
exports.GZIPPacked = require_tl_core_GZIPPacked.GZIPPacked;
exports.MessageContainer = require_tl_core_MessageContainer.MessageContainer;
exports.RPCResult = require_tl_core_RPCResult.RPCResult;
exports.TLMessage = require_tl_core_TLMessage.TLMessage;
exports.coreObjects = coreObjects;
