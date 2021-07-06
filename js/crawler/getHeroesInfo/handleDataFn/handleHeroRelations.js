"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHeroRelations = void 0;
const handleHeroRelations = async ($) => {
    const heroRelations = [];
    const $rel = $('.panel:nth-last-child(1)');
    $rel.find('.tit2').each((index, elem) => {
        //获取标题
        const heroRelation = {
            title: $(elem).text(),
            list: [],
        };
        //填充list
        $rel.find(`.rela-list`).each((indey, elem) => {
            if (indey !== index)
                return;
            $(elem)
                .find('li')
                .each((i, li) => {
                heroRelation.list.push({
                    pic: $(li).find('img').attr('src') || '',
                    content: $(li).find('p').text(),
                });
            });
        });
        heroRelations.push(heroRelation);
    });
    return heroRelations;
};
exports.handleHeroRelations = handleHeroRelations;
//# sourceMappingURL=handleHeroRelations.js.map