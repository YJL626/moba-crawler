"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCategories = void 0;
const category_model_1 = require("../../../db/model/category.model");
let newsId = '';
const handleCategories = async (category) => {
    if (!newsId)
        await getNewsId();
    let categoryDocument = await category_model_1.CategoryModel.findOne({ name: category });
    if (categoryDocument) {
        return categoryDocument._id;
    }
    categoryDocument = await new category_model_1.CategoryModel({ name: category })
        .save()
        .catch(() => category_model_1.CategoryModel.findOne({ name: category }));
    if (categoryDocument) {
        return categoryDocument._id;
    }
    else {
        console.log('handleCategories error');
        process.exit();
    }
};
exports.handleCategories = handleCategories;
async function getNewsId() {
    let newsDocument = await category_model_1.CategoryModel.findOne({ name: '新闻' });
    if (newsDocument) {
        newsId = newsDocument._id;
        return;
    }
    newsDocument = await new category_model_1.CategoryModel({ name: '新闻' })
        .save()
        .catch(() => category_model_1.CategoryModel.findOne({ name: '新闻' }, { parent: newsId }));
    if (newsDocument) {
        newsDocument._id;
    }
    else {
        console.log('getNewsId error');
        process.exit();
    }
}
//# sourceMappingURL=handleCategories.js.map