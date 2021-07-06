"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleContentModel = exports.ArticleModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const articleSchema = new mongoose_1.Schema({
    title: { type: String },
    src: String,
    categories: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'category' }],
    time: Number,
});
const articleInfoSchema = new mongoose_1.Schema({
    articleId: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'article' },
    content: String,
});
const ArticleModel = __1.mobaDbConnect.model('article', articleSchema, 'articles');
exports.ArticleModel = ArticleModel;
const ArticleContentModel = __1.mobaDbConnect.model('articleContent', articleInfoSchema, 'articleContents');
exports.ArticleContentModel = ArticleContentModel;
//# sourceMappingURL=article.model.js.map