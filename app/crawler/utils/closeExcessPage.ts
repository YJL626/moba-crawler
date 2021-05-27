import { Browser } from 'puppeteer'

async function closeExcessPage(browser: Browser, keepCount = 1): Promise<void> {
  const pages = await browser.pages()
  await Promise.allSettled(
    pages.map((page, i) => (keepCount > i ? null : page.close()))
  )
}
export { closeExcessPage }
