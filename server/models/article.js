const { sequelize } = require("../db");
const { Sequelize, Model } = require("sequelize");
const User = require("./user");

class Article extends Model {}

Article.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
      comment: "封面图片",
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: "标题",
    },
    desc: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "描述",
    },
    coverUrl: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "封面图片",
    },
    authorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: "作者Id",
    },
    isDraft: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      comment: "是否为草稿",
      defaultValue: false,
    },
    view: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
      comment: "阅读量",
    },
  },
  {
    sequelize,
    modelName: "article",
    tableName: "article",
  }
);
Article.belongsTo(User, {
  foreignKey: "authorId",
  as: "author",
});
// sequelize.sync({ alter: true });

module.exports = Article;
