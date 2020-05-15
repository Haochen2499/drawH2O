const sa = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const puppeteer = require('puppeteer');

const cookieParser = (str, domain) => {
  const ret = []
  const pair = str.split(';')
  pair.forEach(item => {
    const [name, value] = item.split('=')
    ret.push({name: name.trim(), value, domain})
  })
  console.log(ret);
  return ret
}

const fn = async (url, options) => {
  const _option = {
    usePuppeteer: false,
    cookie: '',
    ...options
  }
  const {usePuppeteer, cookie} = _option
  if (!usePuppeteer) {
    const res = await sa
    .get(url)
    .set('User-Agent', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36')
    .set('Cookie', cookie)
    if (!res) {
      console.log(`Get ${url} info failed`);
      return
    }
    fs.writeFileSync('example.html', res.text, 'utf-8')
    return cheerio.load(res.text)
  } else {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    page.on('request', req => {
      if (req.url() === 'https://www.zhihu.com/hot') {
        console.log(req);
      }
    })
    if (cookie) {
      await page.setExtraHTTPHeaders({"Cookie": cookie})
    }
    await page.goto(url);
    const pageData = await page.evaluate(() => {
      return document.body.innerHTML
    })
    fs.writeFileSync('example.html', pageData, 'utf-8')
    await page.screenshot({path: 'example.png', clip: {x: 0, y: 0,width: 1000, height: 1000}});
    await browser.close();
    return cheerio.load(pageData)
  }
}

module.exports = fn