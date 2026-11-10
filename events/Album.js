Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_generated_api = require("../tl/generated/api.js");
const require_events_common = require("./common.js");
require("../tl/index.js");
// teleproto/events/Album.ts
const _ALBUM_DELAY = 500;
/**
* Occurs whenever an album (multiple grouped messages with media) arrive.
* @example
* ```ts
* // Albums are basically a list of messages. so event is a list
*   async function listenForAlbums(event: AlbumEvent) {
*       const messages = event.messages;
*       for (const message of messages){
*           console.log("Caption is",message.text);
*           console.log("Message id is",message.id);
*           console.log("Chat id is",message.chatId);
*       }
*   }
* // adds an event handler for new messages
* client.addEventHandler(listenForAlbums, new Album({}));
* ```
*/
var Album = class extends require_events_common.EventBuilder {
	constructor(albumParams) {
		let { chats, func, blacklistChats = false } = albumParams;
		super({
			chats,
			blacklistChats,
			func
		});
	}
	build(update, dispatch) {
		if (!("message" in update && update.message instanceof require_tl_generated_api.Api.Message)) return;
		const groupedId = update.message.groupedId;
		if (!groupedId) return;
		const albums = this.client._ALBUMS;
		const oldTimeout = albums.get(groupedId.toString());
		let oldValues = [];
		if (oldTimeout) {
			clearTimeout(oldTimeout[0]);
			oldValues.push(...oldTimeout[1]);
		}
		albums.set(groupedId.toString(), [setTimeout(() => {
			const values = albums.get(groupedId.toString());
			albums.delete(groupedId.toString());
			if (!values) return;
			const updates = values[1];
			if (!updates) return;
			const messages = [];
			for (const update of updates) if ("message" in update && update.message instanceof require_tl_generated_api.Api.Message) messages.push(update.message);
			const event = new AlbumEvent(messages, values[1]);
			event._setClient(this.client);
			event._entities = messages[0]._entities;
			dispatch(event);
		}, _ALBUM_DELAY), [...oldValues, update]]);
	}
};
var AlbumEvent = class extends require_events_common.EventCommon {
	constructor(messages, originalUpdates) {
		super({
			msgId: messages[0].id,
			chatPeer: messages[0].peerId,
			broadcast: messages[0].post
		});
		this.originalUpdates = originalUpdates;
		this.messages = messages;
	}
	_setClient(client) {
		super._setClient(client);
		for (let i = 0; i < this.messages.length; i++) try {
			this.messages[i]._finishInit(client, this.originalUpdates[i]._entities || /* @__PURE__ */ new Map(), void 0);
		} catch (e) {
			client._log.error("Got error while trying to finish init message with id " + this.messages[i].id, e);
			if (client._errorHandler) client._errorHandler(e);
		}
	}
};
exports.Album = Album;
exports.AlbumEvent = AlbumEvent;
