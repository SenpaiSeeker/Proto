Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_platform_buffer_index = require("./buffer/index.js");
const require_platform_compression_index = require("./compression/index.js");
const require_platform_crypto_index = require("./crypto/index.js");
const require_platform_events_index = require("./events/index.js");
const require_platform_fs_index = require("./fs/index.js");
const require_platform_net_index = require("./net/index.js");
const require_platform_storage_index = require("./storage/index.js");
const require_platform_system_index = require("./system/index.js");
const require_platform_timers_index = require("./timers/index.js");
exports.Buffer = require_platform_buffer_index.Buffer;
Object.defineProperty(exports, "compression", {
	enumerable: true,
	get: function() {
		return require_platform_compression_index.compression_exports;
	}
});
Object.defineProperty(exports, "crypto", {
	enumerable: true,
	get: function() {
		return require_platform_crypto_index.crypto_exports;
	}
});
Object.defineProperty(exports, "events", {
	enumerable: true,
	get: function() {
		return require_platform_events_index.events_exports;
	}
});
Object.defineProperty(exports, "fs", {
	enumerable: true,
	get: function() {
		return require_platform_fs_index.fs_exports;
	}
});
Object.defineProperty(exports, "net", {
	enumerable: true,
	get: function() {
		return require_platform_net_index.net_exports;
	}
});
Object.defineProperty(exports, "storage", {
	enumerable: true,
	get: function() {
		return require_platform_storage_index.storage_exports;
	}
});
Object.defineProperty(exports, "system", {
	enumerable: true,
	get: function() {
		return require_platform_system_index.system_exports;
	}
});
Object.defineProperty(exports, "timers", {
	enumerable: true,
	get: function() {
		return require_platform_timers_index.timers_exports;
	}
});
