Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
let _platform_fs = require("#platform/fs");
_platform_fs = require_runtime.__toESM(_platform_fs);
// teleproto/platform/fs/index.ts
var fs_exports = /* @__PURE__ */ require_runtime.__exportAll({
	basename: () => basename,
	exists: () => exists,
	isAbsolute: () => isAbsolute,
	isDirectory: () => isDirectory,
	isDirectoryAsync: () => isDirectoryAsync,
	isFile: () => isFile,
	isFileStream: () => isFileStream,
	join: () => join,
	open: () => open,
	readFile: () => readFile,
	resolve: () => resolve,
	size: () => size
});
const { open, readFile, size, isFile, isDirectory, isDirectoryAsync, exists, isFileStream, resolve, join, basename, isAbsolute } = _platform_fs;
exports.basename = basename;
exports.exists = exists;
Object.defineProperty(exports, "fs_exports", {
	enumerable: true,
	get: function() {
		return fs_exports;
	}
});
exports.isAbsolute = isAbsolute;
exports.isDirectory = isDirectory;
exports.isDirectoryAsync = isDirectoryAsync;
exports.isFile = isFile;
exports.isFileStream = isFileStream;
exports.join = join;
exports.open = open;
exports.readFile = readFile;
exports.resolve = resolve;
exports.size = size;
