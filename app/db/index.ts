import Mongoose from 'mongoose'
import { dbSrc, isDrop } from '../config'
console.log('---')
const mobaDbConnect = Mongoose.createConnection(dbSrc, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

if (isDrop) {
  console.log(isDrop)

  mobaDbConnect.dropDatabase()
}
mobaDbConnect.on('open', () => {
  console.log('db open')
})
export { mobaDbConnect }
