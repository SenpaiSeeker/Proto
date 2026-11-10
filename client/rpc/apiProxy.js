Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/client/rpc/apiProxy.ts
function upperFirst(value) {
	return value ? `${value[0].toUpperCase()}${value.slice(1)}` : value;
}
function asRequestClass(value) {
	return typeof value === "function" && value.classType === "request" ? value : void 0;
}
/** Builds cached method helpers and a typed raw-object entry point. */
function createApiProxy(api, invoke) {
	const lookup = (name) => {
		const parts = name.split(".");
		if (parts.length === 1) return asRequestClass(api[upperFirst(name)]);
		if (parts.length !== 2) return void 0;
		const ns = api[parts[0]];
		return ns && typeof ns === "object" ? asRequestClass(ns[upperFirst(parts[1])]) : void 0;
	};
	const call = async (request, options) => {
		if (request && "classType" in request && request.classType === "request") return invoke(request, options?.dcId, options);
		const tag = request?._;
		const Ctor = typeof tag === "string" ? lookup(tag) : void 0;
		if (!Ctor) throw new TypeError(`Unknown raw API method: ${String(tag)}`);
		return invoke(new Ctor(request), options?.dcId, options);
	};
	const namespaceProxy = (ns, root = false) => {
		const cache = /* @__PURE__ */ new Map();
		return new Proxy(Object.create(null), { get(_target, key) {
			if (typeof key !== "string" || key === "then") return void 0;
			if (root && key === "call") return call;
			if (cache.has(key)) return cache.get(key);
			const Ctor = asRequestClass(ns[upperFirst(key)]);
			if (Ctor) {
				const method = async (params, opts) => {
					const options = Ctor.hasParameters ? opts : opts ?? params;
					return invoke(new Ctor(Ctor.hasParameters ? params : {}), options?.dcId, options);
				};
				cache.set(key, method);
				return method;
			}
			const value = ns[key];
			if (root && value && typeof value === "object") {
				const proxy = namespaceProxy(value);
				cache.set(key, proxy);
				return proxy;
			}
		} });
	};
	return namespaceProxy(api, true);
}
exports.createApiProxy = createApiProxy;
