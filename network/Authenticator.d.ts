import { MTProtoPlainSender } from "./MTProtoPlainSender";
import bigInt from "big-integer";
import { AuthKey } from "../crypto/AuthKey";
export declare function isDhValueInRange(value: bigint, prime: bigint): boolean;
export declare function checkDhParams(prime: bigint, g: number, gA: bigint): void;
export interface TempKeyParams {
    expiresIn: number;
    dc: number;
}
export declare function doAuthentication(sender: MTProtoPlainSender, log: any, temp?: TempKeyParams): Promise<{
    authKey: AuthKey;
    timeOffset: number;
    serverSalt: bigInt.BigInteger;
}>;
