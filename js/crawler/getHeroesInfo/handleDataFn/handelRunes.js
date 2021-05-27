"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRunes = void 0;
const rune_model_1 = require("../../../db/model/rune.model");
const handleRunes = async ($) => {
    const runeInfos = [];
    $('.rune-cont.c').each((i, elem) => {
        const runeInfo = {
            name: $(elem).find('.rp1').text(),
            pic: $(elem).find('img').attr('src') || '',
            buffs: [],
        };
        $(elem)
            .find('dd>p:not(.rp1)')
            .each((i, elem) => {
            const buffValue = $(elem).text();
            buffValue && runeInfo.buffs.push(buffValue);
        });
        runeInfos.push(runeInfo);
    });
    const idList = await saveToRunes(runeInfos);
    return idList;
};
exports.handleRunes = handleRunes;
async function saveToRunes(runeInfos) {
    const idList = await Promise.allSettled(runeInfos.map(async (runeInfo) => {
        let document = await rune_model_1.RuneModel.findOne({ name: runeInfo.name });
        if (document) {
            return document._id;
        }
        const model = new rune_model_1.RuneModel(runeInfo);
        document = await model.save();
        return document._id;
    })).then((item) => item.map((result) => result.value));
    return idList;
}
//# sourceMappingURL=handelRunes.js.map