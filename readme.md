

## crawler 爬虫

### 功能

爬取全部95个英雄详情,全部装备,铭文,以及近期800条公告

### 技术栈

使用puppeteer模拟用户用户真实请求与操作.获取真实dom树

使用cheerio对dom数据进行抓取

### 配置

#### 

```javascript
./config.json 配置MongoDB地址,以及爬虫参数
{
    dbSrc: string, //mongdb 地址 
    pageCount: number, //同时开启的页面数量,默认值为5
	isTest: string, // 空值为正常模式,其余任意值均为测试模式 测试模式仅会爬取一小部分数据,用于测试可用性  默认值为""空字符转
}
    
eg:{
  "dbSrc": "mongodb://localhost/moba",
  "pageCount": 5,
  "isTest": ""
}
有密码的 :
eg :{
    "dbSrc": 'mongodb://mobaAdmin:123456@localhost/moba',
  "pageCount": 5,
  "isTest": ""
}


```

### 项目运行

npm run get 获取数据

npm run drop-get 清空当前数据库之后,再获取数据

### 详情

schema 定义在 ./app/model/内

英雄详情均存储于herodetail 集合内,

herodetail 存储着heroId 通过id查询对应的英雄

装备和铭文,以及英雄的类型,保存指向对应的collection的id

news 存储着title,

newscontent 存储着对应的content 

腾讯视频播放地址是动态分配的失效很快,所以爬取的是播放地址,点击跳转到王者荣耀官网进行播放,

