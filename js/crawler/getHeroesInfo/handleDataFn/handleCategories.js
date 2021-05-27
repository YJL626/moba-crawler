"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCategories = void 0;
const category_model_1 = require("../../../db/model/category.model");
const service_1 = require("../../../db/service");
let categoryHeroId = '';
const tempMap = new Map();
const handleCategories = async (categoryData) => {
    if (!categoryHeroId) {
        categoryHeroId = await getHeroCategoryId();
    }
    const categories = categoryData.split('/');
    const result = await Promise.allSettled(categories.map(async (category) => {
        //有缓存则返回缓存
        if (tempMap.has(category))
            return tempMap.get(category) || '';
        const result = await service_1.dbService.getCategoryIdByName(category);
        if (result) {
            //保存缓存
            tempMap.set(category, result);
            return result;
        }
        const document = await service_1.dbService.createCategory({
            name: category,
            parent: categoryHeroId,
        });
        return document ? document._id : false;
    }));
    return result.map(({ value = '' }) => value);
};
exports.handleCategories = handleCategories;
async function getHeroCategoryId() {
    let document = await category_model_1.CategoryModel.findOne({ name: '英雄' });
    if (document) {
        return document._id;
    }
    const heroCategory = new category_model_1.CategoryModel({ name: '英雄' });
    document = await heroCategory.save();
    if (document) {
        return document._id;
    }
    else {
        console.log('getHeroCategoryId error');
        process.exit();
    }
}
//# sourceMappingURL=handleCategories.js.map