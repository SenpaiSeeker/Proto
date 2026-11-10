Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_custom_message = require("../custom/message.js");
// teleproto/tl/runtime/bases.ts
const customMessage = () => require_tl_custom_message.CustomMessage;
const tlBases = {
	Message: customMessage,
	MessageService: customMessage,
	MessageEmpty: customMessage
};
exports.tlBases = tlBases;
