import { CategoryModel } from '../../../db/model/category.model'
import { dbService } from '../../../db/service'
let categoryHeroId = ''
const tempMap = new Map<string, string>()
const handleCategories = async (categoryData: string): Promise<string[]> => {
  if (!categoryHeroId) {
    categoryHeroId = await getHeroCategoryId()
  }
  const categories = categoryData.split('/')

  const result = await Promise.allSettled<string, string>(
    categories.map(async (category: string): Promise<string> => {
      //有缓存则返回缓存
      if (tempMap.has(category)) return tempMap.get(category) || ''

      const result = await dbService.getCategoryIdByName(category)
      if (result) {
        //保存缓存
        tempMap.set(category, result)
        return result
      }

      const document = await dbService.createCategory({
        name: category,
        parent: categoryHeroId,
      })
      return document ? document._id : false
    })
  )
  return result.map(({ value = '' }) => value)
}

async function getHeroCategoryId() {
  let document = await CategoryModel.findOne({ name: '英雄' })
  if (document) {
    return document._id
  }
  const heroCategory = new CategoryModel({ name: '英雄' })
  document = await heroCategory.save()
  if (document) {
    return document._id
  } else {
    console.log('getHeroCategoryId error')

    process.exit()
  }
}
export { handleCategories }
