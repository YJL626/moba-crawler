import { CategoryModel } from '../../../db/model/category.model'
import { getArticleId } from '../utils/getter'
let articleId = ''
const handleCategories = async (category: string): Promise<string> => {
  if (!articleId) {
    articleId = await getArticleId()
  }
  let categoryDocument = await CategoryModel.findOne({ name: category })
  if (categoryDocument) {
    return categoryDocument._id
  }
  categoryDocument = await new CategoryModel({
    name: category,
    parent: articleId,
  })
    .save()
    .catch(() => CategoryModel.findOne({ name: category }))

  if (categoryDocument) {
    return categoryDocument._id
  } else {
    console.log('handleCategories id error')
    return ''
  }
}

export { handleCategories }
