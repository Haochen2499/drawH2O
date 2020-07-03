const User = require("../models/user");
const { validateRegister, validateLogin } = require("../validator/user");
const objFilter = require("../utils/objFilter");

class userInfo {
  constructor(data) {
    const { id, userName, avatar, email } = data;
    this.id = id;
    this.userName = userName;
    this.avatar = avatar;
    this.email = email;
  }
}

module.exports = {
  async register(params) {
    const v = await validateRegister(params);
    if (v) return v;
    const user = new User(params);
    await user.save();
    return { type: "success", userId: user.id };
  },
  async login(params) {
    const v = await validateLogin(params);
    if (v) return v;
    const user = await User.findOne({ where: { email: params.email } });
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
};
