import Cheerio, { CheerioAPI } from 'cheerio'
import { text } from 'cheerio/lib/static'
import { Browser } from 'puppeteer'
import { iPhone, pageOption } from '../config'
import { HeroModel } from '../db/model/hero.model'
import { HomeHeroBannerModel } from '../db/model/homeHeroBanner.model'
type heroBanner = { pic: string; heroId: string }
const getHeroBanner = async (browser: Browser) => {
  let $home: CheerioAPI
  let $heroInfo: CheerioAPI
  const heroBanner: heroBanner = { pic: '', heroId: '' }
  const page = await browser.newPage()

  try {
    await page.emulate(iPhone)
    await page.goto('https://pvp.qq.com/', pageOption)
    $home = Cheerio.load(await page.content())
    const href = await $home('.templte-li>a').attr('href')
    if (!href) throw null
    await page.goto(href, pageOption)
    $heroInfo = Cheerio.load(await page.content())
    const title = $heroInfo('.hero-title').text().trim()
    const pic = $home('.templte-li img').attr('src')
    if (!title) throw null
    const heroId = await HeroModel.findOne({ title }).then((doc) => {
      if (!doc) throw null
      return doc?._id
    })
    await new HomeHeroBannerModel({ pic, heroId })
      .save()
      .catch(() => new HomeHeroBannerModel({ pic, heroId }).save())
    console.log('hero banner end')
  } catch {
    console.log('get getHeroBanner error')
  }

  await page.close()
}
export { getHeroBanner }
