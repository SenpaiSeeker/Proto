Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../platform/buffer/index.js");
const require_sessions_Memory = require("./Memory.js");
const require_tl_binary_Reader = require("../tl/binary/Reader.js");
const require_crypto_AuthKey = require("../crypto/AuthKey.js");
require("../platform/index.js");
// teleproto/sessions/StringSession.ts
const CURRENT_VERSION = "1";
var StringSession = class StringSession extends require_sessions_Memory.MemorySession {
	/**
	* This session file can be easily saved and loaded as a string. According
	* to the initial design, it contains only the data that is necessary for
	* successful connection and authentication, so takeout ID is not stored.
	
	* It is thought to be used where you don't want to create any on-disk
	* files but would still like to be able to save and load existing sessions
	* by other means.
	
	* You can use custom `encode` and `decode` functions, if present:
	
	* `encode` definition must be ``function encode(value: Buffer) -> string:``.
	* `decode` definition must be ``function decode(value: string) -> Buffer:``.
	* @param session {string|null}
	*/
	constructor(session) {
		super();
		this._loaded = false;
		if (session) {
			if (session[0] !== CURRENT_VERSION) throw new Error("Not a valid string");
			session = session.slice(1);
			const r = StringSession.decode(session);
			const reader = new require_tl_binary_Reader.Reader(r);
			this._dcId = reader.read(1).readUInt8(0);
			if (session.length == 352) {
				const ip_v4 = reader.read(4);
				this._serverAddress = ip_v4[0].toString() + "." + ip_v4[1].toString() + "." + ip_v4[2].toString() + "." + ip_v4[3].toString();
			} else {
				const serverAddressLen = reader.read(2).readUInt16BE(0);
				if (serverAddressLen > 100) {
					reader.offset -= 2;
					this._serverAddress = reader.read(16).toString("hex").match(/.{1,4}/g).map((val) => val.replace(/^0+/, "")).join(":").replace(/0000\:/g, ":").replace(/:{2,}/g, "::");
				} else this._serverAddress = reader.read(serverAddressLen).toString();
			}
			this._port = reader.read(2).readUInt16BE(0);
			this._key = reader.read(-1);
		}
	}
	/**
	* @param x {Buffer}
	* @returns {string}
	*/
	static encode(x) {
		return x.toString("base64");
	}
	/**
	* @param x {string}
	* @returns {Buffer}
	*/
	static decode(x) {
		return require_platform_buffer_index.Buffer.from(x, "base64");
	}
	async load() {
		if (this._loaded) return;
		this._loaded = true;
		if (this._key) {
			this._authKey = new require_crypto_AuthKey.AuthKey();
			await this._authKey.setKey(this._key);
		}
	}
	delete() {
		this._loaded = false;
		this._key = void 0;
		super.delete();
	}
	save() {
		if (!this.authKey || !this.serverAddress || !this.port) return "";
		const key = this.authKey.getKey();
		if (!key) return "";
		const dcBuffer = require_platform_buffer_index.Buffer.from([this.dcId]);
		const addressBuffer = require_platform_buffer_index.Buffer.from(this.serverAddress);
		const addressLengthBuffer = require_platform_buffer_index.Buffer.alloc(2);
		addressLengthBuffer.writeUInt16BE(addressBuffer.length, 0);
		const portBuffer = require_platform_buffer_index.Buffer.alloc(2);
		portBuffer.writeUInt16BE(this.port, 0);
		return CURRENT_VERSION + StringSession.encode(require_platform_buffer_index.Buffer.concat([
			dcBuffer,
			addressLengthBuffer,
			addressBuffer,
			portBuffer,
			key
		]));
	}
};
exports.StringSession = StringSession;
