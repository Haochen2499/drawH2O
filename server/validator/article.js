const Article = require("../models/article");

module.exports = {
  async validateAdd(params) {
    const { authorId, title, content } = params;
    if (!authorId) {
      return {
        msg: "请先登录",
        type: "fail",
      };
    }
    if (!title) {
      return {
        msg: "标题不能为空",
        type: "fail",
      };
    }
    if (!content) {
      return {
        msg: "内容不能为空",
        type: "fail",
      };
    }
  },
  async validateModify(article, params) {
    const { authorId, title, content } = params;
    if (!authorId) {
      ctx.body = resp.error({ msg: "请先登录" });
      return;
    }
    if (!article) {
      return {
        type: "fail",
        msg: "文章不存在",
      };
    }
    if (params.authorId !== article.authorId) {
      return {
        type: "fail",
        msg: "您没有修改该文章的权限",
      };
    }
    if (!title) {
      return {
        msg: "标题不能为空",
        type: "fail",
      };
    }
    if (!content) {
      return {
        msg: "内容不能为空",
        type: "fail",
      };
    }
  },
  async validateGet(article) {
    if (!article) {
      return {
        type: "fail",
        msg: "文章不存在",
      };
    }
  },
};
