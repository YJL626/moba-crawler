import { mobaDbConnect } from '..'
import { Schema, SchemaTypes } from 'mongoose'
import { videoSchema } from './homeVideo.model'
const heroSchema = new Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  categories: [{ type: SchemaTypes.ObjectId, ref: 'category' }],
  heroImg: { type: String },
})

const heroDetailSchema = new Schema(
  {
    heroId: { type: SchemaTypes.ObjectId, ref: 'hero' },
    score: {
      difficult: Number,
      skill: Number,
      attack: Number,
      survive: Number,
    },
    bgcPic: { type: String },
    skins: [{ name: String, pic: String }],
    heroVideo: { type: String },
    infoPic: String,
    skills: [
      {
        name: String,
        pic: String,
        info: String,
        plusValue: String,
      },
    ],
    addPointRec: {
      main: { pic: String, name: String },
      secondary: { pic: String, name: String },
      summonerSpell: [
        { pic: String, name: String },
        { pic: String, name: String },
      ],
    },
    equipmentRecs: {
      smoothly: [{ type: SchemaTypes.ObjectId, ref: 'equipment' }],
      hard: [{ type: SchemaTypes.ObjectId, ref: 'equipment' }],
    },
    runes: [{ type: SchemaTypes.ObjectId, ref: 'rune' }],
    tips: [{ title: String, content: String }],
    heroRelations: [
      { title: String, list: [{ pic: String, content: String }] },
    ],
    learnVideos: [videoSchema],
  },
  { timestamps: true }
)

const HeroDetailModel = mobaDbConnect.model(
  'heroDetail',
  heroDetailSchema,
  'heroDetails'
)
const HeroModel = mobaDbConnect.model('hero', heroSchema, 'heroes')
export { HeroModel, HeroDetailModel }
