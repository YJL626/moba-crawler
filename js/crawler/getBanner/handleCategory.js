"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCategory = void 0;
const category_model_1 = require("../../db/model/category.model");
let bannerId;
const handleCategory = async (category) => {
    try {
        let document = await category_model_1.CategoryModel.findOne({ name: category });
        if (document) {
            return document._id;
        }
        if (!bannerId) {
            bannerId = await getBannerId();
        }
        document = await new category_model_1.CategoryModel({
            name: category,
            parent: bannerId,
        })
            .save()
            .catch(() => category_model_1.CategoryModel.findOne({ name: category }));
        return document?._id;
    }
    catch {
        console.log('handleCategory error');
        return '';
    }
};
exports.handleCategory = handleCategory;
async function getBannerId() {
    let result = await category_model_1.CategoryModel.findOne({ name: 'banner' });
    if (result) {
        return result._id || '';
    }
    result = await new category_model_1.CategoryModel({ name: 'banner' })
        .save()
        .catch(() => category_model_1.CategoryModel.findOne({ name: 'banner' }));
    if (result) {
        return result._id || '';
    }
    else {
        console.log('getBannerId error');
        return '';
    }
}
//# sourceMappingURL=handleCategory.js.map