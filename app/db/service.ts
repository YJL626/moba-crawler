import { CategoryModel } from './model/category.model'

class Service {
  async getCategoryIdByName(name: string): Promise<string | false> {
    const result = await CategoryModel.findOne({ name })
    if (result) {
      return result._id
    }
    return false
  }
  async createCategory(option: { name: string; parent: string }) {
    const model = new CategoryModel(option)
    return await model.save()
  }
}
const dbService = new Service()
export { dbService }
