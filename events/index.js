Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../_virtual/_rolldown/runtime.js");
const require_events_Raw = require("./Raw.js");
const require_events_NewMessage = require("./NewMessage.js");
const require_events_EditedMessage = require("./EditedMessage.js");
const require_events_UserUpdate = require("./UserUpdate.js");
const require_events_MessageRead = require("./MessageRead.js");
const require_events_DeletedMessage = require("./DeletedMessage.js");
const require_events_ChatAction = require("./ChatAction.js");
const require_events_InlineQuery = require("./InlineQuery.js");
const require_events_Album = require("./Album.js");
const require_events_CallbackQuery = require("./CallbackQuery.js");
// teleproto/events/index.ts
var events_exports = /* @__PURE__ */ require_runtime.__exportAll({
	Album: () => require_events_Album.Album,
	AlbumEvent: () => require_events_Album.AlbumEvent,
	CallbackQuery: () => require_events_CallbackQuery.CallbackQuery,
	CallbackQueryEvent: () => require_events_CallbackQuery.CallbackQueryEvent,
	ChatAction: () => require_events_ChatAction.ChatAction,
	ChatActionEvent: () => require_events_ChatAction.ChatActionEvent,
	DeletedMessage: () => require_events_DeletedMessage.DeletedMessage,
	DeletedMessageEvent: () => require_events_DeletedMessage.DeletedMessageEvent,
	EditedMessage: () => require_events_EditedMessage.EditedMessage,
	EditedMessageEvent: () => require_events_EditedMessage.EditedMessageEvent,
	InlineBuilder: () => require_events_InlineQuery.InlineBuilder,
	InlineQuery: () => require_events_InlineQuery.InlineQuery,
	InlineQueryEvent: () => require_events_InlineQuery.InlineQueryEvent,
	MessageRead: () => require_events_MessageRead.MessageRead,
	MessageReadEvent: () => require_events_MessageRead.MessageReadEvent,
	NewMessage: () => require_events_NewMessage.NewMessage,
	NewMessageEvent: () => require_events_NewMessage.NewMessageEvent,
	Raw: () => require_events_Raw.Raw,
	UserUpdate: () => require_events_UserUpdate.UserUpdate,
	UserUpdateEvent: () => require_events_UserUpdate.UserUpdateEvent
});
exports.Album = require_events_Album.Album;
exports.AlbumEvent = require_events_Album.AlbumEvent;
exports.CallbackQuery = require_events_CallbackQuery.CallbackQuery;
exports.CallbackQueryEvent = require_events_CallbackQuery.CallbackQueryEvent;
exports.ChatAction = require_events_ChatAction.ChatAction;
exports.ChatActionEvent = require_events_ChatAction.ChatActionEvent;
exports.DeletedMessage = require_events_DeletedMessage.DeletedMessage;
exports.DeletedMessageEvent = require_events_DeletedMessage.DeletedMessageEvent;
exports.EditedMessage = require_events_EditedMessage.EditedMessage;
exports.EditedMessageEvent = require_events_EditedMessage.EditedMessageEvent;
exports.InlineBuilder = require_events_InlineQuery.InlineBuilder;
exports.InlineQuery = require_events_InlineQuery.InlineQuery;
exports.InlineQueryEvent = require_events_InlineQuery.InlineQueryEvent;
exports.MessageRead = require_events_MessageRead.MessageRead;
exports.MessageReadEvent = require_events_MessageRead.MessageReadEvent;
exports.NewMessage = require_events_NewMessage.NewMessage;
exports.NewMessageEvent = require_events_NewMessage.NewMessageEvent;
exports.Raw = require_events_Raw.Raw;
exports.UserUpdate = require_events_UserUpdate.UserUpdate;
exports.UserUpdateEvent = require_events_UserUpdate.UserUpdateEvent;
Object.defineProperty(exports, "events_exports", {
	enumerable: true,
	get: function() {
		return events_exports;
	}
});
