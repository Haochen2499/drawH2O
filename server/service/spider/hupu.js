const catcher = require("./catcher");

const hupu = async () => {
  const ret = [];
  const $ = await catcher("https://bbs.hupu.com/all-gambia");
  if ($) {
    $(".textSpan a").each((idx, item) => {
      ret.push({
        url: `https://bbs.hupu.com${$(item).attr("href")}`,
        title: $(item).children("span").text(),
        info_from: "hupu",
      });
    });
  }
  return ret;
};

module.exports = hupu;
