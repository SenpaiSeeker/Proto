"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiFromDefinitions = createApiFromDefinitions;
const big_integer_1 = __importDefault(require("big-integer"));
const Helpers_1 = require("../../Helpers");
const helpers_1 = require("./helpers");
const INSPECT_CUSTOM = Symbol.for("nodejs.util.inspect.custom");
function lowerFirst(value) {
    return value ? `${value[0].toLowerCase()}${value.slice(1)}` : value;
}
const NAMED_AUTO_CASTS = new Set(["chatId,int"]);
const AUTO_CASTS = new Set([
    "InputPeer",
    "InputChannel",
    "InputUser",
    "InputDialogPeer",
    "InputNotifyPeer",
    "InputMedia",
    "InputPhoto",
    "InputMessage",
    "InputDocument",
    "InputChatPhoto",
]);
function isFlagFieldAbsent(cfg, value) {
    return ((value === false && cfg.type !== "Bool") ||
        value === null ||
        value === undefined);
}
function isBitSetBySibling(arg, argsConfig, instance) {
    const self = argsConfig[arg];
    const values = instance;
    for (const other in argsConfig) {
        const cfg = argsConfig[other];
        if (other !== arg &&
            cfg.isFlag &&
            cfg.type !== "true" &&
            cfg.flagName === self.flagName &&
            cfg.flagIndex === self.flagIndex &&
            !isFlagFieldAbsent(cfg, values[other])) {
            return true;
        }
    }
    return false;
}
function emptyFlagValue(cfg) {
    if (cfg.isVector)
        return [];
    const type = cfg.type ?? "";
    if (type === "string")
        return "";
    if (type === "bytes")
        return Buffer.alloc(0);
    if (type === "int" || type === "long" || type === "double")
        return 0;
    throw new Error(`Cannot co-serialize flag field of type "${type}": a sibling on the same flag bit is set but this field is missing and has no empty form`);
}
function argToBytes(value, type, argName, requestName) {
    if (value == null) {
        switch (type) {
            case "int":
            case "long":
            case "int128":
            case "int256":
            case "double":
            case "date":
                value = 0;
                break;
            case "true":
            case "Bool":
                break;
            default:
                throw new Error(`Required field "${argName}" of ${requestName || "request"} is missing`);
        }
    }
    switch (type) {
        case "int": {
            const intBuffer = Buffer.alloc(4);
            intBuffer.writeInt32LE(value, 0);
            return intBuffer;
        }
        case "long":
            return (0, Helpers_1.toSignedLittleBuffer)(value, 8);
        case "int128":
            return (0, Helpers_1.toSignedLittleBuffer)(value, 16);
        case "int256":
            return (0, Helpers_1.toSignedLittleBuffer)(value, 32);
        case "double": {
            const doubleBuffer = Buffer.alloc(8);
            doubleBuffer.writeDoubleLE(value, 0);
            return doubleBuffer;
        }
        case "string":
            return (0, helpers_1.serializeBytes)(value);
        case "Bool":
            return value
                ? Buffer.from("b5757299", "hex")
                : Buffer.from("379779bc", "hex");
        case "true":
            return Buffer.alloc(0);
        case "bytes":
            return (0, helpers_1.serializeBytes)(value);
        case "date":
            return (0, helpers_1.serializeDate)(value);
        default: {
            const objectValue = value;
            if (!objectValue || typeof objectValue.getBytes !== "function") {
                throw new Error(`Required object ${argName} of ${requestName || "request"} is undefined`);
            }
            return objectValue.getBytes();
        }
    }
}
async function getInputFromResolve(utils, client, peer, peerType) {
    switch (peerType) {
        case "InputPeer":
            return utils.getInputPeer(await client.getInputEntity(peer));
        case "InputChannel":
            return utils.getInputChannel(await client.getInputEntity(peer));
        case "InputUser":
            return utils.getInputUser(await client.getInputEntity(peer));
        case "InputDialogPeer":
            return client._getInputDialog(peer);
        case "InputNotifyPeer":
            return client._getInputNotify(peer);
        case "InputMedia":
            return utils.getInputMedia(peer);
        case "InputPhoto":
            return utils.getInputPhoto(peer);
        case "InputMessage":
            return utils.getInputMessage(peer);
        case "InputDocument":
            return utils.getInputDocument(peer);
        case "InputChatPhoto":
            return utils.getInputChatPhoto(peer);
        case "chatId,int":
            return client.getPeerId(peer, false);
        default:
            throw new Error("unsupported peer type : " + peerType);
    }
}
function createArgFromReader(getApi) {
    return function getArgFromReader(reader, arg) {
        if (arg.isVector) {
            if (arg.useVectorId) {
                reader.readInt();
            }
            const values = [];
            const len = reader.readInt();
            arg.isVector = false;
            for (let i = 0; i < len; i += 1) {
                values.push(getArgFromReader(reader, arg));
            }
            arg.isVector = true;
            return values;
        }
        if (arg.flagIndicator) {
            return reader.readInt();
        }
        switch (arg.type) {
            case "int":
                return reader.readInt();
            case "long":
                return reader.readLong();
            case "int128":
                return reader.readLargeInt(128);
            case "int256":
                return reader.readLargeInt(256);
            case "double":
                return reader.readDouble();
            case "string":
                return reader.tgReadString();
            case "Bool":
                return reader.tgReadBool();
            case "true":
                return true;
            case "bytes":
                return reader.tgReadBytes();
            case "date":
                return reader.tgReadDate();
            default: {
                if (!arg.skipConstructorId) {
                    return reader.tgReadObject();
                }
                const api = getApi();
                return api.constructors[arg.type].fromReader(reader);
            }
        }
    };
}
function createClasses(params, helpers) {
    const classes = {};
    const { getArgFromReader } = helpers;
    const byTag = new Map(); // "inputPeerUser" -> class
    const resolvers = new Map();
    const byResult = new Map(); // "InputPeer" -> [classes]
    function coerce(value, expectedType) {
        if (!value ||
            typeof value !== "object" ||
            Array.isArray(value) ||
            big_integer_1.default.isInstance(value) ||
            typeof value.getBytes === "function") {
            return value;
        }
        let Cls;
        const tag = value._;
        if (tag) {
            Cls = byTag.get(tag);
            if (!Cls) {
                throw new Error(`Unknown TL "_" tag: ${JSON.stringify(tag)}`);
            }
        }
        else if (expectedType) {
            const candidates = byResult.get(expectedType);
            if (candidates && candidates.length === 1) {
                Cls = candidates[0];
            }
            else if (candidates && candidates.length > 1) {
                throw new Error(`Ambiguous type "${expectedType}" — add "_" to pick a constructor ` +
                    `(one of: ${candidates
                        .map((c) => c.className)
                        .join(", ")})`);
            }
        }
        return Cls ? new Cls(value) : value;
    }
    for (const classParams of params) {
        const { name, constructorId, subclassOfId, argsConfig, namespace, isFunction, result, } = classParams;
        const fullName = [namespace, name].join(".").replace(/^\./, "");
        class VirtualClass {
            static { this.CONSTRUCTOR_ID = constructorId; }
            static { this.SUBCLASS_OF_ID = subclassOfId; }
            static { this.className = fullName; }
            static { this.hasParameters = Object.values(argsConfig).some((arg) => !arg.flagIndicator); }
            static { this.classType = isFunction ? "request" : "constructor"; }
            constructor(args) {
                this.CONSTRUCTOR_ID = constructorId;
                this.SUBCLASS_OF_ID = subclassOfId;
                this.className = fullName;
                this.classType = isFunction ? "request" : "constructor";
                this.originalArgs = {};
                args = args || {};
                this.originalArgs = args;
                this.init(args);
                for (const argName in argsConfig) {
                    if (argName === "randomId" && !args[argName]) {
                        if (argsConfig[argName].isVector) {
                            const randomIds = [];
                            const baseIds = args.id || [];
                            for (let i = 0; i < baseIds.length; i += 1) {
                                randomIds.push((0, Helpers_1.generateRandomLong)(true));
                            }
                            this[argName] = randomIds;
                        }
                        else {
                            this[argName] =
                                (0, Helpers_1.generateRandomLong)(true);
                        }
                    }
                    else {
                        this[argName] = args[argName];
                    }
                }
            }
            init(_args) { }
            static fromReader(reader) {
                const args = {};
                for (const argName in argsConfig) {
                    if (!Object.prototype.hasOwnProperty.call(argsConfig, argName)) {
                        continue;
                    }
                    const arg = argsConfig[argName];
                    if (arg.isFlag) {
                        if (arg.type === "true") {
                            args[argName] = Boolean(args[arg.flagName] &
                                (1 << arg.flagIndex));
                            continue;
                        }
                        if (args[arg.flagName] &
                            (1 << arg.flagIndex)) {
                            args[argName] = getArgFromReader(reader, arg);
                        }
                        else {
                            args[argName] = null;
                        }
                    }
                    else {
                        if (arg.flagIndicator) {
                            arg.name = argName;
                        }
                        args[argName] = getArgFromReader(reader, arg);
                    }
                }
                return new this(args);
            }
            _coerceArgs() {
                for (const arg in argsConfig) {
                    if (!Object.prototype.hasOwnProperty.call(argsConfig, arg)) {
                        continue;
                    }
                    const cfg = argsConfig[arg];
                    if (cfg.flagIndicator) {
                        continue;
                    }
                    const value = this[arg];
                    if (value != null && ["long", "int128", "int256"].includes(cfg.type ?? "")) {
                        this[arg] = cfg.isVector
                            ? value.map(Helpers_1.returnBigInt)
                            : (0, Helpers_1.returnBigInt)(value);
                        continue;
                    }
                    if (!value || typeof value !== "object") {
                        continue;
                    }
                    if (cfg.isVector) {
                        if (Array.isArray(value)) {
                            this[arg] = value.map((item) => coerce(item, cfg.type));
                        }
                    }
                    else if (typeof value.getBytes !==
                        "function") {
                        this[arg] = coerce(value, cfg.type);
                    }
                }
            }
            getBytes() {
                this._coerceArgs();
                const constructorBuffer = Buffer.alloc(4);
                constructorBuffer.writeUInt32LE(this.CONSTRUCTOR_ID, 0);
                const buffers = [constructorBuffer];
                for (const arg in argsConfig) {
                    if (!Object.prototype.hasOwnProperty.call(argsConfig, arg)) {
                        continue;
                    }
                    let argValue = this[arg];
                    if (argsConfig[arg].isFlag) {
                        if (argsConfig[arg].type === "true") {
                            continue;
                        }
                        if (isFlagFieldAbsent(argsConfig[arg], argValue)) {
                            if (isBitSetBySibling(arg, argsConfig, this)) {
                                argValue = emptyFlagValue(argsConfig[arg]);
                            }
                            else {
                                continue;
                            }
                        }
                    }
                    if (argsConfig[arg].isVector) {
                        if (argsConfig[arg].useVectorId) {
                            buffers.push(Buffer.from("15c4b51c", "hex"));
                        }
                        const list = (argValue || []);
                        const lengthBuffer = Buffer.alloc(4);
                        lengthBuffer.writeInt32LE(list.length, 0);
                        buffers.push(lengthBuffer, Buffer.concat(list.map((item) => argToBytes(item, argsConfig[arg].type, arg, fullName))));
                        continue;
                    }
                    if (argsConfig[arg].flagIndicator) {
                        if (!Object.values(argsConfig).some((f) => f.isFlag)) {
                            buffers.push(Buffer.alloc(4));
                            continue;
                        }
                        let flagValue = 0;
                        for (const flagArg in argsConfig) {
                            if (argsConfig[flagArg].isFlag &&
                                arg === argsConfig[flagArg].flagName) {
                                const currentValue = this[flagArg];
                                if (!isFlagFieldAbsent(argsConfig[flagArg], currentValue)) {
                                    flagValue |=
                                        1 << argsConfig[flagArg].flagIndex;
                                }
                            }
                        }
                        const flagBuffer = Buffer.alloc(4);
                        flagBuffer.writeUInt32LE(flagValue, 0);
                        buffers.push(flagBuffer);
                        continue;
                    }
                    const serializedArg = argToBytes(argValue, argsConfig[arg].type, arg, fullName);
                    buffers.push(serializedArg);
                    const objectArg = argValue;
                    if (objectArg && typeof objectArg.getBytes === "function") {
                        let boxed = argsConfig[arg].type?.charAt(argsConfig[arg].type.indexOf(".") + 1);
                        boxed = boxed === boxed?.toUpperCase() ? boxed : "";
                        if (!boxed) {
                            buffers.shift();
                        }
                    }
                }
                return Buffer.concat(buffers);
            }
            readResult(reader) {
                if (!isFunction) {
                    throw new Error("`readResult()` called for non-request instance");
                }
                if (result === "X") {
                    this._coerceArgs();
                    const query = this.query;
                    if (typeof query?.readResult !== "function")
                        throw new TypeError("query must be a TL request");
                    return query.readResult(reader);
                }
                const match = result.match(/Vector<(int|long)>/);
                if (match) {
                    reader.readInt();
                    const values = [];
                    const len = reader.readInt();
                    if (match[1] === "int") {
                        for (let i = 0; i < len; i += 1) {
                            values.push(reader.readInt());
                        }
                    }
                    else {
                        for (let i = 0; i < len; i += 1) {
                            values.push(reader.readLong());
                        }
                    }
                    return values;
                }
                return reader.tgReadObject();
            }
            async resolve(client, utils) {
                if (!isFunction) {
                    throw new Error("`resolve()` called for non-request instance");
                }
                await resolvers.get(VirtualClass)(this, client, utils, new Set());
            }
            toJSON() {
                return { ...this.originalArgs, className: fullName };
            }
        }
        resolvers.set(VirtualClass, async (value, client, utils, seen) => {
            if (seen.has(value))
                return;
            seen.add(value);
            value._coerceArgs();
            for (const [arg, cfg] of Object.entries(argsConfig)) {
                if (cfg.flagIndicator || value[arg] == null)
                    continue;
                if (!AUTO_CASTS.has(cfg.type ?? "") && cfg.type !== "X" &&
                    !byResult.has(cfg.type ?? "") && !NAMED_AUTO_CASTS.has(`${arg},${cfg.type}`))
                    continue;
                const resolveValue = async (item) => {
                    if (item && typeof item === "object") {
                        const resolve = resolvers.get(item.constructor);
                        if (resolve)
                            await resolve(item, client, utils, seen);
                    }
                    const cast = NAMED_AUTO_CASTS.has(`${arg},${cfg.type}`)
                        ? `${arg},${cfg.type}` : cfg.type;
                    return AUTO_CASTS.has(cast) || NAMED_AUTO_CASTS.has(cast)
                        ? getInputFromResolve(utils, client, item, cast) : item;
                };
                if (cfg.isVector && Array.isArray(value[arg])) {
                    const resolved = [];
                    for (const item of value[arg])
                        resolved.push(await resolveValue(item));
                    value[arg] = resolved;
                }
                else {
                    value[arg] = await resolveValue(value[arg]);
                }
            }
        });
        Object.defineProperty(VirtualClass, "name", {
            value: fullName,
            configurable: true,
        });
        const tag = namespace ? `${namespace}.${lowerFirst(name)}` : lowerFirst(name);
        byTag.set(tag, VirtualClass);
        const sameResult = byResult.get(result);
        if (sameResult) {
            sameResult.push(VirtualClass);
        }
        else {
            byResult.set(result, [VirtualClass]);
        }
        VirtualClass.prototype[INSPECT_CUSTOM] =
            function (_depth, options, inspect) {
                const view = {};
                for (const argName in argsConfig) {
                    const value = this[argName];
                    if (value === null || value === undefined)
                        continue;
                    view[argName] = value;
                }
                const render = inspect ||
                    ((value) => JSON.stringify(value));
                return `${fullName} ${render(view, options)}`;
            };
        if (namespace) {
            if (!classes[namespace]) {
                classes[namespace] = {};
            }
            classes[namespace][name] = VirtualClass;
        }
        else {
            classes[name] = VirtualClass;
        }
    }
    return classes;
}
function createApiFromDefinitions(definitions) {
    let api;
    const getArgFromReader = createArgFromReader(() => api);
    api = createClasses(definitions, { getArgFromReader });
    return api;
}
