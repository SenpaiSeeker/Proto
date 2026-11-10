Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_client_methods_updates = require("../methods/updates.js");
const require_client_updates_StopPropagation = require("./StopPropagation.js");
const require_compat_client_updates_dispatch = require("../../compat/client/updates/dispatch.js");
const require_client_updates_UpdateDispatcher = require("./UpdateDispatcher.js");
const require_client_updates_UpdateLoop = require("./UpdateLoop.js");
const require_client_updates_UpdateManager = require("./UpdateManager.js");
const require_client_updates_PtsWaiter = require("./PtsWaiter.js");
const require_client_updates_ClientUpdates = require("./ClientUpdates.js");
const require_client_updates_UpdateContext = require("./UpdateContext.js");
// teleproto/client/updates/index.ts
var updates_exports = /* @__PURE__ */ require_runtime.__exportAll({
	ClientUpdates: () => require_client_updates_ClientUpdates.ClientUpdates,
	PtsWaiter: () => require_client_updates_PtsWaiter.PtsWaiter,
	StopPropagation: () => require_client_updates_StopPropagation.StopPropagation,
	UpdateContext: () => require_client_updates_UpdateContext.UpdateContext,
	UpdateDispatcher: () => require_client_updates_UpdateDispatcher.UpdateDispatcher,
	UpdateLoop: () => require_client_updates_UpdateLoop.UpdateLoop,
	UpdateManager: () => require_client_updates_UpdateManager.UpdateManager,
	WAIT_FOR_SKIPPED_TIMEOUT_MS: () => 700,
	_clearUpdateQueue: () => require_compat_client_updates_dispatch._clearUpdateQueue,
	_dispatchUpdate: () => require_compat_client_updates_dispatch._dispatchUpdate,
	_handleUpdate: () => require_compat_client_updates_dispatch._handleUpdate,
	_stopUpdateLoop: () => require_compat_client_updates_dispatch._stopUpdateLoop,
	_updateLoop: () => require_compat_client_updates_dispatch._updateLoop,
	addEventHandler: () => require_client_methods_updates.addEventHandler,
	catchUp: () => require_client_methods_updates.catchUp,
	listEventHandlers: () => require_client_methods_updates.listEventHandlers,
	on: () => require_client_methods_updates.on,
	removeEventHandler: () => require_client_methods_updates.removeEventHandler
});
exports.ClientUpdates = require_client_updates_ClientUpdates.ClientUpdates;
exports.PtsWaiter = require_client_updates_PtsWaiter.PtsWaiter;
exports.StopPropagation = require_client_updates_StopPropagation.StopPropagation;
exports.UpdateContext = require_client_updates_UpdateContext.UpdateContext;
exports.UpdateDispatcher = require_client_updates_UpdateDispatcher.UpdateDispatcher;
exports.UpdateLoop = require_client_updates_UpdateLoop.UpdateLoop;
exports.UpdateManager = require_client_updates_UpdateManager.UpdateManager;
exports.WAIT_FOR_SKIPPED_TIMEOUT_MS = require_client_updates_PtsWaiter.WAIT_FOR_SKIPPED_TIMEOUT_MS;
exports._clearUpdateQueue = require_compat_client_updates_dispatch._clearUpdateQueue;
exports._dispatchUpdate = require_compat_client_updates_dispatch._dispatchUpdate;
exports._handleUpdate = require_compat_client_updates_dispatch._handleUpdate;
exports._stopUpdateLoop = require_compat_client_updates_dispatch._stopUpdateLoop;
exports._updateLoop = require_compat_client_updates_dispatch._updateLoop;
exports.addEventHandler = require_client_methods_updates.addEventHandler;
exports.catchUp = require_client_methods_updates.catchUp;
exports.listEventHandlers = require_client_methods_updates.listEventHandlers;
exports.on = require_client_methods_updates.on;
exports.removeEventHandler = require_client_methods_updates.removeEventHandler;
Object.defineProperty(exports, "updates_exports", {
	enumerable: true,
	get: function() {
		return updates_exports;
	}
});
