import { CheerioAPI } from 'cheerio'
import { heroRelation } from '../../../db/dbType'

const handleHeroRelations = async ($: CheerioAPI) => {
  const heroRelations: Array<heroRelation> = []
  const $rel = $('.panel:nth-last-child(1)')

  $rel.find('.tit2').each((index, elem) => {
    //获取标题
    const heroRelation: heroRelation = {
      title: $(elem).text(),
      list: [],
    }
    //填充list
    $rel.find(`.rela-list`).each((indey, elem) => {
      if (indey !== index) return
      $(elem)
        .find('li')
        .each((i, li) => {
          heroRelation.list.push({
            pic: $(li).find('img').attr('src') || '',
            content: $(li).find('p').text(),
          })
        })
    })
    heroRelations.push(heroRelation)
  })

  return heroRelations
}
export { handleHeroRelations }
