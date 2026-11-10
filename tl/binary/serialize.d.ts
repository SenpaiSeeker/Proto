import type { DateLike } from "../../define";
import { Buffer } from "../../platform";
export declare function serializeBytes(data: Buffer | string): Buffer;
export declare function serializeDate(dt: DateLike | Date | undefined | null): Buffer;
