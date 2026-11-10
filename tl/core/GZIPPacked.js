Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_compression_index = require("../../platform/compression/index.js");
const require_tl_binary_Writer = require("../binary/Writer.js");
require("../../platform/index.js");
let node_zlib = require("node:zlib");
// teleproto/tl/core/GZIPPacked.ts
const MIN_COMPRESS_SIZE = 128;
const SAMPLE_FROM_SIZE = 16384;
const SAMPLE_SIZE = 1024;
const MAX_RATIO = .9;
var GZIPPacked = class GZIPPacked {
	static {
		this.CONSTRUCTOR_ID = 812830625;
	}
	static {
		this.classType = "constructor";
	}
	constructor(data, compressed = false) {
		this.data = data;
		this.compressed = compressed;
		this.CONSTRUCTOR_ID = GZIPPacked.CONSTRUCTOR_ID;
		this.classType = "constructor";
	}
	static gzipIfSmaller(contentRelated, data) {
		if (!contentRelated || data.length < MIN_COMPRESS_SIZE) return data;
		if (data.length >= SAMPLE_FROM_SIZE) {
			const middle = data.subarray(data.length - SAMPLE_SIZE >> 1, data.length + SAMPLE_SIZE >> 1);
			if (GZIPPacked.gzip(middle).length > middle.length * MAX_RATIO) return data;
		}
		const packed = new GZIPPacked(data).toBytes();
		return packed.length <= data.length * MAX_RATIO ? packed : data;
	}
	static gzip(input) {
		return require_platform_compression_index.gzip(input);
	}
	static ungzip(input) {
		return new Promise((resolve, reject) => {
			(0, node_zlib.unzip)(input, (error, result) => {
				if (error) reject(error);
				else resolve(result);
			});
		});
	}
	async decompressed() {
		return this.compressed ? GZIPPacked.ungzip(this.data) : this.data;
	}
	toBytes() {
		const writer = new require_tl_binary_Writer.Writer();
		writer.uint(GZIPPacked.CONSTRUCTOR_ID);
		writer.bytes(GZIPPacked.gzip(this.data));
		return writer.finish();
	}
	static read(reader) {
		if (reader.readInt(false) !== GZIPPacked.CONSTRUCTOR_ID) throw new Error("gzip_packed expected");
		return reader.tgReadBytes();
	}
	static fromReader(reader) {
		return new GZIPPacked(reader.tgReadBytes(), true);
	}
};
exports.GZIPPacked = GZIPPacked;
