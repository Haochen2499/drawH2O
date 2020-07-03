const fetch = require("../../utils/fetch");
const _ = require("lodash");
const imageDownload = require("../../utils/imageDownload");

const smzdm = async () => {
  const url = "https://post.smzdm.com/rank/json_more/?unit=1&p=1";
  const ret = [];
  const res = await fetch.get(url);
  const data = res.data.data;
  if (data) {
    let imgTask = [];
    data.forEach((item) => {
      ret.push({
        title: item.title,
        url: item.article_url,
        infoFrom: "smzdm",
      });
      imgTask.push(item.pic_url ? imageDownload(item.pic_url) : null);
    });
    let imgRes = await Promise.all(imgTask);
    imgRes.forEach((item, index) => {
      ret[index].cover_url = item;
    });
  }
  // console.log(ret);
  return ret;
};
// smzdm();

module.exports = smzdm;
