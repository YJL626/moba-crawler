import { CheerioAPI } from 'cheerio'
type skillInfo = {
  name: string
  pic: string
  info: string
  plusValue: string
}
const handleSkills = async ($: CheerioAPI): Promise<Array<skillInfo>> => {
  const skills: Array<skillInfo> = Array.from({
    length: $('.plus-name').length,
  }).map(() => {
    return {
      name: '',
      pic: '',
      info: '',
      plusValue: '',
    }
  })
  try {
    $('.plus-tab.controller  img').each((i, elem) => {
      skills[i].pic = elem.attribs.src
    })

    $('.plus-name').each((i, elem) => {
      skills[i].name = $(elem).text() || ''
    })
    $('.plus-value').each((i, elem) => {
      skills[i].plusValue = $(elem).text() || ''
    })
    $('.plus-int').each((i, elem) => {
      skills[i].info = $(elem).text() || ''
    })
  } catch (err) {
    console.log(err)

    console.log('handleSkills error')
  }
  return skills
}

export { handleSkills }
