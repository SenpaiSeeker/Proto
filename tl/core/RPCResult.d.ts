import type bigInt from "big-integer";
import type { Api } from "../api";
import type { Reader } from "../binary/Reader";
import { GZIPPacked } from "./GZIPPacked";
export declare class RPCResult {
    readonly reqMsgId: bigInt.BigInteger;
    readonly body?: Buffer | undefined;
    readonly error?: Api.RpcError | undefined;
    readonly packed?: GZIPPacked | undefined;
    static readonly CONSTRUCTOR_ID = 4082920705;
    static readonly classType = "constructor";
    readonly CONSTRUCTOR_ID = 4082920705;
    readonly classType = "constructor";
    constructor(reqMsgId: bigInt.BigInteger, body?: Buffer | undefined, error?: Api.RpcError | undefined, packed?: GZIPPacked | undefined);
    static fromReader(reader: Reader): RPCResult;
}
