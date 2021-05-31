"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotId = exports.getArticleId = void 0;
const category_model_1 = require("../../../db/model/category.model");
async function getHotId() {
    let hotCategory = await category_model_1.CategoryModel.findOne({ name: '热门' })
        .then((document) => document?._id)
        .catch(() => '');
    if (hotCategory)
        return hotCategory?._id;
    const articleId = await getArticleId();
    hotCategory = await new category_model_1.CategoryModel({
        name: '热门',
        parent: articleId,
    })
        .save()
        .catch(() => category_model_1.CategoryModel.findOne({ name: '热门' }));
    if (hotCategory) {
        return hotCategory?._id;
    }
    else {
        console.log('getHotId error');
    }
}
exports.getHotId = getHotId;
async function getArticleId() {
    let newsDocument = await category_model_1.CategoryModel.findOne({ name: '文章' });
    if (newsDocument) {
        return newsDocument._id;
    }
    newsDocument = await new category_model_1.CategoryModel({ name: '文章' })
        .save()
        .catch(() => category_model_1.CategoryModel.findOne({ name: '文章' }));
    if (newsDocument) {
        return newsDocument._id;
    }
    else {
        console.log('getArticleId error');
        process.exit();
    }
}
exports.getArticleId = getArticleId;
//# sourceMappingURL=getter.js.map