const Router = require("koa-router");
const fs = require("fs");
const resp = require("../utils/response");
const newsDao = require("../dao/news");
const userDao = require("../dao/user");
const fileStorage = require("../utils/fileStorage");

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
api.post("/user/login", async (ctx) => {
  const { email = "", password = "" } = ctx.request.body;
  const res = await userDao.login({ email, password });
  if (res.type === "fail") {
    ctx.body = resp.error(res);
  } else {
    ctx.body = resp.res();
    ctx.session.isLogged = true;
    ctx.session.userId = res.userId;
  }
});
api.get("/user/get", async (ctx) => {
  const id = ctx.session.userId;
  const res = await userDao.getUserInfo(id);
  if (res.type === "fail") {
    ctx.body = resp.error(res);
  } else {
    ctx.body = resp.res(res.data);
  }
});

api.post("/user/update", async (ctx) => {
  const id = ctx.session.userId;
  const res = await userDao.updateUserInfo(id, ctx.request.body);
  if (res.type === "success") {
    ctx.body = resp.res();
  } else {
    ctx.body = resp.error();
  }
});

api.post("/user/logout", async (ctx) => {
  const id = ctx.session.userId;
  if (!id) {
    ctx.body = resp.error();
  } else {
    ctx.session.userId = null;
    ctx.session.isLogged = false;
    ctx.body = resp.res();
  }
});

api.get("/error", (ctx) => {
  ctx.body = resp.error();
});
api.post("/post_obj", async (ctx) => {
  ctx.body = ctx.request.body;
});
api.post("/post_form", async (ctx) => {
  let str = "";
  console.log(ctx.request.body);
  ctx.body = ctx.request.body;
});
api.post("/upload/image", async (ctx) => {
  const file = ctx.request.files.file;
  if (file) {
    if (["jpg", "jpeg", "gif"].indexOf(file.type) !== -1) {
      ctx.body = resp.error({ msg: "图片格式非法" });
      return;
    }
    const res = await fileStorage(file);
    console.log(res);
    if (res.type === "success") {
      ctx.body = resp.res({ url: res.path });
    } else {
      ctx.body = resp.error({ msg: "上传失败" });
    }
  } else {
    ctx.body = resp.error({ msg: "必须上传一张图片" });
  }
});

const router = new Router();

const useRouter = (path, route) => {
  router.use(path, route.routes(), route.allowedMethods());
};
useRouter("/", idx);
useRouter("/order", order);
useRouter("/api", api);

module.exports = router;
