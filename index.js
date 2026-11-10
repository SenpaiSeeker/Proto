Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_index = require("./tl/index.js");
const require_richMessage = require("./richMessage.js");
const require_client_TelegramClient = require("./client/TelegramClient.js");
const require_tl_custom_button = require("./tl/custom/button.js");
const require_tl_generated_api = require("./tl/generated/api.js");
const require_tl_custom_RichContent = require("./tl/custom/RichContent.js");
const require_tl_custom_keyboard = require("./tl/custom/keyboard.js");
require("./network/index.js");
const require_network_connection_Connection = require("./network/connection/Connection.js");
const require_compat_network_connection_WebProxy = require("./compat/network/connection/WebProxy.js");
const require_network_transport_Transport = require("./network/transport/Transport.js");
const require_network_transport_MTProxyTransport = require("./network/transport/MTProxyTransport.js");
require("./network/transport/index.js");
const require_Version = require("./Version.js");
const require_network_transport_SocksTransport = require("./network/transport/SocksTransport.js");
const require_extensions_Logger = require("./extensions/Logger.js");
const require_network_transport_WebProxyTransport = require("./network/transport/WebProxyTransport.js");
const require_Utils = require("./Utils.js");
const require_network_transport_TcpTransport = require("./network/transport/TcpTransport.js");
const require_network_transport_HttpProxyTransport = require("./network/transport/HttpProxyTransport.js");
const require_network_transport_WebSocketTransport = require("./network/transport/WebSocketTransport.js");
const require_errors_index = require("./errors/index.js");
const require_sessions_index = require("./sessions/index.js");
const require_extensions_index = require("./extensions/index.js");
const require_Helpers = require("./Helpers.js");
const require_client_index = require("./client/index.js");
const require_Password = require("./Password.js");
const require_events_index = require("./events/index.js");
exports.Api = require_tl_generated_api.Api;
exports.Button = require_tl_custom_button.Button;
exports.Connection = require_network_connection_Connection.Connection;
exports.ConnectionWebProxy = require_compat_network_connection_WebProxy.ConnectionWebProxy;
exports.HttpProxyTransport = require_network_transport_HttpProxyTransport.HttpProxyTransport;
exports.InlineKeyboard = require_tl_custom_keyboard.InlineKeyboard;
exports.Keyboard = require_tl_custom_keyboard.Keyboard;
exports.Logger = require_extensions_Logger.Logger;
exports.MTProxyTransport = require_network_transport_MTProxyTransport.MTProxyTransport;
exports.ReplyKeyboard = require_tl_custom_keyboard.ReplyKeyboard;
Object.defineProperty(exports, "Rich", {
	enumerable: true,
	get: function() {
		return require_richMessage.richMessage_exports;
	}
});
exports.RichContent = require_tl_custom_RichContent.RichContent;
exports.SocksTransport = require_network_transport_SocksTransport.SocksTransport;
exports.TcpTransport = require_network_transport_TcpTransport.TcpTransport;
exports.TelegramClient = require_client_TelegramClient.TelegramClient;
exports.Transport = require_network_transport_Transport.Transport;
exports.WebProxyTransport = require_network_transport_WebProxyTransport.WebProxyTransport;
exports.WebSocketTransport = require_network_transport_WebSocketTransport.WebSocketTransport;
Object.defineProperty(exports, "client", {
	enumerable: true,
	get: function() {
		return require_client_index.client_exports;
	}
});
Object.defineProperty(exports, "errors", {
	enumerable: true,
	get: function() {
		return require_errors_index.errors_exports;
	}
});
Object.defineProperty(exports, "events", {
	enumerable: true,
	get: function() {
		return require_events_index.events_exports;
	}
});
Object.defineProperty(exports, "extensions", {
	enumerable: true,
	get: function() {
		return require_extensions_index.extensions_exports;
	}
});
Object.defineProperty(exports, "helpers", {
	enumerable: true,
	get: function() {
		return require_Helpers.Helpers_exports;
	}
});
Object.defineProperty(exports, "password", {
	enumerable: true,
	get: function() {
		return require_Password.Password_exports;
	}
});
Object.defineProperty(exports, "sessions", {
	enumerable: true,
	get: function() {
		return require_sessions_index.sessions_exports;
	}
});
Object.defineProperty(exports, "tl", {
	enumerable: true,
	get: function() {
		return require_tl_index.tl_exports;
	}
});
Object.defineProperty(exports, "utils", {
	enumerable: true,
	get: function() {
		return require_Utils.Utils_exports;
	}
});
exports.version = require_Version.version;
