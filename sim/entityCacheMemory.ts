/**
 * Entity cache memory scaling: how many bytes one cached peer costs and how
 * the configured cap bounds a 500-client deployment.
 *
 * Usage: npx ts-node --transpile-only sim/entityCacheMemory.ts
 */
import bigInt from "big-integer";
import { Api } from "../teleproto/tl";
import { EntityCache } from "../teleproto/entityCache";

const gc = (global as { gc?: () => void }).gc;
if (!gc) {
    console.log("note: run with NODE_OPTIONS=--expose-gc for exact numbers");
}

function measure(max: number, count: number): void {
    const cache = new EntityCache({ max, ttl: 0 });
    gc?.();
    const before = process.memoryUsage().heapUsed;
    for (let i = 0; i < count; i += 1) {
        cache.add([
            new Api.User({
                id: bigInt(i + 1),
                accessHash: bigInt(i * 7919 + 13),
                firstName: `u${i}`,
                lastName: "cache",
                username: `cache${i}`,
            }),
        ]);
    }
    gc?.();
    const after = process.memoryUsage().heapUsed;
    const perEntry = (after - before) / cache.size;
    const perClientWorst =
        max * 2 * perEntry;
    console.log(
        `max=${String(max).padStart(4)} served=${String(count).padStart(6)} size=${String(cache.size).padStart(6)} ` +
            `bytes/entry=${perEntry.toFixed(0).padStart(4)} heap=${((after - before) / (1024 * 1024)).toFixed(1).padStart(6)} MB ` +
            `worst/client=${(perClientWorst / (1024 * 1024)).toFixed(2)} MB x500=${((perClientWorst * 500) / (1024 * 1024)).toFixed(0)} MB`
    );
}

measure(4096, 20000);
measure(4096, 200000);
measure(2048, 200000);
measure(1024, 200000);
measure(512, 200000);
