Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_Utils = require("../../Utils.js");
const require_tl_generated_api = require("../generated/api.js");
require("../api.js");
// teleproto/tl/custom/draft.ts
var Draft = class {
	constructor(client, entity, draft) {
		this._client = client;
		this._peer = require_Utils.getPeer(entity);
		this._entity = entity;
		this._inputEntity = entity ? require_Utils.getInputPeer(entity) : void 0;
		if (!draft || !(draft instanceof require_tl_generated_api.Api.DraftMessage)) draft = new require_tl_generated_api.Api.DraftMessage({
			message: "",
			date: -1
		});
		if (!(draft instanceof require_tl_generated_api.Api.DraftMessageEmpty)) {
			this.linkPreview = !draft.noWebpage;
			this._text = client.parseMode ? client.parseMode.unparse(draft.message, draft.entities || []) : draft.message;
			this._rawText = draft.message;
			this.date = draft.date;
			const replyTo = draft.replyTo;
			if (replyTo != void 0) {
				if ("replyToMsgId" in replyTo) this.replyToMsgId = replyTo.replyToMsgId;
			}
		}
	}
	get entity() {
		return this._entity;
	}
	get inputEntity() {
		if (!this._inputEntity) this._inputEntity = this._client._entityCache.get(this._peer);
		return this._inputEntity;
	}
};
exports.Draft = Draft;
