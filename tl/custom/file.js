Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
require("../api.js");
const require_tl_generated_api = require("../generated/api.js");
const require_Utils = require("../../Utils.js");
// teleproto/tl/custom/file.ts
var File = class {
	constructor(media) {
		this.media = media;
	}
	get id() {
		throw new Error("Unsupported");
	}
	get name() {
		return this._fromAttr(require_tl_generated_api.Api.DocumentAttributeFilename, "fileName");
	}
	get mimeType() {
		if (this.media instanceof require_tl_generated_api.Api.Photo) return "image/jpeg";
		else if (this.media instanceof require_tl_generated_api.Api.Document) return this.media.mimeType;
	}
	get width() {
		return this._fromAttr([require_tl_generated_api.Api.DocumentAttributeImageSize, require_tl_generated_api.Api.DocumentAttributeVideo], "w");
	}
	get height() {
		return this._fromAttr([require_tl_generated_api.Api.DocumentAttributeImageSize, require_tl_generated_api.Api.DocumentAttributeVideo], "h");
	}
	get duration() {
		return this._fromAttr([require_tl_generated_api.Api.DocumentAttributeAudio, require_tl_generated_api.Api.DocumentAttributeVideo], "duration");
	}
	get title() {
		return this._fromAttr(require_tl_generated_api.Api.DocumentAttributeAudio, "title");
	}
	get performer() {
		return this._fromAttr(require_tl_generated_api.Api.DocumentAttributeAudio, "performer");
	}
	get emoji() {
		return this._fromAttr(require_tl_generated_api.Api.DocumentAttributeSticker, "alt");
	}
	get stickerSet() {
		return this._fromAttr(require_tl_generated_api.Api.DocumentAttributeSticker, "stickerset");
	}
	get size() {
		if (this.media instanceof require_tl_generated_api.Api.Photo) return require_Utils._photoSizeByteCount(this.media.sizes[this.media.sizes.length - 1]);
		else if (this.media instanceof require_tl_generated_api.Api.Document) return this.media.size;
	}
	_fromAttr(cls, field) {
		if (this.media instanceof require_tl_generated_api.Api.Document) {
			for (const attr of this.media.attributes) if (attr instanceof cls) return attr[field];
		}
	}
};
exports.File = File;
