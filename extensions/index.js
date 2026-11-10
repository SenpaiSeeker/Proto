Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../_virtual/_rolldown/runtime.js");
const require_extensions_Logger = require("./Logger.js");
const require_tl_binary_Writer = require("../tl/binary/Writer.js");
const require_tl_binary_Reader = require("../tl/binary/Reader.js");
const require_compat_extensions_PromisedNetSockets = require("../compat/extensions/PromisedNetSockets.js");
const require_compat_extensions_PromisedWebSockets = require("../compat/extensions/PromisedWebSockets.js");
const require_extensions_MessagePacker = require("./MessagePacker.js");
const require_extensions_AsyncQueue = require("./AsyncQueue.js");
// teleproto/extensions/index.ts
var extensions_exports = /* @__PURE__ */ require_runtime.__exportAll({
	AsyncQueue: () => require_extensions_AsyncQueue.AsyncQueue,
	BinaryReader: () => require_tl_binary_Reader.Reader,
	BinaryWriter: () => require_tl_binary_Writer.Writer,
	Logger: () => require_extensions_Logger.Logger,
	MessagePacker: () => require_extensions_MessagePacker.MessagePacker,
	PromisedNetSockets: () => require_compat_extensions_PromisedNetSockets.PromisedNetSockets,
	PromisedWebSockets: () => require_compat_extensions_PromisedWebSockets.PromisedWebSockets
});
exports.AsyncQueue = require_extensions_AsyncQueue.AsyncQueue;
exports.BinaryReader = require_tl_binary_Reader.Reader;
exports.BinaryWriter = require_tl_binary_Writer.Writer;
exports.Logger = require_extensions_Logger.Logger;
exports.MessagePacker = require_extensions_MessagePacker.MessagePacker;
exports.PromisedNetSockets = require_compat_extensions_PromisedNetSockets.PromisedNetSockets;
exports.PromisedWebSockets = require_compat_extensions_PromisedWebSockets.PromisedWebSockets;
Object.defineProperty(exports, "extensions_exports", {
	enumerable: true,
	get: function() {
		return extensions_exports;
	}
});
