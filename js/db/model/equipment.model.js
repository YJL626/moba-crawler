"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const equipmentScheme = new mongoose_1.Schema({
    name: { type: String, unique: true },
    pic: String,
});
const EquipmentModel = __1.mobaDbConnect.model('equipment', equipmentScheme, 'equipments');
exports.EquipmentModel = EquipmentModel;
//# sourceMappingURL=equipment.model.js.map