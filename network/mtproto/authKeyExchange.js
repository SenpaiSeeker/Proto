Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_platform_crypto_index = require("../../platform/crypto/index.js");
const require_Helpers = require("../../Helpers.js");
require("../../tl/index.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../errors/index.js");
const require_errors_Common = require("../../errors/Common.js");
const require_crypto_Factorizator = require("../../crypto/Factorizator.js");
const require_crypto_RSA = require("../../crypto/RSA.js");
const require_crypto_IGE = require("../../crypto/IGE.js");
const require_tl_binary_Reader = require("../../tl/binary/Reader.js");
const require_crypto_AuthKey = require("../../crypto/AuthKey.js");
require("../../platform/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/network/mtproto/authKeyExchange.ts
const RETRIES = 20;
const DH_PRIME_BITS = 2048n;
const DH_VALUE_MARGIN = 1n << DH_PRIME_BITS - 64n;
const DH_GENERATOR_RESIDUES = {
	2: [8n, [7n]],
	3: [3n, [2n]],
	4: [1n, [0n]],
	5: [5n, [1n, 4n]],
	6: [24n, [19n, 23n]],
	7: [7n, [
		3n,
		5n,
		6n
	]]
};
const knownSafePrimes = /* @__PURE__ */ new Set([BigInt("0xc71caeb9c6b1c9048e6c522f70f13f73980d40238e3e21c14934d037563d930f48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c3720fd51f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f642477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3c4f3a9060bee67cf9a4a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754fd17ed950d5965b4b9dd46582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce929851f0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b")]);
function bytesToBigInt(bytes) {
	return bytes.length ? BigInt("0x" + bytes.toString("hex")) : 0n;
}
function isDhValueInRange(value, prime) {
	return value > DH_VALUE_MARGIN && value < prime - DH_VALUE_MARGIN;
}
function checkDhParams(prime, g, gA) {
	if (prime >> DH_PRIME_BITS - 1n !== 1n) throw new require_errors_Common.SecurityError("dh_prime is not a 2048-bit number");
	const residues = DH_GENERATOR_RESIDUES[g];
	if (!residues || !residues[1].includes(prime % residues[0])) throw new require_errors_Common.SecurityError(`g = ${g} does not generate a subgroup of prime order`);
	if (!knownSafePrimes.has(prime)) {
		if (!require_platform_crypto_index.isSafePrime(prime)) throw new require_errors_Common.SecurityError("dh_prime is not a safe prime");
		knownSafePrimes.add(prime);
	}
	if (!isDhValueInRange(gA, prime)) throw new require_errors_Common.SecurityError("g_a is out of the allowed range");
}
async function doAuthentication(sender, log, temp) {
	let bytes = require_Helpers.generateRandomBytes(16);
	const nonce = require_Helpers.readBigIntFromBuffer(bytes, false, true);
	const resPQ = await sender.send(new require_tl_generated_api.Api.ReqPqMulti({ nonce }));
	log.debug("Starting authKey generation step 1");
	if (!(resPQ instanceof require_tl_generated_api.Api.ResPQ)) throw new require_errors_Common.SecurityError(`Step 1 answer was ${resPQ}`);
	if (resPQ.nonce.neq(nonce)) throw new require_errors_Common.SecurityError("Step 1 invalid nonce from server");
	const pq = require_Helpers.readBigIntFromBuffer(resPQ.pq, false, true);
	log.debug("Finished authKey generation step 1");
	const { p, q } = require_crypto_Factorizator.Factorizator.factorize(pq);
	const pBuffer = require_Helpers.getByteArray(p);
	const qBuffer = require_Helpers.getByteArray(q);
	bytes = require_Helpers.generateRandomBytes(32);
	const newNonce = require_Helpers.readBigIntFromBuffer(bytes, true, true);
	const pqInnerData = (temp ? new require_tl_generated_api.Api.PQInnerDataTempDc({
		pq: require_Helpers.getByteArray(pq),
		p: pBuffer,
		q: qBuffer,
		nonce: resPQ.nonce,
		serverNonce: resPQ.serverNonce,
		newNonce,
		dc: temp.dc,
		expiresIn: temp.expiresIn
	}) : new require_tl_generated_api.Api.PQInnerData({
		pq: require_Helpers.getByteArray(pq),
		p: pBuffer,
		q: qBuffer,
		nonce: resPQ.nonce,
		serverNonce: resPQ.serverNonce,
		newNonce
	})).getBytes();
	if (pqInnerData.length > 144) throw new require_errors_Common.SecurityError("Invalid nonce from server");
	let targetFingerprint;
	let targetKey;
	for (const fingerprint of resPQ.serverPublicKeyFingerprints) {
		targetKey = require_crypto_RSA._serverKeys.get(fingerprint.toString());
		if (targetKey !== void 0) {
			targetFingerprint = fingerprint;
			break;
		}
	}
	if (targetFingerprint === void 0 || targetKey === void 0) throw new require_errors_Common.SecurityError("Could not find a valid key for fingerprints");
	const padding = require_Helpers.generateRandomBytes(192 - pqInnerData.length);
	const dataWithPadding = require_platform_buffer_index.Buffer.concat([pqInnerData, padding]);
	const dataPadReversed = require_platform_buffer_index.Buffer.from(dataWithPadding).reverse();
	let encryptedData;
	for (let i = 0; i < RETRIES; i++) {
		const tempKey = require_Helpers.generateRandomBytes(32);
		const shaDigestKeyWithData = await require_Helpers.sha256(require_platform_buffer_index.Buffer.concat([tempKey, dataWithPadding]));
		const dataWithHash = require_platform_buffer_index.Buffer.concat([dataPadReversed, shaDigestKeyWithData]);
		const ige = new require_crypto_IGE.IGE(tempKey, require_platform_buffer_index.Buffer.alloc(32));
		const aesEncrypted = ige.encryptIge(dataWithHash, dataWithHash);
		ige.dispose();
		const tempKeyXor = require_Helpers.bufferXor(tempKey, await require_Helpers.sha256(aesEncrypted));
		const keyAesEncrypted = require_platform_buffer_index.Buffer.concat([tempKeyXor, aesEncrypted]);
		const keyAesEncryptedInt = require_Helpers.readBigIntFromBuffer(keyAesEncrypted, false, false);
		if (keyAesEncryptedInt.greaterOrEquals(targetKey.n)) {
			log.debug("Aes key greater than RSA. retrying");
			continue;
		}
		const encryptedDataBuffer = require_Helpers.modExp(keyAesEncryptedInt, (0, big_integer.default)(targetKey.e), targetKey.n);
		encryptedData = require_Helpers.readBufferFromBigInt(encryptedDataBuffer, 256, false, false);
		break;
	}
	if (encryptedData === void 0) throw new require_errors_Common.SecurityError("Could create a secure encrypted key");
	log.debug("Generated a secure aes encrypted data");
	const serverDhParams = await sender.send(new require_tl_generated_api.Api.ReqDHParams({
		nonce: resPQ.nonce,
		serverNonce: resPQ.serverNonce,
		p: pBuffer,
		q: qBuffer,
		publicKeyFingerprint: targetFingerprint,
		encryptedData
	}));
	if (!(serverDhParams instanceof require_tl_generated_api.Api.ServerDHParamsOk || serverDhParams instanceof require_tl_generated_api.Api.ServerDHParamsFail)) throw new Error(`Answer was ${serverDhParams}`);
	if (serverDhParams.nonce.neq(resPQ.nonce)) throw new require_errors_Common.SecurityError("Invalid nonce from server");
	if (serverDhParams.serverNonce.neq(resPQ.serverNonce)) throw new require_errors_Common.SecurityError("Invalid server nonce from server");
	if (serverDhParams instanceof require_tl_generated_api.Api.ServerDHParamsFail) {
		const sh = await require_Helpers.sha1(require_Helpers.toSignedLittleBuffer(newNonce, 32).slice(4, 20));
		const nnh = require_Helpers.readBigIntFromBuffer(sh, true, true);
		if (serverDhParams.newNonceHash.neq(nnh)) throw new require_errors_Common.SecurityError("Invalid DH fail nonce from server");
	}
	if (!(serverDhParams instanceof require_tl_generated_api.Api.ServerDHParamsOk)) throw new Error(`Answer was ${serverDhParams}`);
	log.debug("Finished authKey generation");
	log.debug("Starting authKey generation");
	const { key, iv } = await require_Helpers.generateKeyDataFromNonce(resPQ.serverNonce, newNonce);
	if (serverDhParams.encryptedAnswer.length % 16 !== 0) throw new require_errors_Common.SecurityError("AES block size mismatch");
	const ige = new require_crypto_IGE.IGE(key, iv);
	const plainTextAnswer = ige.decryptIge(serverDhParams.encryptedAnswer);
	const reader = new require_tl_binary_Reader.Reader(plainTextAnswer);
	reader.read(20);
	const serverDhInner = reader.tgReadObject();
	if (!(serverDhInner instanceof require_tl_generated_api.Api.ServerDHInnerData)) throw new Error(`Answer was ${serverDhInner}`);
	if (serverDhInner.nonce.neq(resPQ.nonce)) throw new require_errors_Common.SecurityError("Invalid nonce in encrypted answer");
	if (serverDhInner.serverNonce.neq(resPQ.serverNonce)) throw new require_errors_Common.SecurityError("Invalid server nonce in encrypted answer");
	const prime = bytesToBigInt(serverDhInner.dhPrime);
	checkDhParams(prime, serverDhInner.g, bytesToBigInt(serverDhInner.gA));
	const dhPrime = require_Helpers.readBigIntFromBuffer(serverDhInner.dhPrime, false, false);
	const ga = require_Helpers.readBigIntFromBuffer(serverDhInner.gA, false, false);
	const timeOffset = serverDhInner.serverTime - Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
	let b;
	let gb;
	do {
		b = require_Helpers.readBigIntFromBuffer(require_Helpers.generateRandomBytes(256), false, false);
		gb = require_Helpers.modExp((0, big_integer.default)(serverDhInner.g), b, dhPrime);
	} while (!isDhValueInRange(BigInt(gb.toString()), prime));
	const gab = require_Helpers.modExp(ga, b, dhPrime);
	const clientDhInner = new require_tl_generated_api.Api.ClientDHInnerData({
		nonce: resPQ.nonce,
		serverNonce: resPQ.serverNonce,
		retryId: big_integer.default.zero,
		gB: require_Helpers.getByteArray(gb, false)
	}).getBytes();
	const clientDdhInnerHashed = require_platform_buffer_index.Buffer.concat([await require_Helpers.sha1(clientDhInner), clientDhInner]);
	const clientDhEncrypted = ige.encryptIge(clientDdhInnerHashed);
	ige.dispose();
	const dhGen = await sender.send(new require_tl_generated_api.Api.SetClientDHParams({
		nonce: resPQ.nonce,
		serverNonce: resPQ.serverNonce,
		encryptedData: clientDhEncrypted
	}));
	const nonceTypes = [
		require_tl_generated_api.Api.DhGenOk,
		require_tl_generated_api.Api.DhGenRetry,
		require_tl_generated_api.Api.DhGenFail
	];
	const nonceTypesString = [
		"DhGenOk",
		"DhGenRetry",
		"DhGenFail"
	];
	if (!(dhGen instanceof nonceTypes[0] || dhGen instanceof nonceTypes[1] || dhGen instanceof nonceTypes[2])) throw new Error(`Answer was ${dhGen}`);
	const { name } = dhGen.constructor;
	if (dhGen.nonce.neq(resPQ.nonce)) throw new require_errors_Common.SecurityError(`Invalid ${name} nonce from server`);
	if (dhGen.serverNonce.neq(resPQ.serverNonce)) throw new require_errors_Common.SecurityError(`Invalid ${name} server nonce from server`);
	const authKey = new require_crypto_AuthKey.AuthKey();
	await authKey.setKey(require_Helpers.readBufferFromBigInt(gab, 256, false, false));
	const nonceNumber = 1 + nonceTypesString.indexOf(dhGen.className);
	const newNonceHash = await authKey.calcNewNonceHash(newNonce, nonceNumber);
	if ((dhGen instanceof require_tl_generated_api.Api.DhGenOk ? dhGen.newNonceHash1 : dhGen instanceof require_tl_generated_api.Api.DhGenRetry ? dhGen.newNonceHash2 : dhGen.newNonceHash3).neq(newNonceHash)) throw new require_errors_Common.SecurityError("Invalid new nonce hash");
	if (!(dhGen instanceof require_tl_generated_api.Api.DhGenOk)) throw new Error(`Answer was ${dhGen}`);
	log.debug("Finished authKey generation");
	const saltBytes = require_Helpers.toSignedLittleBuffer(newNonce, 32).subarray(0, 8);
	const serverNonceBytes = require_Helpers.toSignedLittleBuffer(resPQ.serverNonce, 16);
	for (let i = 0; i < 8; i++) saltBytes[i] ^= serverNonceBytes[i];
	return {
		authKey,
		timeOffset,
		serverSalt: require_Helpers.readBigIntFromBuffer(saltBytes, true, true)
	};
}
exports.checkDhParams = checkDhParams;
exports.doAuthentication = doAuthentication;
exports.isDhValueInRange = isDhValueInRange;
