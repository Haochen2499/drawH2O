const User = require("../models/user");
const md5 = require("md5");
const moment = require("moment");

module.exports = {
  async validateRegister(params) {
    const { email, userName, password } = params;
    if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
      return {
        msg: "邮箱格式不合法",
        type: "fail",
      };
    }
    if (!userName) {
      return {
        msg: "请输入用户名",
        type: "fail",
      };
    }
    if (userName.length > 20) {
      return {
        msg: "用户名长度需小于20个字符",
        type: "fail",
      };
    }
    if (!password || password.length < 8 || password.length > 20) {
      return {
        msg: "密码长度长度需在8到20之间",
        type: "fail",
      };
    }
    const isExist = await User.findOne({
      where: { email },
    });
    if (isExist) {
      return {
        msg: "该邮箱已被注册",
        type: "fail",
      };
    }
  },
  async validateLogin(password, user) {
    if (!user) {
      return {
        msg: "该用户不存在",
        type: "fail",
      };
    }
    if (user.password !== md5(password)) {
      return {
        msg: "密码错误",
        type: "fail",
      };
    }
  },
  async validateGetResetKey(user, email) {
    if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
      return {
        msg: "邮箱格式不合法",
        type: "fail",
      };
    }
    if (!user) {
      return { type: "fail", msg: "该用户不存在" };
    }
    const { resetKeyExpired } = user;
    const isNotExpired = resetKeyExpired && moment().isBefore(resetKeyExpired);
    if (isNotExpired) {
      return { type: "fail", msg: "请勿请求过于频繁，验证码10分钟内有效" };
    }
  },
  async validateResetPassword(user, params) {
    const { resetKeyExpired } = user;
    const { password, resetKey } = params;
    const isExpired = moment().isAfter(resetKeyExpired);
    if (isExpired) {
      return { type: "fail", msg: "验证码已过期，请重新获取验证码" };
    }
    if (!user) {
      return { type: "fail", msg: "该用户不存在" };
    }
    if (!user.resetKey) {
      return { type: "fail", msg: "请先获取验证码" };
    }
    if (resetKey !== user.resetKey) {
      return { type: "fail", msg: "验证码错误" };
    }
    if (!password || password.length < 8 || password.length > 20) {
      return {
        msg: "密码长度长度需在8到20之间",
        type: "fail",
      };
    }
  },
};
