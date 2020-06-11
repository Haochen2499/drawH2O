const cheerio = require("cheerio");
// const fs = require("fs");
const fetch = require("../../utils/fetch");
const imageStorage = require("../../utils/imageStorage");
const timeoutPromise = require("../../utils/timeoutPromise");

const zhihu = async () => {
  const cookie =
    '_zap=00e2bc59-664a-412f-8c14-a143ce4c77a6; d_c0="AJBVrP7GRBGPTkfWSpjgMDEiNGPcfr88d4Y=|1589453344"; capsion_ticket="2|1:0|10:1589453344|14:capsion_ticket|44:MGViYTlmNTVlMGNlNGU0ZjkzMGU1ZGQ1OTU5MWExZjk=|9e7192f495818e4f85761b24557df7e8a5fcc3776c9ed4359439d5133dbc2699"; _ga=GA1.2.1902947496.1589453345; _gid=GA1.2.914147163.1589453345; z_c0="2|1:0|10:1589453364|4:z_c0|92:Mi4xZUEtS0N3QUFBQUFBa0ZXc19zWkVFU1lBQUFCZ0FsVk5OSENxWHdDVWphSTNzMGRJQUNHd0tzbU5NY0V5d25BM3lB|6bcd36caf7354283846256f5fccf841f08be6e19441fb92087543e8bc3454e45"; tshl=; tst=h; _xsrf=5e926d43-5349-4720-a970-2064e7354b3b; SESSIONID=DoIjFocRBLLvCOyJ0l03HC8zJIz8HCmq1ya2tLORYaF; JOID=V18dC0nZV2JzBb3OJdTi9uIMLY45nzcrE0TQonecGSEFTPW1YJyl1SAAsMEvU5ToMlNfFxbMatDVPXmgdyzO0jk=; osd=VV8SB0jbV21_BL_OKtjj9OIDIY87nzgnEkbQrXudGyEKQPS3YJOp1CIAv80uUZTnPlJdFxnAa9LVMnWhdSzB3jg=; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1589445203,1589445224,1589509446,1589514627; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1589514627; KLBRSID=0a401b23e8a71b70de2f4b37f5b4e379|1589519792|1589519792; _gat_gtag_UA_149949619_1=1;_zap=73005f9e-9ff8-422e-83a0-597fdbbba367; _xsrf=b37a19ff-2ff9-44fc-a07a-b02bf960e733; KLBRSID=37f2e85292ebb2c2ef70f1d8e39c2b34|1589527511|1589527511';
  let res = await fetch.get("https://www.zhihu.com/hot", null, { cookie });
  let ret = [];
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
    imgTask.push(imgUrl ? imageStorage(imgUrl) : null);
  });
  let imgRes = await Promise.all(imgTask);
  imgRes.forEach((item, index) => {
    ret[index].cover_url = item;
  });
  return timeoutPromise(ret, 5000, []);
};
module.exports = zhihu;
