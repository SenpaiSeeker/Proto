import assert from "node:assert/strict";
import bigInt from "big-integer";
import { Api } from "../teleproto/tl";
import { UpdateManager } from "../teleproto/client/updates/manager";

type Tracker = {
    pts: {
        init: (pts: number) => void;
    };
};

type ManagerInternals = {
    running: boolean;
    channels: Map<string, Tracker>;
    channelFailRetryTimers: Map<string, NodeJS.Timeout>;
    getOrCreateChannel: (channelId: string) => Tracker;
    resolveChannel: (channelId: string, tracker: Tracker) => Promise<unknown>;
    invokeChannel: (channelId: string, make: () => unknown) => Promise<unknown>;
    fetchChannelDifferenceOnce: (channelId: string) => Promise<void>;
};

const logs: string[] = [];

const client = {
    _channelPollRequestInterval: 10,
    _channelPollConcurrency: 4,
    _channelPollInterval: 1000,
    _log: {
        debug: () => {},
        info: (message: string) => logs.push(message),
        warn: (message: string) => logs.push(message),
        error: () => {},
    },
    updates: {
        authorizationError: undefined,
        _suspendAuthorization: () => false,
    },
    _entityCache: {
        add: () => {},
    },
};

const manager = new UpdateManager(client as never);
const internals = manager as unknown as ManagerInternals;
internals.running = true;

async function waitFor(check: () => boolean, timeoutMs: number): Promise<void> {
    const started = Date.now();
    while (!check()) {
        if (Date.now() - started > timeoutMs) {
            throw new Error("Timed out waiting for condition");
        }
        await new Promise((resolve) => setTimeout(resolve, 50));
    }
}

async function testInvalidChannel(): Promise<void> {
    const channelId = "2214771215";
    const tracker = internals.getOrCreateChannel(channelId);
    tracker.pts.init(100);
    internals.resolveChannel = async () => ({ kind: "invalid", reason: "CHANNEL_INVALID" });

    await internals.fetchChannelDifferenceOnce(channelId);

    assert.equal(internals.channels.has(channelId), false);
    assert.equal(internals.channelFailRetryTimers.has(channelId), false);
    assert.ok(logs.some((message) => message.includes("inaccessible")));
}

async function testTransientChannel(): Promise<void> {
    const channelId = "1234567890";
    const tracker = internals.getOrCreateChannel(channelId);
    tracker.pts.init(100);
    let attempts = 0;
    internals.resolveChannel = async () => {
        attempts += 1;
        return { kind: "transient" };
    };

    await internals.fetchChannelDifferenceOnce(channelId);

    assert.equal(attempts, 1);
    assert.equal(internals.channels.has(channelId), true);
    assert.equal(internals.channelFailRetryTimers.has(channelId), true);

    await waitFor(() => !internals.channels.has(channelId), 7000);

    assert.equal(attempts, 3);
    assert.equal(internals.channels.has(channelId), false);
    assert.equal(internals.channelFailRetryTimers.has(channelId), false);
}

async function testValidChannel(): Promise<void> {
    const channelId = "987654321";
    const tracker = internals.getOrCreateChannel(channelId);
    tracker.pts.init(100);
    let invoked = 0;
    internals.resolveChannel = async () => ({
        kind: "ok",
        input: new Api.InputChannel({
            channelId: bigInt(channelId),
            accessHash: bigInt(0),
        }),
    });
    internals.invokeChannel = async () => {
        invoked += 1;
        return new Api.updates.ChannelDifferenceEmpty({
            final: true,
            pts: 101,
            timeout: 0,
        });
    };

    await internals.fetchChannelDifferenceOnce(channelId);

    assert.equal(invoked, 1);
    assert.equal(internals.channels.has(channelId), true);
    assert.equal(internals.channelFailRetryTimers.has(channelId), false);
}

async function main(): Promise<void> {
    await testInvalidChannel();
    await testTransientChannel();
    await testValidChannel();
    console.log("stale channel regression: OK");
}

void main();
