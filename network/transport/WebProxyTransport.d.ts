import type { Connection } from "../connection/Connection";
import type { WebProxyOptions } from "../connection/WebProxy";
import { Transport, type ResolvedTransport } from "./Transport";
/** Connects to Telegram through a WEB relay. Experimental. */
export declare class WebProxyTransport extends Transport {
    readonly options: WebProxyOptions;
    constructor(options: WebProxyOptions);
    resolve(connection?: typeof Connection): ResolvedTransport;
}
