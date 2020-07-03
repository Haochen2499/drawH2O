const User = require("../models/user");
const md5 = require("md5");

module.exports = {
  async validateRegister(data) {
    const { email, userName, password } = data;
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
  async validateLogin(data) {
    const { email, password } = data;
    const account = await User.findOne({ where: { email } });
    if (!account) {
      return {
        msg: "该用户不存在",
        type: "fail",
      };
    }
    if (account.password !== md5(password)) {
      return {
        msg: "密码错误",
        type: "fail",
      };
    }
  },
};
