"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsInfoModel = exports.NewsModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const newsSchema = new mongoose_1.Schema({
    title: { type: String },
    src: String,
    categories: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'category' }],
    time: String,
});
const newsInfoSchema = new mongoose_1.Schema({
    newsId: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'news' },
    content: String,
});
const NewsModel = __1.mobaDbConnect.model('news', newsSchema, 'news');
exports.NewsModel = NewsModel;
const NewsInfoModel = __1.mobaDbConnect.model('newsContent', newsInfoSchema, 'newsContents');
exports.NewsInfoModel = NewsInfoModel;
//# sourceMappingURL=news.model.js.map