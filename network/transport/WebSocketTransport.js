"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketTransport = void 0;
const TCPObfuscated_1 = require("../connection/TCPObfuscated");
const PromisedWebSockets_1 = require("../../extensions/PromisedWebSockets");
const Transport_1 = require("./Transport");
/** Connects to Telegram over secure WebSocket. */
class WebSocketTransport extends Transport_1.Transport {
    resolve(connection) {
        return { connection: connection ?? TCPObfuscated_1.ConnectionTCPObfuscated, socket: PromisedWebSockets_1.PromisedWebSockets };
    }
}
exports.WebSocketTransport = WebSocketTransport;
