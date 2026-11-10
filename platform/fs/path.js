Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/platform/fs/path.ts
function normalize(segments, absolute) {
	const result = [];
	for (const segment of segments) {
		if (!segment || segment === ".") continue;
		if (segment !== "..") result.push(segment);
		else if (result.length && result[result.length - 1] !== "..") result.pop();
		else if (!absolute) result.push("..");
	}
	return result;
}
function isAbsolute(path) {
	return path.startsWith("/");
}
function resolve(...paths) {
	let joined = "";
	for (let i = paths.length - 1; i >= 0 && !isAbsolute(joined); i--) if (paths[i]) joined = joined ? `${paths[i]}/${joined}` : paths[i];
	return "/" + normalize(joined.split("/"), true).join("/");
}
function join(...paths) {
	const joined = paths.filter(Boolean).join("/");
	if (!joined) return ".";
	const absolute = isAbsolute(joined);
	const body = normalize(joined.split("/"), absolute).join("/");
	const result = (absolute ? "/" : "") + body || ".";
	return joined.endsWith("/") && result !== "/" ? `${result}/` : result;
}
function basename(path) {
	const trimmed = path.replace(/\/+$/, "");
	return trimmed.slice(trimmed.lastIndexOf("/") + 1);
}
exports.basename = basename;
exports.isAbsolute = isAbsolute;
exports.join = join;
exports.resolve = resolve;
