import { Browser } from 'puppeteer'
import { isTest, pageCount } from '../../config'
import { closeExcessPage } from '../utils/closeExcessPage'
import { getNewsInfo } from './getNewsInfo'
import { getNewsList } from './getNewsList'

const getNews = async (browser: Browser) => {
  //这个没有直接存入db getInfo时一并存入
  const newsList = await getNewsList(browser)
  console.log(`${newsList.length} 条news`)
  console.log('获取详情......')
  let len = newsList.length
  let runningList = []
  while (len) {
    console.log(len)
    if (isTest) {
      await getNewsInfo(browser, newsList[0])
      break
    }
    // 并行执行多个
    runningList.push(getNewsInfo(browser, newsList[--len]))
    if (runningList.length >= pageCount) {
      await Promise.allSettled(runningList)
      await closeExcessPage(browser, 1)
      runningList = []
    }
  }
}
export { getNews }
