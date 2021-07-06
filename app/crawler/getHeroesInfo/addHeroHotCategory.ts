import cheerio from 'cheerio'
import { Browser } from 'puppeteer'
import { iPhone,pageOption } from '../../config'
import { HeroModel } from '../../db/model/hero.model'
import { closeExcessPage } from '../utils/closeExcessPage'
import { getCategoryId } from '../utils/getCategoryId'

async function addHeroHotCategory(browser: Browser): Promise<void> {
  const pendingPromise: Array<unknown> = []
  const page = await browser.newPage()
  await page.emulate(iPhone)
  console.log('999999999')

  await page.goto('https://pvp.qq.com/m/', pageOption)
  await page.evaluate(() => {
    document.querySelector('.hero-slide-wrapper')?.scrollIntoView()
  })
  await page.waitForTimeout(2000)
  const $ = cheerio.load(await page.content())

  const heroId = await getCategoryId({ name: '英雄' }, { create: true })
  const hotHeroCategoryId = await getCategoryId(
    { name: '热门英雄', parent: heroId },
    { create: true }
  )
  console.log(hotHeroCategoryId)

  $('.hero-slide-wrapper li').each((i, elem) => {
    const HeroName = $(elem).find('h3').text()
    console.log(HeroName)

    if (!HeroName) return
    pendingPromise.push(
      HeroModel.findOneAndUpdate(
        { name: HeroName },
        { $push: { categories: hotHeroCategoryId } }
      ).catch(() => {
        console.log('addHeroHotCategory error')
      })
    )
  })
  await Promise.allSettled(pendingPromise as Array<Promise<unknown>>)
  console.log('addHeroHotCategory end')
  await closeExcessPage(browser)
}
export { addHeroHotCategory }
