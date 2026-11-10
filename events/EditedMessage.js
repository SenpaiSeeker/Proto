Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_generated_api = require("../tl/generated/api.js");
require("../tl/index.js");
const require_events_NewMessage = require("./NewMessage.js");
// teleproto/events/EditedMessage.ts
/**
* Occurs whenever a text message or a message with media was edited.
* @example
* ```ts
* async function editedEventPrint(event: EditedMessageEvent) {
*   const message = event.message as Api.Message;
*
*   console.log(`Message ${message.id} from channel ${message.chatId!.toString();} was edited at ${message.editDate}`)
* }
* // adds an event handler for edited messages
* client.addEventHandler(editedEventPrint, new EditedMessage({}));
* ```
*/
var EditedMessage = class extends require_events_NewMessage.NewMessage {
	constructor(editedMessageParams) {
		super(editedMessageParams);
	}
	build(update, callback, selfId) {
		if (update instanceof require_tl_generated_api.Api.UpdateEditChannelMessage || update instanceof require_tl_generated_api.Api.UpdateEditMessage) {
			if (!(update.message instanceof require_tl_generated_api.Api.Message)) return;
			const event = new EditedMessageEvent(update.message, update);
			this.addAttributes(event);
			return event;
		}
	}
};
var EditedMessageEvent = class extends require_events_NewMessage.NewMessageEvent {
	constructor(message, originalUpdate) {
		super(message, originalUpdate);
	}
};
exports.EditedMessage = EditedMessage;
exports.EditedMessageEvent = EditedMessageEvent;
