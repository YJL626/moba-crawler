import { SchemaTypes, Schema } from 'mongoose'
import { mobaDbConnect } from '..'

const newsSchema = new Schema({
  title: { type: String },
  src: String,
  categories: [{ type: SchemaTypes.ObjectId, ref: 'category' }],
  time: String,
})

const newsInfoSchema = new Schema({
  newsId: { type: SchemaTypes.ObjectId, ref: 'news' },
  content: String,
})
const NewsModel = mobaDbConnect.model('news', newsSchema, 'news')
const NewsInfoModel = mobaDbConnect.model(
  'newsContent',
  newsInfoSchema,
  'newsContents'
)
export { NewsModel, NewsInfoModel }
