"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsList = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const handleCategories_1 = require("./handle/handleCategories");
const config_1 = require("../../config");
const getter_1 = require("./utils/getter");
/**
 *
 *这个没有直接存入db getInfo时一并存入
 * @param {Browser} browser
 * @return {*}  {Promise<Array<news>>}
 */
const getNewsList = async (browser) => {
    const page = await browser.newPage();
    await page.emulate(config_1.iPhone);
    await page.goto(' https://pvp.qq.com/m/m201706/newsList.shtml', config_1.pageOption);
    let categoryCount = await page.evaluate(() => document.querySelectorAll(`#acBanner.news_list>ul>li`).length);
    while (categoryCount) {
        if (config_1.isTest) {
            await getMoreNews(page, { delay: 1500, getCount: 2 });
            await switchNewsToTag(page, categoryCount);
        }
        else {
            await getMoreNews(page, { delay: 1500, getCount: 15 });
            await switchNewsToTag(page, categoryCount);
        }
        categoryCount--;
    }
    const $ = cheerio_1.default.load(await page.content());
    const articleMap = new Map();
    //选择除热门之外的列表
    await saveArticleToMap($('.ac_tap:nth-child(1n+2)>ul>li'), articleMap);
    // 部分元素是热门也是其他分类 往其中添加热门分类
    await addHotCategory($('.ac_tap:nth-child(1)>ul>li'), articleMap);
    console.log(articleMap);
    return Array.from(articleMap.values());
};
exports.getNewsList = getNewsList;
async function saveArticleToMap($ArticleElements, articleMap) {
    const $ = cheerio_1.default;
    const elemList = [];
    console.log($ArticleElements.length);
    $ArticleElements.each((i, elem) => {
        elemList.push(elem);
    });
    //接受全部的li,each不接受async函数,用allSettled包一下
    await Promise.allSettled(elemList.map(async (elem) => {
        try {
            const title = $(elem).find('a').text();
            const categories = [
                await handleCategories_1.handleCategories($(elem).find('span:not(.mess_span)').text()),
            ];
            articleMap.set(title, {
                categories,
                title: title,
                src: $(elem).find('a').attr('href') || '',
                time: new Date($(elem).find('time').text()).getTime(),
            });
        }
        catch (error) {
            console.log('getNewsList allSettled', error);
        }
    }));
}
async function addHotCategory($HotArticleElements, articleMap) {
    const hotId = await getter_1.getHotId();
    const $ = cheerio_1.default;
    $HotArticleElements.each((i, elem) => {
        const title = $(elem).find('a').text();
        console.log(title);
        articleMap.get(title)?.categories.push(hotId);
    });
}
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
//# sourceMappingURL=getArticleList.js.map