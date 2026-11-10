Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_generated_api = require("../tl/generated/api.js");
require("../tl/index.js");
// teleproto/extensions/markdown.ts
const DEFAULT_DELIMITERS = {
	"**": require_tl_generated_api.Api.MessageEntityBold,
	__: require_tl_generated_api.Api.MessageEntityItalic,
	"~~": require_tl_generated_api.Api.MessageEntityStrike,
	"`": require_tl_generated_api.Api.MessageEntityCode,
	"```": require_tl_generated_api.Api.MessageEntityPre
};
var MarkdownParser = class {
	static parse(message) {
		let i = 0;
		const keys = {};
		for (const k in DEFAULT_DELIMITERS) keys[k] = false;
		const entities = [];
		const tempEntities = {};
		while (i < message.length) {
			let foundIndex = -1;
			let foundDelim = void 0;
			for (const key of Object.keys(DEFAULT_DELIMITERS)) {
				const index = message.indexOf(key, i);
				if (index > -1 && (foundIndex === -1 || index < foundIndex)) {
					foundIndex = index;
					foundDelim = key;
				}
			}
			if (foundIndex === -1 || foundDelim == void 0) break;
			if (!keys[foundDelim]) {
				tempEntities[foundDelim] = new DEFAULT_DELIMITERS[foundDelim]({
					offset: foundIndex,
					length: -1,
					language: ""
				});
				keys[foundDelim] = true;
			} else {
				keys[foundDelim] = false;
				tempEntities[foundDelim].length = foundIndex - tempEntities[foundDelim].offset;
				entities.push(tempEntities[foundDelim]);
			}
			message = message.toString().replace(foundDelim, "");
			i = foundIndex;
		}
		return [message, entities];
	}
	static unparse(text, entities) {
		const delimiters = DEFAULT_DELIMITERS;
		if (!text || !entities) return text;
		let insertAt = [];
		const tempDelimiters = /* @__PURE__ */ new Map();
		Object.keys(delimiters).forEach((key) => {
			tempDelimiters.set(delimiters[key].className, key);
		});
		for (const entity of entities) {
			const s = entity.offset;
			const e = entity.offset + entity.length;
			const delimiter = tempDelimiters.get(entity.className);
			if (delimiter) {
				insertAt.push([s, delimiter]);
				insertAt.push([e, delimiter]);
			}
		}
		insertAt = insertAt.sort((a, b) => {
			return a[0] - b[0];
		});
		while (insertAt.length) {
			const [at, what] = insertAt.pop();
			text = text.slice(0, at) + what + text.slice(at);
		}
		return text;
	}
};
exports.DEFAULT_DELIMITERS = DEFAULT_DELIMITERS;
exports.MarkdownParser = MarkdownParser;
