export interface SleepOptions {
    signal?: AbortSignal;
    ref?: boolean;
}
export declare function sleep(ms: number, options?: SleepOptions): Promise<void>;
export declare function immediate(callback: () => void): void;
