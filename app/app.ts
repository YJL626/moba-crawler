import { getHeroesInfo } from './crawler/getHeroesInfo'
import puppeteer from 'puppeteer'
import { closeExcessPage } from './crawler/utils/closeExcessPage'
import { getArticles } from './crawler/getArticle'
import { mobaDbConnect } from './db'
import { getHomeBanners } from './crawler/getBanner'
mobaDbConnect
;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  console.log(process.argv)
  await getHomeBanners(browser)
  console.log('home banner end ')

  await getHeroesInfo(browser)
  console.log('hero end')
  console.log('start get news 列表处操作会停顿十秒左右,系正常情况')
  await closeExcessPage(browser, 1)
  await getArticles(browser)
  console.log('get news end')
  console.log('end')
  process.exit()
})()
