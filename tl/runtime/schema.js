Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/tl/runtime/schema.ts
const FIELD_VECTOR = 1;
const FIELD_FLAG = 2;
const FIELD_BARE = 4;
const FIELD_FLAGS_INDICATOR = 8;
const FIELD_VECTOR_ID = 16;
function definitionName(schema, index) {
	return schema.strings[schema.definitions[index][0]];
}
function decodeDefinition(schema, index) {
	const [fullNameIndex, constructorId, subclassOfId, result, isFunction, fields = []] = schema.definitions[index];
	const fullName = schema.strings[fullNameIndex];
	const dot = fullName.indexOf(".");
	return {
		name: dot < 0 ? fullName : fullName.slice(dot + 1),
		namespace: dot < 0 ? void 0 : fullName.slice(0, dot),
		fullName,
		constructorId,
		subclassOfId,
		result: schema.strings[result],
		isFunction: isFunction === 1,
		fields: fields.map(([name, type, bits, flagField = -1, flagBit = -1]) => ({
			name: schema.strings[name],
			type: type < 0 ? null : schema.strings[type],
			isVector: (bits & 1) !== 0,
			isFlag: (bits & 2) !== 0,
			bare: (bits & 4) !== 0,
			isFlagsIndicator: (bits & 8) !== 0,
			useVectorId: (bits & 16) !== 0,
			flagField,
			flagBit
		}))
	};
}
exports.FIELD_BARE = FIELD_BARE;
exports.FIELD_FLAG = FIELD_FLAG;
exports.FIELD_FLAGS_INDICATOR = FIELD_FLAGS_INDICATOR;
exports.FIELD_VECTOR = FIELD_VECTOR;
exports.FIELD_VECTOR_ID = FIELD_VECTOR_ID;
exports.decodeDefinition = decodeDefinition;
exports.definitionName = definitionName;
