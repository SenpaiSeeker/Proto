Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
const require_platform_buffer_index = require("../../platform/buffer/index.js");
const require_Helpers = require("../../Helpers.js");
const require_Password = require("../../Password.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
require("../../tl/index.js");
require("../../errors/index.js");
const require_errors_RPCErrorList = require("../../errors/RPCErrorList.js");
require("../../platform/index.js");
// teleproto/client/methods/2fa.ts
var _2fa_exports = /* @__PURE__ */ require_runtime.__exportAll({ updateTwoFaSettings: () => updateTwoFaSettings });
/**
* Changes the 2FA settings of the logged in user. May be slow: SRP math over large primes.
* Throws if both `currentPassword` and `newPassword` are missing.
* @param client - The telegram client instance
* @param params - see {@link TwoFaParams}
* @throws `PASSWORD_HASH_INVALID` on a wrong password, `EMAIL_INVALID` on a bad email, `EMAIL_HASH_EXPIRED` if the email was not confirmed in time.
*/
async function updateTwoFaSettings(client, { isCheckPassword, currentPassword, newPassword, hint = "", email, emailCodeCallback, onEmailCodeError }) {
	if (!newPassword && !currentPassword) throw new Error("Neither `currentPassword` nor `newPassword` is present");
	if (email && !(emailCodeCallback && onEmailCodeError)) throw new Error("`email` present without `emailCodeCallback` and `onEmailCodeError`");
	const pwd = await client.api.account.getPassword();
	if (!(pwd.newAlgo instanceof require_tl_generated_api.Api.PasswordKdfAlgoUnknown)) pwd.newAlgo.salt1 = require_platform_buffer_index.Buffer.concat([pwd.newAlgo.salt1, require_Helpers.generateRandomBytes(32)]);
	if (!pwd.hasPassword && currentPassword) currentPassword = void 0;
	const password = currentPassword ? await require_Password.computeCheck(pwd, currentPassword) : new require_tl_generated_api.Api.InputCheckPasswordEmpty();
	if (isCheckPassword) {
		await client.invoke(new require_tl_generated_api.Api.auth.CheckPassword({ password }));
		return;
	}
	if (pwd.newAlgo instanceof require_tl_generated_api.Api.PasswordKdfAlgoUnknown) throw new Error("Unknown password encryption method");
	try {
		await client.invoke(new require_tl_generated_api.Api.account.UpdatePasswordSettings({
			password,
			newSettings: new require_tl_generated_api.Api.account.PasswordInputSettings({
				newAlgo: pwd.newAlgo,
				newPasswordHash: newPassword ? await require_Password.computeDigest(pwd.newAlgo, newPassword) : require_platform_buffer_index.Buffer.alloc(0),
				hint,
				email,
				newSecureSettings: void 0
			})
		}));
	} catch (e) {
		if (e instanceof require_errors_RPCErrorList.EmailUnconfirmedError) while (true) try {
			const code = await emailCodeCallback(e.codeLength);
			if (!code) throw new Error("Code is empty");
			await client.api.account.confirmPasswordEmail({ code });
			break;
		} catch (err) {
			onEmailCodeError(err);
		}
		else throw e;
	}
}
Object.defineProperty(exports, "_2fa_exports", {
	enumerable: true,
	get: function() {
		return _2fa_exports;
	}
});
exports.updateTwoFaSettings = updateTwoFaSettings;
