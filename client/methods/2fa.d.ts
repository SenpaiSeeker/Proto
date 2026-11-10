import type { TelegramClient } from "../TelegramClient";
export interface TwoFaParams {
    /** Only verify `currentPassword`, change nothing. */
    isCheckPassword?: boolean;
    /** Current password. Required while 2FA is on; passed alone, removes 2FA. */
    currentPassword?: string;
    /** New password. Empty removes 2FA. */
    newPassword?: string;
    /** Hint shown when Telegram asks for the password. */
    hint?: string;
    /** Recovery email. Requires `emailCodeCallback` and `onEmailCodeError`. */
    email?: string;
    /** Gets the code length, returns the code sent to `email`. Called again until the code is accepted. */
    emailCodeCallback?: (length: number) => Promise<string>;
    /** Called when a code from `emailCodeCallback` is rejected. */
    onEmailCodeError?: (err: Error) => void;
}
/**
 * Changes the 2FA settings of the logged in user. May be slow: SRP math over large primes.
 * Throws if both `currentPassword` and `newPassword` are missing.
 * @param client - The telegram client instance
 * @param params - see {@link TwoFaParams}
 * @throws `PASSWORD_HASH_INVALID` on a wrong password, `EMAIL_INVALID` on a bad email, `EMAIL_HASH_EXPIRED` if the email was not confirmed in time.
 */
export declare function updateTwoFaSettings(client: TelegramClient, { isCheckPassword, currentPassword, newPassword, hint, email, emailCodeCallback, onEmailCodeError, }: TwoFaParams): Promise<void>;
