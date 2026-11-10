Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_platform_fs_index = require("../../platform/fs/index.js");
const require_tl_binary_Writer = require("../../tl/binary/Writer.js");
require("../../platform/index.js");
// teleproto/client/files/sinks.ts
async function writeWithBackpressure(writer, data) {
	const stream = writer;
	if (writer.write(data) !== false || typeof stream.once !== "function" || typeof stream.removeListener !== "function") return;
	await new Promise((resolve, reject) => {
		const cleanup = () => {
			stream.removeListener("drain", onDrain);
			stream.removeListener("error", onError);
		};
		const onDrain = () => {
			cleanup();
			resolve();
		};
		const onError = (error) => {
			cleanup();
			reject(error);
		};
		stream.once("drain", onDrain);
		stream.once("error", onError);
	});
}
var FileTarget = class FileTarget {
	constructor(handle, filePath) {
		this.handle = handle;
		this.filePath = filePath;
	}
	static async open(filePath) {
		return new FileTarget(await require_platform_fs_index.open(filePath, "w"), filePath);
	}
	async write(offset, data) {
		let written = 0;
		while (written < data.length) {
			const { bytesWritten } = await this.handle.write(data, written, data.length - written, offset + written);
			written += bytesWritten;
		}
	}
	async close() {
		await this.handle.close();
		return require_platform_fs_index.resolve(this.filePath);
	}
	async abort() {
		await this.handle.close().catch(() => {});
	}
};
var BufferTarget = class {
	constructor(size) {
		this.chunks = /* @__PURE__ */ new Map();
		this.end = 0;
		if (size !== void 0 && size > 0) this.buffer = require_platform_buffer_index.Buffer.allocUnsafe(size);
	}
	write(offset, data) {
		this.end = Math.max(this.end, offset + data.length);
		if (this.buffer && this.end <= this.buffer.length) data.copy(this.buffer, offset);
		else this.chunks.set(offset, data);
	}
	async close() {
		if (!this.chunks.size) return this.buffer ? this.buffer.subarray(0, this.end) : require_platform_buffer_index.Buffer.alloc(0);
		const out = require_platform_buffer_index.Buffer.alloc(this.end);
		if (this.buffer) this.buffer.copy(out, 0, 0, Math.min(this.buffer.length, this.end));
		for (const [offset, data] of this.chunks) data.copy(out, offset);
		return out;
	}
	async abort() {}
};
var OrderedSink = class {
	constructor(next, emit) {
		this.next = next;
		this.emit = emit;
		this.stash = /* @__PURE__ */ new Map();
		this.draining = Promise.resolve();
	}
	write(offset, data) {
		this.stash.set(offset, data);
		this.draining = this.draining.then(() => this.drain());
		return this.draining;
	}
	async drain() {
		for (;;) {
			const data = this.stash.get(this.next);
			if (!data) return;
			this.stash.delete(this.next);
			const offset = this.next;
			this.next += data.length;
			await this.emit(offset, data);
		}
	}
};
var WriterTarget = class {
	constructor(writer) {
		this.writer = writer;
		this.ordered = new OrderedSink(0, (_offset, data) => writeWithBackpressure(this.writer, data));
	}
	write(offset, data) {
		return this.ordered.write(offset, data);
	}
	async close() {
		const writer = this.writer;
		if (require_platform_fs_index.isFileStream(writer)) {
			await new Promise((resolve, reject) => {
				writer.once("error", reject);
				writer.end(() => resolve());
			});
			return typeof writer.path === "string" ? require_platform_fs_index.resolve(writer.path) : require_platform_buffer_index.Buffer.from(writer.path);
		}
		if (writer instanceof require_tl_binary_Writer.Writer) return writer.getValue();
		if (typeof writer.close === "function") await writer.close();
	}
	async abort() {
		if (require_platform_fs_index.isFileStream(this.writer)) this.writer.destroy();
	}
};
async function openTarget(outputFile, size) {
	if (typeof outputFile === "string") return FileTarget.open(outputFile);
	if (!outputFile || require_platform_buffer_index.Buffer.isBuffer(outputFile)) return new BufferTarget(size);
	return new WriterTarget(outputFile);
}
exports.OrderedSink = OrderedSink;
exports.openTarget = openTarget;
