Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../tl/index.js");
// teleproto/client/methods/folders.ts
var folders_exports = /* @__PURE__ */ require_runtime.__exportAll({
	getDialogFilters: () => getDialogFilters,
	updateDialogFilter: () => updateDialogFilter,
	updateDialogFiltersOrder: () => updateDialogFiltersOrder
});
/** @hidden */
async function getDialogFilters(client) {
	return client.api.messages.getDialogFilters({});
}
/**
* Creates, updates or deletes a dialog filter (chat folder).
* Pass `filter: undefined` to delete the folder with the given ID.
* @hidden
*/
async function updateDialogFilter(client, id, filter) {
	return client.invoke(new require_tl_generated_api.Api.messages.UpdateDialogFilter({
		id,
		filter
	}));
}
/** @hidden */
async function updateDialogFiltersOrder(client, order) {
	return client.api.messages.updateDialogFiltersOrder({ order });
}
Object.defineProperty(exports, "folders_exports", {
	enumerable: true,
	get: function() {
		return folders_exports;
	}
});
exports.getDialogFilters = getDialogFilters;
exports.updateDialogFilter = updateDialogFilter;
exports.updateDialogFiltersOrder = updateDialogFiltersOrder;
