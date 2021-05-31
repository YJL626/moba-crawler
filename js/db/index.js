"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobaDbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
console.log('---');
const mobaDbConnect = mongoose_1.default.createConnection(config_1.dbSrc, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
exports.mobaDbConnect = mobaDbConnect;
if (config_1.isDrop) {
    console.log(config_1.isDrop);
    mobaDbConnect.dropDatabase();
}
mobaDbConnect.on('open', () => {
    console.log('db open');
});
//# sourceMappingURL=index.js.map