const News = require("../models/news");

module.exports = {
  // 新增
  async create(items) {
    let ret = [];
    items.forEach(async (item) => {
      const news = new News(item);
      const isExsit = await News.findOne({ where: { url: news.url } });
      if (!isExsit) {
        ret.push(news.save());
      }
    });
    return await Promise.all(ret);
  },

  // 获取news列表
  async getList({ type, page, pageSize }) {
    const limit = +pageSize || 20;
    const offset = page ? (page - 1) * limit : 0;
    if (type) {
      let { count, rows } = await News.findAndCountAll({
        where: { infoFrom: type },
        offset,
        limit,
      });
      return { list: rows, count };
    } else {
      let { count, rows } = await News.findAndCountAll({ offset, limit });
      return { list: rows, count };
    }
  },
};
