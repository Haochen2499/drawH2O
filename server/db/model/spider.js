const db = require("../utils/dbUtil");

const spider = {
  add: async (model) => {
    const res = await db.insertData("spider_info", model);
    return res;
  },
  getListBy: async (type) => {
    console.log(type);
    const res = await db.query(
      `SELECT * FROM spider_info where infoFrom = '${type}' order by create_time desc`
    );
    return res.map((item) => new spiderItem(item));
  },
  getList: async () => {
    const res = await db.query(
      `SELECT * FROM spider_info order by create_time desc`
    );
    return res.map((item) => new spiderItem(item));
  },
  addList: async (data) => {
    data.forEach(async (item) => {
      const isExist = (
        await db.query(`SELECT * FROM spider_info where url = '${item.url}'`)
      ).length;
      if (!isExist) {
        return await db.insertData("spider_info", item);
      }
    });
  },
};

class spiderItem {
  constructor(data) {
    this.cover_url = data.cover_url;
    this.title = data.title;
    this.type = data.infoFrom;
    this.url = data.url;
    this.create_time = data.create_time;
  }
}

module.exports = spider;
