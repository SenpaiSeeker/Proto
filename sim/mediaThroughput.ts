/**
 * Media throughput harness: exercises the real downloadFile/uploadFile
 * pipelines against a fake media layer that returns data after a simulated
 * per-part round trip. No Telegram server is contacted.
 *
 * The fake layer models the part window, not the network link: with N parts
 * in flight and RTT r, the pipeline ceiling is N * partSize / r. The harness
 * proves the library keeps that window full (and can drive >= 1 GB/s), and
 * that a one-part window is RTT-bound as expected.
 *
 * Usage:
 *   npx tsx sim/mediaThroughput.ts [--rtt=20] [--size=1024]
 */
import bigInt from "big-integer";
import { promises as fs } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { performance } from "node:perf_hooks";

import { Api } from "../teleproto/tl";
import { downloadFile } from "../teleproto/client/downloads";
import { uploadFile, CustomFile } from "../teleproto/client/uploads";

const MB = 1024 * 1024;
const KB = 1024;
const PART = 512 * KB;
const PART_SMALL = 128 * KB;

interface Options {
    rttMs: number;
    sizeMb: number;
    sessions: number;
    inFlight: number;
}

function parseOptions(argv: string[]): Options {
    const options: Options = {
        rttMs: 20,
        sizeMb: 1024,
        sessions: 8,
        inFlight: 8,
    };
    for (const arg of argv) {
        const match = /^--(rtt|size|sessions|inflight)=(\d+)$/.exec(arg);
        if (!match) continue;
        const value = Number(match[2]);
        if (match[1] === "rtt") options.rttMs = value;
        else if (match[1] === "size") options.sizeMb = value;
        else if (match[1] === "sessions") options.sessions = value;
        else options.inFlight = value;
    }
    return options;
}

const delay = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

const partRing: Buffer[] = [];
let partRingAt = 0;

function fakePart(size: number, fillByte: number): Buffer {
    const slot = partRingAt % 192;
    partRingAt++;
    let part = partRing[slot];
    if (!part || part.length !== size) {
        part = Buffer.allocUnsafe(size);
        partRing[slot] = part;
    }
    part.fill(fillByte);
    return part;
}

function formatRate(bytes: number, ms: number): string {
    const perSecond = bytes / (ms / 1000);
    if (perSecond >= 1024 * MB) {
        return `${(perSecond / (1024 * MB)).toFixed(2)} GiB/s`;
    }
    if (perSecond >= MB) {
        return `${(perSecond / MB).toFixed(1)} MiB/s`;
    }
    return `${(perSecond / KB).toFixed(0)} KiB/s`;
}

interface FakeOptions {
    partSize: number;
    sessions: number;
    inFlight: number;
    rttMs: number;
    bytes: number;
    sent: { bytes: number; parts: number };
    stats?: {
        active: number;
        maxActive: number;
        sleepMs: number;
        workMs: number;
    };
}

function fakeClient(kind: "download" | "upload", opts: FakeOptions) {
    const balance = {
        partSize: opts.partSize,
        sessions: opts.sessions,
        inFlight: opts.inFlight,
    };
    return {
        _media: {
            opts: {
                partSize: opts.partSize,
                requestRetries: 5,
                requestDeadlineMs: 15_000,
                cdnSupported: false,
                download: balance,
                upload: balance,
            },
            getFile: async (
                _dcId: number,
                _location: unknown,
                offset: { toJSNumber(): number },
                limit: number,
            ): Promise<Buffer> => {
                const stats = opts.stats;
                if (stats) {
                    stats.active++;
                    if (stats.active > stats.maxActive) {
                        stats.maxActive = stats.active;
                    }
                }
                const started = performance.now();
                await delay(opts.rttMs);
                const slept = performance.now() - started;
                const at = offset.toJSNumber();
                const size = Math.max(0, Math.min(limit, opts.bytes - at));
                const part = fakePart(
                    size,
                    (Math.floor(at / opts.partSize) % 251) + 1,
                );
                if (stats) {
                    stats.active--;
                    stats.sleepMs += slept;
                    stats.workMs += performance.now() - started - slept;
                }
                return part;
            },
            savePart: async (
                _dcId: number,
                request: { bytes: Buffer },
            ): Promise<boolean> => {
                await delay(opts.rttMs);
                opts.sent.bytes += request.bytes.length;
                opts.sent.parts++;
                return true;
            },
        },
        _log: {
            debug: () => undefined,
            info: () => undefined,
            warning: () => undefined,
            error: () => undefined,
        },
        session: { dcId: 4 },
        invoke: async () => {
            throw new Error("invoke is not used by the harness");
        },
    } as any;
}

