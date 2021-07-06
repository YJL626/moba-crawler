import { getHeroesInfo } from './crawler/getHeroesInfo'
import puppeteer from 'puppeteer'
import { closeExcessPage } from './crawler/utils/closeExcessPage'
import { getArticles } from './crawler/getArticle'
import { getHomeBanners } from './crawler/getBanner'
import { getHomeVideo } from './crawler/getHomeVideo/getHomeVideo'
import { mobaDbConnect } from './db'
import { getHeroBanner } from './crawler/getHeroBanner'
const run = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  console.log(process.argv)

  await getHomeBanners(browser)
  await getHomeVideo(browser)
  await getHeroesInfo(browser)
  await getHeroBanner(browser)
  console.log('hero end')
  await closeExcessPage(browser, 1)
  await getArticles(browser)

  console.log('end')
  await browser.close()
  await mobaDbConnect.close()
}
run().catch((err) => console.log(err))
