import type { Logger } from "../extensions/Logger";
import type { MTProtoState } from "./MTProtoState";
import type { RequestState } from "./RequestState";
export interface PackedBatch {
    batch: RequestState[];
    data: Buffer;
}
export declare function packRequestBatch(state: MTProtoState, queued: RequestState[], log: Logger): Promise<PackedBatch | null>;
