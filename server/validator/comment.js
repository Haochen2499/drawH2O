const Comment = require("../models/comment");
const Article = require("../models/article");

module.exports = {
  async validateCreate(params) {
    const { content, articleId, parentId, creatorId } = params;
    if (!creatorId) {
      return {
        msg: "请先登录",
        type: "fail",
      };
    }
    if (!content) {
      return {
        msg: "评论内容不得为空",
        type: "fail",
      };
    }
    if (!articleId) {
      return {
        msg: "articleId 不能为空",
        type: "fail",
      };
    }
    const article = await Article.findOne({ where: { id: articleId } });
    if (!article) {
      return {
        msg: "文章不存在",
        type: "fail",
      };
    }
    if (parentId) {
      const parentComment = await Comment.findOne({ where: { id: parentId } });
      if (!parentComment) {
        return {
          msg: "评论不存在",
          type: "fail",
        };
      }
    }
  },
  async validateDelete(userId, comment) {
    if (!userId) {
      return {
        msg: "请先登录",
        type: "fail",
      };
    }
    if (!comment) {
      return {
        msg: "评论不存在",
        type: "fail",
      };
    }
    const article = await Article.findOne({ where: { id: comment.articleId } });
    if (userId !== comment.creatorId || userId !== article.authorId) {
      return {
        msg: "您没有操作该评论的权限",
        type: "fail",
      };
    }
  },
};
