const User = require("../models/user");
const Article = require("../models/article");
const {
  validateRegister,
  validateLogin,
  validateGetResetKey,
  validateResetPassword,
} = require("../validator/user");
const getRandomKey = require("../utils/getRandomKey");
const { sendMail } = require("../service/mailer");

module.exports = {
  async register(params) {
    const v = await validateRegister(params);
    const user = new User(params);
    if (v) return v;
    await user.save();
    return { type: "success", userId: user.id };
  },
  async login(params) {
    const user = await User.findOne({ where: { email: params.email } });
    const v = await validateLogin(params.password, user);
    if (v) return v;
    return { type: "success", userId: user.id };
  },
  async getUserInfo(id) {
    if (!id) {
      return { type: "fail", msg: "请先登录" };
    }
    const user = await User.findOne({ where: { id } });
    if (user) {
      return { type: "success", data: user.getUserInfo() };
    } else {
      return { type: "fail", msg: "无此用户" };
    }
  },

  async updateUserInfo(id, params) {
    if (!id) {
      return { type: "fail", msg: "请先登录" };
    }
    const { avatar, userName } = params;
    try {
      const user = await User.findOne({ where: { id } });
      if (avatar) {
        user.avatar = avatar;
      }
      if (userName) {
        user.userName = userName;
      }
      await user.save();
    } catch (e) {
      console.log(e);
      return { type: "fail" };
    }
    return { type: "success" };
  },

  async getResetKey(email) {
    const user = await User.findOne({ where: { email } });
    const v = await validateGetResetKey(user, email);
    if (v) return v;
    const resetKey = getRandomKey(4);
    user.resetKey = resetKey;
    try {
      await sendMail({
        to: email,
        subject: "重置密码",
        text: `您的重置密码验证码为 ${resetKey}，有效期为10分钟。如果这并非您本人的操作，请检查账户安全性。`,
      });
      await user.save();
    } catch (e) {
      console.log(e);
      res = { type: "fail", msg: "邮件发送失败" };
    }
    return { type: "success" };
  },
  async resetPassword(params) {
    const user = await User.findOne({ where: { email: params.email } });
    const v = await validateResetPassword(user, params);
    if (v) return v;
    user.password = params.password;
    user.resetKey = null;
    user.resetKeyExpired = null;
    await user.save();
    return { type: "success" };
  },
  async articleList(authorId) {
    const { rows, count } = await Article.findAndCountAll({
      where: { authorId },
      order: [["createdAt", "DESC"]],
    });
    return { list: rows, count };
  },
};
