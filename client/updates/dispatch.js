"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopPropagation = void 0;
exports.on = on;
exports.addEventHandler = addEventHandler;
exports.removeEventHandler = removeEventHandler;
exports.listEventHandlers = listEventHandlers;
exports.catchUp = catchUp;
exports._handleUpdate = _handleUpdate;
exports._clearUpdateQueue = _clearUpdateQueue;
exports._dispatchUpdate = _dispatchUpdate;
exports._stopUpdateLoop = _stopUpdateLoop;
exports._updateLoop = _updateLoop;
const tl_1 = require("../../tl");
const network_1 = require("../../network");
const Helpers_1 = require("../../Helpers");
const promises_1 = require("node:timers/promises");
const PING_INTERVAL = 9000; // 9 sec
const PING_TIMEOUT = 10000; // 10 sec
const PING_FAIL_ATTEMPTS = 3;
const PING_FAIL_INTERVAL = 100; // ms
const PING_DISCONNECT_DELAY = 75;
const PING_INTERVAL_TO_WAKE_UP = 5000;
const PING_WAKE_UP_TIMEOUT = 3000;
const PING_WAKE_UP_WARNING_TIMEOUT = 1000;
class StopPropagation extends Error {
}
exports.StopPropagation = StopPropagation;
function on(client, event) {
    return (f) => {
        client.addEventHandler(f, event);
        return f;
    };
}
function addEventHandler(client, callback, event) {
    if (event == undefined) {
        const raw = require("../../events/Raw").Raw;
        event = new raw({});
    }
    event.client = client;
    client._eventBuilders.push([event, callback]);
}
function removeEventHandler(client, callback, event) {
    client._eventBuilders = client._eventBuilders.filter((item) => item[0] !== event && item[1] !== callback);
}
function listEventHandlers(client) {
    return client._eventBuilders;
}
async function catchUp(client) {
    await client.updateManager.catchUp();
}
function _handleUpdate(client, update) {
    try {
        if (typeof update === "number") {
            if ([-1, 0, 1].includes(update)) {
                _dispatchUpdate(client, {
                    update: new network_1.UpdateConnectionState(update),
                }).catch((e) => {
                    client._log.error(`Error dispatching connection state: ${e}`);
                });
            }
            return;
        }
        if (update instanceof network_1.UpdateConnectionState) {
            _dispatchUpdate(client, { update }).catch((e) => {
                client._log.error(`Error dispatching connection state: ${e}`);
            });
            return;
        }
        client.updateManager.onUpdates(update);
    }
    catch (e) {
        client._log.error(`Error handling update: ${e}`);
    }
}
const dispatchQueues = new WeakMap();
/** Releases pending deliveries; an already running handler may finish. @hidden */
function _clearUpdateQueue(client) {
    const queue = dispatchQueues.get(client);
    if (!queue)
        return;
    while (queue.head) {
        const job = queue.head;
        queue.head = job.next;
        job.next = undefined;
        job.resolve();
    }
    queue.tail = undefined;
}
async function drainUpdates(client, queue) {
    while (queue.head) {
        const job = queue.head;
        queue.head = job.next;
        job.next = undefined;
        if (!queue.head)
            queue.tail = undefined;
        try {
            if (!client._destroyed)
                await dispatchUpdate(client, job.args);
            job.resolve();
        }
        catch (error) {
            job.reject(error);
        }
    }
    dispatchQueues.delete(client);
}
function _dispatchUpdate(client, args) {
    if (client._destroyed)
        return Promise.resolve();
    if (!client._sequentialUpdates)
        return dispatchUpdate(client, args);
    return new Promise((resolve, reject) => {
        const job = { args, resolve, reject };
        const queue = dispatchQueues.get(client);
        if (queue) {
            if (queue.tail)
                queue.tail.next = job;
            else
                queue.head = job;
            queue.tail = job;
        }
        else {
            const queue = { head: job, tail: job };
            dispatchQueues.set(client, queue);
            void drainUpdates(client, queue);
        }
    });
}
async function dispatchUpdate(client, args) {
    for (const [builder, callback] of [...client._eventBuilders]) {
        if (client._destroyed)
            return;
        if (!builder || !callback) {
            continue;
        }
        try {
            if (!builder.resolved) {
                await builder.resolve(client);
            }
        }
        catch (e) {
            client._log.error(`Error resolving event builder: ${e}`);
            continue;
        }
        let event = args.update;
        if (event) {
            if (!client._selfInputPeer) {
                try {
                    await client.getMe(true);
                }
                catch {
                }
            }
            try {
                event = builder.build(event, callback, client._selfInputPeer
                    ? (0, Helpers_1.returnBigInt)(client._selfInputPeer.userId)
                    : undefined);
            }
            catch (e) {
                client._log.error(`Error building event: ${e}`);
                continue;
            }
            if (event) {
                event._client = client;
                if ("_eventName" in event) {
                    event.originalUpdate = args.update;
                    event._entities = args.update._entities ?? new Map();
                    event._setClient(client);
                }
                let filter;
                try {
                    filter = await builder.filter(event);
                }
                catch (e) {
                    client._log.error(`Error in event filter: ${e}`);
                    continue;
                }
                if (!filter)
                    continue;
                try {
                    await callback(event);
                }
                catch (e) {
                    if (e instanceof StopPropagation)
                        break;
                    if (client._errorHandler) {
                        try {
                            await client._errorHandler(e);
                        }
                        catch (error) {
                            client._log.error(`Error in update error handler: ${error}`);
                        }
                    }
                    client._log.error(`Error in event handler: ${e}`);
                }
            }
        }
    }
    if (!client._destroyed)
        await client.updates._dispatch(args.update);
}
const updateLoops = new WeakMap();
/** @hidden */
function _stopUpdateLoop(client) {
    updateLoops.get(client)?.abort();
    updateLoops.delete(client);
    client._loopStarted = false;
}
async function _updateLoop(client, catchUp = true) {
    updateLoops.get(client)?.abort();
    const controller = new AbortController();
    updateLoops.set(client, controller);
    const active = () => !controller.signal.aborted && !client._destroyed;
    client.updateManager.start();
    if (catchUp)
        await client.updateManager.catchUp();
    let lastPongAt;
    while (active()) {
        try {
            await (0, promises_1.setTimeout)(PING_INTERVAL, undefined, { signal: controller.signal, ref: false });
        }
        catch {
            break;
        }
        if (!active())
            break;
        if (client._sender?.isReconnecting || client._isSwitchingDc) {
            lastPongAt = undefined;
            continue;
        }
        if (client.disconnected)
            break;
        try {
            const ping = () => {
                if (!active())
                    throw new Error("Update loop stopped");
                return client._sender.send(new tl_1.Api.PingDelayDisconnect({
                    pingId: (0, Helpers_1.returnBigInt)((0, Helpers_1.getRandomInt)(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)),
                    disconnectDelay: PING_DISCONNECT_DELAY,
                }));
            };
            const pingAt = Date.now();
            const lastInterval = lastPongAt ? pingAt - lastPongAt : undefined;
            if (!lastInterval || lastInterval < PING_INTERVAL_TO_WAKE_UP) {
                await attempts(() => timeout(ping, PING_TIMEOUT), PING_FAIL_ATTEMPTS, PING_FAIL_INTERVAL);
            }
            else {
                let wakeUpWarningTimeout = setTimeout(() => {
                    if (active())
                        _handleUpdate(client, network_1.UpdateConnectionState.disconnected);
                    wakeUpWarningTimeout = undefined;
                }, PING_WAKE_UP_WARNING_TIMEOUT);
                try {
                    await timeout(ping, PING_WAKE_UP_TIMEOUT);
                }
                finally {
                    if (wakeUpWarningTimeout)
                        clearTimeout(wakeUpWarningTimeout);
                }
                if (active())
                    _handleUpdate(client, network_1.UpdateConnectionState.connected);
            }
            lastPongAt = Date.now();
        }
        catch (err) {
            lastPongAt = undefined;
            if (!active())
                break;
            if (Date.now() - client._lastReceivedAt < PING_INTERVAL + PING_TIMEOUT) {
                client._log.debug(`Ping timed out but transfer is active, ignoring`);
                continue;
            }
            if (client._errorHandler) {
                await client._errorHandler(err);
            }
            if (!active())
                break;
            client._log.warn(`Ping failed: ${err}, reconnecting`);
            if (client._sender?.isReconnecting || client._isSwitchingDc)
                continue;
            if (client.disconnected)
                break;
            client._sender.reconnect();
        }
        if (!active())
            break;
        await client.updateManager.recoverIfStale();
        if (!active())
            break;
        if (Date.now() - (client._lastRequest || 0) > 30 * 60 * 1000) {
            try {
                await client.updateManager.catchUp();
            }
            catch {
            }
            lastPongAt = undefined;
        }
    }
    if (updateLoops.get(client) === controller) {
        _stopUpdateLoop(client);
        if (client._destroyed)
            await client.disconnect();
    }
}
async function attempts(cb, times, pause) {
    for (let i = 0; i < times; i++) {
        try {
            return await cb();
        }
        catch (err) {
            if (i === times - 1)
                throw err;
            await (0, Helpers_1.sleep)(pause);
        }
    }
    return undefined;
}
function timeout(cb, ms) {
    let resolved = false;
    return Promise.race([
        cb(),
        (0, Helpers_1.sleep)(ms).then(() => resolved ? undefined : Promise.reject(new Error("TIMEOUT"))),
    ]).finally(() => {
        resolved = true;
    });
}
