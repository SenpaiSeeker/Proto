Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../tl/index.js");
const require_tl_custom_inlineResults = require("../../tl/custom/inlineResults.js");
const require_client_methods_messageParse = require("./messageParse.js");
// teleproto/client/methods/bots.ts
var bots_exports = /* @__PURE__ */ require_runtime.__exportAll({
	addBotUsername: () => addBotUsername,
	checkBotUsername: () => checkBotUsername,
	getBotCommands: () => getBotCommands,
	getBotInfo: () => getBotInfo,
	getBotMenuButton: () => getBotMenuButton,
	inlineQuery: () => inlineQuery,
	removeBotUsername: () => removeBotUsername,
	resetBotCommands: () => resetBotCommands,
	setBotCommands: () => setBotCommands,
	setBotInfo: () => setBotInfo,
	setBotMenuButton: () => setBotMenuButton,
	setBotVerification: () => setBotVerification
});
var GetInlineBotResults = require_tl_generated_api.Api.messages.GetInlineBotResults;
/** @hidden */
async function inlineQuery(client, bot, query, entity, offset, geoPoint) {
	bot = await client.getInputEntity(bot);
	let peer = new require_tl_generated_api.Api.InputPeerSelf();
	if (entity) peer = await client.getInputEntity(entity);
	const result = await client.invoke(new GetInlineBotResults({
		bot,
		peer,
		query,
		offset: offset || "",
		geoPoint
	}));
	return new require_tl_custom_inlineResults.InlineResults(client, result, entity ? peer : void 0);
}
/** @hidden */
async function setBotCommands(client, commands, params = {}) {
	return client.invoke(new require_tl_generated_api.Api.bots.SetBotCommands({
		scope: params.scope ?? new require_tl_generated_api.Api.BotCommandScopeDefault(),
		langCode: params.langCode ?? "",
		commands: commands.map((command) => new require_tl_generated_api.Api.BotCommand({
			command: command.command,
			description: command.description,
			ephemeral: command.ephemeral
		}))
	}));
}
/** @hidden */
async function getBotCommands(client, params = {}) {
	return client.invoke(new require_tl_generated_api.Api.bots.GetBotCommands({
		scope: params.scope ?? new require_tl_generated_api.Api.BotCommandScopeDefault(),
		langCode: params.langCode ?? ""
	}));
}
/** @hidden */
async function resetBotCommands(client, params = {}) {
	return client.invoke(new require_tl_generated_api.Api.bots.ResetBotCommands({
		scope: params.scope ?? new require_tl_generated_api.Api.BotCommandScopeDefault(),
		langCode: params.langCode ?? ""
	}));
}
/** @hidden */
async function setBotInfo(client, params) {
	return client.invoke(new require_tl_generated_api.Api.bots.SetBotInfo({
		bot: params.bot ? await client.getInputEntity(params.bot) : void 0,
		langCode: params.langCode ?? "",
		name: params.name,
		about: params.about,
		description: params.description
	}));
}
/** @hidden */
async function getBotInfo(client, params = {}) {
	return client.invoke(new require_tl_generated_api.Api.bots.GetBotInfo({
		bot: params.bot ? await client.getInputEntity(params.bot) : void 0,
		langCode: params.langCode ?? ""
	}));
}
/** @hidden */
async function setBotMenuButton(client, user, button) {
	return client.invoke(new require_tl_generated_api.Api.bots.SetBotMenuButton({
		userId: await client.getInputEntity(user),
		button
	}));
}
/** @hidden */
async function getBotMenuButton(client, user) {
	return client.invoke(new require_tl_generated_api.Api.bots.GetBotMenuButton({ userId: await client.getInputEntity(user) }));
}
/** @hidden */
async function addBotUsername(client, bot, username) {
	return client.invoke(new require_tl_generated_api.Api.bots.AddUsername({
		bot,
		username
	}));
}
/** @hidden */
async function removeBotUsername(client, bot, username) {
	return client.invoke(new require_tl_generated_api.Api.bots.RemoveUsername({
		bot,
		username
	}));
}
/** @hidden */
async function checkBotUsername(client, username, params = {}) {
	return client.invoke(new require_tl_generated_api.Api.bots.CheckUsername({
		additional: params.additional,
		username
	}));
}
/** @hidden */
async function setBotVerification(client, peer, params = {}) {
	let customDescription;
	if (typeof params.description === "string") {
		const [text, entities] = await require_client_methods_messageParse._parseMessageText(client, params.description, params.parseMode);
		customDescription = new require_tl_generated_api.Api.TextWithEntities({
			text,
			entities
		});
	} else customDescription = params.description;
	return client.invoke(new require_tl_generated_api.Api.bots.SetCustomVerification({
		enabled: params.enabled ?? true,
		bot: params.bot,
		peer,
		customDescription
	}));
}
exports.addBotUsername = addBotUsername;
Object.defineProperty(exports, "bots_exports", {
	enumerable: true,
	get: function() {
		return bots_exports;
	}
});
exports.checkBotUsername = checkBotUsername;
exports.getBotCommands = getBotCommands;
exports.getBotInfo = getBotInfo;
exports.getBotMenuButton = getBotMenuButton;
exports.inlineQuery = inlineQuery;
exports.removeBotUsername = removeBotUsername;
exports.resetBotCommands = resetBotCommands;
exports.setBotCommands = setBotCommands;
exports.setBotInfo = setBotInfo;
exports.setBotMenuButton = setBotMenuButton;
exports.setBotVerification = setBotVerification;
