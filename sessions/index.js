Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../_virtual/_rolldown/runtime.js");
const require_sessions_Memory = require("./Memory.js");
const require_sessions_StringSession = require("./StringSession.js");
const require_sessions_StoreSession = require("./StoreSession.js");
const require_sessions_Abstract = require("./Abstract.js");
// teleproto/sessions/index.ts
var sessions_exports = /* @__PURE__ */ require_runtime.__exportAll({
	MemorySession: () => require_sessions_Memory.MemorySession,
	Session: () => require_sessions_Abstract.Session,
	StoreSession: () => require_sessions_StoreSession.StoreSession,
	StringSession: () => require_sessions_StringSession.StringSession
});
exports.MemorySession = require_sessions_Memory.MemorySession;
exports.Session = require_sessions_Abstract.Session;
exports.StoreSession = require_sessions_StoreSession.StoreSession;
exports.StringSession = require_sessions_StringSession.StringSession;
Object.defineProperty(exports, "sessions_exports", {
	enumerable: true,
	get: function() {
		return sessions_exports;
	}
});
