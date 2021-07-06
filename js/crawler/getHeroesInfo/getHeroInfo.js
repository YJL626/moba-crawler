"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeroInfo = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const hero_model_1 = require("../../db/model/hero.model");
const config_1 = require("../../config");
const getHeroTargetUrl_1 = require("./handleDataFn/getHeroTargetUrl");
const handelAddPointRec_1 = require("./handleDataFn/handelAddPointRec");
const handelEquipmentRecs_1 = require("./handleDataFn/handelEquipmentRecs");
const getInfoPicUrl_1 = require("./handleDataFn/getInfoPicUrl");
const handelRunes_1 = require("./handleDataFn/handelRunes");
const handelSkills_1 = require("./handleDataFn/handelSkills");
const handelSkins_1 = require("./handleDataFn/handelSkins");
const handleCategories_1 = require("./handleDataFn/handleCategories");
const handleHeroRelations_1 = require("./handleDataFn/handleHeroRelations");
const handleLearnVideos_1 = require("./handleDataFn/handleLearnVideos");
const handleTips_1 = require("./handleDataFn/handleTips");
const saveToHero_1 = require("./handleDataFn/saveToHero");
async function getHeroInfo(index, browser) {
    const page = await browser.newPage();
    await page.emulate(config_1.iPhone);
    const heroInfoUrl = getHeroTargetUrl_1.getHeroInfoUrl(index);
    await page.goto(heroInfoUrl, config_1.pageOption);
    const htmlData = await page.content();
    const $ = cheerio_1.default.load(htmlData);
    const heroId = await saveToHero_1.saveToHero({
        name: $('.hero-name').text(),
        title: $('.hero-title').text(),
        categories: await handleCategories_1.handleCategories($('.hero-location').text()),
        index: index,
    }).catch(() => console.log('saveToHero ERROR'));
    if (!heroId) {
        console.log('id获取失败');
        return;
    }
    const heroDetailData = {
        heroId,
        score: {
            difficult: Number($('.cnver4').attr('class')?.slice(-1)) || 10,
            skill: Number($('.cnver3').attr('class')?.slice(-1)) || 10,
            attack: Number($('.cnver2').attr('class')?.slice(-1)) || 10,
            survive: Number($('.cnver1').attr('class')?.slice(-1)) || 10,
        },
        bgcPic: $('.header-hero>img').attr('src') || '',
        skins: await handelSkins_1.handleSkins($('.hero-skin').attr('href'), browser),
        heroVideo: $('.hero-video>a:nth-child(1)').attr('href') || '',
        skills: await handelSkills_1.handleSkills($),
        addPointRec: await handelAddPointRec_1.handleAddPointRec($),
        equipmentRecs: await handelEquipmentRecs_1.handleEquipmentRecs($),
        runes: await handelRunes_1.handleRunes($),
        tips: await handleTips_1.handleTips($),
        heroRelations: await handleHeroRelations_1.handleHeroRelations($),
        learnVideos: await handleLearnVideos_1.handleLearnVideos($),
        infoPic: await getInfoPicUrl_1.getInfoPicUrl(index),
    };
    await page.close();
    await saveToHeroDetail(heroDetailData).catch((err) => console.log(err));
}
exports.getHeroInfo = getHeroInfo;
async function saveToHeroDetail(heroDetail) {
    let document = await hero_model_1.HeroDetailModel.findOne({
        heroId: heroDetail.heroId,
    }).catch(() => console.log('HeroModel.findOne error'));
    if (document) {
        return document._id;
    }
    new hero_model_1.HeroDetailModel(heroDetail).save().catch((err) => console.log(err));
}
//# sourceMappingURL=getHeroInfo.js.map