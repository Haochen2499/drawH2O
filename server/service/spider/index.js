const hupu = require("./hupu");
const toutiao = require("./toutiao");
const nga = require("./nga");
const zhihu = require("./zhihu");
const smzdm = require("./smzdm");
const weibo = require("./weibo");
const xiachufang = require("./xiachufang");
const spiderModal = require("../../db/model/spider");

const NewsDao = require("../../dao/news");

console.log("dao", NewsDao.create);
const fn = async () => {
  console.time("spiderAll");
  const resultList = [];
  const spiderList = [hupu, toutiao, nga, zhihu, smzdm, weibo, xiachufang];
  console.time("spiderAll");
  spiderList.forEach(async (task) => {
    let res = await task();
    resultList.push(res);
    console.log(`获取${task.name}条数：${res.length}`);
    if (resultList.length === spiderList.length) {
      console.timeEnd("spiderAll");
      saveToDB(resultList);
    }
  });
};

const saveToDB = async (data) => {
  console.time("insert db");
  // let done = 0;
  // data.forEach(async (item) => {
  //   await spiderModal.addList(item);
  //   done++;
  //   if (done === data.length) {
  //     console.timeEnd("insert db");
  //   }
  // });
  await NewsDao.create(data);
  console.time("insert db");
};

if (process.argv.indexOf("-t") !== -1) {
  console.log("isTest");
  fn();
}
module.export = fn;
