const Router = require("koa-router");
const articleDao = require("../dao/article");
const resp = require("../utils/response");

const article = new Router({ prefix: "/api/article" });

article.get("/get", async (ctx) => {
  const { id } = ctx.query;
  const res = await articleDao.get(id);
  if (res.type === "success") {
    ctx.body = resp.res(res.data);
  } else {
    ctx.body = resp.error(res);
  }
});

article.post("/add", async (ctx) => {
  const { userId: authorId } = ctx.session;
  const params = { ...ctx.request.body, authorId };
  console.log(params);
  const res = await articleDao.add(params);
  if (res.type === "success") {
    ctx.body = resp.res();
  } else {
    ctx.body = resp.error(res);
  }
});

article.post("/modify", async (ctx) => {
  const { userId: authorId } = ctx.session;
  const params = { ...ctx.request.body, authorId };
  const res = await articleDao.modify(params);
  if (res.type === "success") {
    ctx.body = resp.res();
  } else {
    ctx.body = resp.error(res);
  }
});

module.exports = article;
