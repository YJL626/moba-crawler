import { getHeroesInfo } from './crawler/getHeroesInfo'
import puppeteer from 'puppeteer'
import { closeExcessPage } from './crawler/utils/closeExcessPage'
import { getNews } from './crawler/getNews'
import { mobaDbConnect } from './db'
mobaDbConnect
;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  console.log(process.argv)

  await getHeroesInfo(browser)
  console.log('hero end')
  console.log('start get news 列表处操作会停顿十秒左右,系正常情况')

  await closeExcessPage(browser, 1)
  console.log('get news end')
  await getNews(browser)
  /* news end */
  console.log('end')
  process.exit()
})()
