"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getHeroesInfo_1 = require("./crawler/getHeroesInfo");
const puppeteer_1 = __importDefault(require("puppeteer"));
const closeExcessPage_1 = require("./crawler/utils/closeExcessPage");
const getNews_1 = require("./crawler/getNews");
const db_1 = require("./db");
db_1.mobaDbConnect;
(async () => {
    const browser = await puppeteer_1.default.launch({
        headless: false,
    });
    console.log(process.argv);
    await getHeroesInfo_1.getHeroesInfo(browser);
    /* hero end */
    await closeExcessPage_1.closeExcessPage(browser, 1);
    await getNews_1.getNews(browser);
    /* news end */
    console.log('end');
    process.exit();
})();
//# sourceMappingURL=app.js.map