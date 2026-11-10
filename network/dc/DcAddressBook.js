Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/network/dc/DcAddressBook.ts
const DC_PORT = 443;
const PROD_DC_IPV4 = {
	1: "149.154.175.50",
	2: "149.154.167.51",
	3: "149.154.175.100",
	4: "149.154.167.91",
	5: "149.154.171.5"
};
const PROD_DC_IPV6 = {
	1: "2001:0b28:f23d:f001:0000:0000:0000:000a",
	2: "2001:067c:04e8:f002:0000:0000:0000:000a",
	3: "2001:0b28:f23d:f003:0000:0000:0000:000a",
	4: "2001:067c:04e8:f004:0000:0000:0000:000a",
	5: "2001:0b28:f23f:f005:0000:0000:0000:000a"
};
const TEST_DC_IPV4 = {
	1: "149.154.175.10",
	2: "149.154.167.40",
	3: "149.154.175.117"
};
const TEST_DC_IPV6 = {
	1: "2001:0b28:f23d:f001:0000:0000:0000:000e",
	2: "2001:067c:04e8:f002:0000:0000:0000:000e",
	3: "2001:0b28:f23d:f003:0000:0000:0000:000e"
};
const WEBSOCKET_DC_HOSTS = {
	1: "pluto",
	2: "venus",
	3: "aurora",
	4: "vesta",
	5: "flora"
};
function webSocketDcAddress(dcId, mediaCluster = false) {
	const host = WEBSOCKET_DC_HOSTS[dcId];
	return host ? `${host}${mediaCluster ? "-1" : ""}.web.telegram.org` : void 0;
}
function isTestDcAddress(address) {
	if (Object.values(TEST_DC_IPV4).includes(address) || Object.values(TEST_DC_IPV6).includes(address)) return true;
	if (Object.values(PROD_DC_IPV4).includes(address) || Object.values(PROD_DC_IPV6).includes(address)) return false;
}
var DcAddressBook = class {
	constructor(env) {
		this.env = env;
		this.options = [];
		this.failures = /* @__PURE__ */ new Map();
	}
	get hasConfig() {
		return this.options.length > 0;
	}
	setOptions(options) {
		this.options = options;
	}
	seed(dcId, ipv6 = this.env.ipv6()) {
		if (this.env.webSocket) {
			const host = webSocketDcAddress(dcId);
			return host ? {
				id: dcId,
				ipAddress: host,
				port: 443
			} : void 0;
		}
		const ipAddress = (this.env.testServers ? ipv6 ? TEST_DC_IPV6 : TEST_DC_IPV4 : ipv6 ? PROD_DC_IPV6 : PROD_DC_IPV4)[dcId];
		return ipAddress ? {
			id: dcId,
			ipAddress,
			port: 443
		} : void 0;
	}
	lookup(dcId, media = false) {
		if (this.env.webSocket) {
			const host = webSocketDcAddress(dcId, media);
			return host ? {
				id: dcId,
				ipAddress: host,
				port: 443
			} : void 0;
		}
		const ipv6 = this.env.ipv6();
		let candidates = this.options.filter((option) => option.id === dcId && !option.cdn && !option.tcpoOnly && !option.secret?.length).filter((option) => media || !option.mediaOnly).sort((a, b) => Number(!!a.ipv6 !== ipv6) - Number(!!b.ipv6 !== ipv6));
		if (media && candidates.some((option) => option.mediaOnly)) candidates = candidates.filter((option) => option.mediaOnly);
		if (this.env.proxied && candidates.some((option) => option.static)) candidates = candidates.filter((option) => option.static);
		if (!candidates.length) return void 0;
		const chosen = candidates[this.failureCount(dcId, media) % candidates.length];
		return {
			id: chosen.id,
			ipAddress: chosen.ipAddress,
			port: chosen.port || 443,
			mediaOnly: !!chosen.mediaOnly
		};
	}
	isCdn(dcId) {
		return this.options.some((option) => option.id === dcId && option.cdn);
	}
	cdn(dcId) {
		const ipv6 = this.env.ipv6();
		const candidates = this.options.filter((option) => option.id === dcId && option.cdn).sort((a, b) => Number(!!a.ipv6 !== ipv6) - Number(!!b.ipv6 !== ipv6));
		if (!candidates.length) return void 0;
		const chosen = candidates[this.failureCount(dcId, false) % candidates.length];
		return {
			id: chosen.id,
			ipAddress: chosen.ipAddress,
			port: chosen.port || 443
		};
	}
	resolve(dcId, media = false) {
		const address = this.lookup(dcId, media) ?? this.seed(dcId);
		if (!address) throw new Error(`Cannot find the DC with the ID of ${dcId}`);
		return address;
	}
	next(dcId, current) {
		const failures = this.fail(dcId, false);
		const fromConfig = this.lookup(dcId, false);
		if (fromConfig || this.env.webSocket) return fromConfig ?? this.resolve(dcId);
		const ipv6 = this.env.ipv6();
		const seeds = [current, this.seed(dcId, ipv6)?.ipAddress].filter((ip, index, all) => !!ip && all.indexOf(ip) === index);
		return {
			id: dcId,
			ipAddress: seeds[failures % seeds.length],
			port: 443
		};
	}
	fail(dcId, media) {
		const key = `${dcId}:${media}`;
		const failures = (this.failures.get(key) ?? 0) + 1;
		this.failures.set(key, failures);
		return failures;
	}
	failureCount(dcId, media) {
		return this.failures.get(`${dcId}:${media}`) ?? 0;
	}
};
exports.DC_PORT = DC_PORT;
exports.DcAddressBook = DcAddressBook;
exports.PROD_DC_IPV4 = PROD_DC_IPV4;
exports.PROD_DC_IPV6 = PROD_DC_IPV6;
exports.TEST_DC_IPV4 = TEST_DC_IPV4;
exports.TEST_DC_IPV6 = TEST_DC_IPV6;
exports.WEBSOCKET_DC_HOSTS = WEBSOCKET_DC_HOSTS;
exports.isTestDcAddress = isTestDcAddress;
exports.webSocketDcAddress = webSocketDcAddress;
