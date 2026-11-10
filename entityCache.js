Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("./_virtual/_rolldown/runtime.js");
const require_Utils = require("./Utils.js");
const require_Helpers = require("./Helpers.js");
const require_tl_generated_api = require("./tl/generated/api.js");
require("./tl/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/entityCache.ts
const ENTITY_CACHE_DEFAULTS = {
	max: 4096,
	ttl: 0
};
function toCachedPeer(peer) {
	if (peer instanceof require_tl_generated_api.Api.InputPeerUser) return {
		kind: "user",
		id: peer.userId,
		hash: peer.accessHash
	};
	if (peer instanceof require_tl_generated_api.Api.InputPeerChat) return {
		kind: "chat",
		id: peer.chatId
	};
	if (peer instanceof require_tl_generated_api.Api.InputPeerChannel) return {
		kind: "channel",
		id: peer.channelId,
		hash: peer.accessHash
	};
	if (peer instanceof require_tl_generated_api.Api.InputPeerSelf) return { kind: "self" };
	return {
		kind: "raw",
		peer
	};
}
function buildInputPeer(cached) {
	switch (cached.kind) {
		case "self": return new require_tl_generated_api.Api.InputPeerSelf();
		case "user": return new require_tl_generated_api.Api.InputPeerUser({
			userId: cached.id,
			accessHash: cached.hash
		});
		case "chat": return new require_tl_generated_api.Api.InputPeerChat({ chatId: cached.id });
		case "channel": return new require_tl_generated_api.Api.InputPeerChannel({
			channelId: cached.id,
			accessHash: cached.hash
		});
		case "raw": return cached.peer;
		default: return assertNever(cached);
	}
}
function assertNever(value) {
	throw new Error(`Unhandled cached peer: ${JSON.stringify(value)}`);
}
function collectEntities(input) {
	if (require_Helpers.isArrayLike(input)) return input;
	if (input == void 0 || typeof input !== "object") return [];
	const { users, chats, user } = input;
	return [
		...require_Helpers.isArrayLike(chats) ? chats : [],
		...require_Helpers.isArrayLike(users) ? users : [],
		...user != void 0 ? [user] : []
	];
}
var EntityCache = class {
	constructor(options) {
		this.users = /* @__PURE__ */ new Map();
		this.chats = /* @__PURE__ */ new Map();
		this.pinnedKeys = /* @__PURE__ */ new Set();
		this.enabled = options !== false;
		const policy = typeof options === "object" ? options : ENTITY_CACHE_DEFAULTS;
		this.max = Math.max(0, policy.max ?? 0);
		this.ttl = Math.max(0, policy.ttl ?? 0);
	}
	get size() {
		return this.users.size + this.chats.size;
	}
	add(entities) {
		if (!this.enabled) return;
		for (const entity of collectEntities(entities)) try {
			this.write(require_Utils.getPeerId(entity), toCachedPeer(require_Utils.getInputPeer(entity)));
		} catch {}
	}
	get(item) {
		const found = this.find(item);
		if (!found) throw new Error("No cached entity for the given key");
		return buildInputPeer(found);
	}
	has(item) {
		try {
			return this.find(item) !== void 0;
		} catch {
			return false;
		}
	}
	delete(item) {
		try {
			for (const key of this.candidateKeys(item)) {
				this.pinnedKeys.delete(key);
				if (this.getSegment(key).delete(key)) return true;
			}
		} catch {}
		return false;
	}
	clear() {
		this.users.clear();
		this.chats.clear();
		this.pinnedKeys.clear();
	}
	pin(markedId) {
		if (!this.enabled) return;
		this.pinnedKeys.add(markedId.toString());
	}
	unpin(markedId) {
		this.pinnedKeys.delete(markedId.toString());
	}
	getSegment(key) {
		return key.startsWith("-") ? this.chats : this.users;
	}
	write(key, peer) {
		const segment = this.getSegment(key);
		segment.delete(key);
		segment.set(key, {
			peer,
			writtenAt: Date.now()
		});
		this.prune(segment);
	}
	read(key) {
		const segment = this.getSegment(key);
		const entry = segment.get(key);
		if (!entry) return void 0;
		if (this.isExpired(key, entry, Date.now())) {
			segment.delete(key);
			return;
		}
		segment.delete(key);
		segment.set(key, entry);
		return entry.peer;
	}
	isExpired(key, entry, now) {
		return this.ttl > 0 && now - entry.writtenAt > this.ttl && !this.pinnedKeys.has(key);
	}
	prune(segment) {
		const now = Date.now();
		if (this.ttl > 0) for (const [key, entry] of segment) {
			if (this.pinnedKeys.has(key)) continue;
			if (!this.isExpired(key, entry, now)) break;
			segment.delete(key);
		}
		if (this.max > 0 && segment.size > this.max) for (const key of segment.keys()) {
			if (this.pinnedKeys.has(key)) continue;
			segment.delete(key);
			if (segment.size <= this.max) break;
		}
	}
	find(item) {
		if (!this.enabled) return void 0;
		for (const key of this.candidateKeys(item)) {
			const cached = this.read(key);
			if (cached) return cached;
		}
	}
	*candidateKeys(item) {
		if (item == void 0) throw new Error("No cached entity for the given key");
		const id = require_Helpers.returnBigInt(item);
		if (id.lesser(big_integer.default.zero)) {
			let marked;
			try {
				marked = require_Utils.getPeerId(id);
			} catch {
				throw new Error("Invalid key will not have entity");
			}
			yield marked;
		}
		yield require_Utils.getPeerId(new require_tl_generated_api.Api.PeerUser({ userId: id }));
		yield require_Utils.getPeerId(new require_tl_generated_api.Api.PeerChat({ chatId: id }));
		yield require_Utils.getPeerId(new require_tl_generated_api.Api.PeerChannel({ channelId: id }));
	}
};
exports.ENTITY_CACHE_DEFAULTS = ENTITY_CACHE_DEFAULTS;
exports.EntityCache = EntityCache;
