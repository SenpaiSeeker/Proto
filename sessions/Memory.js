Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../_virtual/_rolldown/runtime.js");
const require_sessions_Abstract = require("./Abstract.js");
require("../tl/index.js");
const require_tl_generated_api = require("../tl/generated/api.js");
const require_Utils = require("../Utils.js");
const require_Helpers = require("../Helpers.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/sessions/Memory.ts
/**
* In-memory session storage that keeps all auth and entity data in RAM.
*
* All data is lost when the process exits. Use {@link StringSession} to export
* the session to a portable string, or {@link StoreSession} for persistent on-disk storage.
*
* Entities are keyed by their peer ID to prevent duplicate accumulation.
*/
var MemorySession = class extends require_sessions_Abstract.Session {
	constructor() {
		super();
		this._dcAuthKeys = /* @__PURE__ */ new Map();
		this._serverAddress = void 0;
		this._dcId = 0;
		this._port = void 0;
		this._takeoutId = void 0;
		this._entities = /* @__PURE__ */ new Map();
	}
	setDC(dcId, serverAddress, port) {
		dcId |= 0;
		if (dcId !== this._dcId) {
			if (this._dcId && this._authKey) this._dcAuthKeys.set(this._dcId, this._authKey);
			this._authKey = this._dcAuthKeys.get(dcId);
			this._dcAuthKeys.delete(dcId);
		}
		this._dcId = dcId;
		this._serverAddress = serverAddress;
		this._port = port;
	}
	get dcId() {
		return this._dcId;
	}
	get serverAddress() {
		return this._serverAddress;
	}
	get port() {
		return this._port;
	}
	get authKey() {
		return this._authKey;
	}
	set authKey(value) {
		this._authKey = value;
	}
	get takeoutId() {
		return this._takeoutId;
	}
	set takeoutId(value) {
		this._takeoutId = value;
	}
	getAuthKey(dcId) {
		if (dcId === void 0 || dcId === this.dcId) return this.authKey;
		return this._dcAuthKeys.get(dcId);
	}
	setAuthKey(authKey, dcId) {
		if (dcId === void 0 || dcId === this.dcId) {
			this.authKey = authKey;
			return;
		}
		if (authKey) this._dcAuthKeys.set(dcId, authKey);
		else this._dcAuthKeys.delete(dcId);
	}
	getUpdateState() {
		return this._updateState;
	}
	setUpdateState(state) {
		this._updateState = state;
	}
	close() {}
	save() {}
	async load() {}
	delete() {
		this._authKey = void 0;
		this._dcId = 0;
		this._serverAddress = void 0;
		this._port = void 0;
		this._dcAuthKeys.clear();
		this._entities.clear();
		this._updateState = void 0;
	}
	_entityValuesToRow(id, hash, username, phone, name) {
		return [
			id,
			hash,
			username,
			phone,
			name
		];
	}
	_entityToRow(e) {
		if (!(e.classType === "constructor")) return;
		let p;
		let markedId;
		try {
			p = require_Utils.getInputPeer(e, false);
			markedId = require_Utils.getPeerId(p);
		} catch (e) {
			return;
		}
		let pHash;
		if (p instanceof require_tl_generated_api.Api.InputPeerUser || p instanceof require_tl_generated_api.Api.InputPeerChannel) pHash = p.accessHash;
		else if (p instanceof require_tl_generated_api.Api.InputPeerChat) pHash = big_integer.default.zero;
		else return;
		let username = e.username;
		if (username) username = username.toLowerCase();
		const phone = e.phone;
		const name = require_Utils.getDisplayName(e);
		return this._entityValuesToRow(markedId, pHash, username, phone, name);
	}
	_entitiesToRows(tlo) {
		let entities = [];
		if (!(tlo.classType === "constructor") && require_Helpers.isArrayLike(tlo)) entities = tlo;
		else if (typeof tlo === "object") {
			if ("user" in tlo) entities.push(tlo.user);
			if ("chat" in tlo) entities.push(tlo.chat);
			if ("channel" in tlo) entities.push(tlo.channel);
			if ("chats" in tlo && require_Helpers.isArrayLike(tlo.chats)) entities = entities.concat(tlo.chats);
			if ("users" in tlo && require_Helpers.isArrayLike(tlo.users)) entities = entities.concat(tlo.users);
		}
		const rows = [];
		for (const e of entities) {
			const row = this._entityToRow(e);
			if (row) rows.push(row);
		}
		return rows;
	}
	processEntities(tlo) {
		const entitiesSet = this._entitiesToRows(tlo);
		for (const e of entitiesSet) this._entities.set(e[0].toString(), e);
	}
	getEntityRowsByPhone(phone) {
		for (const e of this._entities.values()) if (e[3] === phone) return [e[0], e[1]];
	}
	getEntityRowsByUsername(username) {
		for (const e of this._entities.values()) if (e[2] === username) return [e[0], e[1]];
	}
	getEntityRowsByName(name) {
		for (const e of this._entities.values()) if (e[4] === name) return [e[0], e[1]];
	}
	getEntityRowsById(id, exact = true) {
		if (exact) {
			const row = this._entities.get(id.toString());
			if (row) return [row[0], row[1]];
		} else {
			const ids = [
				require_Utils.getPeerId(new require_tl_generated_api.Api.PeerUser({ userId: require_Helpers.returnBigInt(id) })),
				require_Utils.getPeerId(new require_tl_generated_api.Api.PeerChat({ chatId: require_Helpers.returnBigInt(id) })),
				require_Utils.getPeerId(new require_tl_generated_api.Api.PeerChannel({ channelId: require_Helpers.returnBigInt(id) }))
			];
			for (const e of this._entities.values()) if (ids.includes(e[0])) return [e[0], e[1]];
		}
	}
	getInputEntity(key) {
		let exact;
		if (typeof key === "object" && !big_integer.default.isInstance(key) && key.SUBCLASS_OF_ID) {
			if (key.SUBCLASS_OF_ID == require_Helpers.unionId("InputPeer") || key.SUBCLASS_OF_ID == require_Helpers.unionId("InputUser") || key.SUBCLASS_OF_ID == require_Helpers.unionId("InputChannel")) return key;
			try {
				return require_Utils.getInputPeer(key);
			} catch {
				key = require_Utils.getPeerId(key);
				exact = true;
			}
		} else if (typeof key === "object") {
			key = require_Utils.getPeerId(key);
			exact = true;
		} else exact = false;
		if (big_integer.default.isInstance(key) || typeof key == "bigint" || typeof key == "number") key = key.toString();
		let result = void 0;
		if (typeof key === "string") {
			const phone = require_Utils.parsePhone(key);
			if (phone) result = this.getEntityRowsByPhone(phone);
			else {
				const { username, isInvite } = require_Utils.parseUsername(key);
				if (username && !isInvite) result = this.getEntityRowsByUsername(username);
			}
			if (!result) {
				const id = require_Utils.parseID(key);
				if (id) result = this.getEntityRowsById(id, exact);
			}
			if (!result) result = this.getEntityRowsByName(key);
		}
		if (result) {
			let entityId = result[0];
			const entityHash = (0, big_integer.default)(result[1]);
			const resolved = require_Utils.resolveId(require_Helpers.returnBigInt(entityId));
			entityId = resolved[0];
			const kind = resolved[1];
			if (kind === require_tl_generated_api.Api.PeerUser) return new require_tl_generated_api.Api.InputPeerUser({
				userId: entityId,
				accessHash: entityHash
			});
			else if (kind === require_tl_generated_api.Api.PeerChat) return new require_tl_generated_api.Api.InputPeerChat({ chatId: entityId });
			else if (kind === require_tl_generated_api.Api.PeerChannel) return new require_tl_generated_api.Api.InputPeerChannel({
				channelId: entityId,
				accessHash: entityHash
			});
		} else throw new Error("Could not find input entity with key " + key);
		throw new Error("Could not find input entity with key " + key);
	}
};
exports.MemorySession = MemorySession;
