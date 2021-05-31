import { CategoryModel } from '../../db/model/category.model'

let bannerId: string

const handleCategory = async (category: string): Promise<string> => {
  try {
    let document = await CategoryModel.findOne({ name: category })
    if (document) {
      return document._id
    }
    if (!bannerId) {
      bannerId = await getBannerId()
    }
    document = await new CategoryModel({
      name: category,
      parent: bannerId,
    })
      .save()
      .catch(() => CategoryModel.findOne({ name: category }))

    return document?._id
  } catch {
    console.log('handleCategory error')

    return ''
  }
}
async function getBannerId(): Promise<string> {
  let result = await CategoryModel.findOne({ name: 'banner' })
  if (result) {
    return result._id || ''
  }
  result = await new CategoryModel({ name: 'banner' })
    .save()
    .catch(() => CategoryModel.findOne({ name: 'banner' }))
  if (result) {
    return result._id || ''
  } else {
    console.log('getBannerId error')
    return ''
  }
}
export { handleCategory }
