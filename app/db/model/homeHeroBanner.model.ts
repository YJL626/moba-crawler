import { Mongoose, Schema, SchemaTypes } from 'mongoose'
import { mobaDbConnect } from '..'

const homeHeroBannerSchema = new Schema({
  heroId: { type: SchemaTypes.ObjectId, ref: 'hero' },
  pic: String,
})
const HomeHeroBannerModel = mobaDbConnect.model(
  'homeHeroBanner',
  homeHeroBannerSchema
)
export { HomeHeroBannerModel }
