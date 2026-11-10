Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
require("../api.js");
const require_Utils = require("../../Utils.js");
const require_tl_generated_api = require("../generated/api.js");
const require_tl_custom_richText = require("./richText.js");
// teleproto/tl/custom/RichContent.ts
/**
* Builds a rich message block by block. Pass it as `richMessage` when sending or editing.
* Media and users it refers to are attached for you, and {@link block} takes any raw page block.
*/
var RichContent = class RichContent {
	constructor(options = {}) {
		this.options = options;
		this.blocks = [];
		this.photos = /* @__PURE__ */ new Map();
		this.documents = /* @__PURE__ */ new Map();
		this.users = /* @__PURE__ */ new Map();
	}
	heading(level, ...parts) {
		const Heading = [
			require_tl_generated_api.Api.PageBlockHeading1,
			require_tl_generated_api.Api.PageBlockHeading2,
			require_tl_generated_api.Api.PageBlockHeading3,
			require_tl_generated_api.Api.PageBlockHeading4,
			require_tl_generated_api.Api.PageBlockHeading5,
			require_tl_generated_api.Api.PageBlockHeading6
		][level - 1];
		return this.push(new Heading({ text: this.text(parts) }));
	}
	paragraph(...parts) {
		return this.push(new require_tl_generated_api.Api.PageBlockParagraph({ text: this.text(parts) }));
	}
	footer(...parts) {
		return this.push(new require_tl_generated_api.Api.PageBlockFooter({ text: this.text(parts) }));
	}
	code(source, language = "") {
		return this.push(new require_tl_generated_api.Api.PageBlockPreformatted({
			text: require_tl_custom_richText.text(source),
			language
		}));
	}
	/** A TeX formula block. */
	math(source) {
		return this.push(new require_tl_generated_api.Api.PageBlockMath({ source }));
	}
	divider() {
		return this.push(new require_tl_generated_api.Api.PageBlockDivider());
	}
	anchor(name) {
		return this.push(new require_tl_generated_api.Api.PageBlockAnchor({ name }));
	}
	/** A quote of text, or of nested blocks. */
	quote(body, options = {}) {
		const caption = this.text([options.caption ?? []]);
		if (body instanceof RichContent || typeof body === "function") return this.push(new require_tl_generated_api.Api.PageBlockBlockquoteBlocks({
			blocks: this.nested(body),
			caption
		}));
		return this.push(new require_tl_generated_api.Api.PageBlockBlockquote({
			text: this.text([body]),
			caption,
			collapsed: options.collapsed
		}));
	}
	pullquote(body, caption) {
		return this.push(new require_tl_generated_api.Api.PageBlockPullquote({
			text: this.text([body]),
			caption: this.text([caption ?? []])
		}));
	}
	list(items, options = {}) {
		if (!options.ordered) return this.push(new require_tl_generated_api.Api.PageBlockList({ items: items.map((item) => this.listItem(item)) }));
		return this.push(new require_tl_generated_api.Api.PageBlockOrderedList({
			items: items.map((item) => this.orderedItem(item)),
			start: options.start,
			reversed: options.reversed
		}));
	}
	photo(photo, options = {}) {
		const input = this.attachPhoto(photo);
		return this.push(new require_tl_generated_api.Api.PageBlockPhoto({
			photoId: input.id,
			caption: this.caption(options),
			spoiler: options.spoiler,
			url: options.url
		}));
	}
	video(document, options = {}) {
		const input = this.attachDocument(document);
		return this.push(new require_tl_generated_api.Api.PageBlockVideo({
			videoId: input.id,
			caption: this.caption(options),
			autoplay: options.autoplay,
			loop: options.loop,
			spoiler: options.spoiler
		}));
	}
	audio(document, options = {}) {
		const input = this.attachDocument(document);
		return this.push(new require_tl_generated_api.Api.PageBlockAudio({
			audioId: input.id,
			caption: this.caption(options)
		}));
	}
	document(document, options = {}) {
		const input = this.attachDocument(document);
		return this.push(new require_tl_generated_api.Api.PageBlockDocument({
			documentId: input.id,
			caption: this.caption(options)
		}));
	}
	collage(content, options = {}) {
		return this.push(new require_tl_generated_api.Api.PageBlockCollage({
			items: this.nested(content),
			caption: this.caption(options)
		}));
	}
	slideshow(content, options = {}) {
		return this.push(new require_tl_generated_api.Api.PageBlockSlideshow({
			items: this.nested(content),
			caption: this.caption(options)
		}));
	}
	table(rows, options = {}) {
		return this.push(new require_tl_generated_api.Api.PageBlockTable({
			title: this.text([options.title ?? []]),
			bordered: options.bordered,
			striped: options.striped,
			compact: options.compact,
			rows: rows.map((row, index) => new require_tl_generated_api.Api.PageTableRow({ cells: row.map((cell) => this.tableCell(cell, !!options.header && index === 0)) }))
		}));
	}
	/** A collapsible section. */
	details(title, content, options = {}) {
		return this.push(new require_tl_generated_api.Api.PageBlockDetails({
			title: this.text([title]),
			blocks: this.nested(content),
			open: options.open
		}));
	}
	map(geo, options) {
		return this.push(new require_tl_generated_api.Api.InputPageBlockMap({
			geo,
			zoom: options.zoom,
			w: options.width,
			h: options.height,
			caption: this.caption(options)
		}));
	}
	/** Adds raw page blocks, for anything without a dedicated method. */
	block(...blocks) {
		for (const block of blocks) {
			this.collect(require_tl_custom_richText.referencesOf(block));
			this.blocks.push(block);
		}
		return this;
	}
	/** Attaches media or users that raw blocks refer to by id. */
	attach(...items) {
		for (const item of items) if (item instanceof require_tl_generated_api.Api.User || item.SUBCLASS_OF_ID === require_tl_generated_api.Api.InputUser.prototype.SUBCLASS_OF_ID) this.attachUser(item);
		else if (item instanceof require_tl_generated_api.Api.Photo || item.SUBCLASS_OF_ID === require_tl_generated_api.Api.InputPhoto.prototype.SUBCLASS_OF_ID) this.attachPhoto(item);
		else this.attachDocument(item);
		return this;
	}
	/** The `InputRichMessage` to send. */
	build() {
		return new require_tl_generated_api.Api.InputRichMessage({
			blocks: [...this.blocks],
			rtl: this.options.rtl,
			noautolink: this.options.noAutolink,
			photos: this.photos.size ? [...this.photos.values()] : void 0,
			documents: this.documents.size ? [...this.documents.values()] : void 0,
			users: this.users.size ? [...this.users.values()] : void 0
		});
	}
	push(block) {
		this.blocks.push(block);
		return this;
	}
	text(parts) {
		const value = require_tl_custom_richText.text(...parts);
		this.collect(require_tl_custom_richText.referencesOf(value));
		return value;
	}
	caption(options) {
		return new require_tl_generated_api.Api.PageCaption({
			text: this.text([options.caption ?? []]),
			credit: this.text([options.credit ?? []])
		});
	}
	nested(content) {
		const child = content instanceof RichContent ? content : new RichContent();
		if (typeof content === "function") content(child);
		for (const photo of child.photos.values()) this.photos.set(photo.id.toString(), photo);
		for (const document of child.documents.values()) this.documents.set(document.id.toString(), document);
		for (const user of child.users.values()) this.users.set(user.userId.toString(), user);
		return [...child.blocks];
	}
	listItem(item) {
		const checkbox = typeof item === "object" && item !== null && "checked" in item && item.checked !== void 0;
		const checked = checkbox ? item.checked : void 0;
		if (item instanceof RichContent) return new require_tl_generated_api.Api.PageListItemBlocks({ blocks: this.nested(item) });
		if (typeof item === "object" && item !== null && "content" in item) return new require_tl_generated_api.Api.PageListItemBlocks({
			blocks: this.nested(item.content),
			checkbox,
			checked
		});
		if (typeof item === "object" && item !== null && !Array.isArray(item) && "text" in item && !("_" in item) && !("className" in item)) return new require_tl_generated_api.Api.PageListItemText({
			text: this.text([item.text]),
			checkbox,
			checked
		});
		return new require_tl_generated_api.Api.PageListItemText({ text: this.text([item]) });
	}
	orderedItem(item) {
		const plain = this.listItem(item);
		return plain instanceof require_tl_generated_api.Api.PageListItemBlocks ? new require_tl_generated_api.Api.PageListOrderedItemBlocks({
			blocks: plain.blocks,
			checkbox: plain.checkbox,
			checked: plain.checked
		}) : new require_tl_generated_api.Api.PageListOrderedItemText({
			text: plain.text,
			checkbox: plain.checkbox,
			checked: plain.checked
		});
	}
	tableCell(cell, header) {
		if (!(typeof cell === "object" && cell !== null && !Array.isArray(cell) && !("_" in cell) && !("className" in cell))) return new require_tl_generated_api.Api.PageTableCell({
			text: this.text([cell]),
			header: header || void 0
		});
		const options = cell;
		return new require_tl_generated_api.Api.PageTableCell({
			text: options.text === void 0 ? void 0 : this.text([options.text]),
			header: options.header ?? (header || void 0),
			colspan: options.colspan,
			rowspan: options.rowspan,
			alignCenter: options.align === "center" || void 0,
			alignRight: options.align === "right" || void 0,
			valignMiddle: options.valign === "middle" || void 0,
			valignBottom: options.valign === "bottom" || void 0
		});
	}
	attachPhoto(photo) {
		const input = require_Utils.getInputPhoto(photo);
		if (!(input instanceof require_tl_generated_api.Api.InputPhoto)) throw new Error("A rich photo needs a photo with an id");
		this.photos.set(input.id.toString(), input);
		return input;
	}
	attachDocument(document) {
		const input = require_Utils.getInputDocument(document);
		if (!(input instanceof require_tl_generated_api.Api.InputDocument)) throw new Error("A rich media block needs a document with an id");
		this.documents.set(input.id.toString(), input);
		return input;
	}
	attachUser(user) {
		const input = require_tl_custom_richText.inputUserOf(user);
		this.users.set(input.userId.toString(), input);
		return input;
	}
	collect(found) {
		for (const reference of found) if (reference instanceof require_tl_generated_api.Api.InputPhoto) this.photos.set(reference.id.toString(), reference);
		else if (reference instanceof require_tl_generated_api.Api.InputDocument) this.documents.set(reference.id.toString(), reference);
		else this.users.set(reference.userId.toString(), reference);
	}
};
exports.RichContent = RichContent;
