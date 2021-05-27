import { CategoryModel } from '../../../db/model/category.model'
let newsId = ''
const handleCategories = async (category: string): Promise<string> => {
  if (!newsId) await getNewsId()
  let categoryDocument = await CategoryModel.findOne({ name: category })
  if (categoryDocument) {
    return categoryDocument._id
  }
  categoryDocument = await new CategoryModel({ name: category })
    .save()
    .catch(() => CategoryModel.findOne({ name: category }))

  if (categoryDocument) {
    return categoryDocument._id
  } else {
    console.log('handleCategories error')
    process.exit()
  }
}
async function getNewsId() {
  let newsDocument = await CategoryModel.findOne({ name: '新闻' })
  if (newsDocument) {
    newsId = newsDocument._id
    return
  }
  newsDocument = await new CategoryModel({ name: '新闻' })
    .save()
    .catch(() => CategoryModel.findOne({ name: '新闻' }, { parent: newsId }))
  if (newsDocument) {
    newsDocument._id
  } else {
    console.log('getNewsId error')
    process.exit()
  }
}
export { handleCategories }
