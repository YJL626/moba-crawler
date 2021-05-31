"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleInfo = void 0;
const article_model_1 = require("../../db/model/article.model");
const getArticleInfo = async (browser, news) => {
    const newsDocument = await new article_model_1.ArticleModel(news);
    await article_model_1.ArticleModel.replaceOne({ title: news.title }, newsDocument, {
        upsert: true,
    }).catch(() => {
        console.log('save news error');
    });
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
    await new article_model_1.ArticleContentModel(newsContent)
        .save()
        .catch(() => console.log(`getArticleInfo save error`));
};
exports.getArticleInfo = getArticleInfo;
//# sourceMappingURL=getArticleInfo.js.map