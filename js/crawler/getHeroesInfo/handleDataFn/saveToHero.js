"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToHero = void 0;
const hero_model_1 = require("../../../db/model/hero.model");
const saveToHero = async ({ name, title, index, categories, }) => {
    const result = await hero_model_1.HeroModel.findOne({ name }).catch(() => console.log('find error'));
    if (result) {
        return result._id;
    }
    const heroImg = `//game.gtimg.cn/images/yxzj/img201606/heroimg/${index}/${index}.jpg`;
    const heroData = { name, title, heroImg, categories };
    console.log(heroData);
    const model = new hero_model_1.HeroModel(heroData);
    const document = await model.save();
    if (document) {
        return document._id;
    }
    else {
        return false;
    }
};
exports.saveToHero = saveToHero;
//# sourceMappingURL=saveToHero.js.map