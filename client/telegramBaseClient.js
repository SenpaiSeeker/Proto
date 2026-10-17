"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBaseClient = exports.WEBSOCKET_DC_HOSTS = exports.TEST_DC_IPV6 = exports.TEST_DC_IPV4 = exports.PROD_DC_IPV6 = exports.PROD_DC_IPV4 = void 0;
exports.webSocketDcAddress = webSocketDcAddress;
const Version_1 = require("../Version");
const connection_1 = require("../network/connection");
const sessions_1 = require("../sessions");
const extensions_1 = require("../extensions");
const tl_1 = require("../tl");
const os_1 = __importDefault(require("os"));
const IGE_1 = require("../crypto/IGE");
const entityCache_1 = require("../entityCache");
const markdown_1 = require("../extensions/markdown");
const network_1 = require("../network");
const Dcenter_1 = require("../network/Dcenter");
const Network_1 = require("../network/Network");
const MediaScheduler_1 = require("../network/MediaScheduler");
const registry_1 = require("../tl/runtime/registry");
const Deferred_1 = __importDefault(require("../extensions/Deferred"));
const manager_1 = require("./updates/manager");
const dispatch_1 = require("./updates/dispatch");
const Transport_1 = require("../network/transport/Transport");
const message_1 = require("../tl/custom/message");
const SESSION_IDLE_TIMEOUT_MS = 60_000;
const SESSION_STARTUP_DELAY_MS = 800;
const PROD_DEFAULT_DC_ID = 2;
const TEST_DEFAULT_DC_ID = 2;
exports.PROD_DC_IPV4 = {
    1: "149.154.175.50",
    2: "149.154.167.51",
    3: "149.154.175.100",
    4: "149.154.167.91",
    5: "149.154.171.5",
};
exports.PROD_DC_IPV6 = {
    1: "2001:0b28:f23d:f001:0000:0000:0000:000a",
    2: "2001:067c:04e8:f002:0000:0000:0000:000a",
    3: "2001:0b28:f23d:f003:0000:0000:0000:000a",
    4: "2001:067c:04e8:f004:0000:0000:0000:000a",
    5: "2001:0b28:f23f:f005:0000:0000:0000:000a",
};
exports.TEST_DC_IPV4 = {
    1: "149.154.175.10",
    2: "149.154.167.40",
    3: "149.154.175.117",
};
exports.TEST_DC_IPV6 = {
    1: "2001:0b28:f23d:f001:0000:0000:0000:000e",
    2: "2001:067c:04e8:f002:0000:0000:0000:000e",
    3: "2001:0b28:f23d:f003:0000:0000:0000:000e",
};
const DC_PORT = 443;
exports.WEBSOCKET_DC_HOSTS = {
    1: "pluto",
    2: "venus",
    3: "aurora",
    4: "vesta",
    5: "flora",
};
function webSocketDcAddress(dcId, mediaCluster = false) {
    const host = exports.WEBSOCKET_DC_HOSTS[dcId];
    if (!host)
        return undefined;
    return `${host}${mediaCluster ? "-1" : ""}.web.telegram.org`;
}
/**
 * Returns `true` if `address` is a known test-DC seed, `false` if it's a known
 * production-DC seed, and `undefined` if the address isn't recognised (custom
 * DC, IPv6 we haven't tabulated, post-`help.GetConfig` rebalanced address, etc.).
 */
