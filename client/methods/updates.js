Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_events_Raw = require("../../events/Raw.js");
const require_client_updates_StopPropagation = require("../updates/StopPropagation.js");
// teleproto/client/methods/updates.ts
function on(client, event) {
	return (f) => {
		client.addEventHandler(f, event);
		return f;
	};
}
function addEventHandler(client, callback, event) {
	event ??= new require_events_Raw.Raw({});
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
exports.StopPropagation = require_client_updates_StopPropagation.StopPropagation;
exports.addEventHandler = addEventHandler;
exports.catchUp = catchUp;
exports.listEventHandlers = listEventHandlers;
exports.on = on;
exports.removeEventHandler = removeEventHandler;
