"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MTProtoState = exports.DuplicateMessageError = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const cifrante_1 = require("cifrante");
const big_integer_1 = __importDefault(require("big-integer"));
const Helpers_1 = require("../Helpers");
const tl_1 = require("../tl");
const Helpers_2 = require("../Helpers");
const core_1 = require("../tl/core");
const extensions_1 = require("../extensions");
const IGE_1 = require("../crypto/IGE");
const errors_1 = require("../errors");
const ReceivedIdsManager_1 = require("./ReceivedIdsManager");
class DuplicateMessageError extends errors_1.SecurityError {
    constructor(msgId) {
        super(`Duplicate message ${msgId}`);
        this.msgId = msgId;
    }
}
exports.DuplicateMessageError = DuplicateMessageError;
class MTProtoState {
    constructor(authKey, loggers, securityChecks = true) {
        this.authKey = authKey;
        this._log = loggers;
        this.timeOffset = 0;
        this.salt = big_integer_1.default.zero;
        this._sequence = 0;
        this.id = this._lastMsgId = big_integer_1.default.zero;
        this.receivedIds = new ReceivedIdsManager_1.ReceivedIdsManager();
        this.securityChecks = securityChecks;
        this.reset();
    }
    hasReceived(msgId) {
        return this.receivedIds.has(msgId);
    }
    get sessionId() {
        return this.id;
    }
    reset() {
        // Session IDs can be random on every connection
        this.id = (0, Helpers_1.generateRandomLong)(true);
        this._sequence = 0;
        this._lastMsgId = big_integer_1.default.zero;
        this.receivedIds.clear();
    }
    /**
     * Calculate the key based on Telegram guidelines, specifying whether it's the client or not
     * @param authKey
     * @param msgKey
     * @param client
     * @returns {{iv: Buffer, key: Buffer}}
     */
    _calcKey(authKey, msgKey, client) {
        const x = client ? 0 : 8;
        const sha256a = (0, Helpers_1.asBuffer)(cifrante_1.sha256.sync
            .create()
            .update(msgKey)
            .update(authKey.subarray(x, x + 36))
            .digest());
        const sha256b = (0, Helpers_1.asBuffer)(cifrante_1.sha256.sync
            .create()
            .update(authKey.subarray(x + 40, x + 76))
            .update(msgKey)
            .digest());
        const key = Buffer.allocUnsafe(32);
        sha256a.copy(key, 0, 0, 8);
        sha256b.copy(key, 8, 8, 24);
        sha256a.copy(key, 24, 24, 32);
        const iv = Buffer.allocUnsafe(32);
        sha256b.copy(iv, 0, 0, 8);
        sha256a.copy(iv, 8, 8, 24);
        sha256b.copy(iv, 24, 24, 32);
        return { key, iv };
    }
    /**
     * Writes a message containing the given data into buffer.
     * Returns the message id.
     * @param buffer
     * @param data
     * @param contentRelated
     * @param afterId
     */
    async writeDataAsMessage(buffer, data, contentRelated, afterId, predeterminedMsgId) {
        const msgId = predeterminedMsgId ?? this._getNewMsgId();
        const seqNo = this._getSeqNo(contentRelated);
        let body;
        if (!afterId) {
            body = await core_1.GZIPPacked.gzipIfSmaller(contentRelated, data);
        }
        else {
            body = await core_1.GZIPPacked.gzipIfSmaller(contentRelated, new tl_1.Api.InvokeAfterMsg({
                msgId: afterId,
                query: {
                    getBytes() {
                        return data;
                    },
                },
            }).getBytes());
        }
        const header = Buffer.allocUnsafe(16);
        (0, Helpers_2.toSignedLittleBuffer)(msgId, 8).copy(header, 0);
        header.writeInt32LE(seqNo, 8);
        header.writeInt32LE(body.length, 12);
        buffer.write(header);
        buffer.write(body);
        return msgId;
    }
    /**
     * Encrypts the given message data using the current authorization key
     * following MTProto 2.0 guidelines core.telegram.org/mtproto/description.
     * @param data
     */
    async encryptMessageData(data) {
        if (!this.authKey) {
            throw new Error("Auth key unset");
        }
        await this.authKey.waitForKey();
        const authKey = this.authKey.getKey();
        if (!authKey) {
            throw new Error("Auth key unset");
        }
        if (!this.salt || !this.id || !authKey || !this.authKey.keyId) {
            throw new Error("Unset params");
        }
        const padLen = (0, Helpers_1.mod)(-(16 + data.length + 12), 16) + 12;
        const packet = Buffer.allocUnsafe(24 + 16 + data.length + padLen);
        const plain = packet.subarray(24);
        (0, Helpers_2.toSignedLittleBuffer)(this.salt, 8).copy(plain, 0);
        (0, Helpers_2.toSignedLittleBuffer)(this.id, 8).copy(plain, 8);
        data.copy(plain, 16);
        node_crypto_1.default.randomFillSync(plain, 16 + data.length, padLen);
        const msgKeyLarge = (0, Helpers_1.asBuffer)(cifrante_1.sha256.sync
            .create()
            .update(authKey.subarray(88, 120))
            .update(plain)
            .digest());
        const msgKey = msgKeyLarge.subarray(8, 24);
        const { iv, key } = this._calcKey(authKey, msgKey, true);
        (0, Helpers_1.readBufferFromBigInt)(this.authKey.keyId, 8).copy(packet, 0);
        msgKey.copy(packet, 8);
        const ige = new IGE_1.IGE(key, iv);
        ige.encryptIge(plain, plain);
        ige.dispose();
        return packet;
    }
    /**
     * Inverse of `encrypt_message_data` for incoming server messages.
     * @param body
     */
    async decryptMessageData(body) {
        if (!this.authKey) {
            throw new Error("Auth key unset");
        }
        if (body.length < 8) {
            throw new errors_1.InvalidBufferError(body);
        }
        // TODO Check salt,sessionId, and sequenceNumber
        const keyId = (0, Helpers_1.readBigIntFromBuffer)(body.slice(0, 8));
        if (!this.authKey.keyId || keyId.neq(this.authKey.keyId)) {
            throw new errors_1.SecurityError("Server replied with an invalid auth key");
        }
        const authKey = this.authKey.getKey();
        if (!authKey) {
            throw new errors_1.SecurityError("Unset AuthKey");
        }
        const msgKey = body.subarray(8, 24);
        const { iv, key } = this._calcKey(authKey, msgKey, false);
        const encrypted = body.subarray(24);
        const ige = new IGE_1.IGE(key, iv);
        body = ige.decryptIge(encrypted, encrypted);
        ige.dispose();
        // https://core.telegram.org/mtproto/security_guidelines
        // Sections "checking sha256 hash" and "message length"
        const ourKey = (0, Helpers_1.asBuffer)(cifrante_1.sha256.sync
            .create()
            .update(authKey.subarray(96, 128))
            .update(body)
            .digest());
        if (!msgKey.equals(ourKey.subarray(8, 24))) {
            throw new errors_1.SecurityError("Received msg_key doesn't match with expected one");
        }
        const reader = new extensions_1.BinaryReader(body);
        reader.readLong(); // removeSalt
        const serverId = reader.readLong();
        if (serverId.neq(this.id) && this.securityChecks) {
            throw new errors_1.SecurityError("Server replied with a wrong session ID");
        }
        const remoteMsgId = reader.readLong();
        const registerResult = this.receivedIds.registerMsgId(remoteMsgId);
        if (registerResult === "duplicate" && this.securityChecks) {
            throw new DuplicateMessageError(remoteMsgId);
        }
        if (registerResult !== "success" && this.securityChecks) {
            throw new errors_1.SecurityError(`Rejected message: ${registerResult}`);
        }
        this.receivedIds.shrink();
        const remoteSequence = reader.readInt();
        reader.readInt(); // msgLen for the inner object, padding ignored
        // We could read msg_len bytes and use those in a new reader to read
        // the next TLObject without including the padding, but since the
        // reader isn't used for anything else after this, it's unnecessary.
        const obj = reader.tgReadObject();
        return new core_1.TLMessage(remoteMsgId, remoteSequence, obj);
    }
    /**
     * Generates a new unique message ID based on the current
     * time (in ms) since epoch, applying a known time offset.
     * @private
     */
    _getNewMsgId() {
        const now = new Date().getTime() / 1000 + this.timeOffset;
        const nanoseconds = Math.floor((now - Math.floor(now)) * 1e9);
        let newMsgId = (0, big_integer_1.default)(Math.floor(now))
            .shiftLeft((0, big_integer_1.default)(32))
            .or((0, big_integer_1.default)(nanoseconds).shiftLeft((0, big_integer_1.default)(2)));
        if (this._lastMsgId.greaterOrEquals(newMsgId)) {
            newMsgId = this._lastMsgId.add((0, big_integer_1.default)(4));
        }
        this._lastMsgId = newMsgId;
        return newMsgId;
    }
    /**
     * Updates the time offset to the correct
     * one given a known valid message ID.
     * @param correctMsgId {BigInteger}
     */
    updateTimeOffset(correctMsgId) {
        const bad = this._getNewMsgId();
        const old = this.timeOffset;
        const now = Math.floor(new Date().getTime() / 1000);
        const correct = correctMsgId.shiftRight((0, big_integer_1.default)(32)).toJSNumber();
        this.timeOffset = correct - now;
        if (this.timeOffset !== old) {
            this._lastMsgId = big_integer_1.default.zero;
            this._log.debug(`Updated time offset (old offset ${old}, bad ${bad}, good ${correctMsgId}, new ${this.timeOffset})`);
        }
        return this.timeOffset;
    }
    /**
     * Generates the next sequence number depending on whether
     * it should be for a content-related query or not.
     * @param contentRelated
     * @private
     */
    _getSeqNo(contentRelated) {
        if (contentRelated) {
            const result = this._sequence * 2 + 1;
            this._sequence += 1;
            return result;
        }
        else {
            return this._sequence * 2;
        }
    }
}
exports.MTProtoState = MTProtoState;
