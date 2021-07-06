import { CategoryModel } from '../../db/model/category.model'

const getCategoryId = async (
  model: {
    parent?: string
    name: string
  },
  option: { create?: boolean } = {}
): Promise<string> => {
  let document = await CategoryModel.findOne({ name: model.name })
  if (document) return document._id
  if (!option.create) return ''
  model = model.parent ? model : { name: model.name }
  document = await new CategoryModel(model)
    .save()
    .catch(() => CategoryModel.findOne({ name: model.name }))
  if (document) return document._id
  console.log('getCategoryId error categoryName:' + model.name)
  return ''
}
export { getCategoryId }
