Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// teleproto/sessions/Abstract.ts
var Session = class {
	constructor() {
		this.__testServers = false;
	}
	get testServers() {
		return this.__testServers;
	}
	set testServers(value) {
		this.__testServers = value;
	}
	/**
	* Returns an ID of the takeout process initialized for this session,
	* or `None` if there's no were any unfinished takeout requests.
	*/
	/**
	* Sets the ID of the unfinished takeout process for this session.
	* @param value
	*/
	/**
	* Returns the update state saved by {@link setUpdateState}, if any.
	*/
	getUpdateState() {}
	/**
	* Persists the update state (common pts/qts/date/seq and per-channel pts)
	* so the client can fetch updates missed while it was offline.
	*/
	setUpdateState(_state) {}
};
exports.Session = Session;
