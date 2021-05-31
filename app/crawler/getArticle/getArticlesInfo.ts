import { Browser } from 'puppeteer'
import { iPhone } from '../../config'
import { article, articleInfo } from '../../db/dbType'
import { ArticleContentModel, ArticleModel } from '../../db/model/article.model'
const getArticleInfo = async (
  browser: Browser,
  article: article
): Promise<void> => {
  const articleDocument = await ArticleModel.updateOne(
    { title: article.title },
    article,
    {
      upsert: true,
    }
  )
    .then(() => ArticleModel.findOne({ title: article.title }))
    .catch((err) => {
      console.log(err)
      console.log('save article error')
    })

  if (!articleDocument) return
  const articleId = articleDocument._id
  const page = await browser.newPage()
  await page.emulate(iPhone)
  const targetUrl = article.src.replace(/^\/\//, 'http://')
  await page.goto(targetUrl)
  const content = await page
    .$eval('.info_cont', (elem) => elem.innerHTML)
    .catch(() => '数据获取失败')
  const articleContent: articleInfo = {
    articleId,
    content,
  }
  await new ArticleContentModel(articleContent)
    .save()
    .catch(() => console.log(`getArticleInfo save error`))
}

export { getArticleInfo }
