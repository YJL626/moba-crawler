"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeroesInfo = void 0;
const config_1 = require("../../config");
const closeExcessPage_1 = require("../utils/closeExcessPage");
const getHeroInfo_1 = require("./getHeroInfo");
const getHeroIndexList_1 = require("./handleDataFn/getHeroIndexList");
const getHeroesInfo = async (browser) => {
    const heroIndexList = await getHeroIndexList_1.getHeroIndexList(browser);
    let runningList = [];
    /* await getHeroInfo(115, browser) */
    for (let i = 0; i < heroIndexList.length; i++) {
        if (config_1.isTest) {
            console.log('测试运行');
            await runningList.push(getHeroInfo_1.getHeroInfo(heroIndexList[i], browser));
            break;
        }
        console.log(`${i}`);
        runningList.push(getHeroInfo_1.getHeroInfo(heroIndexList[i], browser));
        // 向队列推入任务,达到预设数量后执行完成后再继续执行
        if (runningList.length >= config_1.pageCount) {
            await Promise.allSettled(runningList);
            await closeExcessPage_1.closeExcessPage(browser);
            runningList = [];
        }
    }
    await Promise.allSettled(runningList);
};
exports.getHeroesInfo = getHeroesInfo;
//# sourceMappingURL=index.js.map