const cheerio = require("cheerio");
const fetch = require("../../utils/fetch");

const xiachufang = async () => {
  const urls = [
    "http://www.xiachufang.com/explore/",
    "http://www.xiachufang.com/explore/?page=2",
    "http://www.xiachufang.com/explore/?page=3",
  ];
  let pages = await Promise.all(urls.map((item) => fetch.get(item)));
  let ret = [];
  pages.forEach((page) => {
    const data = page.data;
    const $ = cheerio.load(data);
    $(".recipe").each((idx, item) => {
      ret.push({
        title: $(item).find(".info .name a").text().replace(/\n/g, "").trim(),
        url: `http://www.xiachufang.com${$(item)
          .find(".info .name a")
          .attr("href")}`,
        cover_url: $(item).find(".cover img").attr("data-src"),
        info_from: "xiachufang",
      });
      // console.log(
      //   $(item).find(".info .name a").text().replace(/\n/g, "").trim()
      // );
    });
  });
  // return ret;
  return ret;
};
if (process.argv.indexOf("-t") !== -1) {
  console.log("isTest");
  xiachufang();
}
module.exports = xiachufang;
