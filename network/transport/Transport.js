"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
exports.ownFraming = ownFraming;
exports.resolveLegacyTransport = resolveLegacyTransport;
const TCPObfuscated_1 = require("../connection/TCPObfuscated");
const TCPMTProxy_1 = require("../connection/TCPMTProxy");
const WebProxy_1 = require("../connection/WebProxy");
/**
 * How the client reaches Telegram's data centers: directly, through a proxy or over WebSocket.
 * This is the route, not the MTProto packet framing, which stays the `connection` client option.
 */
class Transport {
}
exports.Transport = Transport;
function ownFraming(transport, framing, requested) {
    if (requested && requested !== framing) {
        throw new Error(`${transport} uses its own packet framing: remove the connection option`);
    }
    return framing;
}
/** @hidden */
function resolveLegacyTransport(options) {
    let { connection, socket, proxy } = options;
    if (!options.explicitConnection && socket.isWebSocket) {
        connection = TCPObfuscated_1.ConnectionTCPObfuscated;
    }
    const webProxy = proxy && "WEB" in proxy ? proxy : undefined;
    if (webProxy) {
        if ((options.explicitConnection && connection !== WebProxy_1.ConnectionWebProxy) ||
            options.explicitSocket) {
            throw new Error("WEB proxy requires its own connection and socket adapter");
        }
        const web = (0, WebProxy_1.createWebProxySocket)(webProxy);
        socket = web.socket;
        proxy = { MTProxy: true, ip: web.host, port: 443, secret: web.secret };
    }
    let clientProxy;
    if (proxy && "MTProxy" in proxy) {
        connection = webProxy ? WebProxy_1.ConnectionWebProxy : TCPMTProxy_1.ConnectionTCPMTProxyAbridged;
        clientProxy = { address: proxy.ip, port: proxy.port };
    }
    return { connection, socket, proxy, clientProxy };
}
