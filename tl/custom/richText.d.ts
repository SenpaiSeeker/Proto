import bigInt from "big-integer";
import { Api } from "../api";
/** Rich text input: a string, a TL rich text object, or a list of them joined together. */
export type RichTextLike = string | Api.TypeRichTextIn | readonly RichTextLike[];
/** Media and users a rich message refers to by id. */
export type RichReference = Api.InputPhoto | Api.InputDocument | Api.InputUser;
/** Display options of {@link date}. */
export interface RichDateOptions {
    relative?: boolean;
    shortTime?: boolean;
    longTime?: boolean;
    shortDate?: boolean;
    longDate?: boolean;
    dayOfWeek?: boolean;
    /** Text shown by apps that cannot format the date. Defaults to the UTC date and time. */
    text?: RichTextLike;
}
/** Joins the parts into one rich text: a string becomes plain text, several parts are concatenated. */
export declare function text(...parts: RichTextLike[]): Api.TypeRichText;
export declare function bold(...parts: RichTextLike[]): Api.TextBold;
export declare function italic(...parts: RichTextLike[]): Api.TextItalic;
export declare function underline(...parts: RichTextLike[]): Api.TextUnderline;
export declare function strike(...parts: RichTextLike[]): Api.TextStrike;
/** Monospace text. */
export declare function code(...parts: RichTextLike[]): Api.TextFixed;
export declare function subscript(...parts: RichTextLike[]): Api.TextSubscript;
export declare function superscript(...parts: RichTextLike[]): Api.TextSuperscript;
/** Highlighted text. */
export declare function marked(...parts: RichTextLike[]): Api.TextMarked;
export declare function spoiler(...parts: RichTextLike[]): Api.TextSpoiler;
export declare function link(label: RichTextLike, url: string): Api.TextUrl;
export declare function email(label: RichTextLike, address: string): Api.TextEmail;
export declare function phone(label: RichTextLike, number: string): Api.TextPhone;
/** @hidden */
export declare function inputUserOf(user: Api.TypeInputUser | Api.User): Api.InputUser;
/** A mention of `user` by id; the user is attached to the message for you. */
export declare function mention(label: RichTextLike, user: Api.TypeInputUser | Api.User): Api.TextMentionName;
/** A link target that `link(label, "#name")` can point to. */
export declare function anchor(label: RichTextLike, name: string): Api.TextAnchor;
/** An inline TeX formula. */
export declare function math(source: string): Api.TextMath;
/** A date each app formats for its reader. */
export declare function date(value: Date | number, options?: RichDateOptions): Api.TextDate;
export declare function customEmoji(documentId: bigInt.BigInteger | string, alt: string): Api.TextCustomEmoji;
/** @hidden */
export declare function referencesOf(value: unknown, found?: RichReference[]): RichReference[];
