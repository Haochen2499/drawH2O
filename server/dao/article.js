const Article = require("../models/article");
const {
  validateAdd,
  validateModify,
  validateGet,
} = require("../validator/article");
const objFilter = require("../utils/objFilter");

module.exports = {
  // 获取
  async get(id) {
    const article = await Article.findOne({ where: { id: id } });
    const v = await validateGet(article);
    if (v) return v;
    return { type: "success", data: article };
  },
  // 新增
  async add(params) {
    const v = await validateAdd(params);
    if (v) return v;
    const article = new Article(params);
    await article.save();
    return { type: "success" };
  },
  // 修改
  async modify(params) {
    const article = await Article.findOne({ where: { id: params.id } });
    const v = await validateModify(article, params);
    if (v) return v;
    const _params = objFilter(params, ["title", "content", "desc", "coverUrl"]);
    try {
      console.log("params:", _params);
      await article.update(_params);
      return { type: "success" };
    } catch (e) {
      console.log(e);
      return { type: "fail", msg: "修改失败" };
    }
  },
};
