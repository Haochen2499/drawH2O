const Router = require("koa-router");
const fs = require("fs");
const resp = require("../utils/response");
const newsDao = require("../dao/news");
const userDao = require("../dao/user");

const render = async (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) rej(err);
      if (data) res(data);
    });
  });
};

const idx = new Router();
idx.get("/", async (ctx) => {
  ctx.body = await render("./view/index.html");
});

const order = new Router();
order.get("/", async (ctx) => {
  ctx.body = await render("./view/order.html");
});

const api = new Router();
api.get("/", (ctx) => {
  ctx.body = resp.res({ name: "hhc" });
});
api.get("/info/get_list", async (ctx) => {
  const { type, page, pageSize } = ctx.query;
  if (!type) {
    ctx.body = resp.error({
      msg: "type is required",
    });
    return;
  }
  const res = await newsDao.getList({ type, page, pageSize });
  ctx.body = resp.res(res);
});
api.post("/user/register", async (ctx) => {
  const { email, userName, password } = ctx.query;
  const res = await userDao.register({ email, userName, password });
  console.log(res);
  if (res.type === "fail") {
    ctx.body = resp.error(res);
  } else {
    ctx.body = resp.res();
  }
});
api.post("/user/login", async (ctx) => {
  const { email, password } = ctx.query;
  const res = await userDao.login({ email, password });
  if (res.type === "fail") {
    ctx.body = resp.error(res);
  } else {
    ctx.body = resp.res();
    ctx.session.isLogged = true;
    ctx.session.userId = res.userId;
  }
});
api.get("/error", (ctx) => {
  console.log(ctx.session.views);
  ctx.body = resp.error();
});
api.post("/post_obj", async (ctx) => {
  ctx.body = ctx.request.body;
});
api.post("/post_form", async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body;
});

const router = new Router();

const useRouter = (path, route) => {
  router.use(path, route.routes(), route.allowedMethods());
};
useRouter("/", idx);
useRouter("/order", order);
useRouter("/api", api);

module.exports = router;
