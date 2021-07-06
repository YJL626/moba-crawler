import { Schema } from 'mongoose'
import { mobaDbConnect } from '..'
import { dbService } from '../service'

const videoSchema = new Schema({
  title: String,
  src: String,
  pic: String,
  createTime: String,
  clickCount: String,
})
const homeVideosSchema = new Schema({
  index: Number,
  name: String,
  videos: [videoSchema],
})
const HomeVideosModel = mobaDbConnect.model(
  'homeVideos',
  homeVideosSchema,
  'homeVideosCollection'
)
export { videoSchema, HomeVideosModel }
