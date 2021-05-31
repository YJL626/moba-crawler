"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCategories = void 0;
const category_model_1 = require("../../../db/model/category.model");
const getter_1 = require("../utils/getter");
let articleId = '';
const handleCategories = async (category) => {
    if (!articleId) {
        articleId = await getter_1.getArticleId();
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
//# sourceMappingURL=handleCategories.js.map