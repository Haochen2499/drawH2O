const sa = require("superagent");
require("superagent-charset")(sa);

const cheerio = require("cheerio");

const nga = async () => {
  const url = "https://bbs.nga.cn/thread.php?fid=-7";
  const cookie =
    "UM_distinctid=1715dfdd8eb454-0802fdd5d8d1af-153d6554-1aeaa0-1715dfdd8ec9da; CNZZDATA30039253=cnzz_eid%3D1247214783-1586418069-%26ntime%3D1586418069; taihe_bi_sdk_uid=4293f6904184ec2f63bda4078c38c2b8; taihe=075ef7766957280a2ad2c005046ea29f; UM_distinctid=17212d268703cc-0e9a2dac9678fa-30647d01-1aeaa0-17212d268716f4; ngacn0comUserInfo=hhcnb%09hhcnb%0939%0939%09%0910%090%094%090%090%09; ngaPassportUid=61569216; ngaPassportUrlencodedUname=hhcnb; ngaPassportCid=X8tiraees5fm60g3va705ol96pmeajm1r0f4ebch; ngacn0comUserInfoCheck=13923913bc5e9f5b563685cb400a5a81; ngacn0comInfoCheckTime=1589525421; taihe_bi_sdk_session=9b514491416425559edc7cbf84c72a1f; CNZZDATA30043604=cnzz_eid%3D1091679354-1586415710-%26ntime%3D1589521198; lastpath=/thread.php?fid=-7&page=2; lastvisit=1589525591; bbsmisccookies=%7B%22uisetting%22%3A%7B0%3A1%2C1%3A1589859406%7D%2C%22pv_count_for_insad%22%3A%7B0%3A-44%2C1%3A1589562058%7D%2C%22insad_views%22%3A%7B0%3A1%2C1%3A1589562058%7D%7D; _cnzz_CV30043604=forum%7Cfid-7%7C0";

  const res = await sa.get(url).charset("gbk").set({
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36",
    Cookie: cookie,
  });
  const ret = [];
  if (res) {
    const $ = cheerio.load(res.text);
    $(".topic").each((idx, item) => {
      ret.push({
        title: $(item).text(),
        url: `'https://bbs.nga.cn${$(item).attr("href")}`,
        info_from: "nga",
      });
    });
  }
  return ret;
};

module.exports = nga;
