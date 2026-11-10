Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("../../platform/buffer/index.js");
require("../api.js");
require("../../platform/index.js");
const require_Utils = require("../../Utils.js");
const require_tl_generated_api = require("../generated/api.js");
const require_Helpers = require("../../Helpers.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/tl/custom/richText.ts
const references = /* @__PURE__ */ new WeakMap();
function withReference(value, reference) {
	references.set(value, [reference]);
	return value;
}
/** Joins the parts into one rich text: a string becomes plain text, several parts are concatenated. */
function text(...parts) {
	const flat = parts.flatMap((part) => Array.isArray(part) ? part : [part]);
	if (!flat.length) return new require_tl_generated_api.Api.TextEmpty();
	const texts = flat.map((part) => typeof part === "string" ? new require_tl_generated_api.Api.TextPlain({ text: part }) : part);
	return texts.length === 1 ? texts[0] : new require_tl_generated_api.Api.TextConcat({ texts });
}
function bold(...parts) {
	return new require_tl_generated_api.Api.TextBold({ text: text(...parts) });
}
function italic(...parts) {
	return new require_tl_generated_api.Api.TextItalic({ text: text(...parts) });
}
function underline(...parts) {
	return new require_tl_generated_api.Api.TextUnderline({ text: text(...parts) });
}
function strike(...parts) {
	return new require_tl_generated_api.Api.TextStrike({ text: text(...parts) });
}
/** Monospace text. */
function code(...parts) {
	return new require_tl_generated_api.Api.TextFixed({ text: text(...parts) });
}
function subscript(...parts) {
	return new require_tl_generated_api.Api.TextSubscript({ text: text(...parts) });
}
function superscript(...parts) {
	return new require_tl_generated_api.Api.TextSuperscript({ text: text(...parts) });
}
/** Highlighted text. */
function marked(...parts) {
	return new require_tl_generated_api.Api.TextMarked({ text: text(...parts) });
}
function spoiler(...parts) {
	return new require_tl_generated_api.Api.TextSpoiler({ text: text(...parts) });
}
function link(label, url) {
	return new require_tl_generated_api.Api.TextUrl({
		text: text(label),
		url,
		webpageId: big_integer.default.zero
	});
}
function email(label, address) {
	return new require_tl_generated_api.Api.TextEmail({
		text: text(label),
		email: address
	});
}
function phone(label, number) {
	return new require_tl_generated_api.Api.TextPhone({
		text: text(label),
		phone: number
	});
}
/** @hidden */
function inputUserOf(user) {
	const input = user instanceof require_tl_generated_api.Api.User && user.accessHash ? new require_tl_generated_api.Api.InputUser({
		userId: user.id,
		accessHash: user.accessHash
	}) : require_Utils.getInputUser(user);
	if (!(input instanceof require_tl_generated_api.Api.InputUser)) throw new Error("A rich message can only refer to users with an id and access hash");
	return input;
}
/** A mention of `user` by id; the user is attached to the message for you. */
function mention(label, user) {
	const input = inputUserOf(user);
	return withReference(new require_tl_generated_api.Api.TextMentionName({
		text: text(label),
		userId: input.userId
	}), input);
}
/** A link target that `link(label, "#name")` can point to. */
function anchor(label, name) {
	return new require_tl_generated_api.Api.TextAnchor({
		text: text(label),
		name
	});
}
/** An inline TeX formula. */
function math(source) {
	return new require_tl_generated_api.Api.TextMath({ source });
}
/** A date each app formats for its reader. */
function date(value, options = {}) {
	const when = typeof value === "number" ? /* @__PURE__ */ new Date(value * 1e3) : value;
	const { text: label, ...format } = options;
	return new require_tl_generated_api.Api.TextDate({
		...format,
		text: text(label ?? when.toUTCString()),
		date: Math.floor(when.getTime() / 1e3)
	});
}
function customEmoji(documentId, alt) {
	return new require_tl_generated_api.Api.TextCustomEmoji({
		documentId: require_Helpers.returnBigInt(documentId),
		alt
	});
}
/** @hidden */
function referencesOf(value, found = []) {
	if (!value || typeof value !== "object" || require_platform_buffer_index.Buffer.isBuffer(value) || big_integer.default.isInstance(value) || value instanceof Date) return found;
	if (Array.isArray(value)) {
		for (const item of value) referencesOf(item, found);
		return found;
	}
	const own = references.get(value);
	if (own) found.push(...own);
	for (const field of Object.values(value)) referencesOf(field, found);
	return found;
}
exports.anchor = anchor;
exports.bold = bold;
exports.code = code;
exports.customEmoji = customEmoji;
exports.date = date;
exports.email = email;
exports.inputUserOf = inputUserOf;
exports.italic = italic;
exports.link = link;
exports.marked = marked;
exports.math = math;
exports.mention = mention;
exports.phone = phone;
exports.referencesOf = referencesOf;
exports.spoiler = spoiler;
exports.strike = strike;
exports.subscript = subscript;
exports.superscript = superscript;
exports.text = text;
exports.underline = underline;
