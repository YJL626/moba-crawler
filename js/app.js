"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getHeroesInfo_1 = require("./crawler/getHeroesInfo");
const puppeteer_1 = __importDefault(require("puppeteer"));
const closeExcessPage_1 = require("./crawler/utils/closeExcessPage");
const getArticle_1 = require("./crawler/getArticle");
const db_1 = require("./db");
const getBanner_1 = require("./crawler/getBanner");
db_1.mobaDbConnect;
(async () => {
    const browser = await puppeteer_1.default.launch({
        headless: false,
    });
    console.log(process.argv);
    await getBanner_1.getHomeBanners(browser);
    console.log('home banner end ');
    await getHeroesInfo_1.getHeroesInfo(browser);
    console.log('hero end');
    console.log('start get news 列表处操作会停顿十秒左右,系正常情况');
    await closeExcessPage_1.closeExcessPage(browser, 1);
    await getArticle_1.getArticles(browser);
    console.log('get news end');
    console.log('end');
    process.exit();
})();
//# sourceMappingURL=app.js.map