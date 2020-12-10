const cheerio = require("cheerio");
// const fs = require("fs");
const fetch = require("../../utils/fetch");
const imageDownload = require("../../utils/imageDownload");
const timeoutPromise = require("../../utils/timeoutPromise");

const zhihu = async () => {
  const cookie =
    '_zap=00e2bc59-664a-412f-8c14-a143ce4c77a6; d_c0="AJBVrP7GRBGPTkfWSpjgMDEiNGPcfr88d4Y=|1589453344"; _ga=GA1.2.1902947496.1589453345; _xsrf=QfengbgtYoUlgaqMo4UeZiA4PbctA7x4; q_c1=3e2b493bf66a4e068d4d6566da42bb0a|1603356513000|1589770685000; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1607496224,1607501000,1607586015; SESSIONID=pnkQIY29nWg55vMT3h8gLPNDb8UIUcSyYBl81v1Int0; JOID=W1gQAk-eCymYbJsQapaPOwd0RIV352BGzCjLJ1f9VUupXOBUO3La-c9olxFrpENBx3s0qq-f28UCevEp1KPZZkI=; osd=VlAWAkuTAy-YaJYYbJaLNg9yRIF672ZGyCXDIVf5WEOvXORZM3Ta_cJgkRFvqUtHx385oqmf38gKfPEt2avfZkY=; capsion_ticket="2|1:0|10:1607586185|14:capsion_ticket|44:YTlmM2FmNThlN2ZiNGE1N2FhZDAyNmExYjJiZmEwY2Y=|b55fd867baaa2fcd3e3781e6ead14b9a9efde6f1baf56a4f95a106470903de82"; z_c0="2|1:0|10:1607586186|4:z_c0|92:Mi4xZUEtS0N3QUFBQUFBa0ZXc19zWkVFU1lBQUFCZ0FsVk5paC1fWUFBbUFWQ2lDa1hFRUhrbmZ4bHNxT2xtNHNqWlN3|72b4a3300fe20301566365e682fab5db69209e2b41019cf472a519a1f1077738"; unlock_ticket="AEBmL63eCQ4mAAAAYAJVTZLY0V96EXUnLm3AeHQemV5d80Lel1Usgw=="; tshl=; tst=h; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1607586189; KLBRSID=fb3eda1aa35a9ed9f88f346a7a3ebe83|1607586190|1607586014';
  let res = await timeoutPromise(
    fetch.get("https://www.zhihu.com/hot", null, { cookie })
  );
  let ret = [];
  if (res) {
    const imgTask = [];
    const data = res.data;
    // fs.writeFileSync("example.html", data, "utf-8");
    const $ = cheerio.load(data);
    $(".HotItem").each((idx, item) => {
      const imgUrl = $(item).find(".HotItem-img img").attr("src");
      ret.push({
        title: $(item).find(".HotItem-title").text(),
        url: $(item).find(".HotItem-content a").attr("href"),
        infoFrom: "zhihu",
      });
      imgTask.push(imgUrl ? imageDownload(imgUrl) : null);
    });
    let imgRes = await Promise.all(imgTask);
    imgRes.forEach((item, index) => {
      ret[index].cover_url = item;
    });
  }
  return ret;
};
module.exports = zhihu;
