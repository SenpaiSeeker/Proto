Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
require("../api.js");
const require_tl_generated_api = require("../generated/api.js");
const require_tl_custom_button = require("./button.js");
const require_Password = require("../../Password.js");
// teleproto/tl/custom/messageButton.ts
var MessageButton = class {
	constructor(client, original, chat, bot, msgId) {
		this.button = original;
		this._bot = bot;
		this._chat = chat;
		this._msgId = msgId;
		this._client = client;
	}
	get client() {
		return this._client;
	}
	get text() {
		return !(this.button instanceof require_tl_custom_button.Button) ? this.button.text : "";
	}
	get data() {
		const type = this._inlineType;
		if (type instanceof require_tl_generated_api.Api.InlineButtonTypeCallback) return type.data;
	}
	get inlineQuery() {
		const type = this._inlineType;
		if (type instanceof require_tl_generated_api.Api.InlineButtonTypeSwitchInline) return type.query;
	}
	get url() {
		const type = this._inlineType;
		if (type instanceof require_tl_generated_api.Api.InlineButtonTypeUrl) return type.url;
	}
	get _inlineType() {
		return this.button instanceof require_tl_generated_api.Api.KeyboardInlineButton ? this.button.type : void 0;
	}
	/**
	* Emulates the behaviour of clicking this button.
	
	If it's a normal `KeyboardButton` with a `ButtonTypeDefault` type, a
	message will be sent, and the sent `Message <Message>` returned.
	
	If it's an inline `InlineButtonTypeCallback` with text and data,
	it will be "clicked" and the `BotCallbackAnswer` returned.
	
	If it's an inline `InlineButtonTypeSwitchInline` button, the
	`StartBot` will be invoked and the resulting updates
	returned.
	
	If it's an `InlineButtonTypeUrl`, the URL of the button will
	be returned.
	
	If it's a `ButtonTypeRequestPhone`, you must indicate that you
	want to ``sharePhone=True`` in order to share it. Sharing it is not a
	default because it is a privacy concern and could happen accidentally.
	
	You may also use ``sharePhone=phone`` to share a specific number, in
	which case either `str` or `InputMediaContact` should be used.
	
	If it's a `ButtonTypeRequestGeoLocation`, you must pass a
	tuple in ``shareGeo=[longitude, latitude]``. Note that Telegram seems
	to have some heuristics to determine impossible locations, so changing
	this value a lot quickly may not work as expected. You may also pass a
	`InputGeoPoint` if you find the order confusing.
	*/
	async click({ sharePhone = false, shareGeo, password }) {
		const inlineType = this._inlineType;
		if (inlineType instanceof require_tl_generated_api.Api.InlineButtonTypeCallback) {
			let encryptedPassword;
			if (password != void 0) {
				const pwd = await this.client.invoke(new require_tl_generated_api.Api.account.GetPassword());
				encryptedPassword = await require_Password.computeCheck(pwd, password);
			}
			const request = new require_tl_generated_api.Api.messages.GetBotCallbackAnswer({
				peer: this._chat,
				msgId: this._msgId,
				data: inlineType.data,
				password: encryptedPassword
			});
			try {
				return await this._client.invoke(request);
			} catch (e) {
				if (e.errorMessage == "BOT_RESPONSE_TIMEOUT") return null;
				throw e;
			}
		} else if (inlineType instanceof require_tl_generated_api.Api.InlineButtonTypeSwitchInline) return this._client.invoke(new require_tl_generated_api.Api.messages.StartBot({
			bot: this._bot,
			peer: this._chat,
			startParam: inlineType.query
		}));
		else if (inlineType instanceof require_tl_generated_api.Api.InlineButtonTypeUrl) return inlineType.url;
		else if (inlineType instanceof require_tl_generated_api.Api.InlineButtonTypeGame) {
			const request = new require_tl_generated_api.Api.messages.GetBotCallbackAnswer({
				peer: this._chat,
				msgId: this._msgId,
				game: true
			});
			try {
				return await this._client.invoke(request);
			} catch (e) {
				if (e.errorMessage == "BOT_RESPONSE_TIMEOUT") return null;
				throw e;
			}
		} else if (this.button instanceof require_tl_generated_api.Api.KeyboardButton) {
			const type = this.button.type;
			if (type instanceof require_tl_generated_api.Api.ButtonTypeDefault) return this._client.sendMessage(this._chat, {
				message: this.button.text,
				parseMode: void 0
			});
			else if (type instanceof require_tl_generated_api.Api.ButtonTypeRequestPhone) {
				if (!sharePhone) throw new Error("cannot click on phone buttons unless sharePhone=true");
				if (sharePhone == true || typeof sharePhone == "string") {
					const me = await this._client.getMe();
					sharePhone = new require_tl_generated_api.Api.InputMediaContact({
						phoneNumber: (sharePhone == true ? me.phone : sharePhone) || "",
						firstName: me.firstName || "",
						lastName: me.lastName || "",
						vcard: ""
					});
				}
				return this._client.sendFile(this._chat, { file: sharePhone });
			} else if (type instanceof require_tl_generated_api.Api.ButtonTypeRequestGeoLocation) {
				if (!shareGeo) throw new Error("cannot click on geo buttons unless shareGeo=[longitude, latitude]");
				if (Array.isArray(shareGeo)) shareGeo = new require_tl_generated_api.Api.InputMediaGeoPoint({ geoPoint: new require_tl_generated_api.Api.InputGeoPoint({
					long: shareGeo[0],
					lat: shareGeo[1]
				}) });
				return this._client.sendFile(this._chat, { file: shareGeo });
			}
		}
	}
};
exports.MessageButton = MessageButton;
