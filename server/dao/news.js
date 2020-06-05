const News = require("../models/news");

module.exports = {
  // 新增
  async create(items) {
    let ret = [];
    items.forEach((item) => {
      const news = new News(item);
      ret.push(News.findOrCreate({ where: { url: news.url }, defaults: news }));
    });
    return await Promise.all(ret);
  },

  // 获取news列表
  async getList({ type, page, pageSize }) {
    const limit = pageSize || 20;
    const offset = (page - 1) * limit;
    if (type) {
      return News.findAndCountAll({ where: { infoFrom: type }, offset, limit });
    } else {
      return News.findAndCountAll({ offset, limit });
    }
  },
};
