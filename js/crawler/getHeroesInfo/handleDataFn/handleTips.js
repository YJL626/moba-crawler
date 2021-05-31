"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTips = void 0;
const handleTips = async ($) => {
    const tips = [];
    $('.panel.brt>.autom').each((i, elem) => {
        if ($(elem).find('.use-skills').length === 0)
            return;
        tips.push({
            title: $(elem).find('.tit1').text(),
            content: $(elem).find('.use-skills').text(),
        });
    });
    return tips;
};
exports.handleTips = handleTips;
//# sourceMappingURL=handleTips.js.map