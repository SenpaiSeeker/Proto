Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
require("../../tl/index.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_requestIter = require("../../requestIter.js");
const require_Helpers = require("../../Helpers.js");
// teleproto/client/methods/wallet.ts
var wallet_exports = /* @__PURE__ */ require_runtime.__exportAll({
	WalletCursorIter: () => WalletCursorIter,
	closeTonConnectSession: () => closeTonConnectSession,
	getCurrencyRates: () => getCurrencyRates,
	getTonConnectSessions: () => getTonConnectSessions,
	getWallet: () => getWallet,
	getWalletAddresses: () => getWalletAddresses,
	getWalletNfts: () => getWalletNfts,
	getWalletTransactions: () => getWalletTransactions,
	getWalletTransactionsByHash: () => getWalletTransactionsByHash,
	getWalletTransactionsById: () => getWalletTransactionsById,
	iterWalletNfts: () => iterWalletNfts,
	iterWalletTransactions: () => iterWalletTransactions,
	sendWalletTransfer: () => sendWalletTransfer
});
const PAGE_LIMIT = 100;
var WalletCursorIter = class extends require_requestIter.RequestIter {
	constructor(..._args) {
		super(..._args);
		this.offsets = /* @__PURE__ */ new Set();
	}
	async _init({ offset, fetchPage }) {
		this.next = offset;
		this.fetchPage = fetchPage;
		this.offsets.clear();
	}
	async _loadNextChunk() {
		while (this.next !== void 0) {
			const offset = this.next;
			this.offsets.add(offset);
			const page = await this.fetchPage(offset, Math.min(this.left, PAGE_LIMIT));
			if (page.balance !== void 0) this.balance = page.balance;
			this.buffer.push(...page.items);
			this.next = page.next && !this.offsets.has(page.next) ? page.next : void 0;
			if (this.next === void 0) return true;
			if (page.items.length) return void 0;
		}
		return true;
	}
	[Symbol.asyncIterator]() {
		return super[Symbol.asyncIterator]();
	}
};
/** @hidden */
async function getWallet(client) {
	return client.invoke(new require_tl_generated_api.Api.wallet.GetState());
}
/** @hidden */
async function getWalletAddresses(client, users, params = {}) {
	return (await client.invoke(new require_tl_generated_api.Api.wallet.GetUserAddresses({
		force: params.force,
		id: Array.isArray(users) ? users : [users],
		addresses: params.addresses ?? []
	}))).addresses;
}
/** @hidden */
function iterWalletTransactions(client, params = {}) {
	const fetchPage = async (offset, limit) => {
		const result = await client.invoke(new require_tl_generated_api.Api.wallet.GetTransactions({
			inbound: params.inbound,
			outbound: params.outbound,
			offset,
			limit
		}));
		return {
			items: result.transactions,
			next: result.nextOffset,
			balance: result.balance
		};
	};
	return new WalletCursorIter(client, params.limit, { waitTime: params.waitTime }, {
		offset: params.offset ?? "",
		fetchPage
	});
}
/** @hidden */
async function getWalletTransactions(client, params = {}) {
	const iter = iterWalletTransactions(client, params);
	const list = await iter.collect();
	list.balance = iter.balance;
	return list;
}
/** @hidden */
async function getWalletTransactionsById(client, ids) {
	return (await client.invoke(new require_tl_generated_api.Api.wallet.GetTransactionsByIDs({ id: ids }))).transactions;
}
/** @hidden */
async function getWalletTransactionsByHash(client, hashes) {
	return (await client.invoke(new require_tl_generated_api.Api.wallet.GetTransactionsByMsgHash({ msgHash: hashes }))).transactions;
}
/** @hidden */
function iterWalletNfts(client, params = {}) {
	const fetchPage = async (offset, limit) => {
		const result = await client.invoke(new require_tl_generated_api.Api.wallet.GetNfts({
			offset,
			limit
		}));
		return {
			items: result.items,
			next: result.nextOffset
		};
	};
	return new WalletCursorIter(client, params.limit, { waitTime: params.waitTime }, {
		offset: params.offset ?? "",
		fetchPage
	});
}
/** @hidden */
async function getWalletNfts(client, params = {}) {
	return await iterWalletNfts(client, params).collect();
}
/** @hidden */
async function sendWalletTransfer(client, user, params) {
	const entity = await client.getInputEntity(user);
	const request = new require_tl_generated_api.Api.wallet.SendTransfer({
		dataNormal: params.data,
		dataGasless: params.gaslessData,
		userId: entity,
		randomId: params.randomId ?? require_Helpers.generateRandomLong()
	});
	const result = await client.invoke(request);
	return client._getResponseMessage(request, result, entity);
}
/** @hidden */
async function getTonConnectSessions(client) {
	return (await client.invoke(new require_tl_generated_api.Api.wallet.TonConnectGetSessions())).sessions;
}
/** @hidden */
async function closeTonConnectSession(client, sessionId, params = {}) {
	return client.invoke(new require_tl_generated_api.Api.wallet.TonConnectCloseSession({
		sessionId,
		body: params.body
	}));
}
/** @hidden */
async function getCurrencyRates(client) {
	const result = await client.invoke(new require_tl_generated_api.Api.payments.GetCurrencyRates());
	return new Map(result.rates.map((rate) => [rate.currency, rate.rate]));
}
exports.WalletCursorIter = WalletCursorIter;
exports.closeTonConnectSession = closeTonConnectSession;
exports.getCurrencyRates = getCurrencyRates;
exports.getTonConnectSessions = getTonConnectSessions;
exports.getWallet = getWallet;
exports.getWalletAddresses = getWalletAddresses;
exports.getWalletNfts = getWalletNfts;
exports.getWalletTransactions = getWalletTransactions;
exports.getWalletTransactionsByHash = getWalletTransactionsByHash;
exports.getWalletTransactionsById = getWalletTransactionsById;
exports.iterWalletNfts = iterWalletNfts;
exports.iterWalletTransactions = iterWalletTransactions;
exports.sendWalletTransfer = sendWalletTransfer;
Object.defineProperty(exports, "wallet_exports", {
	enumerable: true,
	get: function() {
		return wallet_exports;
	}
});
