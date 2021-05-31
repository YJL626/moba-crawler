"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomeBanners = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const config_1 = require("../../config");
const db_1 = require("../../db");
const banner_model_1 = require("../../db/model/banner.model");
const handleCategory_1 = require("./handleCategory");
const getHomeBanners = async (browser) => {
    const page = await browser.newPage();
    await page.emulate(config_1.iPhone);
    await page.goto('https://pvp.qq.com/m/');
    const html = await page.content();
    const $ = cheerio_1.default.load(html);
    const banners = [];
    /* $each 不支持异步推入到elems之中执行 */
    const elems = [];
    $('[exposure-tag="banner,banner轮播图"]>ul  .slide-item').each((i, elem) => {
        elems.push(elem);
    });
    await Promise.allSettled(elems.map(async (elem, index) => {
        banners.push({
            pic: $(elem).find('img').attr('src') || '',
            name: index + '',
            index,
            src: $(elem).find('a').attr('href') || 'https://pvp.qq.com/m/',
            category: await handleCategory_1.handleCategory('homeBanner'),
        });
    }));
    if ((await banner_model_1.BannerModel.find()).length) {
        await db_1.mobaDbConnect.dropCollection('banners');
    }
    await banner_model_1.BannerModel.insertMany(banners).catch((err) => {
        console.log(err);
        process.exit();
    });
};
exports.getHomeBanners = getHomeBanners;
//# sourceMappingURL=index.js.map