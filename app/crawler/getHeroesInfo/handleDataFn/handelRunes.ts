import { CheerioAPI } from 'cheerio'
import { rune } from '../../../db/dbType'
import { RuneModel } from '../../../db/model/rune.model'

const handleRunes = async ($: CheerioAPI) => {
  const runeInfos: rune[] = []
  $('.rune-cont.c').each((i, elem) => {
    const runeInfo: rune = {
      name: $(elem).find('.rp1').text(),
      pic: $(elem).find('img').attr('src') || '',
      buffs: [],
    }
    $(elem)
      .find('dd>p:not(.rp1)')
      .each((i, elem) => {
        const buffValue = $(elem).text()
        buffValue && runeInfo.buffs.push(buffValue)
      })
    runeInfos.push(runeInfo)
  })
  const idList = await saveToRunes(runeInfos)
  return idList
}
async function saveToRunes(runeInfos: rune[]): Promise<string[]> {
  const idList = await Promise.allSettled(
    runeInfos.map(async (runeInfo): Promise<string> => {
      let document = await RuneModel.findOne({ name: runeInfo.name })
      if (document) {
        return document._id
      }
      const model = new RuneModel(runeInfo)
      document = await model.save()
      return document._id
    })
  ).then((item) => item.map((result) => result.value as string))
  return idList
}
export { handleRunes }
