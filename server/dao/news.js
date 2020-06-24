const News = require("../models/news");
const Op = require("sequelize").Op;

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
    return await Promise.all(ret).catch((e) => console.log(e));
  },

  // 获取news列表
  async getList({ type, page, pageSize }) {
    console.log(News.findOne);
    const limit = +pageSize || 20;
    const offset = page ? (page - 1) * limit : 0;
    if (type) {
      let { count, rows } = await News.findAndCountAll({
        where: {
          infoFrom: type,
          createdAt: {
            // 只获取5天内的内容
            [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000 * 5),
          },
        },
        offset,
        limit,
        order: [["createdAt", "DESC"]],
      });
      return { list: rows, count };
    } else {
      let { count, rows } = await News.findAndCountAll({
        where: {
          createdAt: {
            // 只获取5天内的内容
            [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000 * 5),
          },
        },
        offset,
        limit,
        order: [["createdAt", "DESC"]],
      });
      return { list: rows, count };
    }
  },
};
