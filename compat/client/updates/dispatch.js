Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_client_methods_updates = require("../../../client/methods/updates.js");
const require_client_updates_StopPropagation = require("../../../client/updates/StopPropagation.js");
// teleproto/compat/client/updates/dispatch.ts
/** @hidden @deprecated */
function _handleUpdate(client, update) {
	client.updateManager.receive(update);
}
/** @hidden @deprecated */
function _dispatchUpdate(client, args) {
	return client._updateDispatcher.dispatch(args.update);
}
/** @hidden @deprecated */
function _clearUpdateQueue(client) {
	client._updateDispatcher.clear();
}
/** @hidden @deprecated */
function _stopUpdateLoop(client) {
	client._updateLoop.stop();
}
/** @hidden @deprecated */
async function _updateLoop(client, catchUp = true) {
	client._updateLoop.start(catchUp);
}
exports.StopPropagation = require_client_updates_StopPropagation.StopPropagation;
exports._clearUpdateQueue = _clearUpdateQueue;
exports._dispatchUpdate = _dispatchUpdate;
exports._handleUpdate = _handleUpdate;
exports._stopUpdateLoop = _stopUpdateLoop;
exports._updateLoop = _updateLoop;
exports.addEventHandler = require_client_methods_updates.addEventHandler;
exports.catchUp = require_client_methods_updates.catchUp;
exports.listEventHandlers = require_client_methods_updates.listEventHandlers;
exports.on = require_client_methods_updates.on;
exports.removeEventHandler = require_client_methods_updates.removeEventHandler;
