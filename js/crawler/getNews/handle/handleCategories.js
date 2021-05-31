"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCategories = void 0;
const category_model_1 = require("../../../db/model/category.model");
let articleId = '';
const handleCategories = async (category) => {
    if (!articleId) {
        articleId = await getArticleId();
    }
    let categoryDocument = await category_model_1.CategoryModel.findOne({ name: category });
    if (categoryDocument) {
        return categoryDocument._id;
    }
    categoryDocument = await new category_model_1.CategoryModel({
        name: category,
        parent: articleId,
    })
        .save()
        .catch(() => category_model_1.CategoryModel.findOne({ name: category }));
    if (categoryDocument) {
        return categoryDocument._id;
    }
    else {
        console.log('handleCategories id error');
        return '';
    }
};
exports.handleCategories = handleCategories;
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
//# sourceMappingURL=handleCategories.js.map