import { Browser } from 'puppeteer'
import { isTest, pageCount } from '../../config'
import { closeExcessPage } from '../utils/closeExcessPage'
import { getArticleInfo } from './getArticlesInfo'
import { getNewsList } from './getArticleList'

const getArticles = async (browser: Browser) => {
  console.log('列表处操作会停顿十秒左右')
  //这个没有直接存入db getInfo时一并存入
  const newsList = await getNewsList(browser)
  console.log(`${newsList.length} 条news`)
  console.log('获取详情......')
  let len = newsList.length
  let runningList = []
  //获取content
  while (len) {
    console.log(len)
    // 并行执行多个
    runningList.push(getArticleInfo(browser, newsList[--len]))
    if (runningList.length >= pageCount) {
      await Promise.allSettled(runningList)
      runningList = []
      await closeExcessPage(browser, 1)
      runningList = []
      //测试时仅获取少量的数据
      if (isTest && newsList.length - len > 30) break
    }
  }
  console.log('getArticles end')
}
export { getArticles }
