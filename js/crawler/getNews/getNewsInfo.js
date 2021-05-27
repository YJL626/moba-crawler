"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsInfo = void 0;
const news_model_1 = require("../../db/model/news.model");
const getNewsInfo = async (browser, news) => {
    const newsDocument = await new news_model_1.NewsModel(news)
        .save()
        .catch(() => console.log('save news error'));
    if (!newsDocument)
        return;
    const newsId = newsDocument._id;
    const page = await browser.newPage();
    const targetUrl = news.src.replace(/^\/\//, 'http://');
    await page.goto(targetUrl);
    const content = await page
        .$eval('.info_cont', (elem) => elem.innerHTML)
        .catch(() => '数据获取失败');
    const newsContent = {
        newsId,
        content,
    };
    await new news_model_1.NewsInfoModel(newsContent)
        .save()
        .catch(() => console.log(`save error`));
};
exports.getNewsInfo = getNewsInfo;
//# sourceMappingURL=getNewsInfo.js.map