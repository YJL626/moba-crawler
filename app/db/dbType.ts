interface heroDetail {
  heroId: string
  soccer: {
    difficult: number
    skill: number
    attack: number
    survive: number
  }
  bgcPic: string
  skins: Array<{ name: string; pic: string }>
  heroVideo: string
  infoPic: string
  skills: Array<{
    name: string
    pic: string
    info: string
    plusValue: string
  }>
  addPointRec: {
    main: { pic: string; name: string }
    secondary: { pic: string; name: string }
    summonerSpell: [
      { pic: string; name: string },
      { pic: string; name: string }
    ]
  }
  equipmentRecs: {
    smoothly: Array<string>
    hard: Array<string>
  }
  runes: string[]
  tips: Array<tip>
  heroRelations: Array<heroRelation>
  learnVideos: Array<videoInfo>
}
interface news {
  title: string
  src: string
  categories: string[]
  time: string
}
interface newsInFO {
  newsId: string
  content: string
}
type videoInfo = {
  title: string
  src: string
  pic: string
  createTime: string
  clickCount: string
}
type heroRelation = {
  title: string
  list: Array<{ pic: string; content: string }>
}
type rune = {
  name: string
  pic: string
  buffs: string[]
}
type tip = { title: string; content: string }
export { heroDetail, rune, tip, heroRelation, videoInfo, news, newsInFO }
