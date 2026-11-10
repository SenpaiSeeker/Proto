Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_Helpers = require("./Helpers.js");
// teleproto/requestIter.ts
var RequestIter = class {
	constructor(client, limit, params = {}, args = {}) {
		this.client = client;
		this.reverse = params.reverse;
		this.waitTime = params.waitTime;
		this.limit = Math.max(limit ?? Number.MAX_SAFE_INTEGER, 0);
		this.left = this.limit;
		this.buffer = void 0;
		this.kwargs = args;
		this.index = 0;
		this.total = void 0;
		this.lastLoad = 0;
	}
	async _init(kwargs) {}
	[Symbol.asyncIterator]() {
		this.buffer = void 0;
		this.index = 0;
		this.lastLoad = 0;
		this.left = this.limit;
		return { next: async () => {
			if (this.buffer == void 0) {
				this.buffer = [];
				if (await this._init(this.kwargs)) this.left = Math.min(this.left, this.buffer.length);
			}
			if (this.left <= 0) return {
				value: void 0,
				done: true
			};
			if (this.index == this.buffer.length) {
				if (this.waitTime && this.lastLoad) {
					const delay = this.waitTime * 1e3 - (Date.now() - this.lastLoad);
					if (delay > 0) await require_Helpers.sleep(delay);
				}
				this.lastLoad = Date.now();
				this.index = 0;
				this.buffer = [];
				const nextChunk = await this._loadNextChunk();
				if (nextChunk === false) return {
					value: void 0,
					done: true
				};
				if (nextChunk) this.left = Math.min(this.left, this.buffer.length);
			}
			if (!this.buffer || !this.buffer.length) return {
				value: void 0,
				done: true
			};
			const result = this.buffer[this.index];
			this.left -= 1;
			this.index += 1;
			return {
				value: result,
				done: false
			};
		} };
	}
	async collect() {
		const result = new require_Helpers.TotalList();
		for await (const message of this) result.push(message);
		result.total = this.total;
		return result;
	}
	async _loadNextChunk() {
		throw new Error("Not Implemented");
	}
};
exports.RequestIter = RequestIter;
