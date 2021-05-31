"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuneModel = void 0;
const mongoose_1 = require("mongoose");
const __1 = require("..");
const RuneScheme = new mongoose_1.Schema({
    name: { type: String, unique: true },
    pic: String,
    buffs: [String],
});
const RuneModel = __1.mobaDbConnect.model('rune', RuneScheme, 'runes');
exports.RuneModel = RuneModel;
//# sourceMappingURL=rune.model.js.map