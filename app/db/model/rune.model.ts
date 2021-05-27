import { Schema } from 'mongoose'
import { mobaDbConnect } from '..'
const RuneScheme = new Schema({
  name: { type: String, unique: true },
  pic: String,
  buffs: [String],
})
const RuneModel = mobaDbConnect.model('rune', RuneScheme, 'runes')
export { RuneModel }
