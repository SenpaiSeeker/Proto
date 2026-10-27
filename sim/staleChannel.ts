import assert from "node:assert/strict";
import bigInt from "big-integer";
import { Api } from "../teleproto/tl";
import { ChannelUpdates } from "../teleproto/client/updates/ChannelUpdates";

type Tracker = {
    pts: {
        init: (pts: number, force?: boolean) => void;
    };
    retryTimer?: NodeJS.Timeout;
};

type Resolution = { kind: "ok"; input: Api.TypeInputChannel } | { kind: "invalid"; reason: string } | { kind: "transient" };

type Internals = {
    trackers: Map<string, Tracker>;
    watched: Map<string, number>;
    tracker: (channelId: string) => Tracker;
    resolve: (channelId: string, tracker: Tracker) => Promise<Resolution>;
    fetchDifferenceOnce: (channelId: string, tracker: Tracker) => Promise<void>;
    invoke: (channelId: string, create: () => unknown) => Promise<unknown>;
};

const logs: string[] = [];

function makeUpdates() {
    const client = {
        _channelPollRequestInterval: 10,
        _channelPollConcurrency: 4,
        _channelPollInterval: 1000,
        _bot: false,
        _destroyed: false,
        _log: {
            debug: (message: string) => logs.push(message),
            info: (message: string) => logs.push(message),
            warn: (message: string) => logs.push(message),
            error: (message: string) => logs.push(message),
        },
        updates: {
            authorizationError: undefined,
            _suspendAuthorization: () => false,
        },
        _entityCache: {
            add: () => {},
        },
        getInputEntity: async () => {
            throw new Error("unexpected getInputEntity");
        },
    };
    const host = {
        client,
        generation: 1,
        isCurrent: (generation: number) => generation === 1,
        dispatch: () => {},
        saveEntities: async () => {},
        saveState: () => {},
        requestDifference: () => {},
    };
    const updates = new ChannelUpdates(host as never);
    return { client, updates, internals: updates as unknown as Internals };
}

async function testInvalidChannel(): Promise<void> {
    const { client, updates, internals } = makeUpdates();
    const channelId = "2214771215";
    const tracker = internals.tracker(channelId);
    tracker.pts.init(100);
    client.getInputEntity = async () => {
        const error = new Error("channel invalid") as Error & { errorMessage: string };
        error.errorMessage = "CHANNEL_INVALID";
        throw error;
    };

    await internals.fetchDifferenceOnce(channelId, tracker);

    assert.equal(internals.trackers.has(channelId), false);
    assert.ok(logs.some((message) => message.includes("inaccessible")));
    updates.stop();
}

async function testTransientChannel(): Promise<void> {
    const { client, updates, internals } = makeUpdates();
    const channelId = "1234567890";
    const tracker = internals.tracker(channelId);
    tracker.pts.init(100);
    client.getInputEntity = async () => {
        throw new Error("temporary failure");
    };

    await internals.fetchDifferenceOnce(channelId, tracker);
    assert.equal(internals.trackers.has(channelId), true);
    assert.ok(tracker.retryTimer);

    await internals.fetchDifferenceOnce(channelId, tracker);
    assert.equal(internals.trackers.has(channelId), true);

    await internals.fetchDifferenceOnce(channelId, tracker);
    assert.equal(internals.trackers.has(channelId), false);
    assert.ok(logs.some((message) => message.includes("could not be resolved after 3 attempts")));
    updates.stop();
}

async function testValidChannel(): Promise<void> {
    const { client, updates, internals } = makeUpdates();
    const channelId = "987654321";
    const tracker = internals.tracker(channelId);
    tracker.pts.init(100);
    internals.watched.set(channelId, 1);
    client.getInputEntity = async () =>
        new Api.InputPeerChannel({ channelId: bigInt(channelId), accessHash: bigInt(0) });
    internals.invoke = async () =>
        new Api.updates.ChannelDifferenceEmpty({ final: true, pts: 101, timeout: 0 });

    await internals.fetchDifferenceOnce(channelId, tracker);

    assert.equal(internals.trackers.has(channelId), true);
    assert.equal(tracker.retryTimer, undefined);
    updates.stop();
}

async function main(): Promise<void> {
    await testInvalidChannel();
    await testTransientChannel();
    await testValidChannel();
    console.log("stale channel regression: OK");
}

void main();
