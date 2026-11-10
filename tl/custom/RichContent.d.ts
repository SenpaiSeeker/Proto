import { Api } from "../api";
import { type RichTextLike } from "./richText";
export interface RichContentOptions {
    /** Right-to-left layout. */
    rtl?: boolean;
    /** Do not link URLs, emails and phone numbers automatically. */
    noAutolink?: boolean;
}
/** Nested content: a {@link RichContent}, or a callback that fills a new one. */
export type RichContentLike = RichContent | ((content: RichContent) => unknown);
export interface RichCaptionOptions {
    caption?: RichTextLike;
    credit?: RichTextLike;
}
/** A list item: text, nested content, or either with a checkbox. */
export type RichListItem = RichTextLike | RichContent | {
    text: RichTextLike;
    checked?: boolean;
} | {
    content: RichContentLike;
    checked?: boolean;
};
export interface RichListOptions {
    ordered?: boolean;
    /** Number of the first item of an ordered list. */
    start?: number;
    reversed?: boolean;
}
/** A table cell: text, or text with layout. */
export type RichTableCell = RichTextLike | {
    text?: RichTextLike;
    header?: boolean;
    colspan?: number;
    rowspan?: number;
    align?: "left" | "center" | "right";
    valign?: "top" | "middle" | "bottom";
};
export interface RichTableOptions {
    title?: RichTextLike;
    bordered?: boolean;
    striped?: boolean;
    compact?: boolean;
    /** Render the first row as a header. */
    header?: boolean;
}
type RichPhoto = Api.TypeInputPhoto | Api.TypePhoto;
type RichDocument = Api.TypeInputDocument | Api.TypeDocument;
/**
 * Builds a rich message block by block. Pass it as `richMessage` when sending or editing.
 * Media and users it refers to are attached for you, and {@link block} takes any raw page block.
 */
export declare class RichContent {
    private readonly options;
    private readonly blocks;
    private readonly photos;
    private readonly documents;
    private readonly users;
    constructor(options?: RichContentOptions);
    heading(level: 1 | 2 | 3 | 4 | 5 | 6, ...parts: RichTextLike[]): this;
    paragraph(...parts: RichTextLike[]): this;
    footer(...parts: RichTextLike[]): this;
    code(source: string, language?: string): this;
    /** A TeX formula block. */
    math(source: string): this;
    divider(): this;
    anchor(name: string): this;
    /** A quote of text, or of nested blocks. */
    quote(body: RichTextLike | RichContentLike, options?: {
        caption?: RichTextLike;
        collapsed?: boolean;
    }): this;
    pullquote(body: RichTextLike, caption?: RichTextLike): this;
    list(items: readonly RichListItem[], options?: RichListOptions): this;
    photo(photo: RichPhoto, options?: RichCaptionOptions & {
        spoiler?: boolean;
        url?: string;
    }): this;
    video(document: RichDocument, options?: RichCaptionOptions & {
        autoplay?: boolean;
        loop?: boolean;
        spoiler?: boolean;
    }): this;
    audio(document: RichDocument, options?: RichCaptionOptions): this;
    document(document: RichDocument, options?: RichCaptionOptions): this;
    collage(content: RichContentLike, options?: RichCaptionOptions): this;
    slideshow(content: RichContentLike, options?: RichCaptionOptions): this;
    table(rows: readonly (readonly RichTableCell[])[], options?: RichTableOptions): this;
    /** A collapsible section. */
    details(title: RichTextLike, content: RichContentLike, options?: {
        open?: boolean;
    }): this;
    map(geo: Api.TypeInputGeoPoint, options: RichCaptionOptions & {
        zoom: number;
        width: number;
        height: number;
    }): this;
    /** Adds raw page blocks, for anything without a dedicated method. */
    block(...blocks: Api.TypePageBlockIn[]): this;
    /** Attaches media or users that raw blocks refer to by id. */
    attach(...items: (RichPhoto | RichDocument | Api.TypeInputUser | Api.User)[]): this;
    /** The `InputRichMessage` to send. */
    build(): Api.InputRichMessage;
    private push;
    private text;
    private caption;
    private nested;
    private listItem;
    private orderedItem;
    private tableCell;
    private attachPhoto;
    private attachDocument;
    private attachUser;
    private collect;
}
export {};
