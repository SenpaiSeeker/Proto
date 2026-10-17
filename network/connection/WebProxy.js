"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionWebProxy = exports.createWebProxySocket = void 0;
const TCPMTProxy_1 = require("./TCPMTProxy");
var transport_1 = require("./webProxy/transport");
Object.defineProperty(exports, "createWebProxySocket", { enumerable: true, get: function () { return transport_1.createWebProxySocket; } });
/** MTProxy framing over a native WEB relay; configure through proxy.WEB. */
class ConnectionWebProxy extends TCPMTProxy_1.ConnectionTCPMTProxyAbridged {
    async connect() {
        try {
            await super.connect();
        }
        catch (error) {
            await this.socket.close();
            throw error;
        }
    }
    async disconnect() {
        this._connected = false;
        await this.socket.close();
    }
}
exports.ConnectionWebProxy = ConnectionWebProxy;
