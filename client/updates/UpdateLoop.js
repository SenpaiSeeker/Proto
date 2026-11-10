Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_timers_index = require("../../platform/timers/index.js");
require("../../platform/index.js");
// teleproto/client/updates/UpdateLoop.ts
const STALE_CHECK_INTERVAL_MS = 9e3;
var UpdateLoop = class {
	constructor(client) {
		this.client = client;
	}
	get running() {
		return this.controller !== void 0;
	}
	start(catchUp = true) {
		if (this.controller || this.client._destroyed) return;
		this.run(catchUp);
	}
	stop() {
		this.controller?.abort();
		this.controller = void 0;
	}
	async run(catchUp) {
		const client = this.client;
		const controller = new AbortController();
		this.controller = controller;
		const active = () => !controller.signal.aborted && !client._destroyed;
		client.updateManager.start();
		if (catchUp) await client.updateManager.catchUp();
		while (active()) {
			try {
				await require_platform_timers_index.sleep(STALE_CHECK_INTERVAL_MS, {
					signal: controller.signal,
					ref: false
				});
			} catch {
				break;
			}
			if (!active()) break;
			const sender = client._sender;
			if (sender?.userDisconnected) break;
			if (!sender?.isConnected()) continue;
			await client.updateManager.recoverIfStale();
		}
		if (this.controller === controller) {
			this.controller = void 0;
			if (client._destroyed) await client.disconnect();
		}
	}
};
exports.UpdateLoop = UpdateLoop;
