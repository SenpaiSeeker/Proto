import * as common from "./Common";
import * as proxy from "./ProxyRejectedError";
import * as files from "./FileErrors";
import * as base from "./RPCBaseErrors";
import * as list from "./RPCErrorList";
import * as aliases from "./aliases";
type Exports = typeof common & typeof proxy & typeof files & typeof base & typeof list & typeof aliases;
type ErrorClassName = {
    [K in keyof Exports]: Exports[K] extends abstract new (...args: never[]) => Error ? K : never;
}[keyof Exports];
type ErrorOf<K extends ErrorClassName> = Exports[K] extends abstract new (...args: never[]) => infer E ? E : never;
/** Error handlers keyed by error class name; each receives the error typed as that class. */
export type ErrorHandlers<R> = {
    [K in ErrorClassName]?: (error: ErrorOf<K>) => R | Promise<R>;
};
/**
 * Runs the handler of the most specific class `error` belongs to, so `ChatWriteForbiddenError`
 * wins over `ForbiddenError` whatever the key order. Rethrows `error` when no handler matches.
 */
export declare function match<R>(error: unknown, handlers: ErrorHandlers<R>): Promise<R>;
/** {@link match} as a `.catch()` callback. */
export declare function handle<R>(handlers: ErrorHandlers<R>): (error: unknown) => Promise<R>;
export {};
