import { Schema } from 'mongoose'
import { mobaDbConnect } from '..'

const equipmentScheme = new Schema({
  name: { type: String, unique: true },
  pic: String,
})
const EquipmentModel = mobaDbConnect.model(
  'equipment',
  equipmentScheme,
  'equipments'
)

export { EquipmentModel }
