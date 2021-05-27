import { CheerioAPI } from 'cheerio'
import { tip } from '../../../db/dbType'

const handleTips = async ($: CheerioAPI) => {
  const tips: Array<tip> = []
  $('.panel.brt>.autom').each((i, elem) => {
    if ($(elem).find('.use-skills').length === 0) return
    tips.push({
      title: $(elem).find('.tit1').text(),
      content: $(elem).find('.use-skills').text(),
    })
  })
  return tips
}
export { handleTips }
