Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../_virtual/_rolldown/runtime.js");
const require_client_methods_2fa = require("./methods/2fa.js");
const require_client_methods_account = require("./methods/account.js");
const require_client_methods_auth = require("./methods/auth.js");
const require_client_methods_bots = require("./methods/bots.js");
const require_client_methods_buttons = require("./methods/buttons.js");
const require_client_methods_chats = require("./methods/chats.js");
const require_client_methods_communities = require("./methods/communities.js");
const require_client_methods_contacts = require("./methods/contacts.js");
const require_client_methods_dialogs = require("./methods/dialogs.js");
const require_client_methods_downloads = require("./methods/downloads.js");
const require_client_methods_folders = require("./methods/folders.js");
const require_client_methods_forums = require("./methods/forums.js");
const require_client_methods_inviteLinks = require("./methods/inviteLinks.js");
const require_client_methods_messageParse = require("./methods/messageParse.js");
const require_client_methods_messages = require("./methods/messages.js");
const require_client_methods_stickers = require("./methods/stickers.js");
const require_client_methods_stories = require("./methods/stories.js");
const require_client_TelegramBaseClient = require("./TelegramBaseClient.js");
const require_client_TelegramClient = require("./TelegramClient.js");
const require_client_updates_index = require("./updates/index.js");
const require_client_methods_uploads = require("./methods/uploads.js");
const require_client_methods_users = require("./methods/users.js");
const require_client_methods_wallet = require("./methods/wallet.js");
// teleproto/client/index.ts
var client_exports = /* @__PURE__ */ require_runtime.__exportAll({
	account: () => require_client_methods_account.account_exports,
	auth: () => require_client_methods_auth.auth_exports,
	bots: () => require_client_methods_bots.bots_exports,
	buttons: () => require_client_methods_buttons.buttons_exports,
	chats: () => require_client_methods_chats.chats_exports,
	communities: () => require_client_methods_communities.communities_exports,
	contacts: () => require_client_methods_contacts.contacts_exports,
	dialogs: () => require_client_methods_dialogs.dialogs_exports,
	downloads: () => require_client_methods_downloads.downloads_exports,
	folders: () => require_client_methods_folders.folders_exports,
	forums: () => require_client_methods_forums.forums_exports,
	inviteLinks: () => require_client_methods_inviteLinks.inviteLinks_exports,
	message: () => require_client_methods_messages.messages_exports,
	messageParse: () => require_client_methods_messageParse.messageParse_exports,
	stickers: () => require_client_methods_stickers.stickers_exports,
	stories: () => require_client_methods_stories.stories_exports,
	telegramBaseClient: () => require_client_TelegramBaseClient.TelegramBaseClient_exports,
	tgClient: () => require_client_TelegramClient.TelegramClient_exports,
	twoFA: () => require_client_methods_2fa._2fa_exports,
	updates: () => require_client_updates_index.updates_exports,
	uploads: () => require_client_methods_uploads.uploads_exports,
	users: () => require_client_methods_users.users_exports,
	wallet: () => require_client_methods_wallet.wallet_exports
});
Object.defineProperty(exports, "account", {
	enumerable: true,
	get: function() {
		return require_client_methods_account.account_exports;
	}
});
Object.defineProperty(exports, "auth", {
	enumerable: true,
	get: function() {
		return require_client_methods_auth.auth_exports;
	}
});
Object.defineProperty(exports, "bots", {
	enumerable: true,
	get: function() {
		return require_client_methods_bots.bots_exports;
	}
});
Object.defineProperty(exports, "buttons", {
	enumerable: true,
	get: function() {
		return require_client_methods_buttons.buttons_exports;
	}
});
Object.defineProperty(exports, "chats", {
	enumerable: true,
	get: function() {
		return require_client_methods_chats.chats_exports;
	}
});
Object.defineProperty(exports, "client_exports", {
	enumerable: true,
	get: function() {
		return client_exports;
	}
});
Object.defineProperty(exports, "communities", {
	enumerable: true,
	get: function() {
		return require_client_methods_communities.communities_exports;
	}
});
Object.defineProperty(exports, "contacts", {
	enumerable: true,
	get: function() {
		return require_client_methods_contacts.contacts_exports;
	}
});
Object.defineProperty(exports, "dialogs", {
	enumerable: true,
	get: function() {
		return require_client_methods_dialogs.dialogs_exports;
	}
});
Object.defineProperty(exports, "downloads", {
	enumerable: true,
	get: function() {
		return require_client_methods_downloads.downloads_exports;
	}
});
Object.defineProperty(exports, "folders", {
	enumerable: true,
	get: function() {
		return require_client_methods_folders.folders_exports;
	}
});
Object.defineProperty(exports, "forums", {
	enumerable: true,
	get: function() {
		return require_client_methods_forums.forums_exports;
	}
});
Object.defineProperty(exports, "inviteLinks", {
	enumerable: true,
	get: function() {
		return require_client_methods_inviteLinks.inviteLinks_exports;
	}
});
Object.defineProperty(exports, "message", {
	enumerable: true,
	get: function() {
		return require_client_methods_messages.messages_exports;
	}
});
Object.defineProperty(exports, "messageParse", {
	enumerable: true,
	get: function() {
		return require_client_methods_messageParse.messageParse_exports;
	}
});
Object.defineProperty(exports, "stickers", {
	enumerable: true,
	get: function() {
		return require_client_methods_stickers.stickers_exports;
	}
});
Object.defineProperty(exports, "stories", {
	enumerable: true,
	get: function() {
		return require_client_methods_stories.stories_exports;
	}
});
Object.defineProperty(exports, "telegramBaseClient", {
	enumerable: true,
	get: function() {
		return require_client_TelegramBaseClient.TelegramBaseClient_exports;
	}
});
Object.defineProperty(exports, "tgClient", {
	enumerable: true,
	get: function() {
		return require_client_TelegramClient.TelegramClient_exports;
	}
});
Object.defineProperty(exports, "twoFA", {
	enumerable: true,
	get: function() {
		return require_client_methods_2fa._2fa_exports;
	}
});
Object.defineProperty(exports, "updates", {
	enumerable: true,
	get: function() {
		return require_client_updates_index.updates_exports;
	}
});
Object.defineProperty(exports, "uploads", {
	enumerable: true,
	get: function() {
		return require_client_methods_uploads.uploads_exports;
	}
});
Object.defineProperty(exports, "users", {
	enumerable: true,
	get: function() {
		return require_client_methods_users.users_exports;
	}
});
Object.defineProperty(exports, "wallet", {
	enumerable: true,
	get: function() {
		return require_client_methods_wallet.wallet_exports;
	}
});
