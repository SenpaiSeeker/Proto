Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_extensions_Deferred = require("../../extensions/Deferred.js");
// teleproto/network/mtproto/RequestState.ts
function readResult(request, reader) {
	return request.readResult(reader);
}
function expectsAnswer(request) {
	return request.classType === "request";
}
var RequestState = class {
	constructor(request) {
		this.acknowledged = false;
		this.initWrapped = false;
		this.cancelled = false;
		this.finished = new require_extensions_Deferred.default();
		this.settled = true;
		this.request = request;
		this.data = request.getBytes();
		this.resetPromise();
	}
	isReady() {
		return this.after?.finished.promise ?? Promise.resolve();
	}
	resetPromise() {
		if (!this.settled) return;
		this.settled = false;
		this.promise = new Promise((resolve, reject) => {
			this.resolve = (value) => {
				this.settled = true;
				resolve(value);
			};
			this.reject = (reason) => {
				this.settled = true;
				reject(reason);
			};
		});
		this.promise.catch(() => {});
	}
};
exports.RequestState = RequestState;
exports.expectsAnswer = expectsAnswer;
exports.readResult = readResult;
