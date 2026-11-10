Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("../platform/buffer/index.js");
const require_platform_crypto_index = require("../platform/crypto/index.js");
const require_Helpers = require("../Helpers.js");
require("../platform/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/crypto/RSA.ts
const PUBLIC_KEYS = [{
	fingerprint: (0, big_integer.default)("-3414540481677951611"),
	n: (0, big_integer.default)("29379598170669337022986177149456128565388431120058863768162556424047512191330847455146576344487764408661701890505066208632169112269581063774293102577308490531282748465986139880977280302242772832972539403531316010870401287642763009136156734339538042419388722777357134487746169093539093850251243897188928735903389451772730245253062963384108812842079887538976360465290946139638691491496062099570836476454855996319192747663615955633778034897140982517446405334423701359108810182097749467210509584293428076654573384828809574217079944388301239431309115013843331317877374435868468779972014486325557807783825502498215169806323"),
	e: 65537
}, {
	fingerprint: (0, big_integer.default)("-5595554452916591101"),
	n: (0, big_integer.default)("25342889448840415564971689590713473206898847759084779052582026594546022463853940585885215951168491965708222649399180603818074200620463776135424884632162512403163793083921641631564740959529419359595852941166848940585952337613333022396096584117954892216031229237302943701877588456738335398602461675225081791820393153757504952636234951323237820036543581047826906120927972487366805292115792231423684261262330394324750785450942589751755390156647751460719351439969059949569615302809050721500330239005077889855323917509948255722081644689442127297605422579707142646660768825302832201908302295573257427896031830742328565032949"),
	e: 65537
}];
const _serverKeys = /* @__PURE__ */ new Map();
PUBLIC_KEYS.forEach(({ fingerprint, ...keyInfo }) => {
	_serverKeys.set(fingerprint.toString(), keyInfo);
});
/**
* Encrypts the given data known the fingerprint to be used
* in the way Telegram requires us to do so (sha1(data) + data + padding)

* @param fingerprint the fingerprint of the RSA key.
* @param data the data to be encrypted.
* @returns {Buffer|*|undefined} the cipher text, or undefined if no key matching this fingerprint is found.
*/
async function encrypt(fingerprint, data) {
	const key = _serverKeys.get(fingerprint.toString());
	if (!key) return;
	const rand = require_Helpers.generateRandomBytes(235 - data.length);
	const toEncrypt = require_platform_buffer_index.Buffer.concat([
		await require_Helpers.sha1(data),
		data,
		rand
	]);
	const payload = require_Helpers.readBigIntFromBuffer(toEncrypt, false);
	const encrypted = require_Helpers.modExp(payload, (0, big_integer.default)(key.e), key.n);
	return require_Helpers.readBufferFromBigInt(encrypted, 256, false);
}
function tlBytes(data) {
	const header = data.length < 254 ? require_platform_buffer_index.Buffer.from([data.length]) : require_platform_buffer_index.Buffer.from([
		254,
		data.length & 255,
		data.length >> 8 & 255,
		data.length >> 16 & 255
	]);
	const padding = (4 - (header.length + data.length) % 4) % 4;
	return require_platform_buffer_index.Buffer.concat([
		header,
		data,
		require_platform_buffer_index.Buffer.alloc(padding)
	]);
}
async function addServerKey(pem) {
	const { n, e } = require_platform_crypto_index.rsaPublicKey(pem);
	const digest = await require_Helpers.sha1(require_platform_buffer_index.Buffer.concat([tlBytes(n), tlBytes(e)]));
	const fingerprint = require_Helpers.readBigIntFromBuffer(digest.subarray(12, 20), true, true);
	_serverKeys.set(fingerprint.toString(), {
		n: require_Helpers.readBigIntFromBuffer(n, false),
		e: require_Helpers.readBigIntFromBuffer(e, false).toJSNumber()
	});
	return fingerprint;
}
exports._serverKeys = _serverKeys;
exports.addServerKey = addServerKey;
exports.encrypt = encrypt;
