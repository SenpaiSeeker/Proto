Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/errors/ProxyRejectedError.ts
var ProxyRejectedError_exports = /* @__PURE__ */ require("../_virtual/_rolldown/runtime.js").__exportAll({ ProxyRejectedError: () => ProxyRejectedError });
/**
* The proxy refused the connection for a reason retrying cannot fix,
* such as wrong credentials (HTTP 407, SOCKS5 authentication) or a forbidden target (HTTP 403).
*/
var ProxyRejectedError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "ProxyRejectedError";
	}
};
exports.ProxyRejectedError = ProxyRejectedError;
Object.defineProperty(exports, "ProxyRejectedError_exports", {
	enumerable: true,
	get: function() {
		return ProxyRejectedError_exports;
	}
});
