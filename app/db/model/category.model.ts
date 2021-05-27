import mongoose, { Schema } from 'mongoose'
import { mobaDbConnect } from '..'

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'category',
  },
})

const CategoryModel = mobaDbConnect.model('category', categorySchema)
export { CategoryModel }
