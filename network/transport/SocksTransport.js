"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocksTransport = void 0;
const TCPFull_1 = require("../connection/TCPFull");
const PromisedNetSockets_1 = require("../../extensions/PromisedNetSockets");
const Transport_1 = require("./Transport");
/** Connects to Telegram through a SOCKS4 or SOCKS5 proxy. */
class SocksTransport extends Transport_1.Transport {
    constructor(options) {
        super();
        this.options = options;
    }
    resolve(connection) {
        const { host, port, version, username, password, timeout } = this.options;
        return {
            connection: connection ?? TCPFull_1.ConnectionTCPFull,
            socket: PromisedNetSockets_1.PromisedNetSockets,
            proxy: { socksType: version, ip: host, port, username, password, timeout },
        };
    }
}
exports.SocksTransport = SocksTransport;
