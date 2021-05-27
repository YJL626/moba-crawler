"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeExcessPage = void 0;
async function closeExcessPage(browser, keepCount = 1) {
    const pages = await browser.pages();
    await Promise.allSettled(pages.map((page, i) => (keepCount > i ? null : page.close())));
}
exports.closeExcessPage = closeExcessPage;
//# sourceMappingURL=closeExcessPage.js.map