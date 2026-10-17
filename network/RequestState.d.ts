import bigInt from "big-integer";
import Deferred from "../extensions/Deferred";
import { Api } from "../tl";
export declare class RequestState {
    containerId?: bigInt.BigInteger;
    msgId?: bigInt.BigInteger;
    forcedMsgId?: bigInt.BigInteger;
    request: any;
    data: Buffer;
    after: any;
    finished: Deferred;
    promise: Promise<unknown> | undefined;
    acknowledged: boolean;
    sentAt?: number;
    probedAt?: number;
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
    private _settled;
    cancelled: boolean;
    constructor(request: Api.AnyRequest | Api.MsgsAck | Api.MsgsStateInfo | Api.MsgsStateReq | Api.MsgResendReq);
    isReady(): any;
    resetPromise(): void;
}
