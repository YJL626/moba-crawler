"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleInfo = void 0;
const config_1 = require("../../config");
const article_model_1 = require("../../db/model/article.model");
const getArticleInfo = async (browser, article) => {
    const articleDocument = await article_model_1.ArticleModel.updateOne({ title: article.title }, article, {
        upsert: true,
    })
        .then(() => article_model_1.ArticleModel.findOne({ title: article.title }))
        .catch((err) => {
        console.log(err);
        console.log('save article error');
    });
    if (!articleDocument)
        return;
    const articleId = articleDocument._id;
    const page = await browser.newPage();
    await page.emulate(config_1.iPhone);
    const targetUrl = article.src.replace(/^\/\//, 'http://');
    await page.goto(targetUrl);
    const content = await page
        .$eval('.info_cont', (elem) => elem.innerHTML)
        .catch(() => '数据获取失败');
    const articleContent = {
        articleId,
        content,
    };
    await new article_model_1.ArticleContentModel(articleContent)
        .save()
        .catch(() => console.log(`getArticleInfo save error`));
};
exports.getArticleInfo = getArticleInfo;
//# sourceMappingURL=getArticlesInfo.js.map