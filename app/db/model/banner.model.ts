import { Schema, SchemaTypes } from 'mongoose'
import { mobaDbConnect } from '..'

const bannerSchema = new Schema({
  pic: String,
  name: String,
  category: { type: SchemaTypes.ObjectId, ref: 'category' },
  src: String,
  index: Number,
})
const BannerModel = mobaDbConnect.model('banner', bannerSchema, 'banners')
export { BannerModel }
