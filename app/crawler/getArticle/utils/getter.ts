import { CategoryModel } from '../../../db/model/category.model'

async function getHotId() {
  let hotCategory = await CategoryModel.findOne({ name: '热门' })
    .then((document) => document?._id)
    .catch(() => '')
  if (hotCategory) return hotCategory?._id

  const articleId = await getArticleId()
  hotCategory = await new CategoryModel({
    name: '热门',
    parent: articleId,
  })
    .save()
    .catch(() => CategoryModel.findOne({ name: '热门' }))
  if (hotCategory) {
    return hotCategory?._id
  } else {
    console.log('getHotId error')
  }
}
async function getArticleId(): Promise<string> {
  let newsDocument = await CategoryModel.findOne({ name: '文章' })
  if (newsDocument) {
    return newsDocument._id
  }
  newsDocument = await new CategoryModel({ name: '文章' })
    .save()
    .catch(() => CategoryModel.findOne({ name: '文章' }))
  if (newsDocument) {
    return newsDocument._id
  } else {
    console.log('getArticleId error')
    process.exit()
  }
}
export { getArticleId, getHotId }
