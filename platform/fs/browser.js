Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_fs_path = require("./path.js");
// teleproto/platform/fs/browser.ts
function unavailable() {
	return /* @__PURE__ */ new Error("File system paths are not available in this environment: pass a Buffer, a Blob or a CustomFile with a buffer");
}
function open(_path, _flags) {
	return Promise.reject(unavailable());
}
function readFile(_path) {
	return Promise.reject(unavailable());
}
function size(_path) {
	return Promise.reject(unavailable());
}
function isFile(_path) {
	return Promise.reject(unavailable());
}
function isDirectory(_path) {
	return false;
}
async function isDirectoryAsync(_path) {
	return false;
}
function exists(_path) {
	return false;
}
function isFileStream(_value) {
	return false;
}
exports.basename = require_platform_fs_path.basename;
exports.exists = exists;
exports.isAbsolute = require_platform_fs_path.isAbsolute;
exports.isDirectory = isDirectory;
exports.isDirectoryAsync = isDirectoryAsync;
exports.isFile = isFile;
exports.isFileStream = isFileStream;
exports.join = require_platform_fs_path.join;
exports.open = open;
exports.readFile = readFile;
exports.resolve = require_platform_fs_path.resolve;
exports.size = size;
