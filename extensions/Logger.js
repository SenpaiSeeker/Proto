Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/extensions/Logger.ts
let LogLevel = /* @__PURE__ */ function(LogLevel) {
	LogLevel["NONE"] = "none";
	LogLevel["ERROR"] = "error";
	LogLevel["WARN"] = "warn";
	LogLevel["INFO"] = "info";
	LogLevel["DEBUG"] = "debug";
	return LogLevel;
}({});
const SEVERITY = {
	none: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4
};
const COLOR = {
	error: "\x1B[31m",
	warn: "\x1B[35m",
	info: "\x1B[33m",
	debug: "\x1B[36m"
};
const RESET = "\x1B[0m";
var Logger = class {
	constructor(level = "info") {
		this.messageFormat = "[%t] [%l] - [%m]";
		this.tzOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4;
		this._logLevel = level;
	}
	canSend(level) {
		return SEVERITY[this._logLevel] >= SEVERITY[level];
	}
	error(message, error) {
		this._log("error", message, error);
	}
	warn(message, error) {
		this._log("warn", message, error);
	}
	info(message, error) {
		this._log("info", message, error);
	}
	debug(message, error) {
		this._log("debug", message, error);
	}
	format(message, level) {
		return this.messageFormat.replace("%t", this.getDateTime()).replace("%l", level.toUpperCase()).replace("%m", message);
	}
	getDateTime() {
		return new Date(Date.now() - this.tzOffset).toISOString().slice(0, -1);
	}
	get logLevel() {
		return this._logLevel;
	}
	setLevel(level) {
		this._logLevel = level;
	}
	static setLevel(level) {
		console.log("Logger.setLevel is deprecated, it will has no effect. Please, use client.setLogLevel instead.");
	}
	_log(level, message, error) {
		if (this.canSend(level)) this.log(level, message, error);
	}
	log(level, message, error) {
		if (this.handler) {
			this.handler({
				level,
				message,
				error,
				date: new Date(Date.now() - this.tzOffset)
			});
			return;
		}
		console.log((COLOR[level] ?? "") + this.format(message, level) + RESET);
		if (error !== void 0) console.error(error);
	}
};
exports.LogLevel = LogLevel;
exports.Logger = Logger;
