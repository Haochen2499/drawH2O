const { sequelize } = require("../db");
const { Sequelize, Model } = require("sequelize");

class News extends Model {}

News.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cover_url: {
      type: Sequelize.STRING(255),
      comment: "封面图片",
    },
    url: {
      type: Sequelize.STRING(255),
      allowNull: false,
      comment: "新闻链接",
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
      comment: "新闻标题",
    },
    infoFrom: {
      type: Sequelize.STRING(20),
      allowNull: false,
      comment: "新闻来源",
    },
  },
  {
    sequelize,
    modelName: "news",
    tableName: "news",
  }
);

module.exports = News;
