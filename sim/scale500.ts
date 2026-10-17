/**
 * Scale simulation: N userbot clients + 1 parent bot against a fully
 * in-process transport (no Telegram servers are contacted).
 *
 * The goal is to detect event-loop blocking I/O / CPU starvation in the
 * library's hot paths when a single Node.js process maintains hundreds of
 * MTProto connections:
 *
 *   1. build + connect N clients (session decode, sender bootstrap)
 *   2. steady-state ping storm (encryption + framing + send loop)
 *   3. GZIP decompression of incoming payloads (sync vs async)
 *   4. StoreSession persistence (file-backed sessions)
 *
 * Usage:
 *   npx ts-node --transpile-only sim/scale500.ts --clients=500 --seconds=20
 */
import bigInt from "big-integer";
import { randomBytes } from "crypto";
import { mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { monitorEventLoopDelay, performance } from "perf_hooks";
import { gzipSync, unzipSync } from "zlib";

import { TelegramClient } from "../teleproto/client/TelegramClient";
import { AuthKey } from "../teleproto/crypto/AuthKey";
import { Connection } from "../teleproto/network/connection/Connection";
import { StringSession } from "../teleproto/sessions/StringSession";
import { StoreSession } from "../teleproto/sessions/StoreSession";
import { Api } from "../teleproto/tl";
import { GZIPPacked } from "../teleproto/tl/core/GZIPPacked";
import { Logger, LogLevel } from "../teleproto/extensions/Logger";

const SIM_API_ID = 2040;
const SIM_API_HASH = "sim-api-hash";
const SIM_DC_ID = 4;
const SIM_DC_ADDRESS = "149.154.167.51";
const SIM_DC_PORT = 443;
const SAMPLE_INTERVAL_MS = 10;
const STALL_MS = 250;
const STALL_BUDGET_MS = 5000;

interface LoopReport {
    samples: number;
    p50: number;
    p99: number;
    max: number;
    sampleMax: number;
    stallCount: number;
    stallMs: number;
}

interface Options {
    clients: number;
    seconds: number;
    sessions: number;
}

class SimSocket {
    connect(): Promise<void> {
        return Promise.resolve();
    }

    write(): void {}

    close(): Promise<void> {
        return Promise.resolve();
    }
}

class SimConnection extends Connection {
    private opened = false;
    private wake: (() => void) | undefined;
    sentBytes = 0;

    constructor(params: never) {
        super({ ...(params as object), socket: SimSocket } as never);
    }

    override async connect(): Promise<void> {
        this.opened = true;
    }

    override async disconnect(): Promise<void> {
        this.opened = false;
        const wake = this.wake;
        this.wake = undefined;
        wake?.();
    }

    override isConnected(): boolean {
        return this.opened;
    }

    override async send(data: Buffer): Promise<void> {
        if (!this.opened) throw new Error("SimConnection closed");
        this.sentBytes += data.length;
    }

    override async recv(): Promise<Buffer> {
        if (!this.opened) throw new Error("SimConnection closed");
        return await new Promise<Buffer>((resolve) => {
            this.wake = () => resolve(Buffer.alloc(0));
        });
    }
}

class LoopMonitor {
    private readonly histogram = monitorEventLoopDelay({ resolution: 5 });
    private readonly samples: number[] = [];
    private readonly intervalMs = SAMPLE_INTERVAL_MS;
    private timer: ReturnType<typeof setInterval> | undefined;
    private last = performance.now();

    start(): void {
        this.histogram.enable();
        this.last = performance.now();
        this.timer = setInterval(() => {
            const now = performance.now();
            this.samples.push(Math.max(0, now - this.last - this.intervalMs));
            this.last = now;
        }, this.intervalMs);
        this.timer.unref();
    }

    async stop(): Promise<LoopReport> {
        const p50 = this.histogram.percentile(50) / 1e6;
        const p99 = this.histogram.percentile(99) / 1e6;
        const max = this.histogram.max / 1e6;
        this.histogram.disable();

        await new Promise((resolve) =>
            setTimeout(resolve, this.intervalMs + 5),
        );
        if (this.timer) clearInterval(this.timer);
        this.timer = undefined;

        const sorted = [...this.samples].sort((a, b) => a - b);
        const stalling = sorted.filter((value) => value >= STALL_MS);
        const report: LoopReport = {
            samples: sorted.length,
            p50: Number.isFinite(p50) ? p50 : 0,
            p99: Number.isFinite(p99) ? p99 : 0,
            max: Number.isFinite(max) ? max : 0,
            sampleMax: sorted[sorted.length - 1] ?? 0,
            stallCount: stalling.length,
            stallMs: sorted
                .filter((value) => value >= 25)
                .reduce((total, value) => total + value, 0),
        };
        this.samples.length = 0;
        return report;
    }
}

interface SenderLike {
    send(request: unknown): Promise<unknown>;
}

interface ConnectSenderHost {
    _connectSender(
        sender: SenderLike,
        dcId: number,
        connection?: unknown,
        mediaCluster?: boolean,
    ): Promise<unknown>;
}

function patchBootstrap(client: TelegramClient): void {
    const host = client as unknown as ConnectSenderHost;
    const original = host._connectSender.bind(client);
    host._connectSender = async (sender, dcId, connection, mediaCluster) => {
        const originalSend = sender.send.bind(sender);
        sender.send = async (request: unknown): Promise<unknown> => {
            const className = (request as { className?: string }).className;
            if (className === "InvokeWithLayer") return undefined;
            if (className === "updates.GetState") {
                return new Api.updates.State({
                    pts: 0,
                    qts: 0,
                    date: Math.floor(Date.now() / 1000),
                    seq: 0,
                    unreadCount: 0,
                });
            }
            return await originalSend(request);
        };
        return await original(sender, dcId, connection, mediaCluster);
    };
}

async function makeSession(): Promise<string> {
    const key = new AuthKey();
    await key.setKey(randomBytes(256));
    const session = new StringSession();
    session.setDC(SIM_DC_ID, SIM_DC_ADDRESS, SIM_DC_PORT);
    session.setAuthKey(key);
    return String(session.save());
}

async function makeClient(): Promise<TelegramClient> {
    const client = new TelegramClient(
        new StringSession(await makeSession()),
        SIM_API_ID,
        SIM_API_HASH,
        {
            connection: SimConnection as never,
            connectionRetries: 1,
            requestRetries: 1,
            autoReconnect: false,
            floodSleepThreshold: 0,
            baseLogger: new Logger(LogLevel.ERROR),
            deviceModel: "teleproto-scale-sim",
            systemVersion: "1.0",
            appVersion: "1.0",
            langCode: "en",
        },
    );
    patchBootstrap(client);
    return client;
}

async function phaseConnect(
    clients: TelegramClient[],
): Promise<{ line: string; blocking: boolean }> {
    const monitor = new LoopMonitor();
    monitor.start();
    const started = performance.now();
    await Promise.all(
        clients.map((client) => client.connect().catch(() => false)),
    );
    const elapsed = performance.now() - started;
    const report = await monitor.stop();
    const connected = clients.filter(
        (client) => (client as unknown as { connected?: boolean }).connected,
    ).length;
    return {
        blocking: report.stallCount > 0 || report.stallMs >= STALL_BUDGET_MS,
        line:
            `[1/4] connect          : ${connected}/${clients.length} clients in ${elapsed.toFixed(1)} ms` +
            ` | loop p99=${report.p99.toFixed(1)} ms stall-max=${report.sampleMax.toFixed(1)} ms stalls>=${STALL_MS}ms=${report.stallCount}`,
    };
}

async function phasePing(
    clients: TelegramClient[],
    seconds: number,
): Promise<{ line: string; blocking: boolean }> {
    const monitor = new LoopMonitor();
    monitor.start();
    const deadline = Date.now() + seconds * 1000;
    let pings = 0;
    let round = 0;
    while (Date.now() < deadline) {
        round += 1;
        for (const [index, client] of clients.entries()) {
            void client
                .invoke(
                    new Api.Ping({
                        pingId: bigInt(round * 100_000 + index),
                    }),
                )
                .catch(() => undefined);
            pings += 1;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
    const report = await monitor.stop();
    let sentBytes = 0;
    for (const client of clients) {
        const sender = (
            client as unknown as {
                _sender?: { _connection?: SimConnection };
            }
        )._sender;
        sentBytes += sender?._connection?.sentBytes ?? 0;
    }
    return {
        blocking: report.stallCount > 0 || report.stallMs >= STALL_BUDGET_MS,
        line:
            `[2/4] ping storm       : ${pings} encrypted pings, ${(sentBytes / 1024).toFixed(1)} KB in ${seconds} s` +
            ` | loop p99=${report.p99.toFixed(1)} ms stall-max=${report.sampleMax.toFixed(1)} ms stalls>=${STALL_MS}ms=${report.stallCount}`,
    };
}

async function phaseGzip(): Promise<{ line: string; blocking: boolean }> {
    const unit = Buffer.from(
        JSON.stringify({
            updates: Array.from({ length: 2000 }, (_, index) => ({
                _: "updateNewMessage",
                pts: index,
                message: {
                    id: index,
                    date: 1_700_000_000 + index,
                    message: "gzip payload for scale simulation",
                },
            })),
        }),
    );
    const repeats = Math.ceil((4 * 1024 * 1024) / unit.length);
    const payload = Buffer.concat(
        Array.from({ length: repeats }, () => unit),
    );
    const compressed = gzipSync(payload);

    const syncMonitor = new LoopMonitor();
    syncMonitor.start();
    const syncStarted = performance.now();
    for (let index = 0; index < 20; index += 1) unzipSync(compressed);
    const syncWall = performance.now() - syncStarted;
    const syncReport = await syncMonitor.stop();

    const asyncMonitor = new LoopMonitor();
    asyncMonitor.start();
    const asyncStarted = performance.now();
    for (let index = 0; index < 20; index += 1) {
        await GZIPPacked.ungzip(compressed);
    }
    const asyncWall = performance.now() - asyncStarted;
    const asyncReport = await asyncMonitor.stop();

    return {
        blocking:
            asyncReport.stallCount > 0 ||
            asyncReport.stallMs >= STALL_BUDGET_MS,
        line:
            `[3/4] gzip ${(payload.length / (1024 * 1024)).toFixed(1)} MB x20 : ` +
            `unzipSync(legacy) wall=${syncWall.toFixed(1)} ms stall=${syncReport.stallMs.toFixed(0)} ms` +
            ` | GZIPPacked.ungzip(patched) wall=${asyncWall.toFixed(1)} ms stall=${asyncReport.stallMs.toFixed(0)} ms`,
    };
}

async function phaseStoreSessions(
    count: number,
): Promise<{ line: string; blocking: boolean }> {
    const root = mkdtempSync(join(tmpdir(), "teleproto-store-"));
    const keys: Buffer[] = [];
    for (let index = 0; index < count; index += 1) {
        keys.push(randomBytes(256));
    }

    const writeMonitor = new LoopMonitor();
    writeMonitor.start();
    const writeStarted = performance.now();
    const stores: StoreSession[] = [];
    for (let index = 0; index < count; index += 1) {
        const session = new StoreSession(join(root, `ub${index}`));
        session.setDC(SIM_DC_ID, SIM_DC_ADDRESS, SIM_DC_PORT);
        const key = new AuthKey();
        await key.setKey(keys[index]!);
        session.setAuthKey(key);
        stores.push(session);
    }
    const writeWall = performance.now() - writeStarted;
    const writeReport = await writeMonitor.stop();

    const loadMonitor = new LoopMonitor();
    loadMonitor.start();
    const loadStarted = performance.now();
    for (let index = 0; index < count; index += 1) {
        const session = new StoreSession(join(root, `ub${index}`));
        await session.load();
    }
    const loadWall = performance.now() - loadStarted;
    const loadReport = await loadMonitor.stop();

    const deleteMonitor = new LoopMonitor();
    deleteMonitor.start();
    const deleteStarted = performance.now();
    for (const session of stores) session.delete();
    const deleteWall = performance.now() - deleteStarted;
    const deleteReport = await deleteMonitor.stop();
    rmSync(root, { recursive: true, force: true });

    const hotPathStall = Math.max(
        writeReport.stallMs,
        loadReport.stallMs,
    );
    return {
        blocking:
            writeReport.stallCount > 0 ||
            loadReport.stallCount > 0 ||
            hotPathStall >= STALL_BUDGET_MS,
        line:
            `[4/4] StoreSession x${count} : write ${writeWall.toFixed(0)} ms (stall ${writeReport.stallMs.toFixed(0)} ms)` +
            ` load ${loadWall.toFixed(0)} ms (stall ${loadReport.stallMs.toFixed(0)} ms)` +
            ` delete ${deleteWall.toFixed(0)} ms (stall ${deleteReport.stallMs.toFixed(0)} ms)`,
    };
}

function parseOptions(argv: string[]): Options {
    const read = (name: string): string | undefined =>
        argv
            .find((arg) => arg.startsWith(`--${name}=`))
            ?.slice(name.length + 3);
    const int = (name: string, fallback: number): number => {
        const value = Number.parseInt(read(name) ?? "", 10);
        return Number.isFinite(value) && value > 0 ? value : fallback;
    };
    return {
        clients: int("clients", 500),
        seconds: int("seconds", 20),
        sessions: int("sessions", 500),
    };
}

async function main(): Promise<void> {
    const options = parseOptions(process.argv.slice(2));
    console.log("");
    console.log("=== teleproto scale simulation ===");
    console.log(
        `clients=${options.clients} seconds=${options.seconds} sessions=${options.sessions} node=${process.version}`,
    );

    const clients: TelegramClient[] = [];
    for (let index = 0; index < options.clients; index += 1) {
        clients.push(await makeClient());
    }

    let blocking = false;
    const lines: string[] = [];

    const connect = await phaseConnect(clients);
    blocking = blocking || connect.blocking;
    lines.push(connect.line);
    await new Promise((resolve) => setTimeout(resolve, 250));

    const ping = await phasePing(clients, options.seconds);
    blocking = blocking || ping.blocking;
    lines.push(ping.line);
    await new Promise((resolve) => setTimeout(resolve, 250));

    const gzip = await phaseGzip();
    blocking = blocking || gzip.blocking;
    lines.push(gzip.line);

    const store = await phaseStoreSessions(options.sessions);
    blocking = blocking || store.blocking;
    lines.push(store.line);

    const teardownStarted = performance.now();
    await Promise.race([
        Promise.all(
            clients.map((client) =>
                client.disconnect().catch(() => undefined),
            ),
        ),
        new Promise((resolve) => setTimeout(resolve, 15_000)),
    ]);
    for (const client of clients) {
        await client.destroy().catch(() => undefined);
    }
    const teardownMs = performance.now() - teardownStarted;

    const memory = process.memoryUsage();
    console.log("");
    for (const line of lines) console.log(line);
    console.log(
        `[--] teardown        : ${teardownMs.toFixed(0)} ms | rss=${(
            memory.rss /
            (1024 * 1024)
        ).toFixed(1)} MB heap=${(memory.heapUsed / (1024 * 1024)).toFixed(1)} MB`,
    );
    console.log("");
    console.log(
        blocking
            ? "VERDICT: blocking I/O detected (see stalls above)"
            : "VERDICT: no blocking I/O detected",
    );
    process.exit(blocking ? 1 : 0);
}

void main();