function location() {
    return new Api.InputDocumentFileLocation({
        id: bigInt(1234),
        accessHash: bigInt(5678),
        fileReference: Buffer.alloc(8),
        thumbSize: "",
    });
}

async function downloadOnce(
    kind: "download" | "upload",
    size: number,
    partSize: number,
    sessions: number,
    inFlight: number,
    rttMs: number,
): Promise<{ ms: number; bytes: number; rss: number; stats: FakeOptions["stats"] }> {
    const stats = { active: 0, maxActive: 0, sleepMs: 0, workMs: 0 };
    const fake = fakeClient(kind, {
        partSize,
        sessions,
        inFlight,
        rttMs,
        bytes: size,
        sent: { bytes: 0, parts: 0 },
        stats,
    });
    const rssBefore = process.memoryUsage().rss;
    const started = performance.now();
    const buffer = await downloadFile(fake, location(), {
        fileSize: bigInt(size),
        dcId: 4,
    });
    const ms = performance.now() - started;
    const rss = process.memoryUsage().rss;
    if (!(buffer instanceof Buffer) || buffer.length !== size) {
        throw new Error(
            `download length mismatch: expected ${size}, got ${
                buffer instanceof Buffer ? buffer.length : typeof buffer
            }`,
        );
    }
    const probe = [
        0,
        partSize,
        Math.floor(size / 2) - (Math.floor(size / 2) % partSize),
        size - partSize,
    ];
    for (const at of probe) {
        const idx = at / partSize;
        const expected = (idx % 251) + 1;
        if (buffer[at] !== expected || buffer[at + partSize - 1] !== expected) {
            throw new Error(`download integrity mismatch at offset ${at}`);
        }
    }
    return { ms, bytes: size, rss: Math.max(rssBefore, rss), stats };
}

async function uploadOnce(
    size: number,
    partSize: number,
    sessions: number,
    inFlight: number,
    workers: number | undefined,
    path: string,
    rttMs: number,
): Promise<{ ms: number; bytes: number; parts: number }> {
    const sent = { bytes: 0, parts: 0 };
    const fake = fakeClient("upload", {
        partSize,
        sessions,
        inFlight,
        rttMs,
        bytes: size,
        sent,
    });
    const file = new CustomFile("payload.bin", size, path);
    const started = performance.now();
    await uploadFile(fake, { file, workers });
    const ms = performance.now() - started;
    if (sent.bytes !== size) {
        throw new Error(
            `upload byte mismatch: expected ${size}, got ${sent.bytes}`,
        );
    }
    return { ms, bytes: size, parts: sent.parts };
}

async function fileCheck(path: string): Promise<void> {
    const size = 8 * MB;
    const partSize = 512 * KB;
    const fake = fakeClient("download", {
        partSize,
        sessions: 8,
        inFlight: 8,
        rttMs: 1,
        bytes: size,
        sent: { bytes: 0, parts: 0 },
    });
    await downloadFile(fake, location(), {
        fileSize: bigInt(size),
        dcId: 4,
        outputFile: path,
    });
    const data = await fs.readFile(path);
    if (data.length !== size) {
        throw new Error(
            `file download length mismatch: ${data.length} != ${size}`,
        );
    }
    for (const at of [0, partSize, size - partSize]) {
        const expected = ((at / partSize) % 251) + 1;
        if (data[at] !== expected || data[at + partSize - 1] !== expected) {
            throw new Error(`file download mismatch at offset ${at}`);
        }
    }
}

