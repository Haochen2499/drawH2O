const fetch = require('../../utils/fetch')
const _ = require('lodash')

const fn = async() => {
  const url = 'https://www.toutiao.com/api/pc/feed/?category=news_hot&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A1158E1BBEF1386&cp=5EBEE1F31856CE1&_signature=.FZgVAAgEBDFqLLvQ8IA-vxXIUAAKLyKM55xWVkj1ZgpxWod8uQyyMPhjncQaPO.Th6gYPOZRC3OZ32GuONLuwx6z6.OoFwTfZxK9U-RVydZYhIKFMUayf.YogRkBolP9M3'
  const ret = []
  const res = await fetch.get(url);
  const data = res.data.data
  if (data) {
    _.forEach(data, item => {
      ret.push({
        title: item.title,
        url: `https://www.toutiao.com${item.source_url}`,
        cover: item.image_url && item.image_url.substring(2),
        info_from: 'toutiao'
      })
    })
  }
  return ret
}

module.exports = fn