"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsList = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const handleCategories_1 = require("./handle/handleCategories");
const config_1 = require("../../config");
/**
 *
 *这个没有直接存入db getInfo时一并存入
 * @param {Browser} browser
 * @return {*}  {Promise<Array<news>>}
 */
const getNewsList = async (browser) => {
    const page = await browser.newPage();
    await page.emulate(config_1.iPhone);
    await page.goto(' https://pvp.qq.com/m/m201706/newsList.shtml', {
        waitUntil: 'networkidle0',
    });
    let categoryCount = await page.evaluate(() => document.querySelectorAll(`#acBanner.news_list>ul>li`).length);
    while (categoryCount) {
        if (config_1.isTest) {
            await getMoreNews(page, { delay: 1500, getCount: 2 });
            break;
        }
        else {
            await getMoreNews(page, { delay: 1500, getCount: 15 });
            await switchNewsToTag(page, categoryCount);
        }
        categoryCount--;
    }
    const $ = cheerio_1.default.load(await page.content());
    const newsDataList = [];
    //接受全部的li,each不接受async函数,用allSettled包一下
    const elemList = [];
    $('.ac_tap>ul>li').each((i, elem) => {
        elemList.push(elem);
    });
    await Promise.allSettled(elemList.map(async (elem) => {
        try {
            const categories = [
                await handleCategories_1.handleCategories($(elem).find('span:not(.mess_span)').text()),
            ];
            newsDataList.push({
                categories,
                title: $(elem).find('a').text(),
                src: $(elem).find('a').attr('href') || '',
                time: $(elem).find('time').text(),
            });
        }
        catch (error) {
            console.log('getNewsList allSettled', error);
        }
    }));
    /* const newsCollection = await NewsModel.insertMany(newsDataList).catch(() => {
      console.log('NewsModel.insertMany(newsDataList) error')
      process.exit()
    }) */
    return newsDataList;
};
exports.getNewsList = getNewsList;
async function getMoreNews(page, option = {}) {
    let getCount = option.getCount || 2;
    const delay = option.delay || 1500;
    while (getCount) {
        await page.click('h3');
        await page.waitForTimeout(delay);
        getCount--;
    }
}
async function switchNewsToTag(page, target = 1) {
    await page.click(`#acBanner.news_list>ul>:nth-child(${target})`);
}
//# sourceMappingURL=getNewsList.js.map