"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iPhone = exports.isDrop = exports.isTest = exports.pageCount = exports.dbSrc = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer_1 = require("puppeteer");
const { dbSrc, pageCount = 4, isTest = '', } = require('../config.json');
exports.dbSrc = dbSrc;
exports.pageCount = pageCount;
exports.isTest = isTest;
//为true时清空数据再,获取数据
const isDrop = process.argv[2] === 'drop' ? true : false;
exports.isDrop = isDrop;
const iPhone = puppeteer_1.devices['iPhone 6'];
exports.iPhone = iPhone;
//# sourceMappingURL=config.js.map