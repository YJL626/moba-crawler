import { Browser } from 'puppeteer'
import cheerio from 'cheerio'
import { pageOption } from '../../../config'
const handleSkins = async (
  src: string | undefined,
  browser: Browser
): Promise<Array<{ name: string; pic: string }>> => {
  if (!src) return []
  const page = await browser.newPage()

  src = src.replace(/^\/\//, 'http://')
  await page.goto(src, pageOption)

  const html = await page.content()

  const $ = cheerio.load(html)
  const result: Array<{ name: string; pic: string }> = []
  $('[data-title]').each((i, elem) => {
    const name = elem.attribs['data-title']
    const pic = elem.attribs['src']
    result.push({ name, pic })
  })
  page.close()
  return result
}
export { handleSkins }
