const fetch = require("../../utils/fetch");
const _ = require("lodash");

const smzdm = async () => {
  const url = "https://post.smzdm.com/rank/json_more/?unit=1&p=1";
  const ret = [];
  const res = await fetch.get(url);
  const data = res.data.data;
  if (data) {
    _.forEach(data, (item) => {
      ret.push({
        title: item.title,
        url: item.article_url,
        cover_url: item.pic_url,
        info_from: "smzdm",
      });
    });
  }
  return ret;
};
module.exports = smzdm;
