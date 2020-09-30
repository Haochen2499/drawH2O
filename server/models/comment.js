const { sequelize } = require("../db");
const { Sequelize, Model } = require("sequelize");
const User = require("./user");
const Article = require("./article");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: "回复内容",
    },
    parentId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "上级评论ID",
    },
    likes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: "赞数",
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "comment",
    tableName: "comment",
  }
);
Comment.belongsTo(User, {
  foreignKey: "creatorId",
  as: "creator",
});
Comment.belongsTo(User, {
  foreignKey: "replyUid",
  as: "replyTo",
});
Comment.belongsTo(Article, {
  foreignKey: "articleId",
});

// Comment.sync({ force: true });

module.exports = Comment;
