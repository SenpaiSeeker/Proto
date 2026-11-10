Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/platform/storage/browser.ts
function open(_directory) {
	const storage = globalThis.localStorage;
	if (!storage) throw new Error("localStorage is not available in this environment: use MemorySession or StringSession");
	return storage;
}
exports.open = open;
