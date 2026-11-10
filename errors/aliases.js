Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../_virtual/_rolldown/runtime.js");
const require_errors_RPCBaseErrors = require("./RPCBaseErrors.js");
const require_errors_RPCErrorList = require("./RPCErrorList.js");
// teleproto/errors/aliases.ts
var aliases_exports = /* @__PURE__ */ require_runtime.__exportAll({
	FrozenError: () => FrozenError,
	FrozenMethodError: () => FrozenMethodError,
	FrozenParticipantError: () => FrozenParticipantError
});
/** @deprecated Renamed to {@link FrozenMethodInvalidError}. */
const FrozenMethodError = require_errors_RPCErrorList.FrozenMethodInvalidError;
/** @deprecated Renamed to {@link FrozenParticipantMissingError}. */
const FrozenParticipantError = require_errors_RPCErrorList.FrozenParticipantMissingError;
/**
* @deprecated The dedicated `FrozenError` base was removed; frozen errors now
* map by their HTTP code (420). Kept as an alias of {@link FloodError} so
* `instanceof errors.FrozenError` still matches frozen-method errors.
*/
const FrozenError = require_errors_RPCBaseErrors.FloodError;
exports.FrozenError = FrozenError;
exports.FrozenMethodError = FrozenMethodError;
exports.FrozenParticipantError = FrozenParticipantError;
Object.defineProperty(exports, "aliases_exports", {
	enumerable: true,
	get: function() {
		return aliases_exports;
	}
});
