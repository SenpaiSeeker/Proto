import type * as browser from "./browser";
import type { Implements } from "../implements";
import type { Events } from "./types";
export type * from "./types";
export type BrowserImplementation = Implements<Events, typeof browser>;
export declare const setMaxListeners: (count: number, ...targets: EventTarget[]) => void;
