/* eslint-disable @typescript-eslint/no-var-requires */
import { devices, WaitForOptions } from 'puppeteer'

const {
  dbSrc,
  pageCount = 4,
  isTest = '',
}: {
  dbSrc: string //数据地址const dbSrc = 'mongodb://mobaAdmin:123456@localhost/moba'
  pageCount: number //同时开启的页面数量
  isTest: string //测试时仅爬取部分数据进行测试.
} = require('../config.json')

//为true时清空数据再,获取数据
const isDrop = process.argv[2] === 'drop' ? true : false
const iPhone = devices['iPhone 6']
const pageOption:WaitForOptions = {
  timeout: 1000 * 2000,
  waitUntil: 'networkidle0',
}
export { dbSrc, pageCount, isTest, isDrop, iPhone, pageOption }
