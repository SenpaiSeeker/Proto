Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/network/dc/dcId.ts
const kDcShift = 1e4;
const kConfigDcShift = 1;
const kLogoutDcShift = 2;
const kUpdaterDcShift = 3;
const kExportDcShift = 4;
const kExportMediaDcShift = 5;
const kMaxMediaDcCount = 16;
const kBaseDownloadDcShift = 16;
const kBaseUploadDcShift = 32;
const kBaseDownloadSmallDcShift = 48;
function bareDcId(shiftedDcId) {
	return shiftedDcId % kDcShift;
}
function shiftDcId(dcId, shift) {
	return dcId + kDcShift * shift;
}
function getDcIdShift(shiftedDcId) {
	return Math.floor(shiftedDcId / kDcShift);
}
function downloadDcId(dcId, index) {
	return shiftDcId(dcId, 16 + index);
}
function uploadDcId(dcId, index) {
	return shiftDcId(dcId, 32 + index);
}
function isDownloadDcId(shiftedDcId) {
	const shift = getDcIdShift(shiftedDcId);
	return shift >= 16 && shift < 32;
}
function isUploadDcId(shiftedDcId) {
	const shift = getDcIdShift(shiftedDcId);
	return shift >= 32 && shift < 48;
}
function downloadSmallDcId(dcId, index) {
	return shiftDcId(dcId, 48 + index);
}
function isDownloadSmallDcId(shiftedDcId) {
	const shift = getDcIdShift(shiftedDcId);
	return shift >= 48 && shift < 64;
}
function isMediaDcId(shiftedDcId) {
	return isDownloadDcId(shiftedDcId) || isUploadDcId(shiftedDcId) || isDownloadSmallDcId(shiftedDcId);
}
exports.bareDcId = bareDcId;
exports.downloadDcId = downloadDcId;
exports.downloadSmallDcId = downloadSmallDcId;
exports.getDcIdShift = getDcIdShift;
exports.isDownloadDcId = isDownloadDcId;
exports.isDownloadSmallDcId = isDownloadSmallDcId;
exports.isMediaDcId = isMediaDcId;
exports.isUploadDcId = isUploadDcId;
exports.kBaseDownloadDcShift = kBaseDownloadDcShift;
exports.kBaseDownloadSmallDcShift = kBaseDownloadSmallDcShift;
exports.kBaseUploadDcShift = kBaseUploadDcShift;
exports.kConfigDcShift = kConfigDcShift;
exports.kDcShift = kDcShift;
exports.kExportDcShift = kExportDcShift;
exports.kExportMediaDcShift = kExportMediaDcShift;
exports.kLogoutDcShift = kLogoutDcShift;
exports.kMaxMediaDcCount = kMaxMediaDcCount;
exports.kUpdaterDcShift = kUpdaterDcShift;
exports.shiftDcId = shiftDcId;
exports.uploadDcId = uploadDcId;
