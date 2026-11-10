Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/extensions/Deferred.ts
var Deferred = class Deferred {
	constructor() {
		this.promise = new Promise((resolve, reject) => {
			this.reject = reject;
			this.resolve = resolve;
		});
	}
	static resolved(value) {
		const deferred = new Deferred();
		deferred.resolve(value);
		return deferred;
	}
};
exports.default = Deferred;
