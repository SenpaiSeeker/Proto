Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/errors/RPCBaseErrors.ts
var RPCBaseErrors_exports = /* @__PURE__ */ require("../_virtual/_rolldown/runtime.js").__exportAll({
	AuthKeyError: () => AuthKeyError,
	BadRequestError: () => BadRequestError,
	FloodError: () => FloodError,
	ForbiddenError: () => ForbiddenError,
	InvalidDCError: () => InvalidDCError,
	NotFoundError: () => NotFoundError,
	RPCError: () => RPCError,
	ServerError: () => ServerError,
	TimedOutError: () => TimedOutError,
	UnauthorizedError: () => UnauthorizedError
});
var RPCError = class RPCError extends Error {
	constructor(message, request, code) {
		super("{0}: {1}{2}".replace("{0}", code?.toString() || "").replace("{1}", message || "").replace("{2}", RPCError._fmtRequest(request)));
		this.name = this.constructor.name;
		this.code = code;
		this.errorMessage = message;
	}
	static _fmtRequest(request) {
		if (request) return ` (caused by ${request.className})`;
		else return "";
	}
};
/**
* The request must be repeated, but directed to a different data center.
*/
var InvalidDCError = class extends RPCError {
	constructor(message, request, code) {
		super(message, request, code);
		this.code = code || 303;
		this.errorMessage = message || "ERROR_SEE_OTHER";
	}
};
/**
* The query contains errors. In the event that a request was created
* using a form and contains user generated data, the user should be
* notified that the data must be corrected before the query is repeated.
*/
var BadRequestError = class extends RPCError {
	constructor(..._args) {
		super(..._args);
		this.code = 400;
		this.errorMessage = "BAD_REQUEST";
	}
};
/**
* There was an unauthorized attempt to use functionality available only
* to authorized users.
*/
var UnauthorizedError = class extends RPCError {
	constructor(..._args2) {
		super(..._args2);
		this.code = 401;
		this.errorMessage = "UNAUTHORIZED";
	}
};
/**
* Privacy violation. For example, an attempt to write a message to
* someone who has blacklisted the current user.
*/
var ForbiddenError = class extends RPCError {
	constructor(..._args3) {
		super(..._args3);
		this.code = 403;
		this.errorMessage = "FORBIDDEN";
	}
};
/**
* An attempt to invoke a non-existent object, such as a method.
*/
var NotFoundError = class extends RPCError {
	constructor(..._args4) {
		super(..._args4);
		this.code = 404;
		this.errorMessage = "NOT_FOUND";
	}
};
/**
* Errors related to invalid authorization key, like
* AUTH_KEY_DUPLICATED which can cause the connection to fail.
*/
var AuthKeyError = class extends RPCError {
	constructor(..._args5) {
		super(..._args5);
		this.code = 406;
		this.errorMessage = "AUTH_KEY";
	}
};
/**
* The maximum allowed number of attempts to invoke the given method
* with the given input parameters has been exceeded. For example, in an
* attempt to request a large number of text messages (SMS) for the same
* phone number.
*/
var FloodError = class extends RPCError {
	constructor(..._args6) {
		super(..._args6);
		this.code = 420;
		this.errorMessage = "FLOOD";
	}
};
/**
* An internal server error occurred while a request was being processed
* for example, there was a disruption while accessing a database or file
* storage
*/
var ServerError = class extends RPCError {
	constructor(..._args7) {
		super(..._args7);
		this.code = 500;
		this.errorMessage = "INTERNAL";
	}
};
/**
* Clicking the inline buttons of bots that never (or take to long to)
* call ``answerCallbackQuery`` will result in this "special" RPCError.
*/
var TimedOutError = class extends RPCError {
	constructor(..._args8) {
		super(..._args8);
		this.code = 503;
		this.errorMessage = "Timeout";
	}
};
exports.AuthKeyError = AuthKeyError;
exports.BadRequestError = BadRequestError;
exports.FloodError = FloodError;
exports.ForbiddenError = ForbiddenError;
exports.InvalidDCError = InvalidDCError;
exports.NotFoundError = NotFoundError;
Object.defineProperty(exports, "RPCBaseErrors_exports", {
	enumerable: true,
	get: function() {
		return RPCBaseErrors_exports;
	}
});
exports.RPCError = RPCError;
exports.ServerError = ServerError;
exports.TimedOutError = TimedOutError;
exports.UnauthorizedError = UnauthorizedError;
