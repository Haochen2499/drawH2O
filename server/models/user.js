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
    resetKey: {
      type: Sequelize.STRING(4),
      allowNull: true,
      comment: "重置密码验证码",
      set(val) {
        this.setDataValue("resetKey", val);
        // 过期时间1小时
        this.setDataValue(
          "resetKeyExpired",
          new Date(new Date().getTime() + 60 * 60 * 1000)
        );
      },
    },
    resetKeyExpired: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "重置验证码过期时间",
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "user",
  }
);

User.sync({ alter: true });

module.exports = User;
