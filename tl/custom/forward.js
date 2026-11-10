Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_custom_chatGetter = require("./chatGetter.js");
const require_tl_custom_senderGetter = require("./senderGetter.js");
const require_Helpers = require("../../Helpers.js");
const require_Utils = require("../../Utils.js");
// teleproto/tl/custom/forward.ts
var Forward = class extends require_tl_custom_senderGetter.SenderGetter {
	constructor(client, original, entities) {
		super();
		this.originalFwd = original;
		let senderId = void 0;
		let sender = void 0;
		let inputSender = void 0;
		let peer = void 0;
		let chat = void 0;
		let inputChat = void 0;
		if (original.fromId) {
			const ty = require_Helpers._entityType(original.fromId);
			if (ty === require_Helpers._EntityType.USER) {
				senderId = require_Utils.getPeerId(original.fromId);
				[sender, inputSender] = require_Utils._getEntityPair(senderId, entities, client._entityCache);
			} else if (ty === require_Helpers._EntityType.CHANNEL || ty === require_Helpers._EntityType.CHAT) {
				peer = original.fromId;
				[chat, inputChat] = require_Utils._getEntityPair(require_Utils.getPeerId(peer), entities, client._entityCache);
			}
		}
		require_tl_custom_chatGetter.ChatGetter.initChatClass(this, {
			chatPeer: peer,
			chat,
			inputChat
		});
		require_tl_custom_senderGetter.SenderGetter.initSenderClass(this, {
			senderId: senderId ? require_Helpers.returnBigInt(senderId) : void 0,
			sender,
			inputSender
		});
		this._client = client;
	}
};
exports.Forward = Forward;
