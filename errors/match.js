Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_errors_Common = require("./Common.js");
const require_errors_ProxyRejectedError = require("./ProxyRejectedError.js");
const require_errors_FileErrors = require("./FileErrors.js");
const require_errors_RPCBaseErrors = require("./RPCBaseErrors.js");
const require_errors_RPCErrorList = require("./RPCErrorList.js");
const require_errors_aliases = require("./aliases.js");
// teleproto/errors/match.ts
const classes = {
	...require_errors_Common.Common_exports,
	...require_errors_ProxyRejectedError.ProxyRejectedError_exports,
	...require_errors_FileErrors.FileErrors_exports,
	...require_errors_RPCBaseErrors.RPCBaseErrors_exports,
	...require_errors_RPCErrorList.RPCErrorList_exports,
	...require_errors_aliases.aliases_exports
};
/**
* Runs the handler of the most specific class `error` belongs to, so `ChatWriteForbiddenError`
* wins over `ForbiddenError` whatever the key order. Rethrows `error` when no handler matches.
*/
async function match(error, handlers) {
	const byPrototype = /* @__PURE__ */ new Map();
	for (const [name, handler] of Object.entries(handlers)) {
		const cls = classes[name];
		if (handler && typeof cls === "function") byPrototype.set(cls.prototype, handler);
	}
	let prototype = error !== null && typeof error === "object" ? Object.getPrototypeOf(error) : null;
	for (; prototype; prototype = Object.getPrototypeOf(prototype)) {
		const handler = byPrototype.get(prototype);
		if (handler) return handler(error);
	}
	throw error;
}
/** {@link match} as a `.catch()` callback. */
function handle(handlers) {
	return (error) => match(error, handlers);
}
exports.handle = handle;
exports.match = match;
