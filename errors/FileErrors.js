Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/errors/FileErrors.ts
var FileErrors_exports = /* @__PURE__ */ require("../_virtual/_rolldown/runtime.js").__exportAll({
	CdnRedirectError: () => CdnRedirectError,
	MediaAbortError: () => MediaAbortError
});
var MediaAbortError = class extends Error {
	constructor() {
		super("Media operation aborted");
		this.name = "MediaAbortError";
	}
};
var CdnRedirectError = class extends Error {
	constructor(redirect) {
		super("upload.fileCdnRedirect");
		this.redirect = redirect;
		this.name = "CdnRedirectError";
	}
};
exports.CdnRedirectError = CdnRedirectError;
Object.defineProperty(exports, "FileErrors_exports", {
	enumerable: true,
	get: function() {
		return FileErrors_exports;
	}
});
exports.MediaAbortError = MediaAbortError;
