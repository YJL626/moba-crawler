"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEquipmentRecs = void 0;
const equipment_model_1 = require("../../../db/model/equipment.model");
const handleEquipmentRecs = async ($) => {
    const equipmentRecs = {
        smoothly: [''],
        hard: [''],
    };
    const smoothlyInfo = [];
    const hardlyInfo = [];
    $('.skills-build:not(.brn)>.build-list.equip-list>li').each((i, elem) => {
        smoothlyInfo.push({
            name: $(elem).find('.build-name').text(),
            pic: $(elem).find('img').attr('src') || '',
        });
    });
    $('.skills-build.brn>.build-list.equip-list>li').each((i, elem) => {
        hardlyInfo.push({
            name: $(elem).find('.build-name').text(),
            pic: $(elem).find('img').attr('src') || '',
        });
    });
    //保存后班会id
    equipmentRecs.smoothly = await saveToEquipment(smoothlyInfo);
    equipmentRecs.hard = await saveToEquipment(hardlyInfo);
    return equipmentRecs;
};
exports.handleEquipmentRecs = handleEquipmentRecs;
async function saveToEquipment(equipmentInfoList) {
    await equipment_model_1.EquipmentModel.createCollection();
    const idList = await Promise.allSettled(equipmentInfoList.map(async ({ name, pic }) => {
        let result = await equipment_model_1.EquipmentModel.findOne({ name: name });
        if (result)
            return result._id;
        const equipment = new equipment_model_1.EquipmentModel({ name, pic });
        result = await equipment.save();
        return result._id;
    })).then((result) => result.map((item) => {
        return item.value || '';
    }));
    return idList;
}
//# sourceMappingURL=handelEquipmentRecs.js.map