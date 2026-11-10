Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_Helpers = require("../../Helpers.js");
const require_client_updates_StopPropagation = require("./StopPropagation.js");
// teleproto/client/updates/UpdateDispatcher.ts
var UpdateDispatcher = class {
	constructor(client) {
		this.client = client;
		this.draining = false;
	}
	dispatch(update) {
		if (this.client._destroyed) return Promise.resolve();
		if (!this.client._sequentialUpdates) return this.deliver(update);
		return new Promise((resolve, reject) => {
			const job = {
				update,
				resolve,
				reject
			};
			if (this.tail) this.tail.next = job;
			else this.head = job;
			this.tail = job;
			if (!this.draining) this.drain();
		});
	}
	clear() {
		while (this.head) {
			const job = this.head;
			this.head = job.next;
			job.next = void 0;
			job.resolve();
		}
		this.tail = void 0;
	}
	async drain() {
		this.draining = true;
		try {
			while (this.head) {
				const job = this.head;
				this.head = job.next;
				job.next = void 0;
				if (!this.head) this.tail = void 0;
				try {
					if (!this.client._destroyed) await this.deliver(job.update);
					job.resolve();
				} catch (error) {
					job.reject(error);
				}
			}
		} finally {
			this.draining = false;
		}
	}
	async deliver(update) {
		const client = this.client;
		for (const [builder, callback] of [...client._eventBuilders]) {
			if (client._destroyed) return;
			if (!builder || !callback || !update) continue;
			try {
				if (!builder.resolved) await builder.resolve(client);
			} catch (e) {
				client._log.error(`Error resolving event builder: ${e}`);
				continue;
			}
			if (!client._selfInputPeer) try {
				await client.getMe(true);
			} catch {}
			let event;
			try {
				event = builder.build(update, callback, client._selfInputPeer ? require_Helpers.returnBigInt(client._selfInputPeer.userId) : void 0);
			} catch (e) {
				client._log.error(`Error building event: ${e}`);
				continue;
			}
			if (!event) continue;
			event._client = client;
			if ("_eventName" in event) {
				event.originalUpdate = update;
				event._entities = update._entities ?? /* @__PURE__ */ new Map();
				event._setClient(client);
			}
			let accepted;
			try {
				accepted = await builder.filter(event);
			} catch (e) {
				client._log.error(`Error in event filter: ${e}`);
				continue;
			}
			if (!accepted) continue;
			try {
				await callback(event);
			} catch (e) {
				if (e instanceof require_client_updates_StopPropagation.StopPropagation) break;
				if (client._errorHandler) try {
					await client._errorHandler(e);
				} catch (error) {
					client._log.error(`Error in update error handler: ${error}`);
				}
				client._log.error(`Error in event handler: ${e}`);
			}
		}
		if (!client._destroyed) await client.updates._dispatch(update);
	}
};
exports.UpdateDispatcher = UpdateDispatcher;
