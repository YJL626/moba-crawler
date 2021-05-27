import { HeroModel } from '../../../db/model/hero.model'

const saveToHero = async ({
  name,
  title,
  index,
  categories,
}: {
  name: string
  title: string
  index: number
  categories: Array<string>
}): Promise<string | false> => {
  const result = await HeroModel.findOne({ name }).catch(() =>
    console.log('find error')
  )
  if (result) {
    return result._id
  }
  const heroImg = `//game.gtimg.cn/images/yxzj/img201606/heroimg/${index}/${index}.jpg`
  const heroData = { name, title, heroImg, categories }
  console.log(heroData)

  const model = new HeroModel(heroData)

  const document = await model.save()
  if (document) {
    return document._id
  } else {
    return false
  }
}

export { saveToHero }
