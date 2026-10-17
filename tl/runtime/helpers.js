"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeBytes = serializeBytes;
exports.serializeDate = serializeDate;
function serializeBytes(data) {
    if (!(data instanceof Buffer)) {
        if (typeof data === "string") {
            data = Buffer.from(data);
        }
        else {
            throw new Error(`Bytes or str expected, not ${typeof data}`);
        }
    }
    const length = data.length;
    const head = length < 254 ? 1 : 4;
    const padding = (4 - ((head + length) % 4)) % 4;
    const out = Buffer.allocUnsafe(head + length + padding);
    if (head === 1) {
        out[0] = length;
    }
    else {
        out[0] = 254;
        out[1] = length & 255;
        out[2] = (length >> 8) & 255;
        out[3] = (length >> 16) & 255;
    }
    data.copy(out, head);
    out.fill(0, head + length);
    return out;
}
function serializeDate(dt) {
    if (!dt) {
        return Buffer.alloc(4).fill(0);
    }
    if (dt instanceof Date) {
        dt = Math.floor((Date.now() - dt.getTime()) / 1000);
    }
    if (typeof dt === "number") {
        const buffer = Buffer.alloc(4);
        buffer.writeInt32LE(dt, 0);
        return buffer;
    }
    throw new Error(`Cannot interpret "${String(dt)}" as a date`);
}
