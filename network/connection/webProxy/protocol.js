"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_ITEMS = exports.MAX_STREAM_QUEUE = exports.MAX_QUEUE = exports.CHUNK = exports.MAX_PAYLOAD = exports.MAX_BATCH = exports.WINDOW = void 0;
exports.configure = configure;
exports.frame = frame;
exports.parseFrames = parseFrames;
exports.token = token;
const cifrante_1 = require("cifrante");
const Helpers_1 = require("../../../Helpers");
const node_net_1 = require("node:net");
exports.WINDOW = 4 * 1024 * 1024;
exports.MAX_BATCH = 2 * 1024 * 1024;
exports.MAX_PAYLOAD = 1024 * 1024;
exports.CHUNK = 64 * 1024;
exports.MAX_QUEUE = 32 * 1024 * 1024;
exports.MAX_STREAM_QUEUE = 8 * 1024 * 1024;
exports.MAX_ITEMS = 8192;
function configure(options) {
    const input = options.server.replace(/^https:\/\//i, "");
    const slash = input.indexOf("/");
    const hostInput = slash < 0 ? input : input.slice(0, slash);
    const path = slash < 0 ? "" : input.slice(slash + 1);
    if (!hostInput || /[\s:@?#%\\]/.test(hostInput) ||
        (slash >= 0 && (!path || path.length > 128 || !/^[A-Za-z0-9][A-Za-z0-9_-]*(\/[A-Za-z0-9][A-Za-z0-9_-]*)*$/.test(path)))) {
        throw new Error("WEB proxy requires a hostname and optional canonical base path");
    }
    const host = new URL(`https://${hostInput}`).hostname;
    if ((0, node_net_1.isIP)(host) || host.length > 253 || !host.includes(".") ||
        !host.split(".").every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) {
        throw new Error("WEB proxy requires a DNS hostname");
    }
    const encoded = options.secret;
    let secret;
    if (/^(?:[a-fA-F0-9]{2})+$/.test(encoded))
        secret = Buffer.from(encoded, "hex");
    else if (/^[A-Za-z0-9+/_-]+={0,2}$/.test(encoded)) {
        secret = Buffer.from(encoded, "base64");
        if (secret.toString("base64url") !== encoded.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")) {
            throw new Error("Invalid WEB proxy secret encoding");
        }
    }
    else
        throw new Error("Invalid WEB proxy secret encoding");
    if (secret.length >= 17 && secret[0] === 0x70)
        secret = secret.subarray(1);
    if (secret.length !== 16 && !(secret.length === 17 && secret[0] === 0xdd)) {
        throw new Error("WEB proxy requires a plain or dd secret; fake TLS secrets are unsupported");
    }
    const connectTimeoutMs = options.connectTimeoutMs ?? 30000;
    const requestTimeoutMs = options.requestTimeoutMs ?? 90000;
    const maxStreams = options.maxStreams ?? 32;
    for (const value of [connectTimeoutMs, requestTimeoutMs, maxStreams]) {
        if (!Number.isSafeInteger(value) || value <= 0 || value > 2147483647)
            throw new Error("Invalid WEB proxy limit");
    }
    if (maxStreams > 256)
        throw new Error("WEB proxy maxStreams cannot exceed 256");
    const context = path ? `tdesktop-web-proxy-bridge-v2\n${host}\n${path}` : `tdesktop-web-proxy-bridge-v1\n${host}`;
    const capability = (0, Helpers_1.asBuffer)(cifrante_1.hmac.sha256.sync(secret, context)).toString("base64url");
    return { host, base: `https://${host}/${path ? path + "/" : ""}`, secret: secret.toString("hex"), capability,
        connectTimeoutMs, requestTimeoutMs, maxStreams, webSocket: options.webSocket };
}
function frame(type, id, payload = Buffer.alloc(0)) {
    const result = Buffer.allocUnsafe(8 + payload.length);
    result[0] = type;
    result.writeUIntBE(id, 1, 3);
    result.writeUInt32BE(payload.length, 4);
    payload.copy(result, 8);
    return result;
}
function parseFrames(data) {
    if (!data.length || data.length > exports.MAX_BATCH)
        throw new Error("Invalid WEB proxy batch size");
    const frames = [];
    for (let offset = 0; offset < data.length;) {
        if (data.length - offset < 8 || frames.length >= 4096)
            throw new Error("Invalid WEB proxy frame batch");
        const type = data[offset], id = data.readUIntBE(offset + 1, 3), size = data.readUInt32BE(offset + 4);
        const end = offset + 8 + size;
        if (size > exports.MAX_PAYLOAD || end > data.length)
            throw new Error("Invalid WEB proxy frame length");
        frames.push({ type, id, payload: data.subarray(offset + 8, end) });
        offset = end;
    }
    return frames;
}
function token(value) {
    if (!value || !/^[A-Za-z0-9_-]{43}$/.test(value) || Buffer.from(value, "base64url").toString("base64url") !== value) {
        throw new Error("Invalid WEB proxy token");
    }
    return value;
}
