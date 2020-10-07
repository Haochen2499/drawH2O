const Router = require("koa-router");
const userDao = require("../dao/user");
const resp = require("../utils/response");

const user = new Router({ prefix: "/api/user" });

user.post("/register", async (ctx) => {
  const { email = "", userName = "", password = "" } = ctx.request.body;
  const res = await userDao.register({ email, userName, password });
  if (res.type === "fail") {
    ctx.body = resp.error(res);
  } else {
    ctx.body = resp.res();
    ctx.session.isLogged = true;
    ctx.session.userId = res.userId;
  }
});
user.post("/login", async (ctx) => {
  const { email = "", password = "" } = ctx.request.body;
  const res = await userDao.login({ email, password });
  if (res.type === "fail") {
    ctx.body = resp.error(res);
  } else {
    ctx.cookies.set("isLogin", 1, { httpOnly: false });
    ctx.body = resp.res();
    ctx.session.isLogged = true;
    ctx.session.userId = res.userId;
  }
});
user.get("/get", async (ctx) => {
  const id = ctx.query.id || ctx.session.userId;
  const res = await userDao.getUserInfo(id);
  if (res.type === "fail") {
    ctx.body = resp.error(res);
  } else {
    ctx.body = resp.res(res.data);
  }
});

user.post("/update", async (ctx) => {
  const id = ctx.session.userId;
  const res = await userDao.updateUserInfo(id, ctx.request.body);
  if (res.type === "success") {
    ctx.body = resp.res();
  } else {
    ctx.body = resp.error();
  }
});

user.post("/logout", async (ctx) => {
  const id = ctx.session.userId;
  if (!id) {
    ctx.body = resp.error();
  } else {
    ctx.cookies.set("isLogin", null);
    ctx.session.userId = null;
    ctx.session.isLogged = false;
    ctx.body = resp.res();
  }
});

user.post("/get_reset_key", async (ctx) => {
  const { email = "" } = ctx.request.body;
  const res = await userDao.getResetKey(email);
  if (res.type === "success") {
    ctx.body = resp.res();
  } else {
    ctx.body = resp.error(res);
  }
});

user.post("/reset_password", async (ctx) => {
  const params = ctx.request.body;
  const res = await userDao.resetPassword(params);
  if (res.type === "success") {
    ctx.body = resp.res();
  } else {
    ctx.body = resp.error(res);
  }
});

user.get("/articleList", async (ctx) => {
  const userId = ctx.query.id || ctx.session.userId;
  const res = await userDao.articleList(userId);
  ctx.body = resp.res(res);
});

module.exports = user;
