Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("../../_virtual/_rolldown/runtime.js");
require("../../tl/index.js");
const require_events_Raw = require("../../events/Raw.js");
const require_tl_generated_api = require("../../tl/generated/api.js");
const require_Utils = require("../../Utils.js");
const require_Helpers = require("../../Helpers.js");
const require_errors_RPCBaseErrors = require("../../errors/RPCBaseErrors.js");
const require_Password = require("../../Password.js");
require("../../errors/index.js");
// teleproto/client/methods/auth.ts
var auth_exports = /* @__PURE__ */ require_runtime.__exportAll({
	_authFlow: () => _authFlow,
	checkAuthorization: () => checkAuthorization,
	logOut: () => logOut,
	resetLoginEmail: () => resetLoginEmail,
	sendCode: () => sendCode,
	sendVerifyEmailCode: () => sendVerifyEmailCode,
	signInBot: () => signInBot,
	signInUser: () => signInUser,
	signInUserWithQrCode: () => signInUserWithQrCode,
	signInWithPassword: () => signInWithPassword,
	signInWithWebToken: () => signInWithWebToken,
	start: () => start,
	verifyEmail: () => verifyEmail
});
const QR_CODE_TIMEOUT = 3e4;
/** @hidden */
async function start(client, authParams) {
	if (!client.connected) await client.connect();
	let authError;
	try {
		await client.api.updates.getState();
		return;
	} catch (e) {
		authError = e;
	}
	if (!authParams || !("phoneNumber" in authParams) && !("botAuthToken" in authParams)) throw authError ?? new require_errors_RPCBaseErrors.UnauthorizedError("Not authorized and no auth parameters were provided to log in.", void 0);
	await _authFlow(client, {
		apiId: client.apiId,
		apiHash: client.apiHash
	}, authParams);
}
/** @hidden */
async function checkAuthorization(client) {
	try {
		await client.api.updates.getState();
		return true;
	} catch (e) {
		return false;
	}
}
/** @hidden */
async function logOut(client) {
	let success = true;
	try {
		await client.api.auth.logOut();
	} catch (e) {
		client._log.warn("auth.LogOut failed: " + e.message);
		success = false;
	}
	await client.disconnect();
	await client.session.delete();
	client.updateManager.reset();
	client._entityCache.clear();
	client._dcenters.clear();
	client._sender = void 0;
	client._selfInputPeer = void 0;
	client._bot = void 0;
	client.updates._resumeAuthorization();
	return success;
}
/** @hidden */
async function signInUser(client, apiCredentials, authParams) {
	try {
		while (1) {
			const request = await requestLoginCode(client, apiCredentials, authParams);
			if (request === "qr") return client.signInUserWithQrCode(apiCredentials, authParams);
			if (!request) continue;
			const user = await completeSignIn(client, authParams, request.phoneNumber, request.sentCode);
			if (user) return user;
		}
	} catch (err) {
		if (err.errorMessage === "SESSION_PASSWORD_NEEDED") return client.signInWithPassword(apiCredentials, authParams);
		throw err;
	}
}
const RESTART_SIGN_IN_ERRORS = /* @__PURE__ */ new Set([
	"PHONE_CODE_EXPIRED",
	"PHONE_NUMBER_INVALID",
	"PHONE_NUMBER_BANNED"
]);
const RESTART_SIGN_UP_ERRORS = /* @__PURE__ */ new Set([
	...RESTART_SIGN_IN_ERRORS,
	"PHONE_CODE_EMPTY",
	"PHONE_CODE_INVALID",
	"PHONE_NUMBER_OCCUPIED"
]);
async function stepFailed(authParams, err, restartErrors) {
	if (err.errorMessage === "SESSION_PASSWORD_NEEDED" || err.message === "AUTH_USER_CANCEL") throw err;
	const restart = restartErrors.has(err.errorMessage);
	if (restart && typeof authParams.phoneNumber !== "function") throw err;
	if (await authParams.onError(err)) throw new Error("AUTH_USER_CANCEL");
	return restart ? "restart" : "retry";
}
async function requestLoginCode(client, apiCredentials, authParams) {
	try {
		let phoneNumber;
		if (typeof authParams.phoneNumber === "function") try {
			phoneNumber = await authParams.phoneNumber();
		} catch (err) {
			if (err.errorMessage === "RESTART_AUTH_WITH_QR") return "qr";
			throw err;
		}
		else phoneNumber = authParams.phoneNumber;
		let sentCode = await requestCode(client, apiCredentials, phoneNumber, authParams.reCaptchaCallback);
		if (authParams.forceSMS) sentCode = await preferSms(client, phoneNumber, sentCode);
		return {
			phoneNumber,
			sentCode
		};
	} catch (err) {
		if (err.errorMessage === "AUTH_RESTART") return void 0;
		if (err.errorMessage === "SESSION_PASSWORD_NEEDED" || err.message === "AUTH_USER_CANCEL" || typeof authParams.phoneNumber !== "function") throw err;
		if (await authParams.onError(err)) throw new Error("AUTH_USER_CANCEL");
		return;
	}
}
async function completeSignIn(client, authParams, phoneNumber, sentCode) {
	while (sentCode) {
		if (sentCode instanceof require_tl_generated_api.Api.auth.SentCodeSuccess) return finishAuthorization(client, authParams, phoneNumber, "", sentCode.authorization);
		if (sentCode instanceof require_tl_generated_api.Api.auth.SentCodePaymentRequired) throw new Error("Telegram requires a payment to send the login code to this number, which only official apps support");
		const { type, phoneCodeHash } = sentCode;
		if (type instanceof require_tl_generated_api.Api.auth.SentCodeTypeSetUpEmailRequired) {
			sentCode = await setUpLoginEmail(client, authParams, phoneNumber, phoneCodeHash, type);
			continue;
		}
		const signedIn = type instanceof require_tl_generated_api.Api.auth.SentCodeTypeEmailCode ? await signInWithEmailCode(client, authParams, phoneNumber, phoneCodeHash, type) : await signInWithPhoneCode(client, authParams, phoneNumber, sentCode);
		if (!signedIn) return void 0;
		return finishAuthorization(client, authParams, phoneNumber, signedIn.phoneCodeHash, signedIn.authorization);
	}
}
async function setUpLoginEmail(client, authParams, phoneNumber, phoneCodeHash, type) {
	if (!authParams.emailAddress || !authParams.emailVerification) throw new Error("Telegram requires a login email for this account: pass emailAddress and emailVerification to sign in");
	while (1) {
		let sentEmailCode;
		try {
			sentEmailCode = await sendVerifyEmailCode(client, phoneNumber, phoneCodeHash, await authParams.emailAddress());
		} catch (err) {
			if (await stepFailed(authParams, err, RESTART_SIGN_IN_ERRORS) === "restart") return;
			continue;
		}
		while (1) try {
			const { sentCode } = await verifyEmail(client, phoneNumber, phoneCodeHash, await authParams.emailVerification({
				googleSigninAllowed: type.googleSigninAllowed,
				appleSigninAllowed: type.appleSigninAllowed,
				emailPattern: sentEmailCode.emailPattern,
				codeLength: sentEmailCode.length
			}));
			return sentCode;
		} catch (err) {
			if (await stepFailed(authParams, err, RESTART_SIGN_IN_ERRORS) === "restart") return;
		}
	}
}
async function signInWithEmailCode(client, authParams, phoneNumber, phoneCodeHash, type) {
	if (!authParams.emailVerification) throw new Error("Telegram sent the login code to the account email: pass emailVerification to sign in");
	while (1) try {
		const verification = await authParams.emailVerification({
			googleSigninAllowed: type.googleSigninAllowed,
			appleSigninAllowed: type.appleSigninAllowed,
			emailPattern: type.emailPattern,
			codeLength: type.length,
			resetAvailablePeriod: type.resetAvailablePeriod,
			resetPendingDate: type.resetPendingDate
		});
		return {
			phoneCodeHash,
			authorization: await client.invoke(new require_tl_generated_api.Api.auth.SignIn({
				phoneNumber,
				phoneCodeHash,
				emailVerification: toEmailVerification(verification)
			}))
		};
	} catch (err) {
		if (await stepFailed(authParams, err, RESTART_SIGN_IN_ERRORS) === "restart") return;
	}
}
async function signInWithPhoneCode(client, authParams, phoneNumber, sentCode) {
	let current = sentCode;
	let resendAuthorization;
	const resend = async () => {
		const next = await resendCode(client, phoneNumber, current);
		if (next instanceof require_tl_generated_api.Api.auth.SentCodeSuccess) {
			resendAuthorization = next.authorization;
			throw new Error("Login completed while resending the code");
		}
		if (!(next instanceof require_tl_generated_api.Api.auth.SentCode)) throw new Error("Unexpected resend result " + next.className);
		const info = toSentCodeInfo(next, resend);
		current = next;
		return info;
	};
	while (1) try {
		const info = toSentCodeInfo(current, resend);
		let phoneCode;
		try {
			phoneCode = await authParams.phoneCode(info.type === "app", info);
		} catch (err) {
			if (!resendAuthorization && err.errorMessage === "RESTART_AUTH") return;
			throw err;
		}
		if (resendAuthorization) return {
			phoneCodeHash: current.phoneCodeHash,
			authorization: resendAuthorization
		};
		if (!phoneCode) throw new Error("Code is empty");
		const authorization = await client.invoke(new require_tl_generated_api.Api.auth.SignIn({
			phoneNumber,
			phoneCodeHash: current.phoneCodeHash,
			phoneCode
		}));
		return {
			phoneCodeHash: current.phoneCodeHash,
			authorization
		};
	} catch (err) {
		if (resendAuthorization) return {
			phoneCodeHash: current.phoneCodeHash,
			authorization: resendAuthorization
		};
		if (await stepFailed(authParams, err, RESTART_SIGN_IN_ERRORS) === "restart") return;
	}
}
async function finishAuthorization(client, authParams, phoneNumber, phoneCodeHash, authorization) {
	if (authorization instanceof require_tl_generated_api.Api.auth.Authorization) return authorization.user;
	if (!authParams.firstAndLastNames) throw new Error("No account is registered with this phone number: pass firstAndLastNames to sign up");
	const { termsOfService } = authorization;
	if (termsOfService && authParams.acceptTermsOfService) {
		if (!await authParams.acceptTermsOfService(termsOfService)) throw new Error("AUTH_USER_CANCEL");
	}
	while (1) try {
		const [firstName, lastName] = await authParams.firstAndLastNames();
		if (!firstName) throw new Error("First name is required");
		const { user } = await client.invoke(new require_tl_generated_api.Api.auth.SignUp({
			phoneNumber,
			phoneCodeHash,
			firstName,
			lastName: lastName ?? ""
		}));
		if (termsOfService) {
			if (!authParams.acceptTermsOfService) client._log.warn("Accepting the Telegram terms of service on behalf of the user: pass acceptTermsOfService to show them");
			await client.invoke(new require_tl_generated_api.Api.help.AcceptTermsOfService({ id: termsOfService.id }));
		}
		return user;
	} catch (err) {
		if (await stepFailed(authParams, err, RESTART_SIGN_UP_ERRORS) === "restart") return;
	}
}
function qrAbortError() {
	const err = /* @__PURE__ */ new Error("QR login aborted");
	err.name = "AbortError";
	return err;
}
/** @hidden */
async function signInUserWithQrCode(client, apiCredentials, authParams) {
	if (authParams.qrCode == void 0) throw new Error("qrCode callback not defined");
	const { abortSignal } = authParams;
	if (abortSignal?.aborted) throw qrAbortError();
	let isScanningComplete = false;
	const stopped = () => isScanningComplete || !!abortSignal?.aborted;
	const inputPromise = (async () => {
		while (!stopped()) {
			const result = await client.invoke(new require_tl_generated_api.Api.auth.ExportLoginToken({
				apiId: Number(apiCredentials.apiId),
				apiHash: apiCredentials.apiHash,
				exceptIds: []
			}));
			if (!(result instanceof require_tl_generated_api.Api.auth.LoginToken)) throw new Error("Unexpected");
			const { token, expires } = result;
			await Promise.race([authParams.qrCode({
				token,
				expires
			}), require_Helpers.sleep(QR_CODE_TIMEOUT)]);
			await require_Helpers.sleep(QR_CODE_TIMEOUT);
		}
	})();
	const rawEvent = new require_events_Raw.Raw({});
	const onUpdate = (update) => {
		if (update instanceof require_tl_generated_api.Api.UpdateLoginToken) resolveUpdate();
	};
	let resolveUpdate;
	const updatePromise = new Promise((resolve) => resolveUpdate = resolve);
	client.addEventHandler(onUpdate, rawEvent);
	const abortPromise = new Promise((_, reject) => abortSignal?.addEventListener("abort", () => reject(qrAbortError()), { once: true }));
	try {
		await Promise.race([
			updatePromise,
			inputPromise,
			abortPromise
		]);
	} finally {
		isScanningComplete = true;
		client.removeEventHandler(onUpdate, rawEvent);
	}
	try {
		const result2 = await client.invoke(new require_tl_generated_api.Api.auth.ExportLoginToken({
			apiId: Number(apiCredentials.apiId),
			apiHash: apiCredentials.apiHash,
			exceptIds: []
		}));
		if (result2 instanceof require_tl_generated_api.Api.auth.LoginTokenSuccess && result2.authorization instanceof require_tl_generated_api.Api.auth.Authorization) return result2.authorization.user;
		else if (result2 instanceof require_tl_generated_api.Api.auth.LoginTokenMigrateTo) {
			await client._switchDC(result2.dcId);
			const migratedResult = await client.invoke(new require_tl_generated_api.Api.auth.ImportLoginToken({ token: result2.token }));
			if (migratedResult instanceof require_tl_generated_api.Api.auth.LoginTokenSuccess && migratedResult.authorization instanceof require_tl_generated_api.Api.auth.Authorization) return migratedResult.authorization.user;
			else {
				client._log.error(`Received unknown result while scanning QR ${result2.className}`);
				throw new Error(`Received unknown result while scanning QR ${result2.className}`);
			}
		} else {
			client._log.error(`Received unknown result while scanning QR ${result2.className}`);
			throw new Error(`Received unknown result while scanning QR ${result2.className}`);
		}
	} catch (err) {
		if (err.errorMessage === "SESSION_PASSWORD_NEEDED") return client.signInWithPassword(apiCredentials, authParams);
		throw err;
	}
}
/** @hidden */
async function sendCode(client, apiCredentials, phoneNumber, forceSMS = false, reCaptchaCallback) {
	let sentCode = await requestCode(client, apiCredentials, phoneNumber, reCaptchaCallback);
	if (forceSMS) try {
		sentCode = await preferSms(client, phoneNumber, sentCode);
	} catch (err) {
		if (err.errorMessage !== "AUTH_RESTART") throw err;
		return sendCode(client, apiCredentials, phoneNumber, forceSMS, reCaptchaCallback);
	}
	if (sentCode instanceof require_tl_generated_api.Api.auth.SentCodeSuccess) throw new Error("logged in right after sending the code");
	if (!(sentCode instanceof require_tl_generated_api.Api.auth.SentCode)) return {
		phoneCodeHash: sentCode.phoneCodeHash,
		isCodeViaApp: false
	};
	const { type, phoneCodeHash } = sentCode;
	if (type instanceof require_tl_generated_api.Api.auth.SentCodeTypeSetUpEmailRequired) return {
		phoneCodeHash,
		isCodeViaApp: false,
		emailRequired: true,
		emailOptions: {
			googleSigninAllowed: type.googleSigninAllowed,
			appleSigninAllowed: type.appleSigninAllowed
		}
	};
	if (type instanceof require_tl_generated_api.Api.auth.SentCodeTypeEmailCode) return {
		phoneCodeHash,
		isCodeViaApp: false,
		emailCodeSent: true,
		emailOptions: {
			googleSigninAllowed: type.googleSigninAllowed,
			appleSigninAllowed: type.appleSigninAllowed,
			emailPattern: type.emailPattern,
			codeLength: type.length,
			resetAvailablePeriod: type.resetAvailablePeriod,
			resetPendingDate: type.resetPendingDate
		}
	};
	return {
		phoneCodeHash,
		isCodeViaApp: type instanceof require_tl_generated_api.Api.auth.SentCodeTypeApp
	};
}
async function requestCode(client, apiCredentials, phoneNumber, reCaptchaCallback) {
	const { apiId, apiHash } = apiCredentials;
	const request = new require_tl_generated_api.Api.auth.SendCode({
		phoneNumber,
		apiId,
		apiHash,
		settings: new require_tl_generated_api.Api.CodeSettings({})
	});
	try {
		return await client.invoke(request);
	} catch (err) {
		const match = err.errorMessage?.match(/RECAPTCHA_CHECK_.*(6Le[-\w]+)/);
		if (match && reCaptchaCallback) {
			const token = await reCaptchaCallback(match[1]);
			return client.invoke(new require_tl_generated_api.Api.InvokeWithReCaptcha({
				token,
				query: request
			}));
		}
		if (err.errorMessage === "AUTH_RESTART") return requestCode(client, apiCredentials, phoneNumber, reCaptchaCallback);
		throw err;
	}
}
async function resendCode(client, phoneNumber, sentCode) {
	if (!sentCode.nextType) throw new Error("The login code cannot be resent");
	return client.invoke(new require_tl_generated_api.Api.auth.ResendCode({
		phoneNumber,
		phoneCodeHash: sentCode.phoneCodeHash
	}));
}
async function preferSms(client, phoneNumber, sentCode) {
	if (!(sentCode instanceof require_tl_generated_api.Api.auth.SentCode) || sentCode.type instanceof require_tl_generated_api.Api.auth.SentCodeTypeSms) return sentCode;
	if (!(sentCode.nextType instanceof require_tl_generated_api.Api.auth.CodeTypeSms)) {
		client._log.warn("forceSMS ignored: Telegram does not offer SMS as the next delivery method for this code");
		return sentCode;
	}
	return resendCode(client, phoneNumber, sentCode);
}
function toSentCodeInfo(sentCode, resend) {
	const { type, nextType, timeout } = sentCode;
	return {
		...toCodeDelivery(type),
		nextType: nextType && toNextCodeDelivery(nextType),
		timeout,
		resend,
		raw: sentCode
	};
}
function toCodeDelivery(type) {
	if (type instanceof require_tl_generated_api.Api.auth.SentCodeTypeApp) return {
		type: "app",
		length: type.length
	};
	if (type instanceof require_tl_generated_api.Api.auth.SentCodeTypeSms || type instanceof require_tl_generated_api.Api.auth.SentCodeTypeFirebaseSms) return {
		type: "sms",
		length: type.length
	};
	if (type instanceof require_tl_generated_api.Api.auth.SentCodeTypeCall) return {
		type: "call",
		length: type.length
	};
	if (type instanceof require_tl_generated_api.Api.auth.SentCodeTypeFlashCall) return {
		type: "flashCall",
		pattern: type.pattern
	};
	if (type instanceof require_tl_generated_api.Api.auth.SentCodeTypeMissedCall) return {
		type: "missedCall",
		prefix: type.prefix,
		length: type.length
	};
	if (type instanceof require_tl_generated_api.Api.auth.SentCodeTypeFragmentSms) return {
		type: "fragment",
		url: type.url,
		length: type.length
	};
	if (type instanceof require_tl_generated_api.Api.auth.SentCodeTypeSmsWord) return {
		type: "smsWord",
		beginning: type.beginning
	};
	if (type instanceof require_tl_generated_api.Api.auth.SentCodeTypeSmsPhrase) return {
		type: "smsPhrase",
		beginning: type.beginning
	};
	throw new Error("Unexpected code delivery type " + type.className);
}
function toNextCodeDelivery(nextType) {
	if (nextType instanceof require_tl_generated_api.Api.auth.CodeTypeSms) return "sms";
	if (nextType instanceof require_tl_generated_api.Api.auth.CodeTypeCall) return "call";
	if (nextType instanceof require_tl_generated_api.Api.auth.CodeTypeFlashCall) return "flashCall";
	if (nextType instanceof require_tl_generated_api.Api.auth.CodeTypeMissedCall) return "missedCall";
	return "fragment";
}
function toEmailVerification(verification) {
	if (typeof verification === "string") return new require_tl_generated_api.Api.EmailVerificationCode({ code: verification.trim() });
	switch (verification?.type) {
		case "code": return new require_tl_generated_api.Api.EmailVerificationCode({ code: verification.code });
		case "google": return new require_tl_generated_api.Api.EmailVerificationGoogle({ token: verification.token });
		case "apple": return new require_tl_generated_api.Api.EmailVerificationApple({ token: verification.token });
	}
	throw new Error("emailVerification must return the code as a string, or { type: \"google\" | \"apple\", token }");
}
/** @hidden */
async function signInWithPassword(client, apiCredentials, authParams) {
	let emptyPassword = false;
	while (1) try {
		const passwordSrpResult = await client.invoke(new require_tl_generated_api.Api.account.GetPassword());
		if (!authParams.password) {
			emptyPassword = true;
			break;
		}
		const password = await authParams.password(passwordSrpResult.hint);
		if (!password) throw new Error("Password is empty");
		const passwordSrpCheck = await require_Password.computeCheck(passwordSrpResult, password);
		const { user } = await client.invoke(new require_tl_generated_api.Api.auth.CheckPassword({ password: passwordSrpCheck }));
		return user;
	} catch (err) {
		if (await authParams.onError(err)) throw new Error("AUTH_USER_CANCEL");
	}
	if (emptyPassword) throw new Error("Account has 2FA enabled.");
}
/** @hidden */
async function signInBot(client, apiCredentials, authParams) {
	const { apiId, apiHash } = apiCredentials;
	let { botAuthToken } = authParams;
	if (!botAuthToken) throw new Error("a valid BotToken is required");
	if (typeof botAuthToken === "function") {
		let token;
		while (true) {
			token = await botAuthToken();
			if (token) {
				botAuthToken = token;
				break;
			}
		}
	}
	const { user } = await client.invoke(new require_tl_generated_api.Api.auth.ImportBotAuthorization({
		apiId,
		apiHash,
		botAuthToken
	}));
	return user;
}
/**
* Signs in with a web authorization token
* (`auth.importWebTokenAuthorization`).
*
* Users only — bots cannot invoke this. It may be used over an
* unauthenticated connection, so a plain {@link TelegramClient.connect} is
* enough beforehand. The token is short-lived: once expired — or already
* redeemed elsewhere, e.g. by the browser that opened the login URL — the
* server answers `WEBAUTH_TOKEN_EXPIRED`.
* @hidden
*/
async function signInWithWebToken(client, apiCredentials, webAuthToken) {
	const { apiId, apiHash } = apiCredentials;
	const result = await client.invoke(new require_tl_generated_api.Api.auth.ImportWebTokenAuthorization({
		apiId,
		apiHash,
		webAuthToken
	}));
	if (result instanceof require_tl_generated_api.Api.auth.AuthorizationSignUpRequired) throw new Error("The account bound to this web token does not exist yet; sign up is required");
	const user = result.user;
	client._bot = user.bot;
	client._premium = !!user.premium;
	client._selfInputPeer = require_Utils.getInputPeer(user, false);
	client._log.info("Signed in successfully as " + require_Utils.getDisplayName(user));
	return user;
}
/** @hidden */
async function _authFlow(client, apiCredentials, authParams) {
	const me = "phoneNumber" in authParams ? await client.signInUser(apiCredentials, authParams) : await client.signInBot(apiCredentials, authParams);
	client._log.info("Signed in successfully as " + require_Utils.getDisplayName(me));
}
/**
* Sends an email verification code for login setup.
* @param client - The telegram client
* @param phoneNumber - The phone number being used for login
* @param phoneCodeHash - The phone code hash from sendCode
* @param email - The email address to verify
* @returns The email pattern and code length
*/
/** @hidden */
async function sendVerifyEmailCode(client, phoneNumber, phoneCodeHash, email) {
	const result = await client.invoke(new require_tl_generated_api.Api.account.SendVerifyEmailCode({
		purpose: new require_tl_generated_api.Api.EmailVerifyPurposeLoginSetup({
			phoneNumber,
			phoneCodeHash
		}),
		email
	}));
	return {
		emailPattern: result.emailPattern,
		length: result.length
	};
}
/**
* Verifies an email address during login setup.
* @param client - The telegram client
* @param phoneNumber - The phone number being used for login
* @param phoneCodeHash - The phone code hash from sendCode
* @param verification - The verification (code, Google token, or Apple token)
* @returns The verified email and the new sent code for phone verification
*/
/** @hidden */
async function verifyEmail(client, phoneNumber, phoneCodeHash, verification) {
	const result = await client.invoke(new require_tl_generated_api.Api.account.VerifyEmail({
		purpose: new require_tl_generated_api.Api.EmailVerifyPurposeLoginSetup({
			phoneNumber,
			phoneCodeHash
		}),
		verification: toEmailVerification(verification)
	}));
	if (!(result instanceof require_tl_generated_api.Api.account.EmailVerifiedLogin)) throw new Error("Expected EmailVerifiedLogin but got " + result.className);
	return {
		email: result.email,
		sentCode: result.sentCode
	};
}
/**
* Resets the login email when the user cannot access their current email.
* This will cancel the current email verification and allow setting up a new one.
* @param client - The telegram client
* @param phoneNumber - The phone number being used for login
* @param phoneCodeHash - The phone code hash from sendCode
* @returns The new sent code result
*/
/** @hidden */
async function resetLoginEmail(client, phoneNumber, phoneCodeHash) {
	return await client.invoke(new require_tl_generated_api.Api.auth.ResetLoginEmail({
		phoneNumber,
		phoneCodeHash
	}));
}
exports._authFlow = _authFlow;
Object.defineProperty(exports, "auth_exports", {
	enumerable: true,
	get: function() {
		return auth_exports;
	}
});
exports.checkAuthorization = checkAuthorization;
exports.logOut = logOut;
exports.resetLoginEmail = resetLoginEmail;
exports.sendCode = sendCode;
exports.sendVerifyEmailCode = sendVerifyEmailCode;
exports.signInBot = signInBot;
exports.signInUser = signInUser;
exports.signInUserWithQrCode = signInUserWithQrCode;
exports.signInWithPassword = signInWithPassword;
exports.signInWithWebToken = signInWithWebToken;
exports.start = start;
exports.verifyEmail = verifyEmail;
