Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_generated_api = require("../tl/generated/api.js");
require("../tl/index.js");
const require_events_common = require("./common.js");
// teleproto/events/InlineQuery.ts
/**
* Occurs when a user sends an inline query to your bot (e.g., `@bot query`).
*
* @remarks
* This event only works for bot accounts.
*
* @example
* ```ts
* client.addEventHandler(async (event: InlineQueryEvent) => {
*     console.log(`Query: ${event.text}`);
*
*     // Respond with results
*     await event.answer([
*         event.builder.article("Title", { text: "Content", description: "Description" })
*     ]);
* }, new InlineQuery({}));
*
* // With pattern matching
* client.addEventHandler(async (event: InlineQueryEvent) => {
*     console.log(`Matched: ${event.patternMatch?.[1]}`);
* }, new InlineQuery({ pattern: /search (.+)/ }));
* ```
*/
var InlineQuery = class extends require_events_common.EventBuilder {
	constructor(params = {}) {
		super({
			chats: params.users,
			blacklistChats: params.blacklistUsers,
			func: params.func
		});
		this._blacklistUsers = params.blacklistUsers ?? false;
		if (params.pattern) this._pattern = typeof params.pattern === "string" ? new RegExp(params.pattern) : params.pattern;
	}
	async _resolve(client) {
		await super._resolve(client);
		this._users = this.chats;
	}
	build(update) {
		if (update instanceof require_tl_generated_api.Api.UpdateBotInlineQuery) return new InlineQueryEvent(update);
		if (update instanceof require_tl_generated_api.Api.UpdateBotInlineSend) return new InlineQueryEvent(update);
	}
	filter(event) {
		if (this._users !== void 0) {
			const userIdStr = event.userId?.toString();
			if (!userIdStr) return void 0;
			if (this._users.includes(userIdStr) === this._blacklistUsers) return;
		}
		if (this._pattern && event.text) {
			const match = event.text.match(this._pattern);
			if (!match) return;
			event._patternMatch = match;
		}
		if (this.func && !this.func(event)) return;
		return event;
	}
};
/**
* Helper class for building inline query results.
*/
var InlineBuilder = class {
	constructor() {
		this._resultId = 0;
	}
	_nextId() {
		return String(this._resultId++);
	}
	/**
	* Creates an article result.
	*/
	article(title, params = {}) {
		const sendMessage = new require_tl_generated_api.Api.InputBotInlineMessageText({
			message: params.text ?? "",
			entities: params.entities,
			noWebpage: params.linkPreview === false,
			replyMarkup: params.replyMarkup
		});
		return new require_tl_generated_api.Api.InputBotInlineResult({
			id: params.id ?? this._nextId(),
			type: "article",
			title,
			description: params.description,
			url: params.url,
			thumb: params.thumb,
			content: params.content,
			sendMessage
		});
	}
	/**
	* Creates a photo result from an existing photo.
	*/
	photo(photo, params = {}) {
		const sendMessage = new require_tl_generated_api.Api.InputBotInlineMessageMediaAuto({
			message: params.text ?? "",
			entities: params.entities,
			replyMarkup: params.replyMarkup
		});
		return new require_tl_generated_api.Api.InputBotInlineResultPhoto({
			id: params.id ?? this._nextId(),
			type: "photo",
			photo,
			sendMessage
		});
	}
	/**
	* Creates a document result.
	*/
	document(document, params = {}) {
		const sendMessage = new require_tl_generated_api.Api.InputBotInlineMessageMediaAuto({
			message: params.text ?? "",
			entities: params.entities,
			replyMarkup: params.replyMarkup
		});
		return new require_tl_generated_api.Api.InputBotInlineResultDocument({
			id: params.id ?? this._nextId(),
			type: params.type ?? "file",
			title: params.title,
			description: params.description,
			document,
			sendMessage
		});
	}
	/**
	* Creates a game result.
	*/
	game(shortName, params = {}) {
		const sendMessage = new require_tl_generated_api.Api.InputBotInlineMessageGame({ replyMarkup: params.replyMarkup });
		return new require_tl_generated_api.Api.InputBotInlineResultGame({
			id: params.id ?? this._nextId(),
			shortName,
			sendMessage
		});
	}
	/**
	* Creates a geo location result.
	*/
	geo(geoPoint, params = {}) {
		const sendMessage = new require_tl_generated_api.Api.InputBotInlineMessageMediaGeo({
			geoPoint,
			heading: params.heading,
			period: params.period,
			proximityNotificationRadius: params.proximityNotificationRadius,
			replyMarkup: params.replyMarkup
		});
		return new require_tl_generated_api.Api.InputBotInlineResult({
			id: params.id ?? this._nextId(),
			type: "geo",
			title: params.title,
			description: params.description,
			sendMessage
		});
	}
	/**
	* Creates a venue result.
	*/
	venue(geoPoint, title, address, params = {}) {
		const sendMessage = new require_tl_generated_api.Api.InputBotInlineMessageMediaVenue({
			geoPoint,
			title,
			address,
			provider: params.provider ?? "",
			venueId: params.venueId ?? "",
			venueType: params.venueType ?? "",
			replyMarkup: params.replyMarkup
		});
		return new require_tl_generated_api.Api.InputBotInlineResult({
			id: params.id ?? this._nextId(),
			type: "venue",
			title,
			description: params.description,
			sendMessage
		});
	}
	/**
	* Creates a contact result.
	*/
	contact(phoneNumber, firstName, params = {}) {
		const sendMessage = new require_tl_generated_api.Api.InputBotInlineMessageMediaContact({
			phoneNumber,
			firstName,
			lastName: params.lastName ?? "",
			vcard: params.vcard ?? "",
			replyMarkup: params.replyMarkup
		});
		return new require_tl_generated_api.Api.InputBotInlineResult({
			id: params.id ?? this._nextId(),
			type: "contact",
			title: firstName,
			description: params.description,
			sendMessage
		});
	}
};
/**
* Represents an inline query event.
*/
var InlineQueryEvent = class extends require_events_common.EventCommonSender {
	constructor(update) {
		super({});
		this._eventName = "InlineQuery";
		this._answered = false;
		this.originalUpdate = update;
		this._isChosen = update instanceof require_tl_generated_api.Api.UpdateBotInlineSend;
		if (update instanceof require_tl_generated_api.Api.UpdateBotInlineQuery) {
			this._userId = update.userId;
			this._queryId = update.queryId;
			this._text = update.query;
			this._offset = update.offset;
			this._geo = update.geo;
			this._peerType = update.peerType;
		} else {
			this._userId = update.userId;
			this._text = update.query;
			this._offset = "";
			this._geo = update.geo;
			this._resultId = update.id;
			this._msgId = update.msgId;
		}
	}
	/**
	* The unique query ID.
	*/
	get id() {
		return this._queryId;
	}
	/**
	* The query text sent by the user.
	*/
	get text() {
		return this._text;
	}
	/**
	* Alias for text.
	*/
	get query() {
		return this._text;
	}
	/**
	* The offset for pagination.
	*/
	get offset() {
		return this._offset;
	}
	/**
	* The user ID who sent the query.
	*/
	get userId() {
		return this._userId;
	}
	/**
	* The geographic location of the user (if shared).
	*/
	get geo() {
		return this._geo;
	}
	/**
	* The type of peer from which the query was sent.
	*/
	get peerType() {
		return this._peerType;
	}
	/**
	* Whether this is a "chosen result" event (UpdateBotInlineSend).
	*/
	get isChosen() {
		return this._isChosen;
	}
	/**
	* The chosen result ID (only for UpdateBotInlineSend).
	*/
	get resultId() {
		return this._resultId;
	}
	/**
	* The message ID of the sent inline message (only for UpdateBotInlineSend).
	*/
	get msgId() {
		return this._msgId;
	}
	/**
	* The regex pattern match result (if pattern was set in InlineQuery).
	*/
	get patternMatch() {
		return this._patternMatch;
	}
	/**
	* A helper to build inline results.
	*/
	get builder() {
		if (!this._builder) this._builder = new InlineBuilder();
		return this._builder;
	}
	/**
	* Whether this query has already been answered.
	*/
	get answered() {
		return this._answered;
	}
	/**
	* Answer the inline query with results.
	*
	* @param results - Array of inline results (max 50)
	* @param params - Additional parameters
	*/
	async answer(results = [], params = {}) {
		if (!this._client || !this._queryId) return false;
		if (this._answered) return false;
		if (results.length > 50) throw new Error("Cannot send more than 50 inline results");
		let switchPm;
		if (params.switchPm) switchPm = new require_tl_generated_api.Api.InlineBotSwitchPM({
			text: params.switchPm.text,
			startParam: params.switchPm.startParam
		});
		let switchWebview;
		if (params.switchWebview) switchWebview = new require_tl_generated_api.Api.InlineBotWebView({
			text: params.switchWebview.text,
			url: params.switchWebview.url
		});
		try {
			await this._client.invoke(new require_tl_generated_api.Api.messages.SetInlineBotResults({
				queryId: this._queryId,
				results,
				cacheTime: params.cacheTime ?? 0,
				gallery: params.gallery,
				private: params.private,
				nextOffset: params.nextOffset,
				switchPm,
				switchWebview
			}));
			this._answered = true;
			return true;
		} catch {
			return false;
		}
	}
	/**
	* Get the user who sent the query.
	*/
	async getUser() {
		if (!this._client) return void 0;
		try {
			const entity = await this._client.getEntity(new require_tl_generated_api.Api.PeerUser({ userId: this._userId }));
			if (entity instanceof require_tl_generated_api.Api.User) return entity;
		} catch {
			return;
		}
	}
};
exports.InlineBuilder = InlineBuilder;
exports.InlineQuery = InlineQuery;
exports.InlineQueryEvent = InlineQueryEvent;
