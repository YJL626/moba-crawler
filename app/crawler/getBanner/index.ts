import Cheerio, { Element } from 'cheerio'
import { Browser } from 'puppeteer'
import { iPhone, pageOption } from '../../config'
import { mobaDbConnect } from '../../db'
import { banner } from '../../db/dbType'
import { BannerModel } from '../../db/model/banner.model'
import { handleCategory } from './handleCategory'

const getHomeBanners = async (browser: Browser): Promise<void> => {
  const page = await browser.newPage()
  await page.emulate(iPhone)
  await page.goto('https://pvp.qq.com/m/', pageOption)
  const html = await page.content()
  const $ = Cheerio.load(html)
  const banners: banner[] = []
  /* $each 不支持异步推入到elems之中执行 */
  const elems: Element[] = []

  $('[exposure-tag="banner,banner轮播图"]>ul  .slide-item').each((i, elem) => {
    elems.push(elem)
  })
  await Promise.allSettled(
    elems.map(async (elem, index) => {
      banners.push({
        pic: $(elem).find('img').attr('src') || '',
        name: index + '',
        index,
        src: $(elem).find('a').attr('href') || 'https://pvp.qq.com/m/',
        category: await handleCategory('homeBanner'),
      })
    })
  )
  if ((await BannerModel.find()).length) {
    await mobaDbConnect.dropCollection('banners')
  }
  await BannerModel.insertMany(banners).catch((err) => {
    console.log(err)
    process.exit()
  })
  console.log('home banner end ')
}
export { getHomeBanners }
