Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_tl_generated_schema = require("../generated/schema.js");
const require_tl_core_index = require("../core/index.js");
const require_tl_runtime_defineClass = require("./defineClass.js");
const require_tl_runtime_bases = require("./bases.js");
const require_tl_runtime_schema = require("./schema.js");
require("../../platform/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/tl/runtime/Registry.ts
function lowerFirst(value) {
	return value ? value[0].toLowerCase() + value.slice(1) : value;
}
var Registry = class {
	constructor(schema, bases = {}) {
		this.schema = schema;
		this.bases = bases;
		this.api = {};
		this.byId = /* @__PURE__ */ new Map();
		this.byName = /* @__PURE__ */ new Map();
		this.byTag = /* @__PURE__ */ new Map();
		this.byResult = /* @__PURE__ */ new Map();
		this.classes = new Array(schema.definitions.length);
		schema.definitions.forEach(([, constructorId, , result], index) => {
			const fullName = require_tl_runtime_schema.definitionName(schema, index);
			const dot = fullName.indexOf(".");
			const namespace = dot < 0 ? void 0 : fullName.slice(0, dot);
			const name = dot < 0 ? fullName : fullName.slice(dot + 1);
			this.byId.set(constructorId >>> 0, index);
			this.byName.set(fullName, index);
			this.byTag.set(namespace ? `${namespace}.${lowerFirst(name)}` : lowerFirst(name), index);
			const resultName = schema.strings[result];
			const same = this.byResult.get(resultName);
			if (same) same.push(index);
			else this.byResult.set(resultName, [index]);
			Object.defineProperty(this.namespaceOf(namespace), name, {
				configurable: true,
				enumerable: true,
				get: () => this.classAt(index)
			});
		});
	}
	get layer() {
		return this.schema.layer;
	}
	get constructorIds() {
		return [...this.byId.keys()];
	}
	classById(constructorId) {
		const index = this.byId.get(constructorId >>> 0);
		return index === void 0 ? void 0 : this.classAt(index);
	}
	readerFor(constructorId) {
		return this.classById(constructorId) ?? require_tl_core_index.coreObjects.get(constructorId >>> 0);
	}
	byFullName(name) {
		const index = this.byName.get(name);
		return index === void 0 ? void 0 : this.classAt(index);
	}
	bareType(name) {
		return this.byFullName(name);
	}
	isTlType(type) {
		return this.byResult.has(type);
	}
	coerce(value, expectedType) {
		if (!value || typeof value !== "object" || Array.isArray(value) || big_integer.default.isInstance(value) || require_platform_buffer_index.Buffer.isBuffer(value) || typeof value.getBytes === "function") return value;
		const tag = value._;
		let index;
		if (tag) {
			index = this.byTag.get(tag);
			if (index === void 0) throw new Error(`Unknown TL "_" tag: ${JSON.stringify(tag)}`);
		} else if (expectedType) {
			const candidates = this.byResult.get(expectedType);
			if (candidates && candidates.length > 1) throw new Error(`Ambiguous type "${expectedType}" — add "_" to pick a constructor (one of: ${candidates.map((i) => require_tl_runtime_schema.definitionName(this.schema, i)).join(", ")})`);
			index = candidates?.[0];
		}
		return index === void 0 ? value : new (this.classAt(index))(value);
	}
	namespaceOf(namespace) {
		return namespace ? this.api[namespace] ??= {} : this.api;
	}
	classAt(index) {
		let cls = this.classes[index];
		if (cls) return cls;
		const def = require_tl_runtime_schema.decodeDefinition(this.schema, index);
		cls = require_tl_runtime_defineClass.defineClass(this, def, this.bases[def.fullName]?.());
		this.classes[index] = cls;
		Object.defineProperty(this.namespaceOf(def.namespace), def.name, {
			configurable: true,
			enumerable: true,
			writable: true,
			value: cls
		});
		return cls;
	}
};
const registry = new Registry(require_tl_generated_schema.schema_exports, require_tl_runtime_bases.tlBases);
const LAYER = registry.layer;
const tlobjects = new Proxy({}, {
	get(_target, key) {
		return typeof key === "string" && /^\d+$/.test(key) ? registry.classById(Number(key)) : void 0;
	},
	has(_target, key) {
		return typeof key === "string" && /^\d+$/.test(key) && !!registry.classById(Number(key));
	},
	ownKeys() {
		return registry.constructorIds.map(String);
	},
	getOwnPropertyDescriptor(_target, key) {
		const value = typeof key === "string" && /^\d+$/.test(key) ? registry.classById(Number(key)) : void 0;
		return value ? {
			value,
			enumerable: true,
			configurable: true,
			writable: false
		} : void 0;
	}
});
exports.LAYER = LAYER;
exports.Registry = Registry;
exports.registry = registry;
exports.tlobjects = tlobjects;
