const Comment = require("../models/comment");
const validator = require("../validator/comment");
const User = require("../models/user");
const Article = require("../models/article");

const objFilter = require("../utils/objFilter");
const _ = require("lodash");

module.exports = {
  async create(params) {
    const v = await validator.validateCreate(params);
    if (v) return v;
    const { content, articleId, parentId, creatorId, replyUid } = params;
    const comment = new Comment({
      content,
      articleId,
      parentId,
      creatorId,
      replyUid,
    });
    try {
      await comment.save();
      return { type: "success" };
    } catch (e) {
      console.log(e);
      return { type: "fail", msg: "评论失败" };
    }
  },
  async delete(params) {
    const { userId, id } = params;
    const comment = await Comment.findOne({ where: { id } });
    const v = await validator.validateDelete(userId, comment);
    if (v) return v;
    try {
      await comment.destroy();
      return {
        type: "success",
      };
    } catch (e) {
      console.log(e);
      return {
        type: "fail",
        msg: "删除失败",
      };
    }
  },
  async getArticleComment(articleId) {
    console.log(articleId);
    const _comments = await Comment.findAll({
      where: { articleId },
      include: [
        {
          model: User,
          attributes: ["userName", "id", "avatar"],
          as: "creator",
        },
        {
          model: User,
          attributes: ["userName", "id", "avatar"],
          as: "replyTo",
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    let comments = [];
    _comments.forEach((item) => {
      const {
        id,
        content,
        parentId,
        replyTo,
        creator,
        createdAt,
        likes,
      } = item;
      const commentObj = {
        id,
        content,
        replyTo,
        creator,
        createdAt,
        likes,
        childComments: [],
      };
      if (!item.parentId) {
        comments.push(commentObj);
      } else {
        const fatherComment = _.find(
          comments,
          (comment) => comment.id === parentId
        );
        if (fatherComment) {
          fatherComment.childComments.push(commentObj);
        }
      }
    });
    return {
      type: "success",
      data: comments.reverse(),
    };
  },
};
