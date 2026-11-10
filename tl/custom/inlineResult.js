Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
require("../api.js");
const require_tl_generated_api = require("../generated/api.js");
const require_Utils = require("../../Utils.js");
// teleproto/tl/custom/inlineResult.ts
var InlineResult = class {
	constructor(client, original, queryId, entity) {
		this._ARTICLE = "article";
		this._PHOTO = "photo";
		this._GIF = "gif";
		this._VIDEO = "video";
		this._VIDEO_GIF = "mpeg4_gif";
		this._AUDIO = "audio";
		this._DOCUMENT = "document";
		this._LOCATION = "location";
		this._VENUE = "venue";
		this._CONTACT = "contact";
		this._GAME = "game";
		this._client = client;
		this.result = original;
		this._queryId = queryId;
		this._entity = entity;
	}
	get type() {
		return this.result.type;
	}
	get message() {
		return this.result.sendMessage;
	}
	get description() {
		return this.result.description;
	}
	get url() {
		if (this.result instanceof require_tl_generated_api.Api.BotInlineResult) return this.result.url;
	}
	get photo() {
		if (this.result instanceof require_tl_generated_api.Api.BotInlineResult) return this.result.thumb;
		else return this.result.photo;
	}
	get document() {
		if (this.result instanceof require_tl_generated_api.Api.BotInlineResult) return this.result.content;
		else return this.result.document;
	}
	async click(entity, replyTo, silent = false, clearDraft = false, hideVia = false) {
		if (entity) entity = await this._client.getInputEntity(entity);
		else if (this._entity) entity = this._entity;
		else throw new Error("You must provide the entity where the result should be sent to");
		let replyObject = void 0;
		if (replyTo != void 0) replyObject = new require_tl_generated_api.Api.InputReplyToMessage({ replyToMsgId: require_Utils.getMessageId(replyTo) });
		const request = new require_tl_generated_api.Api.messages.SendInlineBotResult({
			peer: entity,
			queryId: this._queryId,
			id: this.result.id,
			silent,
			clearDraft,
			hideVia,
			replyTo: replyObject
		});
		return await this._client.invoke(request);
	}
};
exports.InlineResult = InlineResult;
