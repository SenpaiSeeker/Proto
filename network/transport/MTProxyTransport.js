"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MTProxyTransport = void 0;
const TCPMTProxy_1 = require("../connection/TCPMTProxy");
const PromisedNetSockets_1 = require("../../extensions/PromisedNetSockets");
const Transport_1 = require("./Transport");
/** Connects to Telegram through an MTProxy server. */
class MTProxyTransport extends Transport_1.Transport {
    constructor(options) {
        super();
        this.options = options;
    }
    resolve(connection) {
        const { host, port, secret, timeout } = this.options;
        return {
            connection: (0, Transport_1.ownFraming)("MTProxyTransport", TCPMTProxy_1.ConnectionTCPMTProxyAbridged, connection),
            socket: PromisedNetSockets_1.PromisedNetSockets,
            proxy: { MTProxy: true, ip: host, port, secret, timeout },
            clientProxy: { address: host, port },
        };
    }
}
exports.MTProxyTransport = MTProxyTransport;
