import cheerio, { Cheerio, Element as $Element, Element } from 'cheerio'
import { Browser, Page } from 'puppeteer'
import { article } from '../../db/dbType'
import { handleCategories } from './handle/handleCategories'
import { isTest, iPhone, pageOption } from '../../config'
import { getHotId } from './utils/getter'

/**
 *
 *这个没有直接存入db getInfo时一并存入
 * @param {Browser} browser
 * @return {*}  {Promise<Array<news>>}
 */
const getNewsList = async (browser: Browser): Promise<Array<article>> => {
  const page = await browser.newPage()
  await page.emulate(iPhone)
  await page.goto(' https://pvp.qq.com/m/m201706/newsList.shtml', pageOption)
  let categoryCount = await page.evaluate(
    () => document.querySelectorAll(`#acBanner.news_list>ul>li`).length
  )
  while (categoryCount) {
    if (isTest) {
      await getMoreNews(page, { delay: 1500, getCount: 2 })
      await switchNewsToTag(page, categoryCount)
    } else {
      await getMoreNews(page, { delay: 1500, getCount: 15 })
      await switchNewsToTag(page, categoryCount)
    }
    categoryCount--
  }
  const $ = cheerio.load(await page.content())
  const articleMap: Map<string, article> = new Map<string, article>()
  //选择除热门之外的列表
  await saveArticleToMap($('.ac_tap:nth-child(1n+2)>ul>li'), articleMap)
  // 部分元素是热门也是其他分类 往其中添加热门分类
  await addHotCategory($('.ac_tap:nth-child(1)>ul>li'), articleMap)
  console.log(articleMap)

  return Array.from(articleMap.values())
}

async function saveArticleToMap(
  $ArticleElements: Cheerio<Element>,
  articleMap: Map<string, article>
) {
  const $ = cheerio
  const elemList: Array<$Element> = []
  console.log($ArticleElements.length)

  $ArticleElements.each((i, elem) => {
    elemList.push(elem)
  })
  //接受全部的li,each不接受async函数,用allSettled包一下

  await Promise.allSettled(
    elemList.map(async (elem) => {
      try {
        const title = $(elem).find('a').text()
        const categories = [
          await handleCategories($(elem).find('span:not(.mess_span)').text()),
        ]
        articleMap.set(title, {
          categories,
          title: title,
          src: $(elem).find('a').attr('href') || '',
          time: new Date($(elem).find('time').text()).getTime(),
        })
      } catch (error) {
        console.log('getNewsList allSettled', error)
      }
    })
  )
}
async function addHotCategory(
  $HotArticleElements: Cheerio<Element>,
  articleMap: Map<string, article>
) {
  const hotId = await getHotId()
  const $ = cheerio
  $HotArticleElements.each((i, elem) => {
    const title = $(elem).find('a').text()
    console.log(title)

    articleMap.get(title)?.categories.push(hotId)
  })
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