function inferSessionEnv(address) {
    for (const ip of Object.values(exports.TEST_DC_IPV4))
        if (ip === address)
            return true;
    for (const ip of Object.values(exports.TEST_DC_IPV6))
        if (ip === address)
            return true;
    for (const ip of Object.values(exports.PROD_DC_IPV4))
        if (ip === address)
            return false;
    for (const ip of Object.values(exports.PROD_DC_IPV6))
        if (ip === address)
            return false;
    return undefined;
}
const clientParamsDefault = {
    connection: connection_1.ConnectionTCPFull,
    networkSocket: extensions_1.PromisedNetSockets,
    useIPV6: false,
    testServers: false,
    timeout: 10,
    requestRetries: 5,
    connectionRetries: Infinity,
    reconnectRetries: Infinity,
    retryDelay: 1000,
    downloadRetries: 5,
    autoReconnect: true,
    sequentialUpdates: false,
    floodSleepThreshold: 60,
    deviceModel: "",
    systemVersion: "",
    appVersion: "",
    langCode: "en",
    systemLangCode: "en",
    channelPollInterval: 1000,
    channelPollRequestInterval: 250,
    channelPollConcurrency: 2,
    _securityChecks: true,
};
class TelegramBaseClient {
    constructor(session, apiId, apiHash, clientParams) {
        /** The current teleproto version. */
        this.__version__ = Version_1.version;
        /**
         * Epoch ms of the last message decrypted on ANY session. Distinguishes a
         * genuinely dead main connection from a ping that merely timed out because
         * the single JS thread was busy decrypting media — if data is still
         * arriving, the stack is alive and a ping hiccup must not force a reconnect.
         * @hidden
         */
        this._lastReceivedAt = 0;
        /** @hidden */
        this._ALBUMS = new Map();
        /**
         * Connect failures per `"dcId:mediaCluster"`, used to rotate through a
         * DC's published addresses — one dead IP must not blackhole the DC.
         * @hidden
         */
        this._dcConnectFailures = new Map();
        /**
         * Shared per-DC state (auth key + server salt), tdesktop's `Dcenter`.
         * Every sender of one DC reads/writes here so fresh sessions start with a
         * valid salt and share one auth key.
         * @hidden
         */
        this._dcenters = new Dcenter_1.DcenterRegistry();
        this._lifecycleHandlers = new Map();
        this._connectionEvent = "disconnect";
        const explicitConnection = clientParams.connection !== undefined;
        const explicitSocket = clientParams.networkSocket !== undefined;
        clientParams = { ...clientParamsDefault, ...clientParams };
        if (!apiId || !apiHash) {
            throw new Error("Your API ID or Hash cannot be empty or undefined");
        }
        if (clientParams.baseLogger) {
            this._log = clientParams.baseLogger;
        }
        else {
            this._log = new extensions_1.Logger();
        }
        this._log.info(`Running teleproto version ${Version_1.version} (crypto: ${IGE_1.IGE.backend()})`);
        if (session && typeof session == "string") {
            session = new sessions_1.StoreSession(session);
        }
        if (!(session instanceof sessions_1.Session)) {
            throw new Error("Only StringSession and StoreSessions are supported currently :( ");
        }
        this._floodSleepThreshold = clientParams.floodSleepThreshold;
        this.session = session;
        this.apiId = apiId;
        this.apiHash = apiHash;
        (0, message_1.installMessageBehaviour)();
        this._useIPV6 = clientParams.useIPV6;
        this._testServers = clientParams.testServers;
        this._requestRetries = clientParams.requestRetries;
        this._sequentialUpdates = !!clientParams.sequentialUpdates;
        this._downloadRetries = clientParams.downloadRetries;
        this._connectionRetries = clientParams.connectionRetries;
        this._reconnectRetries = clientParams.reconnectRetries;
        this._retryDelay = clientParams.retryDelay || 0;
        this._channelPollInterval = clientParams.channelPollInterval;
        this._channelPollRequestInterval = clientParams.channelPollRequestInterval;
        this._channelPollConcurrency = clientParams.channelPollConcurrency;
        for (const [name, value] of [
            ["channelPollInterval", this._channelPollInterval],
            ["channelPollRequestInterval", this._channelPollRequestInterval],
            ["channelPollConcurrency", this._channelPollConcurrency],
        ]) {
            if (!Number.isSafeInteger(value) || value <= 0) {
                throw new RangeError(`${name} must be a positive safe integer`);
            }
        }
        this._timeout = clientParams.timeout;
        this._autoReconnect = clientParams.autoReconnect;
        this._maxConcurrentDownloads = clientParams.maxConcurrentDownloads || 1;
        this._keepAliveInterval = clientParams.keepAliveInterval;
        this._reCaptchaCallback = clientParams.reCaptchaCallback;
        if (!(clientParams.connection instanceof Function)) {
            throw new Error("Connection should be a class not an instance");
        }
        let route;
        if (clientParams.transport) {
            if (clientParams.proxy || explicitSocket) {
                throw new Error("transport replaces proxy and networkSocket: pass only transport");
            }
            route = clientParams.transport.resolve(explicitConnection ? clientParams.connection : undefined);
        }
        else {
            route = (0, Transport_1.resolveLegacyTransport)({
                proxy: clientParams.proxy,
                socket: clientParams.networkSocket || extensions_1.PromisedNetSockets,
                connection: clientParams.connection,
                explicitConnection,
                explicitSocket,
            });
        }
        this._connection = route.connection;
        this.networkSocket = route.socket;
        this._proxy = route.proxy;
        const initProxy = route.clientProxy
            ? new tl_1.Api.InputClientProxy(route.clientProxy)
            : undefined;
        this._initRequest = new tl_1.Api.InitConnection({
            apiId: this.apiId,
            deviceModel: clientParams.deviceModel || os_1.default.type().toString() || "Unknown",
            systemVersion: clientParams.systemVersion || os_1.default.release().toString() || "1.0",
            appVersion: clientParams.appVersion || "1.0",
            langCode: clientParams.langCode || clientParamsDefault.langCode,
            langPack: "", // this should be left empty.
            systemLangCode: clientParams.systemLangCode ||
                clientParamsDefault.systemLangCode,
            proxy: initProxy,
        });
        this._eventBuilders = [];
        this._floodWaitedRequests = {};
        this._bot = undefined;
        this._selfInputPeer = undefined;
        this._securityChecks = !!clientParams.securityChecks;
        this._entityCache = new entityCache_1.EntityCache(clientParams.entityCache);
        this._config = undefined;
        this._loopStarted = false;
        this._reconnecting = false;
        this._destroyed = false;
        this._isSwitchingDc = false;
        this._connectedDeferred = new Deferred_1.default();
        this._parseMode = markdown_1.MarkdownParser;
        this.updateManager = new manager_1.UpdateManager(this);
        this._network = new Network_1.Network(this, {
            idleTimeoutMs: clientParams.downloadPool?.idleTimeoutMs ??
                SESSION_IDLE_TIMEOUT_MS,
            sessionStartupDelayMs: clientParams.downloadPool?.sessionStartupDelayMs ??
                SESSION_STARTUP_DELAY_MS,
        });
        this._media = new MediaScheduler_1.MediaScheduler(this, this._network, clientParams.downloadPool);
    }
    /**
     * The in-memory entity cache. Exposes `size`, `has`, `delete` and
     * `clear` so stale peers can be invalidated without touching internals.
     * See {@link TelegramClientParams.entityCache} for bounding it.
     */
    get entityCache() {
        return this._entityCache;
    }
    get floodSleepThreshold() {
        return this._floodSleepThreshold;
    }
    set floodSleepThreshold(value) {
        this._floodSleepThreshold = Math.min(value || 0, 24 * 60 * 60);
    }
    set maxConcurrentDownloads(value) {
        this._maxConcurrentDownloads = value;
    }
    // region connecting
    async _initSession() {
        await this.session.load();
        if (!this.session.serverAddress) {
            this.session.testServers = this._testServers;
            const dcId = this._testServers
                ? TEST_DEFAULT_DC_ID
                : PROD_DEFAULT_DC_ID;
            const ipv4Table = this._testServers ? exports.TEST_DC_IPV4 : exports.PROD_DC_IPV4;
            const ipv6Table = this._testServers ? exports.TEST_DC_IPV6 : exports.PROD_DC_IPV6;
            this.session.setDC(dcId, this._useIPV6 ? ipv6Table[dcId] : ipv4Table[dcId], DC_PORT);
        }
        else {
            // Best-effort environment check: infer the session's environment from its
            // saved DC IP and warn if it disagrees with `clientParams.testServers`.
            // We can't do better without persisting the flag, and we don't want to
            // change the on-disk session format.
            const sessionEnv = inferSessionEnv(this.session.serverAddress);
            if (sessionEnv !== undefined && sessionEnv !== this._testServers) {
                this._log.warn(`testServers mismatch: client constructed with testServers=${this._testServers}, ` +
                    `but the session's saved address (${this.session.serverAddress}) looks like ` +
                    `${sessionEnv ? "test" : "production"}. Sessions are not portable between ` +
                    `environments — use a separate session for each.`);
            }
            this.session.testServers = this._testServers;
            this._useIPV6 = this.session.serverAddress.includes(":");
        }
        if (this.networkSocket.isWebSocket) {
            if (!this.session.serverAddress.endsWith(".web.telegram.org")) {
                const address = webSocketDcAddress(this.session.dcId);
                if (address) {
                    this.session.setDC(this.session.dcId, address, DC_PORT);
                }
            }
        }
        else if (this.session.serverAddress.endsWith(".web.telegram.org")) {
            const ipv4Table = this._testServers ? exports.TEST_DC_IPV4 : exports.PROD_DC_IPV4;
            const ipv6Table = this._testServers ? exports.TEST_DC_IPV6 : exports.PROD_DC_IPV6;
            const ip = (this._useIPV6 ? ipv6Table : ipv4Table)[this.session.dcId];
            if (ip) {
                this.session.setDC(this.session.dcId, ip, DC_PORT);
            }
        }
    }
    get connected() {
        return this._sender && this._sender.isConnected();
    }
    /** Runs when the main sender starts connecting, including reconnections. */
    onConnecting(handler) {
        return this._subscribeLifecycle("connecting", handler);
    }
    /** Runs when the main transport connects; account sign-in may still be required. */
    onConnect(handler) {
        return this._subscribeLifecycle("connect", handler);
    }
    /** Runs when the main transport disconnects, manually or during recovery. */
    onDisconnect(handler) {
        return this._subscribeLifecycle("disconnect", handler);
    }
    /** Runs once when an automatic reconnect cycle starts. */
    onReconnecting(handler) {
        return this._subscribeLifecycle("reconnecting", handler);
    }
    /** Runs after automatic reconnection, the client probe and a catch-up attempt; does not await application handlers. */
    onReconnect(handler) {
        return this._subscribeLifecycle("reconnect", handler);
    }
    /** Runs once after client resources and subscriptions have been released. */
    onDestroy(handler) {
        return this._subscribeLifecycle("destroy", handler);
    }
    _subscribeLifecycle(event, handler) {
        if (typeof handler !== "function")
            throw new TypeError("Lifecycle handler must be a function");
        if (this._destroyed)
            throw new Error("Cannot subscribe to a destroyed client");
        let handlers = this._lifecycleHandlers.get(event);
        if (!handlers)
            this._lifecycleHandlers.set(event, handlers = new Set());
        handlers.add(handler);
        return () => { handlers.delete(handler); };
    }
    /** @hidden */
    _handleConnectionLifecycle(event) {
        if (this._destroyed && event !== "disconnect")
            return;
        if (event === this._connectionEvent)
            return;
        this._connectionEvent = event;
        this._emitLifecycle(event);
    }
    _emitLifecycle(event) {
        for (const handler of this._lifecycleHandlers.get(event) ?? []) {
            void Promise.resolve().then(() => {
                if (this._destroyed && event !== "destroy" && event !== "disconnect")
                    return;
                return handler();
            }).catch(async (error) => {
                this._log.error(`${event} handler failed`, error);
                if (this._errorHandler) {
                    try {
                        await this._errorHandler(error);
                    }
                    catch (handlerError) {
                        this._log.error("Lifecycle error handler failed", handlerError);
                    }
                }
            });
        }
    }
    async disconnect() {
        await this._disconnect();
        await this._media.purge();
        await this._network.purge();
        this._teardownUpdateState();
    }
    /** @hidden */
    _teardownUpdateState() {
        for (const [timer] of this._ALBUMS.values()) {
            clearTimeout(timer);
        }
        this._ALBUMS.clear();
        this.updateManager.stop();
        for (const [builder] of this._eventBuilders) {
            builder.resolved = false;
        }
    }
    get disconnected() {
        return !this._sender || this._sender._disconnected;
    }
    async _disconnect() {
        (0, dispatch_1._stopUpdateLoop)(this);
        await this._sender?.disconnect();
    }
    /**
     * Disconnects all senders and removes all handlers
     * Disconnect is safer as it will not remove your event handlers
     */
    destroy() {
        if (this._destroyTask)
            return this._destroyTask;
        this._destroyed = true;
        (0, dispatch_1._clearUpdateQueue)(this);
        this._destroyTask = (async () => {
            await this.disconnect();
            await this._media.close();
            await this._network.close();
            this._eventBuilders = [];
            this._updates?._destroy();
            this._emitLifecycle("destroy");
            this._lifecycleHandlers.clear();
        })();
        return this._destroyTask;
    }
    /** @hidden */
    async _authKeyCallback(authKey, dcId) {
        this.session.setAuthKey(authKey, dcId);
        await this.session.save();
    }
    async _connectSender(sender, dcId, connection, mediaCluster = false) {
        const useMediaCluster = mediaCluster && !!sender.authKey.getKey();
        if (!connection) {
            const dc = await this.getDC(dcId, useMediaCluster);
            connection = new this._connection({
                ip: dc.ipAddress,
                port: dc.port,
                dcId: dcId,
                loggers: this._log,
                proxy: this._proxy,
                socket: this.networkSocket,
                keepAliveInterval: this._keepAliveInterval,
                testServers: this._testServers,
            });
        }
        const dcenter = this.session.dcId !== dcId ? this._dcenters.get(dcId) : undefined;
        while (dcenter?.importing)
            await dcenter.importing;
        const needAuth = !!dcenter && (dcenter.needsImport || !dcenter.authKey.getKey());
        let releaseImport;
        if (needAuth) {
            dcenter.importing = new Promise((resolve) => {
                releaseImport = resolve;
            });
        }
        try {
            let innerQuery;
            if (needAuth) {
                this._log.info(`Exporting authorization for data center ${dcId} with layer ${registry_1.LAYER}`);
                const auth = await this.invoke(new tl_1.Api.auth.ExportAuthorization({ dcId: dcId }));
                innerQuery = new tl_1.Api.auth.ImportAuthorization({
                    id: auth.id,
                    bytes: auth.bytes,
                });
            }
            else {
                innerQuery = new tl_1.Api.help.GetConfig();
            }
            await sender.connect(connection, false);
            if (useMediaCluster && !needAuth) {
                sender._authenticated = true;
                return sender;
            }
            const initConn = new tl_1.Api.InitConnection({
                apiId: this._initRequest.apiId,
                deviceModel: this._initRequest.deviceModel,
                systemVersion: this._initRequest.systemVersion,
                appVersion: this._initRequest.appVersion,
                langCode: this._initRequest.langCode,
                langPack: this._initRequest.langPack,
                systemLangCode: this._initRequest.systemLangCode,
                proxy: this._initRequest.proxy,
                query: innerQuery,
            });
            await sender.send(new tl_1.Api.InvokeWithLayer({ layer: registry_1.LAYER, query: initConn }));
            sender._authenticated = true;
            sender._needsInitConnection = false;
            if (needAuth)
                dcenter.needsImport = false;
            return sender;
        }
        catch (err) {
            if (err.errorMessage === "DC_ID_INVALID") {
                sender._authenticated = true;
                sender.userDisconnected = false;
                return sender;
            }
            if (needAuth)
                dcenter.needsImport = true;
            const failKey = `${dcId}:${useMediaCluster}`;
            this._dcConnectFailures.set(failKey, (this._dcConnectFailures.get(failKey) ?? 0) + 1);
            sender.disconnect().catch(() => { });
            throw err;
        }
        finally {
            if (releaseImport) {
                dcenter.importing = undefined;
                releaseImport();
            }
        }
    }
    /** @hidden */
    _makeSender(dcId, onBreak, authKey, autoReconnect = true, tempBinding, silenceMs) {
        return new network_1.MTProtoSender(authKey ?? this.session.getAuthKey(dcId), {
            logger: this._log,
            dcId,
            retries: this._connectionRetries,
            delay: this._retryDelay,
            autoReconnect: autoReconnect && this._autoReconnect,
            connectTimeout: this._timeout,
            authKeyCallback: this._authKeyCallback.bind(this),
            isMainSender: false,
            onConnectionBreak: onBreak,
            client: this,
            securityChecks: this._securityChecks,
            reconnectRetries: this._reconnectRetries,
            dcenter: this._dcenters.get(dcId),
            tempBinding,
            silenceMs,
        });
    }
    getSender(dcId) {
        return dcId
            ? this._network.getSession(dcId).ensureConnected()
            : Promise.resolve(this._sender);
    }
    _leaseSender(dcId) {
        return dcId
            ? this._network.lease(dcId)
            : Promise.resolve({ sender: this._sender, release: () => { } });
    }
    // endregion
    async getDC(dcId, download) {
        throw new Error("Cannot be called from here!");
    }
    invoke(request) {
        throw new Error("Cannot be called from here!");
    }
    setLogLevel(level) {
        this._log.setLevel(level);
    }
    get logger() {
        return this._log;
    }
    /**
     * Custom error handler for the client
     * @example
     * ```ts
     * client.onError = async (error)=>{
     *         console.log("error is",error)
     *     }
     * ```
     */
    set onError(handler) {
        this._errorHandler = async (error) => {
            try {
                await handler(error);
            }
            catch (e) {
                e.message = `Error ${e.message} thrown while handling top-level error: ${error.message}`;
                this._log.error(e.message, e);
            }
        };
    }
}
exports.TelegramBaseClient = TelegramBaseClient;
