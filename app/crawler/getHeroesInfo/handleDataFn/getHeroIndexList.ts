import { Browser } from 'puppeteer'
import { iPhone, pageOption } from '../../../config'

const getHeroIndexList = async (browser: Browser): Promise<number[]> => {
  const page = await browser.newPage()
  await page.emulate(iPhone)
  await page.goto('https://pvp.qq.com/m/', { waitUntil: 'networkidle0' })
  let tryCount = 3
  while (tryCount > 0) {
    console.log('获取英雄列表')
    const jsonData = await page.evaluate(() => localStorage.getItem('herolist'))
    try {
      if (jsonData) {
        const heroList = JSON.parse(jsonData) as Array<{ ename: number }>
        const indexList = heroList.map(({ ename }) => ename)

        if (indexList.length > 50) {
          console.log('获取成功' + indexList.length)
          page.close()
          return indexList.map((value) => +value)
        }
      }
    } catch {}
    if (tryCount <= 1) {
      console.log('id list-获取失败')
      process.exit()
    }
    console.log('获取失败 正在重试')
    await page.goto('https://pvp.qq.com/m/', pageOption)
    tryCount--
  }
  console.log('id list-获取失败')
  process.exit()
}
export { getHeroIndexList }
