Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../tl/index.js");
const require_errors_FileErrors = require("../../errors/FileErrors.js");
require("../../errors/index.js");
const require_extensions_Deferred = require("../../extensions/Deferred.js");
const require_client_files_PartsManager = require("./PartsManager.js");
const require_client_files_ResourceState = require("./ResourceState.js");
// teleproto/client/files/FileUploader.ts
const BIG_FILE_SIZE = 10485760;
var FileUploader = class {
	constructor(transfers, opts) {
		this.transfers = transfers;
		this.opts = opts;
		this.done = new require_extensions_Deferred.default();
		this.inflight = 0;
		this.finished = false;
		this.onAbort = () => this.fail(new require_errors_FileErrors.MediaAbortError());
		this.isBig = opts.size > BIG_FILE_SIZE;
		this.parts = new require_client_files_PartsManager.PartsManager({
			size: opts.size,
			partSize: opts.partSize
		});
		this.resource = new require_client_files_ResourceState.ResourceState(opts.partSize);
		this.manager = transfers.manager("upload", opts.dcId);
		this.done.promise.catch(() => {});
	}
	get partCount() {
		return Math.ceil(this.opts.size / this.opts.partSize);
	}
	run() {
		if (this.opts.signal?.aborted) return Promise.reject(new require_errors_FileErrors.MediaAbortError());
		this.opts.signal?.addEventListener("abort", this.onAbort, { once: true });
		this.manager.register(this, -1);
		this.loop();
		return this.done.promise;
	}
	onResources() {
		this.loop();
	}
	loop() {
		if (this.finished) return;
		if (this.parts.isReady() && this.inflight === 0) return this.finish();
		while (this.resource.unused >= this.parts.partSize && this.inflight < (this.opts.maxInflight ?? Infinity)) {
			const part = this.parts.startPart();
			if (!part) break;
			this.resource.startUse(this.parts.partSize);
			this.inflight++;
			this.send(part);
		}
		if (this.resource.updateEstimatedLimit(this.parts.remainingBytes())) this.manager.update();
	}
	async send(part) {
		try {
			const bytes = await this.opts.read(part.offset, part.size);
			if (this.finished) return;
			const { fileId } = this.opts;
			const ok = await this.transfers.run("upload", this.opts.dcId, () => this.isBig ? new require_tl_generated_api.Api.upload.SaveBigFilePart({
				fileId,
				filePart: part.id,
				fileTotalParts: this.partCount,
				bytes
			}) : new require_tl_generated_api.Api.upload.SaveFilePart({
				fileId,
				filePart: part.id,
				bytes
			}), this.opts.signal);
			if (this.finished) return;
			if (ok !== true) throw new Error(`Telegram refused upload part ${part.id}`);
			this.parts.onPartOk(part, bytes.length);
			this.opts.onPart?.();
		} catch (error) {
			this.parts.onPartFailed(part);
			this.fail(error);
		} finally {
			this.inflight--;
			this.resource.stopUse(this.parts.partSize);
			this.manager.update();
			this.loop();
		}
	}
	finish() {
		if (this.finished) return;
		this.finished = true;
		this.release();
		this.done.resolve();
	}
	fail(error) {
		if (this.finished) return;
		this.finished = true;
		this.release();
		this.done.reject(error);
	}
	release() {
		this.opts.signal?.removeEventListener("abort", this.onAbort);
		this.manager.unregister(this);
	}
};
exports.BIG_FILE_SIZE = BIG_FILE_SIZE;
exports.FileUploader = FileUploader;
