Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_custom_senderGetter = require("./senderGetter.js");
require("../api.js");
const require_tl_custom_chatGetter = require("./chatGetter.js");
const require_Utils = require("../../Utils.js");
const require_tl_custom_forward = require("./forward.js");
const require_tl_custom_file = require("./file.js");
const require_richMessage = require("../../richMessage.js");
const require_Helpers = require("../../Helpers.js");
const require_tl_generated_api = require("../generated/api.js");
const require_tl_custom_messageButton = require("./messageButton.js");
// teleproto/tl/custom/message.ts
/**
* This custom class aggregates both {@link Api.Message} and {@link Api.MessageService} to ease accessing their members.<br/>
* <br/>
* Remember that this class implements {@link ChatGetter} and {@link SenderGetter}<br/>
* which means you have access to all their sender and chat properties and methods.
*/
var CustomMessage = class extends require_tl_custom_senderGetter.SenderGetter {
	init({ id, peerId = void 0, date = void 0, out = void 0, mentioned = void 0, mediaUnread = void 0, silent = void 0, post = void 0, fromId = void 0, replyTo = void 0, message = void 0, fwdFrom = void 0, viaBotId = void 0, media = void 0, replyMarkup = void 0, entities = void 0, views = void 0, editDate = void 0, postAuthor = void 0, groupedId = void 0, fromScheduled = void 0, legacy = void 0, editHide = void 0, pinned = void 0, restrictionReason = void 0, forwards = void 0, replies = void 0, action = void 0, reactions = void 0, noforwards = void 0, ttlPeriod = void 0, _entities = /* @__PURE__ */ new Map() }) {
		if (!id) throw new Error("id is a required attribute for Message");
		let senderId = void 0;
		if (fromId) senderId = require_Utils.getPeerId(fromId);
		else if (peerId) {
			if (post || !out && peerId instanceof require_tl_generated_api.Api.PeerUser) senderId = require_Utils.getPeerId(peerId);
		}
		this._entities = _entities;
		this.out = out;
		this.mentioned = mentioned;
		this.mediaUnread = mediaUnread;
		this.silent = silent;
		this.post = post;
		this.post = post;
		this.fromScheduled = fromScheduled;
		this.legacy = legacy;
		this.editHide = editHide;
		this.ttlPeriod = ttlPeriod;
		this.id = id;
		this.fromId = fromId;
		this.peerId = peerId;
		this.fwdFrom = fwdFrom;
		this.viaBotId = viaBotId;
		this.replyTo = replyTo;
		this.date = date;
		this.message = message;
		this.media = media instanceof require_tl_generated_api.Api.MessageMediaEmpty ? media : void 0;
		this.replyMarkup = replyMarkup;
		this.entities = entities;
		this.views = views;
		this.forwards = forwards;
		this.replies = replies;
		this.editDate = editDate;
		this.pinned = pinned;
		this.postAuthor = postAuthor;
		this.groupedId = groupedId;
		this.restrictionReason = restrictionReason;
		this.action = action;
		this.noforwards = noforwards;
		this.reactions = reactions;
		this._client = void 0;
		this._text = void 0;
		this._file = void 0;
		this._replyMessage = void 0;
		this._buttons = void 0;
		this._buttonsFlat = void 0;
		this._buttonsCount = 0;
		this._viaBot = void 0;
		this._viaInputBot = void 0;
		this._actionEntities = void 0;
		require_tl_custom_chatGetter.ChatGetter.initChatClass(this, {
			chatPeer: peerId,
			broadcast: post
		});
		require_tl_custom_senderGetter.SenderGetter.initSenderClass(this, { senderId: senderId ? require_Helpers.returnBigInt(senderId) : void 0 });
		this._forward = void 0;
	}
	constructor(args) {
		super();
		this.init(args);
	}
	_finishInit(client, entities, inputChat) {
		this._client = client;
		const cache = client._entityCache;
		if (this.senderId) [this._sender, this._inputSender] = require_Utils._getEntityPair(this.senderId.toString(), entities, cache);
		if (this.chatId) [this._chat, this._inputChat] = require_Utils._getEntityPair(this.chatId.toString(), entities, cache);
		if (inputChat) this._inputChat = inputChat;
		if (this.viaBotId) [this._viaBot, this._viaInputBot] = require_Utils._getEntityPair(this.viaBotId.toString(), entities, cache);
		if (this.fwdFrom) this._forward = new require_tl_custom_forward.Forward(this._client, this.fwdFrom, entities);
		if (this.action) {
			if (this.action instanceof require_tl_generated_api.Api.MessageActionChatAddUser || this.action instanceof require_tl_generated_api.Api.MessageActionChatCreate) this._actionEntities = this.action.users.map((i) => entities.get(i.toString()));
			else if (this.action instanceof require_tl_generated_api.Api.MessageActionChatDeleteUser) this._actionEntities = [entities.get(this.action.userId.toString())];
			else if (this.action instanceof require_tl_generated_api.Api.MessageActionChatJoinedByLink) this._actionEntities = [entities.get(require_Utils.getPeerId(new require_tl_generated_api.Api.PeerChannel({ channelId: this.action.inviterId })))];
			else if (this.action instanceof require_tl_generated_api.Api.MessageActionChannelMigrateFrom) this._actionEntities = [entities.get(require_Utils.getPeerId(new require_tl_generated_api.Api.PeerChat({ chatId: this.action.chatId })))];
		}
	}
	get client() {
		return this._client;
	}
	get text() {
		if (this._text === void 0 && this._client) {
			if (!this._client.parseMode) this._text = this.message;
			else this._text = this._client.parseMode.unparse(this.message || "", this.entities || []);
		}
		return this._text || "";
	}
	set text(value) {
		this._text = value;
		if (this._client && this._client.parseMode) [this.message, this.entities] = this._client.parseMode.parse(value);
		else {
			this.message = value;
			this.entities = [];
		}
	}
	get rawText() {
		return this.message || "";
	}
	/**
	* @param {string} value
	*/
	set rawText(value) {
		this.message = value;
		this.entities = [];
		this._text = "";
	}
	get isReply() {
		return !!this.replyTo;
	}
	get forward() {
		return this._forward;
	}
	async _refetchSender() {
		await this._reloadMessage();
	}
	/**
	* Re-fetches this message to reload the sender and chat entities,
	* along with their input versions.
	* @private
	*/
	async _reloadMessage() {
		if (!this._client) return;
		let msg = void 0;
		try {
			const chat = this.isChannel ? await this.getInputChat() : void 0;
			let temp = await this._client.getMessages(chat, { ids: this.id });
			if (temp) msg = temp[0];
		} catch (e) {
			this._client._log.error("Got error while trying to finish init message with id " + this.id, e);
			if (this._client._errorHandler) await this._client._errorHandler(e);
		}
		if (msg == void 0) return;
		this._sender = msg._sender;
		this._inputSender = msg._inputSender;
		this._chat = msg._chat;
		this._inputChat = msg._inputChat;
		this._viaBot = msg._viaBot;
		this._viaInputBot = msg._viaInputBot;
		this._forward = msg._forward;
		this._actionEntities = msg._actionEntities;
	}
	/**
	* Returns a list of lists of `MessageButton <MessageButton>`, if any.
	* Otherwise, it returns `undefined`.
	*/
	get buttons() {
		if (!this._buttons && this.replyMarkup) {
			if (!this.inputChat) return;
			try {
				const bot = this._neededMarkupBot();
				this._setButtons(this.inputChat, bot);
			} catch (e) {
				return;
			}
		}
		return this._buttons;
	}
	/**
	* Returns `buttons` when that property fails (this is rarely needed).
	*/
	async getButtons() {
		if (!this.buttons && this.replyMarkup) {
			const chat = await this.getInputChat();
			if (!chat) return;
			let bot;
			try {
				bot = this._neededMarkupBot();
			} catch (e) {
				await this._reloadMessage();
				try {
					bot = this._neededMarkupBot();
				} catch (err) {
					bot = this.viaBotId ? await this.client.getInputEntity(this.viaBotId) : await this.getInputSender();
					if (!bot) throw err;
				}
			}
			this._setButtons(chat, bot);
		}
		return this._buttons;
	}
	get buttonCount() {
		if (!this._buttonsCount) {
			if (this.replyMarkup instanceof require_tl_generated_api.Api.ReplyInlineMarkup || this.replyMarkup instanceof require_tl_generated_api.Api.ReplyKeyboardMarkup) this._buttonsCount = this.replyMarkup.rows.map((r) => r.buttons.length).reduce(function(a, b) {
				return a + b;
			}, 0);
			else this._buttonsCount = 0;
		}
		return this._buttonsCount;
	}
	get file() {
		if (!this._file) {
			const media = this.photo || this.document;
			if (media) this._file = new require_tl_custom_file.File(media);
		}
		return this._file;
	}
	get photo() {
		if (this.media instanceof require_tl_generated_api.Api.MessageMediaPhoto) {
			if (this.media.photo instanceof require_tl_generated_api.Api.Photo) return this.media.photo;
		} else if (this.action instanceof require_tl_generated_api.Api.MessageActionChatEditPhoto) return this.action.photo;
		else return this.webPreview && this.webPreview.photo instanceof require_tl_generated_api.Api.Photo ? this.webPreview.photo : void 0;
	}
	get document() {
		if (this.media instanceof require_tl_generated_api.Api.MessageMediaDocument) {
			if (this.media.document instanceof require_tl_generated_api.Api.Document) return this.media.document;
		} else {
			const web = this.webPreview;
			return web && web.document instanceof require_tl_generated_api.Api.Document ? web.document : void 0;
		}
	}
	get webPreview() {
		if (this.media instanceof require_tl_generated_api.Api.MessageMediaWebPage) {
			if (this.media.webpage instanceof require_tl_generated_api.Api.WebPage) return this.media.webpage;
		}
	}
	get audio() {
		return this._documentByAttribute(require_tl_generated_api.Api.DocumentAttributeAudio, (attr) => !attr.voice);
	}
	get voice() {
		return this._documentByAttribute(require_tl_generated_api.Api.DocumentAttributeAudio, (attr) => !!attr.voice);
	}
	get video() {
		return this._documentByAttribute(require_tl_generated_api.Api.DocumentAttributeVideo);
	}
	get videoNote() {
		return this._documentByAttribute(require_tl_generated_api.Api.DocumentAttributeVideo, (attr) => !!attr.roundMessage);
	}
	get gif() {
		return this._documentByAttribute(require_tl_generated_api.Api.DocumentAttributeAnimated);
	}
	get sticker() {
		return this._documentByAttribute(require_tl_generated_api.Api.DocumentAttributeSticker);
	}
	get contact() {
		if (this.media instanceof require_tl_generated_api.Api.MessageMediaContact) return this.media;
	}
	get game() {
		if (this.media instanceof require_tl_generated_api.Api.MessageMediaGame) return this.media.game;
	}
	get geo() {
		if (this.media instanceof require_tl_generated_api.Api.MessageMediaGeo || this.media instanceof require_tl_generated_api.Api.MessageMediaGeoLive || this.media instanceof require_tl_generated_api.Api.MessageMediaVenue) return this.media.geo;
	}
	get invoice() {
		if (this.media instanceof require_tl_generated_api.Api.MessageMediaInvoice) return this.media;
	}
	get poll() {
		if (this.media instanceof require_tl_generated_api.Api.MessageMediaPoll) return this.media;
	}
	get venue() {
		if (this.media instanceof require_tl_generated_api.Api.MessageMediaVenue) return this.media;
	}
	get dice() {
		if (this.media instanceof require_tl_generated_api.Api.MessageMediaDice) return this.media;
	}
	get actionEntities() {
		return this._actionEntities;
	}
	get viaBot() {
		return this._viaBot;
	}
	get viaInputBot() {
		return this._viaInputBot;
	}
	get replyToMsgId() {
		return this.replyTo?.replyToMsgId;
	}
	get toId() {
		if (this._client && !this.out && this.isPrivate) return new require_tl_generated_api.Api.PeerUser({ userId: this._client._selfInputPeer?.userId });
		return this.peerId;
	}
	/** Plain-text rendering of {@link richMessage}, or `undefined` if the message is not rich. */
	get richText() {
		return this.richMessage && this.richMessage instanceof require_tl_generated_api.Api.RichMessage ? require_richMessage.toPlainText(this.richMessage) : void 0;
	}
	/** Markdown rendering of {@link richMessage}, or `undefined` if the message is not rich. */
	get richMarkdown() {
		return this.richMessage && this.richMessage instanceof require_tl_generated_api.Api.RichMessage ? require_richMessage.toMarkdown(this.richMessage) : void 0;
	}
	/** HTML rendering of {@link richMessage}, or `undefined` if the message is not rich. */
	get richHtml() {
		return this.richMessage && this.richMessage instanceof require_tl_generated_api.Api.RichMessage ? require_richMessage.toHtml(this.richMessage) : void 0;
	}
	/**
	* Ensures the full rich message content is available. When the server
	* truncated the delivery (`richMessage.part`), fetches the rest via
	* `messages.getRichMessage` and updates this message in place.
	*
	* @returns This message with complete `richMessage` content.
	*/
	async fetchRichMessage() {
		const current = this.richMessage;
		if (!this._client || !current || !(current instanceof require_tl_generated_api.Api.RichMessage) || !current.part) return this;
		const full = await this._client.getRichMessage(await this.getInputChat(), this.id);
		if (full && full.richMessage) this.richMessage = full.richMessage;
		return this;
	}
	getEntitiesText(cls) {
		let ent = this.entities;
		if (!ent || ent.length == 0) return;
		if (cls) ent = ent.filter((v) => v instanceof cls);
		const texts = require_Utils.getInnerText(this.message || "", ent);
		const zip = (rows) => rows[0].map((_, c) => rows.map((row) => row[c]));
		return zip([ent, texts]);
	}
	async getReplyMessage() {
		if (!this._replyMessage && this._client) {
			if (!this.replyTo) return void 0;
			this._replyMessage = (await this._client.getMessages(this.isChannel ? await this.getInputChat() : void 0, { ids: new require_tl_generated_api.Api.InputMessageReplyTo({ id: this.id }) }))[0];
			if (!this._replyMessage) this._replyMessage = (await this._client.getMessages(this.isChannel ? this._inputChat : void 0, { ids: this.replyToMsgId }))[0];
		}
		return this._replyMessage;
	}
	async respond(params) {
		if (this._client) return this._client.sendMessage(await this.getInputChat(), params);
	}
	async reply(params) {
		if (this._client) {
			params.replyTo = this.id;
			return this._client.sendMessage(await this.getInputChat(), params);
		}
	}
	async forwardTo(entity, params) {
		if (this._client) {
			entity = await this._client.getInputEntity(entity);
			return this._client.forwardMessages(entity, {
				...params,
				messages: [this.id],
				fromPeer: await this.getInputChat()
			});
		}
	}
	async edit(params) {
		const param = params;
		if (this.fwdFrom || !this._client) return void 0;
		if (param.linkPreview == void 0) param.linkPreview = !!this.webPreview;
		if (param.buttons == void 0) param.buttons = this.replyMarkup;
		param.message = this.id;
		return this._client.editMessage(await this.getInputChat(), param);
	}
	async delete({ revoke = true } = {}) {
		if (this._client) return this._client.deleteMessages(await this.getInputChat(), [this.id], { revoke });
	}
	async pin(params) {
		if (this._client) {
			const entity = await this.getInputChat();
			if (entity === void 0) throw Error("Failed to pin message due to cannot get input chat.");
			return this._client.pinMessage(entity, this.id, params);
		}
	}
	async unpin(params) {
		if (this._client) {
			const entity = await this.getInputChat();
			if (entity === void 0) throw Error("Failed to unpin message due to cannot get input chat.");
			return this._client.unpinMessage(entity, this.id, params);
		}
	}
	async downloadMedia(params) {
		if (this._client) return this._client.downloadMedia(this, params || {});
	}
	async markAsRead(params) {
		if (this._client) {
			const entity = await this.getInputChat();
			if (entity === void 0) throw Error(`Failed to mark message id ${this.id} as read due to cannot get input chat.`);
			return this._client.markAsRead(entity, this.id, params);
		}
	}
	async react(reaction, big, addToRecent) {
		if (!this._client) return;
		function toReaction(r) {
			if (typeof r === "string") return new require_tl_generated_api.Api.ReactionEmoji({ emoticon: r });
			if (r instanceof require_tl_generated_api.Api.ReactionEmoji || r instanceof require_tl_generated_api.Api.ReactionCustomEmoji || r instanceof require_tl_generated_api.Api.ReactionPaid || r instanceof require_tl_generated_api.Api.ReactionEmpty) return r;
			return new require_tl_generated_api.Api.ReactionCustomEmoji({ documentId: require_Helpers.returnBigInt(r) });
		}
		let reactionList;
		if (reaction == void 0) reactionList = [];
		else if (Array.isArray(reaction)) reactionList = reaction.map(toReaction);
		else reactionList = [toReaction(reaction)];
		return this._client.sendReaction(await this.getInputChat(), this.id, reactionList, big, addToRecent);
	}
	async getReactions(limit, reaction, offset) {
		if (!this._client) return;
		return this._client.getReactionUsers(await this.getInputChat(), this.id, {
			limit,
			reaction,
			offset
		});
	}
	async copy(entity, params) {
		if (!this._client) return;
		entity = await this._client.getInputEntity(entity);
		return (await this._client.forwardMessages(entity, {
			...params,
			messages: [this.id],
			fromPeer: await this.getInputChat(),
			dropAuthor: true
		}))[0];
	}
	async click({ i, j, text, filter, data, sharePhone, shareGeo, password }) {
		if (!this.client) return;
		if (data) {
			const chat = await this.getInputChat();
			if (!chat) return;
			const button = new require_tl_generated_api.Api.KeyboardInlineButton({
				text: "",
				type: new require_tl_generated_api.Api.InlineButtonTypeCallback({ data })
			});
			return await new require_tl_custom_messageButton.MessageButton(this.client, button, chat, void 0, this.id).click({
				sharePhone,
				shareGeo,
				password
			});
		}
		if (this.poll) {
			function findPoll(answers) {
				if (i != void 0) {
					if (Array.isArray(i)) {
						const corrects = [];
						for (let x = 0; x < i.length; x++) corrects.push(answers[x].option);
						return corrects;
					}
					return [answers[i].option];
				}
				if (text != void 0) {
					if (typeof text == "function") {
						for (const answer of answers) if (text(answer.text)) return [answer.option];
					} else for (const answer of answers) if (answer.text.text == text) return [answer.option];
					return;
				}
				if (filter != void 0) {
					for (const answer of answers) if (filter(answer)) return [answer.option];
					return;
				}
			}
			const options = findPoll(this.poll.poll.answers) || [];
			const chat = await this.getInputChat();
			if (!chat) return;
			return await this.client.invoke(new require_tl_generated_api.Api.messages.SendVote({
				peer: chat,
				msgId: this.id,
				options
			}));
		}
		if (!await this.getButtons()) return;
		function findButton(self) {
			if (!self._buttonsFlat || !self._buttons) return;
			if (Array.isArray(i)) i = i[0];
			if (text != void 0) {
				if (typeof text == "function") {
					for (const button of self._buttonsFlat) if (text(button.text)) return button;
				} else for (const button of self._buttonsFlat) if (button.text == text) return button;
				return;
			}
			if (filter != void 0) {
				for (const button of self._buttonsFlat) if (filter(button)) return button;
				return;
			}
			if (i == void 0) i = 0;
			if (j == void 0) return self._buttonsFlat[i];
			else return self._buttons[i][j];
		}
		const button = findButton(this);
		if (button) return await button.click({
			sharePhone,
			shareGeo,
			password
		});
	}
	/**
	* Helper methods to set the buttons given the input sender and chat.
	*/
	_setButtons(chat, bot) {
		if (this.client && (this.replyMarkup instanceof require_tl_generated_api.Api.ReplyInlineMarkup || this.replyMarkup instanceof require_tl_generated_api.Api.ReplyKeyboardMarkup)) {
			this._buttons = [];
			this._buttonsFlat = [];
			for (const row of this.replyMarkup.rows) {
				const tmp = [];
				for (const button of row.buttons) {
					const btn = new require_tl_custom_messageButton.MessageButton(this.client, button, chat, bot, this.id);
					tmp.push(btn);
					this._buttonsFlat.push(btn);
				}
				this._buttons.push(tmp);
			}
		}
	}
	/**
	*Returns the input peer of the bot that's needed for the reply markup.
	
	This is necessary for `InlineButtonTypeSwitchInline` since we need
	to know what bot we want to start. Raises ``Error`` if the bot
	cannot be found but is needed. Returns `None` if it's not needed.
	*/
	_neededMarkupBot() {
		if (!this.client || this.replyMarkup == void 0) return;
		if (!(this.replyMarkup instanceof require_tl_generated_api.Api.ReplyInlineMarkup || this.replyMarkup instanceof require_tl_generated_api.Api.ReplyKeyboardMarkup)) return;
		for (const row of this.replyMarkup.rows) for (const button of row.buttons) if (button instanceof require_tl_generated_api.Api.KeyboardInlineButton && button.type instanceof require_tl_generated_api.Api.InlineButtonTypeSwitchInline) {
			if (button.type.samePeer || !this.viaBotId) {
				const bot = this._inputSender;
				if (!bot) throw new Error("No input sender");
				return bot;
			} else {
				const ent = this.client._entityCache.get(this.viaBotId);
				if (!ent) throw new Error("No input sender");
				return ent;
			}
		}
	}
	_documentByAttribute(kind, condition) {
		const doc = this.document;
		if (doc) {
			for (const attr of doc.attributes) if (attr instanceof kind) {
				if (condition == void 0 || typeof condition == "function" && condition(attr)) return doc;
				return;
			}
		}
	}
};
exports.CustomMessage = CustomMessage;
