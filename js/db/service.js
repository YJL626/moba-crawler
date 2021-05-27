"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbService = void 0;
const category_model_1 = require("./model/category.model");
class Service {
    async getCategoryIdByName(name) {
        const result = await category_model_1.CategoryModel.findOne({ name });
        if (result) {
            return result._id;
        }
        return false;
    }
    async createCategory(option) {
        const model = new category_model_1.CategoryModel(option);
        return await model.save();
    }
}
const dbService = new Service();
exports.dbService = dbService;
//# sourceMappingURL=service.js.map