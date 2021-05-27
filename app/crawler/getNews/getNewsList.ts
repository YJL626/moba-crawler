import cheerio, { Element as $Element } from 'cheerio'
import { Browser, Page } from 'puppeteer'
import { news } from '../../db/dbType'
import { handleCategories } from './handle/handleCategories'
import { isTest, iPhone } from '../../config'

/**
 *
 *这个没有直接存入db getInfo时一并存入
 * @param {Browser} browser
 * @return {*}  {Promise<Array<news>>}
 */
const getNewsList = async (browser: Browser): Promise<Array<news>> => {
  const page = await browser.newPage()
  await page.emulate(iPhone)
  await page.goto(' https://pvp.qq.com/m/m201706/newsList.shtml', {
    waitUntil: 'networkidle0',
  })
  let categoryCount = await page.evaluate(
    () => document.querySelectorAll(`#acBanner.news_list>ul>li`).length
  )
  while (categoryCount) {
    if (isTest) {
      await getMoreNews(page, { delay: 1500, getCount: 2 })
      break
    } else {
      await getMoreNews(page, { delay: 1500, getCount: 15 })
      await switchNewsToTag(page, categoryCount)
    }
    categoryCount--
  }
  const $ = cheerio.load(await page.content())
  const newsDataList: Array<news> = []
  //接受全部的li,each不接受async函数,用allSettled包一下
  const elemList: Array<$Element> = []
  $('.ac_tap>ul>li').each((i, elem) => {
    elemList.push(elem)
  })
  await Promise.allSettled(
    elemList.map(async (elem) => {
      try {
        const categories = [
          await handleCategories($(elem).find('span:not(.mess_span)').text()),
        ]
        newsDataList.push({
          categories,
          title: $(elem).find('a').text(),
          src: $(elem).find('a').attr('href') || '',
          time: $(elem).find('time').text(),
        })
      } catch (error) {
        console.log('getNewsList allSettled', error)
      }
    })
  )

  /* const newsCollection = await NewsModel.insertMany(newsDataList).catch(() => {
    console.log('NewsModel.insertMany(newsDataList) error')
    process.exit()
  }) */
  return newsDataList
}

async function getMoreNews(
  page: Page,
  option: { getCount?: number; delay?: number } = {}
) {
  let getCount = option.getCount || 2
  const delay = option.delay || 1500
  while (getCount) {
    await page.click('h3')
    await page.waitForTimeout(delay)
    getCount--
  }
}
async function switchNewsToTag(page: Page, target = 1) {
  await page.click(`#acBanner.news_list>ul>:nth-child(${target})`)
}
export { getNewsList }
