import cheerio, { Cheerio, CheerioAPI, Element as $Element } from 'cheerio'
import { Browser, ElementHandle, Page } from 'puppeteer'
import { iPhone, pageOption } from '../../config'
import { videoInfo } from '../../db/dbType'
import { HomeVideosModel } from '../../db/model/homeVideo.model'
type videos = {
  videos: Array<videoInfo>
  index: number
  name: string
}
type videosCollection = Array<videos>
const getHomeVideo = async (browser: Browser) => {
  const page = await browser.newPage()
  await page.emulate(iPhone)
  await page.goto('https://pvp.qq.com/m/', pageOption)
  await clickVideoNavLis(page)

  const $ = cheerio.load(await page.content())

  const videosCollection: videosCollection = getVideosCollection($)

  await Promise.allSettled(
    videosCollection.map((videos) =>
      new HomeVideosModel(videos).save().catch((err) => console.log(err))
    )
  )
  await page.close()
  console.log('getHomeVideo end')
}
const getVideosCollection = ($: CheerioAPI) => {
  const videosCollection: videosCollection = []
  const nameElems = $('.video-nav>li>a')
  const contentElems = $('.video-slide-wrapper>ul')

  nameElems.each((index, elem) => {
    const name = $(elem).text().trim() || `${index}`
    const videos: Array<videoInfo> = getVideos(
      $(contentElems[index]).find('li')
    )
    videosCollection.push({
      index,
      videos,
      name,
    })
  })
  return videosCollection
}
const getVideos = ($li: Cheerio<$Element>) => {
  const result: Array<videoInfo> = []
  $li.each((_, elem) => {
    const $li = cheerio(elem)
    result.push({
      title: $li.find('.video_title').text(),
      src: $li.find('a').attr('href') || '#',
      pic: $li.find('img').attr('src') || '#',
      createTime: $li.find('.v_time').text() || '01-01',
      clickCount: $li.find('.v_num').text() || '1',
    })
  })
  return result
}
const clickVideoNavLis = async (page: Page) => {
  const videoNavNavItems = await page.$$('.video-nav>li')
  for (let navItem of videoNavNavItems) {
    await navItem.click()
    await page.waitForTimeout(5000)
  }
}
export { getHomeVideo }
