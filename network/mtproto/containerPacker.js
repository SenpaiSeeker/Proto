Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_tl_binary_Writer = require("../../tl/binary/Writer.js");
require("../../tl/core/index.js");
const require_tl_core_TLMessage = require("../../tl/core/TLMessage.js");
const require_tl_core_MessageContainer = require("../../tl/core/MessageContainer.js");
const require_network_mtproto_RequestState = require("./RequestState.js");
require("../../platform/index.js");
// teleproto/network/mtproto/containerPacker.ts
const MAX_MESSAGES = 1e3;
const MAX_CONTAINER_BYTES = 32768;
const SERVICE_REQUESTS = /* @__PURE__ */ new Set([
	"Ping",
	"PingDelayDisconnect",
	"GetFutureSalts",
	"RpcDropAnswer",
	"DestroySession",
	"DestroyAuthKey"
]);
const SOLO_REQUESTS = /* @__PURE__ */ new Set([
	"upload.GetFile",
	"upload.GetCdnFile",
	"upload.GetWebFile",
	"upload.SaveFilePart",
	"upload.SaveBigFilePart"
]);
function isContentRelated(request) {
	return require_network_mtproto_RequestState.expectsAnswer(request) && !SERVICE_REQUESTS.has(request.className);
}
async function packMessages(state, queues) {
	const writer = new require_tl_binary_Writer.Writer();
	const batch = [];
	let size = 0;
	pack: for (const queue of queues) while (queue.length && batch.length < MAX_MESSAGES) {
		const request = queue[0];
		if (request.cancelled) {
			queue.shift();
			continue;
		}
		const solo = SOLO_REQUESTS.has(request.request.className);
		const bytes = request.data.length + require_tl_core_TLMessage.TLMessage.SIZE_OVERHEAD;
		if (batch.length && (solo || size + bytes > MAX_CONTAINER_BYTES)) break pack;
		queue.shift();
		if (bytes > require_tl_core_MessageContainer.MessageContainer.MAXIMUM_SIZE) {
			request.reject(/* @__PURE__ */ new Error(`${request.request.className} payload of ${request.data.length} bytes is too big`));
			continue;
		}
		request.msgId = await state.writeDataAsMessage(writer, request.data, isContentRelated(request.request), request.after?.msgId, request.forcedMsgId, isContentRelated(request.request) && !solo);
		batch.push(request);
		size += bytes;
		if (solo) break pack;
	}
	if (!batch.length) return void 0;
	if (batch.length === 1) return {
		batch,
		data: writer.finish()
	};
	const header = require_platform_buffer_index.Buffer.allocUnsafe(8);
	header.writeUInt32LE(require_tl_core_MessageContainer.MessageContainer.CONSTRUCTOR_ID, 0);
	header.writeInt32LE(batch.length, 4);
	const container = new require_tl_binary_Writer.Writer();
	const containerId = await state.writeDataAsMessage(container, require_platform_buffer_index.Buffer.concat([header, writer.finish()]), false);
	for (const request of batch) request.containerId = containerId;
	return {
		batch,
		data: container.finish()
	};
}
exports.isContentRelated = isContentRelated;
exports.packMessages = packMessages;
