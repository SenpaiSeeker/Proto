Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../_virtual/_rolldown/runtime.js");
const require_platform_crypto_index = require("../platform/crypto/index.js");
require("../platform/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/crypto/Factorizator.ts
function toNative(value) {
	return BigInt(value.toString());
}
function fromNative(value) {
	return (0, big_integer.default)(value.toString());
}
var Factorizator = class {
	static gcd(a, b) {
		return fromNative(require_platform_crypto_index.gcd(toNative(a), toNative(b)));
	}
	static factorize(pq) {
		const { p, q } = require_platform_crypto_index.factor(toNative(pq));
		return p < q ? {
			p: fromNative(p),
			q: fromNative(q)
		} : {
			p: fromNative(q),
			q: fromNative(p)
		};
	}
};
exports.Factorizator = Factorizator;
