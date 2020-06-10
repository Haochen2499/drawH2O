const cheerio = require("cheerio");
const fetch = require("../../utils/fetch");

const weibo = async () => {
  let res = await fetch.get(
    "https://s.weibo.com/top/summary?Refer=top_hot&topnav=1&wvr=6"
  );
  let ret = [];
  const data = res.data;
  // fs.writeFileSync("example.html", data, "utf-8");
  const $ = cheerio.load(data);
  $(".td-02").each((idx, item) => {
    ret.push({
      title: $(item).find("a").text(),
      url: `https://s.weibo.com${$(item).find("a").attr("href")}`,
      infoFrom: "weibo",
    });
  });
  return ret;
};
module.exports = weibo;
