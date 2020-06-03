const hupuSpider = require('./hupu')
const toutiaoSpider = require('./toutiao')
const ngaSpider = require('./nga')
const zhihuSpider = require('./zhihu')
const spiderModal = require('../../db/model/spider')

const fn = async () => {
  console.time('spiderAll')
  const [hupuRes, toutiaoRes, ngaRes, zhihuRes] = await Promise.all([
    hupuSpider(),
    toutiaoSpider(),
    ngaSpider(),
    zhihuSpider(),
  ])
  console.timeEnd('spiderAll')
  console.log(`获取虎扑条数: ${hupuRes.length}`);
  console.log(`获取头条条数: ${toutiaoRes.length}`);
  console.log(`获取NGA条数: ${ngaRes.length}`);
  console.log(`获取知乎条数: ${zhihuRes.length}`);
  console.time('insert db')
  await spiderModal.addList([...hupuRes, ...toutiaoRes, ...ngaRes, ...zhihuRes])
  console.timeEnd('insert db')
}

fn()
module.export = fn