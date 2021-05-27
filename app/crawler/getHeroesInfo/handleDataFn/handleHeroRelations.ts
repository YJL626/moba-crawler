import { CheerioAPI } from 'cheerio'
import { heroRelation } from '../../../db/dbType'

const handleHeroRelations = async ($: CheerioAPI) => {
  const heroRelations: Array<heroRelation> = []

  $('.rela-list').each((i, elem) => {
    //获取标题
    const heroRelation: heroRelation = {
      title: $(`.rela-list>.tit2:nth-child(${i + 1})`).text(),
      list: [],
    }
    //填充list
    $(elem).each((i, elem) => {
      heroRelation.list.push({
        pic: $(elem).find('img').attr('src') || '',
        content: $(elem).find('p').text(),
      })
    })
    heroRelations.push(heroRelation)
  })
  return heroRelations
}
export { handleHeroRelations }
