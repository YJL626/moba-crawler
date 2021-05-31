"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLearnVideos = void 0;
const handleLearnVideos = async ($) => {
    const videoInfos = [];
    $('.raiders-list.strategy-info>li').each((i, elem) => {
        videoInfos.push({
            title: $(elem).find('.vdbtn-right>p').text(),
            src: $(elem).find('a').attr('href') || '',
            pic: $(elem).find('img').attr('src') || '',
            createTime: $(elem).find('.rd-video-spr.rd-video-fre').text(),
            clickCount: $(elem).find('.rd-video-spr.rd-video-day').text(),
        });
    });
    return videoInfos;
};
exports.handleLearnVideos = handleLearnVideos;
//# sourceMappingURL=handleLearnVideos.js.map