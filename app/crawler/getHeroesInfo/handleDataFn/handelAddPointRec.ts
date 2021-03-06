import { CheerioAPI } from 'cheerio'
import { heroDetail } from '../../../db/dbType'

const handleAddPointRec = async ($: CheerioAPI) => {
  const addPointRec: heroDetail['addPointRec'] = {
    main: {
      pic: $('.osal-box.sk1.l >img').attr('src') || '',
      name: $('.osal-box.sk1.l >.upskill').text() || '',
    },
    secondary: {
      pic: $('.osal-box.sk2.l >img').attr('src') || '',
      name: $('.osal-box.sk2.l > .upskill').text() || '',
    },
    summonerSpell: [
      {
        pic: $('#skill3>:nth-child(1)>img').attr('src') || '',
        name: $('#skill3>:nth-child(1)>span').text() || '',
      },
      {
        pic: $('#skill3>:nth-child(2)>img').attr('src') || '',
        name: $('#skill3>:nth-child(2)>span').text() || '',
      },
    ],
  }
  return addPointRec
}
export { handleAddPointRec }
