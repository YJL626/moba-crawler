"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSkins = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const config_1 = require("../../../config");
const handleSkins = async (src, browser) => {
    if (!src)
        return [];
    const page = await browser.newPage();
    src = src.replace(/^\/\//, 'http://');
    await page.goto(src, config_1.pageOption);
    const html = await page.content();
    const $ = cheerio_1.default.load(html);
    const result = [];
    $('[data-title]').each((i, elem) => {
        const name = elem.attribs['data-title'];
        const pic = elem.attribs['src'];
        result.push({ name, pic });
    });
    page.close();
    return result;
};
exports.handleSkins = handleSkins;
//# sourceMappingURL=handelSkins.js.map