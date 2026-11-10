Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_sessions_FileStore = require("../../sessions/FileStore.js");
// teleproto/platform/storage/node.ts
function open(directory) {
	return new require_sessions_FileStore.FileStore(directory);
}
exports.open = open;
