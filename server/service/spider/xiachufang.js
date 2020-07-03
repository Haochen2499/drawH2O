const cheerio = require("cheerio");
const fetch = require("../../utils/fetch");
const imageDownload = require("../../utils/imageDownload");

const xiachufang = async () => {
  const urls = [
    "http://www.xiachufang.com/explore/",
    "http://www.xiachufang.com/explore/?page=2",
    "http://www.xiachufang.com/explore/?page=3",
  ];
  let pages = await Promise.all(urls.map((item) => fetch.get(item)));
  let ret = [];
  let imgTask = [];
  pages.forEach((page) => {
    const data = page.data;
    const $ = cheerio.load(data);
    $(".recipe").each((idx, item) => {
      const imgUrl = $(item).find(".cover img").attr("data-src");
      ret.push({
        title: $(item).find(".info .name a").text().replace(/\n/g, "").trim(),
        url: `http://www.xiachufang.com${$(item)
          .find(".info .name a")
          .attr("href")}`,
        infoFrom: "xiachufang",
      });
      imgTask.push(imgUrl ? imageDownload(imgUrl) : null);
    });
  });
  let imgRes = await Promise.all(imgTask);
  imgRes.forEach((item, index) => {
    ret[index].cover_url = item;
  });
  return ret;
};
module.exports = xiachufang;
