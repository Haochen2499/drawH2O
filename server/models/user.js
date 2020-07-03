const { sequelize } = require("../db");
const { Sequelize, Model } = require("sequelize");
const md5 = require("md5");

class User extends Model {
  // 用于获取非敏感信息
  getUserInfo() {
    const { id, avatar, userName, email } = this;
    return { id, avatar, userName, email };
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    avatar: {
      type: Sequelize.STRING(50),
      comment: "头像",
    },
    userName: {
      type: Sequelize.STRING(30),
      allowNull: false,
      comment: "用户名",
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      comment: "email",
    },
    password: {
      type: Sequelize.STRING(32),
      allowNull: false,
      comment: "密码",
      set(val) {
        this.setDataValue("password", md5(val));
      },
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "user",
  }
);

module.exports = User;
