Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_custom_inlineResult = require("./inlineResult.js");
// teleproto/tl/custom/inlineResults.ts
var InlineResults = class extends Array {
	constructor(client, original, entity) {
		super(...original.results.map((res) => new require_tl_custom_inlineResult.InlineResult(client, res, original.queryId, entity)));
		this.result = original;
		this.queryId = original.queryId;
		this.cacheTime = original.cacheTime;
		this._validUntil = (/* @__PURE__ */ new Date()).getTime() / 1e3 + this.cacheTime;
		this.users = original.users;
		this.gallery = Boolean(original.gallery);
		this.nextOffset = original.nextOffset;
		this.switchPm = original.switchPm;
	}
	resultsValid() {
		return (/* @__PURE__ */ new Date()).getTime() / 1e3 < this._validUntil;
	}
};
exports.InlineResults = InlineResults;
