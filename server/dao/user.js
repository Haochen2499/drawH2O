const User = require("../models/user");
const { validateRegister, validateLogin } = require("../validator/user");

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
};