async function main() {
    const options = parseOptions(process.argv.slice(2));
    const size = options.sizeMb * MB;
    const rtt = options.rttMs;
    const dir = await fs.mkdtemp(join(tmpdir(), "teleproto-throughput-"));
    const bigPath = join(dir, "payload-1g.bin");
    const smallPath = join(dir, "payload-small.bin");
    const outputPath = join(dir, "download-output.bin");
    await fs.writeFile(bigPath, "");
    await fs.truncate(bigPath, size);
    await fs.writeFile(smallPath, "");
    await fs.truncate(smallPath, 8 * MB);
    await fileCheck(outputPath);
    console.log(
        `[0/4] unduh ke berkas 8 MB : OK (jalur streamParallel)`,
    );

    console.log(
        `teleproto media throughput | part=${PART / KB} KiB | RTT=${rtt} ms per part`,
    );

    const baselineBytes = 64 * MB;
    const baseline = await downloadOnce("download", baselineBytes, PART, 1, 1, rtt);
    const pipelined = await downloadOnce(
        "download",
        size,
        PART,
        options.sessions,
        options.inFlight,
        rtt,
    );
    console.log(
        `[1/4] unduh ${(baselineBytes / MB).toFixed(0)} MB, jendela 1 part : ${(
            baseline.ms / 1000
        ).toFixed(2)} s -> ${formatRate(baseline.bytes, baseline.ms)}`,
    );
    console.log(
        `[2/4] unduh ${(size / MB).toFixed(0)} MB, jendela ${options.sessions * options.inFlight} part: ${(
            pipelined.ms / 1000
        ).toFixed(2)} s -> ${formatRate(pipelined.bytes, pipelined.ms)} | RSS ${(
            pipelined.rss / MB
        ).toFixed(0)} MB | aktif-maks ${pipelined.stats?.maxActive} | tidur ${
            pipelined.stats ? Math.round(pipelined.stats.sleepMs) : 0
        } ms | kerja ${
            pipelined.stats ? Math.round(pipelined.stats.workMs) : 0
        } ms`,
    );

    const uploadSmall = await uploadOnce(
        8 * MB,
        PART_SMALL,
        8,
        8,
        1,
        smallPath,
        rtt,
    );
    const uploadBig = await uploadOnce(
        size,
        PART,
        4,
        16,
        undefined,
        bigPath,
        rtt,
    );
    console.log(
        `[3/4] unggah 8 MB, pekerja 1    : ${(uploadSmall.ms / 1000).toFixed(
            2,
        )} s -> ${formatRate(uploadSmall.bytes, uploadSmall.ms)}`,
    );
    console.log(
        `[4/4] unggah ${(size / MB).toFixed(0)} MB, jendela 64 part: ${(
            uploadBig.ms / 1000
        ).toFixed(2)} s -> ${formatRate(uploadBig.bytes, uploadBig.ms)} | ${
            uploadBig.parts
        } part`,
    );

    const GB = 1000 * 1000 * 1000;
    const downloadRate = pipelined.bytes / (pipelined.ms / 1000);
    const uploadRate = uploadBig.bytes / (uploadBig.ms / 1000);
    const downloadOk = downloadRate >= GB;
    const uploadOk = uploadRate >= GB;
    console.log(
        `VERDICT: unduh ${(downloadRate / GB).toFixed(2)} GB/s, unggah ${(
            uploadRate / GB
        ).toFixed(2)} GB/s (${downloadOk && uploadOk ? ">= 1 GB/s" : "di bawah 1 GB/s"})`,
    );
    await fs.rm(dir, { recursive: true, force: true });
    if (!downloadOk || !uploadOk) process.exitCode = 1;
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
