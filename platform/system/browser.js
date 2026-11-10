Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/platform/system/browser.ts
function navigatorInfo() {
	return globalThis.navigator ?? {};
}
function deviceModel() {
	return navigatorInfo().userAgent ?? "";
}
function systemVersion() {
	const info = navigatorInfo();
	return info.userAgentData?.platform || info.platform || "";
}
exports.deviceModel = deviceModel;
exports.systemVersion = systemVersion;
