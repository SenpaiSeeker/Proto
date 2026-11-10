Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
require("../../tl/index.js");
const require_tl_custom_button = require("../../tl/custom/button.js");
const require_tl_custom_keyboard = require("../../tl/custom/keyboard.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_tl_custom_messageButton = require("../../tl/custom/messageButton.js");
const require_Helpers = require("../../Helpers.js");
// teleproto/client/methods/buttons.ts
var buttons_exports = /* @__PURE__ */ require_runtime.__exportAll({ buildReplyMarkup: () => buildReplyMarkup });
/**
* Converts a flexible button input into a Telegram {@link Api.TypeReplyMarkup}.
*
* Accepts a single button, a row of buttons, a grid (array of rows), or an existing
* `ReplyMarkup` object. Automatically detects whether buttons are inline or normal
* and wraps them in the appropriate markup type.
*
* @param buttons - The button(s) to convert. Can be a {@link ButtonLike}, an array, or a 2D array.
* @param inlineOnly - If `true`, forces inline-only mode (throws if normal buttons are found).
* @returns The constructed reply markup, or `undefined` if no buttons were provided.
* @hidden
*/
function buildReplyMarkup(buttons, inlineOnly = false) {
	if (buttons == void 0) return;
	if (buttons instanceof require_tl_custom_keyboard.InlineKeyboard || buttons instanceof require_tl_custom_keyboard.ReplyKeyboard) {
		const markup = buttons.build();
		if (inlineOnly && markup instanceof require_tl_generated_api.Api.ReplyKeyboardMarkup) throw new Error("You cannot use non-inline buttons here");
		return markup;
	}
	if ("SUBCLASS_OF_ID" in buttons) {
		if (buttons.SUBCLASS_OF_ID == require_Helpers.unionId("ReplyMarkup")) return buttons;
	}
	if (!require_Helpers.isArrayLike(buttons)) buttons = [[buttons]];
	else if (!buttons || !require_Helpers.isArrayLike(buttons[0])) buttons = [buttons];
	let isInline = false;
	let isNormal = false;
	let resize;
	let singleUse;
	let selective;
	const rows = [];
	for (const row of buttons) {
		const current = [];
		for (let button of row) {
			if (button instanceof require_tl_custom_button.Button) {
				if (button.resize != void 0) resize = button.resize;
				if (button.singleUse != void 0) singleUse = button.singleUse;
				if (button.selective != void 0) selective = button.selective;
				button = button.button;
			} else if (button instanceof require_tl_custom_messageButton.MessageButton) button = button.button;
			if (require_tl_custom_button.Button._isInline(button)) {
				isInline = true;
				current.push(button);
			} else if (button instanceof require_tl_generated_api.Api.KeyboardButton) {
				isNormal = true;
				current.push(button);
			}
		}
		if (current.length) rows.push(current);
	}
	if (inlineOnly && isNormal) throw new Error("You cannot use non-inline buttons here");
	else if (isInline && isNormal) throw new Error("You cannot mix inline with normal buttons");
	else if (isInline) return new require_tl_generated_api.Api.ReplyInlineMarkup({ rows: rows.map((buttons) => new require_tl_generated_api.Api.KeyboardInlineButtonRow({ buttons })) });
	return new require_tl_generated_api.Api.ReplyKeyboardMarkup({
		rows: rows.map((buttons) => new require_tl_generated_api.Api.KeyboardButtonRow({ buttons })),
		resize,
		singleUse,
		selective
	});
}
exports.buildReplyMarkup = buildReplyMarkup;
Object.defineProperty(exports, "buttons_exports", {
	enumerable: true,
	get: function() {
		return buttons_exports;
	}
});
