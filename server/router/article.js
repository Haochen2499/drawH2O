const Router = require("koa-router");
const articleDao = require("../dao/article");
const commentDao = require("../dao/comment");
const resp = require("../utils/response");

const article = new Router({ prefix: "/api/article" });

article.get("/get", async (ctx) => {
  const { id } = ctx.query;
  const { userId } = ctx.session;
  const res = await articleDao.get(id, userId);
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
article.post("/delete", async (ctx) => {
  const { userId: authorId } = ctx.session;
  const params = { ...ctx.request.body, authorId };
  const res = await articleDao.delete(params);
  if (res.type === "success") {
    ctx.body = resp.res();
  } else {
    ctx.body = resp.error(res);
  }
});

article.post("/createComment", async (ctx) => {
  const { userId: creatorId } = ctx.session;
  const params = { ...ctx.request.body, creatorId };
  const res = await commentDao.create(params);
  if (res.type === "success") {
    ctx.body = resp.res();
  } else {
    ctx.body = resp.error(res);
  }
});

article.post("/deleteComment", async (ctx) => {
  const { userId } = ctx.session;
  const params = { ...ctx.request.body, userId };
  const res = await commentDao.delete(params);
  if (res.type === "success") {
    ctx.body = resp.res();
  } else {
    ctx.body = resp.error(res);
  }
});

article.get("/getComment", async (ctx) => {
  const { articleId } = ctx.query;
  const res = await commentDao.getArticleComment(articleId);
  if (res.type === "success") {
    ctx.body = resp.res(res.data);
  } else {
    ctx.body = resp.error(res);
  }
});

module.exports = article;
