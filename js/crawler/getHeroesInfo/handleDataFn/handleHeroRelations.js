"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHeroRelations = void 0;
const handleHeroRelations = async ($) => {
    const heroRelations = [];
    $('.rela-list').each((i, elem) => {
        //获取标题
        const heroRelation = {
            title: $(`.rela-list>.tit2:nth-child(${i + 1})`).text(),
            list: [],
        };
        //填充list
        $(elem).each((i, elem) => {
            heroRelation.list.push({
                pic: $(elem).find('img').attr('src') || '',
                content: $(elem).find('p').text(),
            });
        });
        heroRelations.push(heroRelation);
    });
    return heroRelations;
};
exports.handleHeroRelations = handleHeroRelations;
//# sourceMappingURL=handleHeroRelations.js.map