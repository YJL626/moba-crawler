import { Browser } from 'puppeteer'
import { isTest, pageCount } from '../../config'
import { closeExcessPage } from '../utils/closeExcessPage'
import { getHeroInfo } from './getHeroInfo'

import { getHeroIndexList } from './handleDataFn/getHeroIndexList'

const getHeroesInfo = async (browser: Browser): Promise<void> => {
  const heroIndexList = await getHeroIndexList(browser)

  let runningList: Array<Promise<unknown>> = []
  /* await getHeroInfo(115, browser) */
  for (let i = 0; i < heroIndexList.length; i++) {
    if (isTest) {
      console.log('测试运行')
      await runningList.push(getHeroInfo(heroIndexList[i], browser))
      break
    }
    console.log(`${i}`)
    runningList.push(getHeroInfo(heroIndexList[i], browser))
    // 向队列推入任务,达到预设数量后执行完成后再继续执行
    if (runningList.length >= pageCount) {
      await Promise.allSettled(runningList)
      await closeExcessPage(browser)
      runningList = []
    }
  }
  await Promise.allSettled(runningList)
}
export { getHeroesInfo }
