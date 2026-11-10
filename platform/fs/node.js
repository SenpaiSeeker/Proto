Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
let node_fs = require("node:fs");
node_fs = require_runtime.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_runtime.__toESM(node_path);
// teleproto/platform/fs/node.ts
function open(path, flags) {
	return node_fs.default.promises.open(path, flags);
}
function readFile(path) {
	return node_fs.default.promises.readFile(path);
}
async function size(path) {
	return (await node_fs.default.promises.stat(path)).size;
}
async function isFile(path) {
	return (await node_fs.default.promises.lstat(path)).isFile();
}
function isDirectory(path) {
	return node_fs.default.existsSync(path) && node_fs.default.lstatSync(path).isDirectory();
}
async function isDirectoryAsync(path) {
	try {
		return (await node_fs.default.promises.lstat(path)).isDirectory();
	} catch {
		return false;
	}
}
function exists(path) {
	return node_fs.default.existsSync(path);
}
function isFileStream(value) {
	return value instanceof node_fs.default.WriteStream;
}
function resolve(...paths) {
	return node_path.default.resolve(...paths);
}
function join(...paths) {
	return node_path.default.join(...paths);
}
function basename(path) {
	return node_path.default.basename(path);
}
function isAbsolute(path) {
	return node_path.default.isAbsolute(path);
}
exports.basename = basename;
exports.exists = exists;
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
