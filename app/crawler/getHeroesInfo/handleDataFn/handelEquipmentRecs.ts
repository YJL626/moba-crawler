import { CheerioAPI } from 'cheerio'
import { EquipmentModel } from '../../../db/model/equipment.model'
import { heroDetail } from '../../../db/dbType'
type equipmentInfo = {
  name: string
  pic: string
}
const handleEquipmentRecs = async (
  $: CheerioAPI
): Promise<{ smoothly: string[]; hard: string[] }> => {
  const equipmentRecs: heroDetail['equipmentRecs'] = {
    smoothly: [''],
    hard: [''],
  }
  const smoothlyInfo: equipmentInfo[] = []
  const hardlyInfo: equipmentInfo[] = []

  $('.skills-build:not(.brn)>.build-list.equip-list>li').each((i, elem) => {
    smoothlyInfo.push({
      name: $(elem).find('.build-name').text(),
      pic: $(elem).find('img').attr('src') || '',
    })
  })
  $('.skills-build.brn>.build-list.equip-list>li').each((i, elem) => {
    hardlyInfo.push({
      name: $(elem).find('.build-name').text(),
      pic: $(elem).find('img').attr('src') || '',
    })
  })
  //保存后班会id
  equipmentRecs.smoothly = await saveToEquipment(smoothlyInfo)
  equipmentRecs.hard = await saveToEquipment(hardlyInfo)
  return equipmentRecs
}
export { handleEquipmentRecs }
async function saveToEquipment(
  equipmentInfoList: equipmentInfo[]
): Promise<Array<string>> {
  await EquipmentModel.createCollection()
  const idList = await Promise.allSettled(
    equipmentInfoList.map(async ({ name, pic }) => {
      let result = await EquipmentModel.findOne({ name: name })

      if (result) return result._id

      const equipment = new EquipmentModel({ name, pic })
      result = await equipment
        .save()
        .catch(() => EquipmentModel.findOne({ name: name }))
      if (result) return result._id
      console.log('get Equipment id error')
      return '60e4671a9f039009743f4857'
    })
  ).then((result) =>
    result.map((item) => {
      return (item.value as string) || '60e4671a9f039009743f4857'
    })
  )

  return idList
}
