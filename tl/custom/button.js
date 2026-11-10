Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
require("../api.js");
const require_Utils = require("../../Utils.js");
const require_tl_generated_api = require("../generated/api.js");
require("../../platform/index.js");
// teleproto/tl/custom/button.ts
var Button = class {
	constructor(button, resize, singleUse, selective) {
		this.button = button;
		this.resize = resize;
		this.singleUse = singleUse;
		this.selective = selective;
	}
	static _isInline(button) {
		return button instanceof require_tl_generated_api.Api.KeyboardInlineButton;
	}
	static inline(text, data, style) {
		if (!data) data = require_platform_buffer_index.Buffer.from(text, "utf-8");
		if (data.length > 64) throw new Error("Too many bytes for the data");
		return new require_tl_generated_api.Api.KeyboardInlineButton({
			text,
			type: new require_tl_generated_api.Api.InlineButtonTypeCallback({ data }),
			style
		});
	}
	static switchInline(text, query = "", samePeer = false, style) {
		return new require_tl_generated_api.Api.KeyboardInlineButton({
			text,
			type: new require_tl_generated_api.Api.InlineButtonTypeSwitchInline({
				query,
				samePeer
			}),
			style
		});
	}
	static url(text, url, style) {
		return new require_tl_generated_api.Api.KeyboardInlineButton({
			text,
			type: new require_tl_generated_api.Api.InlineButtonTypeUrl({ url: url || text }),
			style
		});
	}
	static auth(text, url, bot, writeAccess, fwdText, style) {
		return new require_tl_generated_api.Api.KeyboardInlineButton({
			text,
			type: new require_tl_generated_api.Api.InputInlineButtonTypeUrlAuth({
				url: url || text,
				bot: require_Utils.getInputUser(bot || new require_tl_generated_api.Api.InputUserSelf()),
				requestWriteAccess: writeAccess,
				fwdText
			}),
			style
		});
	}
	static text(text, resize, singleUse, selective) {
		return new this(new require_tl_generated_api.Api.KeyboardButton({
			text,
			type: new require_tl_generated_api.Api.ButtonTypeDefault()
		}), resize, singleUse, selective);
	}
	static requestLocation(text, resize, singleUse, selective) {
		return new this(new require_tl_generated_api.Api.KeyboardButton({
			text,
			type: new require_tl_generated_api.Api.ButtonTypeRequestGeoLocation()
		}), resize, singleUse, selective);
	}
	static requestPhone(text, resize, singleUse, selective) {
		return new this(new require_tl_generated_api.Api.KeyboardButton({
			text,
			type: new require_tl_generated_api.Api.ButtonTypeRequestPhone()
		}), resize, singleUse, selective);
	}
	static requestPoll(text, resize, singleUse, selective) {
		return new this(new require_tl_generated_api.Api.KeyboardButton({
			text,
			type: new require_tl_generated_api.Api.ButtonTypeRequestPoll({})
		}), resize, singleUse, selective);
	}
	static webView(text, url, style) {
		return new require_tl_generated_api.Api.KeyboardInlineButton({
			text,
			type: new require_tl_generated_api.Api.InlineButtonTypeWebView({ url }),
			style
		});
	}
	static simpleWebView(text, url, style) {
		return new require_tl_generated_api.Api.KeyboardButton({
			text,
			type: new require_tl_generated_api.Api.ButtonTypeSimpleWebView({ url }),
			style
		});
	}
	static copy(text, copyText, style) {
		return new require_tl_generated_api.Api.KeyboardInlineButton({
			text,
			type: new require_tl_generated_api.Api.InlineButtonTypeCopy({ copyText }),
			style
		});
	}
	static game(text, style) {
		return new require_tl_generated_api.Api.KeyboardInlineButton({
			text,
			type: new require_tl_generated_api.Api.InlineButtonTypeGame(),
			style
		});
	}
	static buy(text, style) {
		return new require_tl_generated_api.Api.KeyboardInlineButton({
			text,
			type: new require_tl_generated_api.Api.InlineButtonTypeBuy(),
			style
		});
	}
	static disabled(text, style) {
		return new require_tl_generated_api.Api.KeyboardInlineButton({
			text,
			type: new require_tl_generated_api.Api.InlineButtonTypeDisabled(),
			style
		});
	}
	static userProfile(text, user, style) {
		return new require_tl_generated_api.Api.KeyboardInlineButton({
			text,
			type: new require_tl_generated_api.Api.InputInlineButtonTypeUserProfile({ userId: require_Utils.getInputUser(user) }),
			style
		});
	}
	static requestPeer(text, buttonId, peerType, maxCount, style) {
		return new require_tl_generated_api.Api.KeyboardButton({
			text,
			type: new require_tl_generated_api.Api.InputButtonTypeRequestPeer({
				buttonId,
				peerType,
				maxQuantity: maxCount || 1
			}),
			style
		});
	}
	static {
		this.style = Object.assign((opts) => {
			return new require_tl_generated_api.Api.KeyboardButtonStyle(opts || {});
		}, {
			primary: () => new require_tl_generated_api.Api.KeyboardButtonStyle({ bgPrimary: true }),
			danger: () => new require_tl_generated_api.Api.KeyboardButtonStyle({ bgDanger: true }),
			success: () => new require_tl_generated_api.Api.KeyboardButtonStyle({ bgSuccess: true })
		});
	}
	static clear() {
		return new require_tl_generated_api.Api.ReplyKeyboardHide({});
	}
	static forceReply() {
		return new require_tl_generated_api.Api.ReplyKeyboardForceReply({});
	}
};
exports.Button = Button;
