"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebProxyTransport = void 0;
const WebProxy_1 = require("../connection/WebProxy");
const Transport_1 = require("./Transport");
/** Connects to Telegram through a WEB relay. Experimental. */
class WebProxyTransport extends Transport_1.Transport {
    constructor(options) {
        super();
        this.options = options;
    }
    resolve(connection) {
        const framing = (0, Transport_1.ownFraming)("WebProxyTransport", WebProxy_1.ConnectionWebProxy, connection);
        const web = (0, WebProxy_1.createWebProxySocket)(this.options);
        return {
            connection: framing,
            socket: web.socket,
            proxy: { MTProxy: true, ip: web.host, port: 443, secret: web.secret },
            clientProxy: { address: web.host, port: 443 },
        };
    }
}
exports.WebProxyTransport = WebProxyTransport;
