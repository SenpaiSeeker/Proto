import type * as browser from "./browser";
import type { Implements } from "../implements";
import type { KeyValueStorage } from "./types";
export type * from "./types";
export type BrowserImplementation = Implements<KeyValueStorage, typeof browser>;
export declare const open: (directory: string) => Storage;
