"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TcpTransport = void 0;
const TCPFull_1 = require("../connection/TCPFull");
const PromisedNetSockets_1 = require("../../extensions/PromisedNetSockets");
const Transport_1 = require("./Transport");
/** Connects to Telegram directly over TCP. This is the default transport. */
class TcpTransport extends Transport_1.Transport {
    resolve(connection) {
        return { connection: connection ?? TCPFull_1.ConnectionTCPFull, socket: PromisedNetSockets_1.PromisedNetSockets };
    }
}
exports.TcpTransport = TcpTransport;
