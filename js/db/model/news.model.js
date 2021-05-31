"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleContentModel = exports.ArticleModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const newsSchema = new mongoose_1.Schema({
    title: { type: String },
    src: String,
    categories: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'category' }],
    time: String,
});
const articleInfoSchema = new mongoose_1.Schema({
    newsId: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'news' },
    content: String,
});
const ArticleModel = __1.mobaDbConnect.model('news', newsSchema, 'news');
exports.ArticleModel = ArticleModel;
const ArticleContentModel = __1.mobaDbConnect.model('newsContent', articleInfoSchema, 'newsContents');
exports.ArticleContentModel = ArticleContentModel;
//# sourceMappingURL=news.model.js.map