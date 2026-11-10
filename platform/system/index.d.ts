import type * as browser from "./browser";
import type { Implements } from "../implements";
import type { System } from "./types";
export type * from "./types";
export type BrowserImplementation = Implements<System, typeof browser>;
export declare const deviceModel: () => string, systemVersion: () => string;
