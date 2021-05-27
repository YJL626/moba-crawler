import { Browser } from 'puppeteer'
import { iPhone } from '../../../config'
type heroListItem = { [prop: number]: string }
const getHeroIndexList = async (browser: Browser): Promise<number[]> => {
  const page = await browser.newPage()
  await page.emulate(iPhone)
  await page.goto('https://pvp.qq.com/m/', { waitUntil: 'networkidle0' })
  let tryCount = 3
  while (tryCount > 0) {
    console.log('获取英雄列表')
    const jsonData = await page.evaluate(() =>
      localStorage.getItem('module_exports')
    )
    if (jsonData) {
      const heroList: heroListItem = JSON.parse(jsonData)
      const indexList = Object.keys(heroList)
      if (indexList.length > 50) {
        console.log('获取成功')
        page.close()
        return indexList.map((value) => +value)
      }
    }

    if (tryCount === 1) {
      console.log('获取失败')
    }
    await page.goto('https://pvp.qq.com/m/', { waitUntil: 'networkidle0' })
    tryCount--
  }
  console.log('list-获取失败')
  return process.exit()
}
export { getHeroIndexList }
