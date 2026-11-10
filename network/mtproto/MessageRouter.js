Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("../../platform/buffer/index.js");
require("../../tl/index.js");
require("../../tl/core/index.js");
const require_tl_core_GZIPPacked = require("../../tl/core/GZIPPacked.js");
const require_tl_core_TLMessage = require("../../tl/core/TLMessage.js");
const require_tl_core_MessageContainer = require("../../tl/core/MessageContainer.js");
const require_tl_core_RPCResult = require("../../tl/core/RPCResult.js");
const require_tl_binary_Reader = require("../../tl/binary/Reader.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_errors_index = require("../../errors/index.js");
const require_errors_Common = require("../../errors/Common.js");
const require_Helpers = require("../../Helpers.js");
const require_network_mtproto_RequestState = require("./RequestState.js");
require("../../platform/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/network/mtproto/MessageRouter.ts
const UPDATES_ID = require_Helpers.unionId("Updates");
const RESEND_CODES = /* @__PURE__ */ new Set([16, 20]);
const NEW_SESSION_CODES = /* @__PURE__ */ new Set([
	17,
	32,
	33,
	34,
	35
]);
const INIT_ERRORS = /* @__PURE__ */ new Set(["CONNECTION_NOT_INITED", "CONNECTION_LAYER_INVALID"]);
const AUTH_LOST_ERRORS = /* @__PURE__ */ new Set(["AUTH_KEY_UNREGISTERED", "SESSION_REVOKED"]);
function isUpdates(body) {
	return body?.SUBCLASS_OF_ID === UPDATES_ID;
}
var MessageRouter = class {
	constructor(host) {
		this.host = host;
	}
	async route(message) {
		this.host.ack(message.msgId);
		const body = message.obj;
		if (body instanceof require_tl_core_MessageContainer.MessageContainer) for (const inner of body.messages) await this.route(inner);
		else if (body instanceof require_tl_core_GZIPPacked.GZIPPacked) {
			const data = await body.decompressed();
			await this.route(new require_tl_core_TLMessage.TLMessage(message.msgId, 0, new require_tl_binary_Reader.Reader(data).tgReadObject()));
		} else if (body instanceof require_tl_core_RPCResult.RPCResult) await this.rpcResult(body);
		else if (body instanceof require_tl_generated_api.Api.Pong) this.host.pending.take(body.msgId)?.resolve(body);
		else if (body instanceof require_tl_generated_api.Api.FutureSalts) this.host.pending.take(body.reqMsgId)?.resolve(body);
		else if (body instanceof require_tl_generated_api.Api.BadServerSalt) {
			this.host.badSalt(body.newServerSalt);
			this.host.requeue(this.host.pending.takeMessage(body.badMsgId));
		} else if (body instanceof require_tl_generated_api.Api.BadMsgNotification) this.badMessage(body, message.msgId);
		else if (body instanceof require_tl_generated_api.Api.NewSessionCreated) this.newSession(body);
		else if (body instanceof require_tl_generated_api.Api.MsgsAck) for (const msgId of body.msgIds) {
			const state = this.host.pending.get(msgId);
			if (state) state.acknowledged = true;
		}
		else if (body instanceof require_tl_generated_api.Api.MsgDetailedInfo) {
			if (this.host.pending.get(body.msgId) && !this.host.state.hasReceived(body.answerMsgId)) this.host.sendService(new require_tl_generated_api.Api.MsgResendReq({ msgIds: [body.answerMsgId] }));
			else this.host.ack(body.answerMsgId);
		} else if (body instanceof require_tl_generated_api.Api.MsgNewDetailedInfo) {
			if (this.host.state.hasReceived(body.answerMsgId)) this.host.ack(body.answerMsgId);
			else this.host.sendService(new require_tl_generated_api.Api.MsgResendReq({ msgIds: [body.answerMsgId] }));
		} else if (body instanceof require_tl_generated_api.Api.MsgsStateReq || body instanceof require_tl_generated_api.Api.MsgResendReq) this.host.sendService(new require_tl_generated_api.Api.MsgsStateInfo({
			reqMsgId: message.msgId,
			info: "".repeat(body.msgIds.length)
		}));
		else if (body instanceof require_tl_generated_api.Api.MsgsStateInfo) this.host.stateInfo(body.reqMsgId, require_platform_buffer_index.Buffer.from(body.info, "binary"));
		else if (body instanceof require_tl_generated_api.Api.MsgsAllInfo) return;
		else if (isUpdates(body)) this.host.update(body);
		else this.host.log.warn(`Ignoring unexpected ${body?.className ?? typeof body}`);
	}
	async rpcResult(result) {
		const state = this.host.pending.take(result.reqMsgId);
		if (!state) {
			this.host.log.debug(`Result for unknown request ${result.reqMsgId}`);
			return;
		}
		if (result.error) {
			const error = require_errors_index.RPCMessageToError(result.error, state.request);
			if (INIT_ERRORS.has(error.errorMessage)) {
				this.host.requireInit();
				this.host.requeue([state]);
				return;
			}
			if (error.errorMessage === "AUTH_KEY_PERM_EMPTY") {
				this.host.requeue([state]);
				this.host.tempKeyRejected();
				return;
			}
			if (state.initWrapped && error.code !== 401) this.host.initAnswered();
			state.reject(error);
			if (AUTH_LOST_ERRORS.has(error.errorMessage)) this.host.authLost(error);
			return;
		}
		try {
			const body = result.packed ? await result.packed.decompressed() : result.body;
			const value = require_network_mtproto_RequestState.readResult(state.request, new require_tl_binary_Reader.Reader(body ?? require_platform_buffer_index.Buffer.alloc(0)));
			if (state.initWrapped) this.host.initAnswered();
			state.resolve(value);
		} catch (error) {
			this.host.log.error(`Failed to read result for ${state.request.className}`, error);
			state.reject(error);
		}
	}
	badMessage(notice, serverMsgId) {
		const states = this.host.pending.takeMessage(notice.badMsgId);
		const code = notice.errorCode;
		this.host.log.debug(`bad_msg_notification ${code} for ${notice.badMsgId}`);
		if (code === 16 || code === 17) this.host.state.updateTimeOffset((0, big_integer.default)(serverMsgId));
		if (RESEND_CODES.has(code)) this.host.requeue(states);
		else if (NEW_SESSION_CODES.has(code)) {
			this.host.requeue(states);
			this.host.restartSession();
		} else for (const state of states) if (!(state.request instanceof require_tl_generated_api.Api.MsgsAck)) state.reject(new require_errors_Common.BadMessageError(state.request, code));
	}
	newSession(created) {
		this.host.resendBefore(created.firstMsgId);
		this.host.setSalt(created.serverSalt);
		const uniqueId = created.uniqueId.toString();
		const previous = this.sessionUniqueId;
		this.sessionUniqueId = uniqueId;
		if (previous !== void 0 && previous !== uniqueId) this.host.requireInit();
		if (this.host.isMain) this.host.update(new require_tl_generated_api.Api.UpdatesTooLong());
	}
	reset() {
		this.sessionUniqueId = void 0;
	}
};
exports.MessageRouter = MessageRouter;
