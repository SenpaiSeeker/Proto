Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_Helpers = require("../../Helpers.js");
const require_network_connection_Connection = require("./Connection.js");
const require_network_connection_IntermediateCodec = require("./IntermediateCodec.js");
const require_crypto_CTR = require("../../crypto/CTR.js");
require("../../platform/index.js");
// teleproto/network/connection/Obfuscation.ts
const FORBIDDEN_FIRST_INTS = /* @__PURE__ */ new Set([
	1145128264,
	1414745936,
	542393671,
	1230262351,
	33620758,
	3722304989,
	4008636142
]);
function pickHeader(fakeTls) {
	while (true) {
		const header = require_Helpers.generateRandomBytes(64);
		if (fakeTls) return header;
		if (header[0] === 239) continue;
		if (FORBIDDEN_FIRST_INTS.has(header.readUInt32LE(0))) continue;
		if (header.readUInt32LE(4) === 0) continue;
		return header;
	}
}
var ObfuscatedIO = class ObfuscatedIO {
	constructor(socket, header, encryptor, decryptor) {
		this.socket = socket;
		this.header = header;
		this.encryptor = encryptor;
		this.decryptor = decryptor;
	}
	static async create(socket, params) {
		const header = pickHeader(!!params.fakeTls);
		params.protocolTag.copy(header, 56);
		const dcId = params.testServers ? Math.sign(params.dcId) * (Math.abs(params.dcId) + 1e4) : params.dcId;
		if (dcId !== 0) header.writeInt16LE(dcId, 60);
		const reversed = require_platform_buffer_index.Buffer.from(header).reverse();
		const key = async (source) => params.secret ? require_Helpers.sha256(require_platform_buffer_index.Buffer.concat([source, params.secret])) : require_platform_buffer_index.Buffer.from(source);
		const encryptor = new require_crypto_CTR.CTR(await key(header.subarray(8, 40)), require_platform_buffer_index.Buffer.from(header.subarray(40, 56)));
		const decryptor = new require_crypto_CTR.CTR(await key(reversed.subarray(8, 40)), require_platform_buffer_index.Buffer.from(reversed.subarray(40, 56)));
		encryptor.encrypt(header).subarray(56).copy(header, 56);
		return new ObfuscatedIO(socket, header, encryptor, decryptor);
	}
	async read(n) {
		return this.decryptor.encryptInPlace(await this.socket.read(n));
	}
	async readExactly(n) {
		return this.decryptor.encryptInPlace(await this.socket.readExactly(n));
	}
	write(data) {
		return this.socket.write(this.encryptor.encryptInPlace(data));
	}
	dispose() {
		this.encryptor.dispose();
		this.decryptor.dispose();
	}
};
var ObfuscatedConnection = class extends require_network_connection_Connection.Connection {
	constructor(..._args) {
		super(..._args);
		this.fakeTls = false;
	}
	obfuscationParams() {
		const protocolTag = this.codecClass.obfuscateTag;
		if (!protocolTag) throw new Error(`${this.codecClass.name} cannot be obfuscated`);
		return {
			protocolTag,
			dcId: this.dcId,
			testServers: this.testServers,
			secret: this.secret,
			fakeTls: this.fakeTls
		};
	}
	async handshake() {
		this.obfuscation = await ObfuscatedIO.create(this.socket, this.obfuscationParams());
		await this.socket.write(this.obfuscation.header);
	}
	write(packet) {
		return this.obfuscation.write(packet);
	}
	get reader() {
		return this.obfuscation;
	}
	async disconnect() {
		await super.disconnect();
		this.obfuscation?.dispose();
		this.obfuscation = void 0;
	}
};
var ConnectionTCPObfuscated = class extends ObfuscatedConnection {
	constructor(..._args2) {
		super(..._args2);
		this.PacketCodecClass = require_network_connection_IntermediateCodec.IntermediatePacketCodec;
	}
};
exports.ConnectionTCPObfuscated = ConnectionTCPObfuscated;
exports.ObfuscatedConnection = ObfuscatedConnection;
exports.ObfuscatedIO = ObfuscatedIO;
