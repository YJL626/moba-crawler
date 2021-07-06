"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticles = void 0;
const config_1 = require("../../config");
const closeExcessPage_1 = require("../utils/closeExcessPage");
const getArticlesInfo_1 = require("./getArticlesInfo");
const getArticleList_1 = require("./getArticleList");
const getArticles = async (browser) => {
    console.log('列表处操作会停顿十秒左右');
    //这个没有直接存入db getInfo时一并存入
    const newsList = await getArticleList_1.getNewsList(browser);
    console.log(`${newsList.length} 条news`);
    console.log('获取详情......');
    let len = newsList.length;
    let runningList = [];
    //获取content
    while (len) {
        console.log(len);
        // 并行执行多个
        runningList.push(getArticlesInfo_1.getArticleInfo(browser, newsList[--len]));
        if (runningList.length >= config_1.pageCount) {
            await Promise.allSettled(runningList);
            runningList = [];
            await closeExcessPage_1.closeExcessPage(browser, 1);
            runningList = [];
            //测试时仅获取少量的数据
            if (config_1.isTest && newsList.length - len > 30)
                break;
        }
    }
    console.log('getArticles end');
};
exports.getArticles = getArticles;
//# sourceMappingURL=index.js.map