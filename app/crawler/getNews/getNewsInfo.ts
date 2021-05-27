import { Browser } from 'puppeteer'
import { news, newsInFO } from '../../db/dbType'
import { NewsInfoModel, NewsModel } from '../../db/model/news.model'

const getNewsInfo = async (browser: Browser, news: news): Promise<void> => {
  const newsDocument = await new NewsModel(news)
    .save()
    .catch(() => console.log('save news error'))

  if (!newsDocument) return
  const newsId = newsDocument._id
  const page = await browser.newPage()
  const targetUrl = news.src.replace(/^\/\//, 'http://')
  await page.goto(targetUrl)
  const content = await page
    .$eval('.info_cont', (elem) => elem.innerHTML)
    .catch(() => '数据获取失败')
  const newsContent: newsInFO = {
    newsId,
    content,
  }
  await new NewsInfoModel(newsContent)
    .save()
    .catch(() => console.log(`save error`))
}
export { getNewsInfo }
