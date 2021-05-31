"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const bannerSchema = new mongoose_1.Schema({
    pic: String,
    name: String,
    category: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'category' },
    src: String,
    index: Number,
});
const BannerModel = __1.mobaDbConnect.model('banner', bannerSchema, 'banners');
exports.BannerModel = BannerModel;
//# sourceMappingURL=banner.model.js.map