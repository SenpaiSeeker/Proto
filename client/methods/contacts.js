Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_Helpers = require("../../Helpers.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../tl/index.js");
let big_integer = require("big-integer");
big_integer = require_runtime.__toESM(big_integer);
// teleproto/client/methods/contacts.ts
var contacts_exports = /* @__PURE__ */ require_runtime.__exportAll({
	addContact: () => addContact,
	block: () => block,
	deleteContacts: () => deleteContacts,
	getBlocked: () => getBlocked,
	getContacts: () => getContacts,
	importContacts: () => importContacts,
	unblock: () => unblock
});
/** @hidden */
async function getContacts(client) {
	const result = await client.api.contacts.getContacts({ hash: big_integer.default.zero });
	if (result instanceof require_tl_generated_api.Api.contacts.ContactsNotModified) return [];
	return result.users.filter((user) => user instanceof require_tl_generated_api.Api.User);
}
function _toNote(note) {
	if (note == void 0) return;
	if (typeof note === "string") return new require_tl_generated_api.Api.TextWithEntities({
		text: note,
		entities: []
	});
	return note;
}
/** @hidden */
async function addContact(client, entity, params) {
	const user = await client.getInputEntity(entity);
	return client.invoke(new require_tl_generated_api.Api.contacts.AddContact({
		id: user,
		firstName: params.firstName,
		lastName: params.lastName || "",
		phone: params.phone || "",
		addPhonePrivacyException: params.addPhonePrivacyException,
		note: _toNote(params.note)
	}));
}
/** @hidden */
async function deleteContacts(client, users) {
	const list = Array.isArray(users) ? users : [users];
	const ids = [];
	for (const user of list) ids.push(await client.getInputEntity(user));
	return client.invoke(new require_tl_generated_api.Api.contacts.DeleteContacts({ id: ids }));
}
/** @hidden */
async function importContacts(client, contacts) {
	return client.invoke(new require_tl_generated_api.Api.contacts.ImportContacts({ contacts: contacts.map((contact, i) => new require_tl_generated_api.Api.InputPhoneContact({
		clientId: require_Helpers.returnBigInt(contact.clientId ?? i),
		phone: contact.phone,
		firstName: contact.firstName,
		lastName: contact.lastName || "",
		note: _toNote(contact.note)
	})) }));
}
/** @hidden */
async function block(client, entity, params = {}) {
	const peer = await client.getInputEntity(entity);
	return client.api.contacts.block({
		id: peer,
		myStoriesFrom: params.myStoriesFrom
	});
}
/** @hidden */
async function unblock(client, entity, params = {}) {
	const peer = await client.getInputEntity(entity);
	return client.api.contacts.unblock({
		id: peer,
		myStoriesFrom: params.myStoriesFrom
	});
}
/** @hidden */
async function getBlocked(client, params = {}) {
	const result = await client.api.contacts.getBlocked({
		offset: params.offset ?? 0,
		limit: params.limit ?? 100,
		myStoriesFrom: params.myStoriesFrom
	});
	const blocked = new require_Helpers.TotalList();
	blocked.push(...result.blocked);
	blocked.total = result instanceof require_tl_generated_api.Api.contacts.BlockedSlice ? result.count : result.blocked.length;
	return blocked;
}
exports.addContact = addContact;
exports.block = block;
Object.defineProperty(exports, "contacts_exports", {
	enumerable: true,
	get: function() {
		return contacts_exports;
	}
});
exports.deleteContacts = deleteContacts;
exports.getBlocked = getBlocked;
exports.getContacts = getContacts;
exports.importContacts = importContacts;
exports.unblock = unblock;
