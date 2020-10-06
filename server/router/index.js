const Router = require("koa-router");
const resp = require("../utils/response");
const newsDao = require("../dao/news");
const fileStorage = require("../utils/fileStorage");

const user = require("./user");
const article = require("./article");

const api = new Router();
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

router.use("/api", api.routes());
router.use(article.routes());
router.use(user.routes());

module.exports = router;
