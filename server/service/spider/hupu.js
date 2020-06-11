const fetch = require("../../utils/fetch");
const cheerio = require("cheerio");

const hupu = async () => {
  const ret = [];
  const res = await fetch.get("https://bbs.hupu.com/all-gambia");
  if (res.data) {
    const $ = await cheerio.load(res.data);
    $(".textSpan a").each((idx, item) => {
      ret.push({
        url: `https://bbs.hupu.com${$(item).attr("href")}`,
        title: $(item).children("span").text(),
        infoFrom: "hupu",
      });
    });
  }
  return ret;
};

module.exports = hupu;
