const Koa = require("koa");
const logger = require("./middleware/logger");
const bodyParser = require("koa-bodyparser");
const router = require("./router/index");
const static = require("koa-static");
const compress = require("koa-compress");
const schedule = require("node-schedule");
const path = require("path");
const spiderTask = require("./service/spider/index");
const cleanTask = require("./service/spider/cleaner");

const app = new Koa();
const port = 9527;
app.use(logger);
app.use(bodyParser());
app.use(router.routes());
app.use(compress({ threshold: 2048 }));
app.use(
  static(path.join(__dirname, "../web/web/dist"), {
    maxage: 30 * 24 * 60 * 60 * 1000,
  })
);
app.use(
  static(path.join(__dirname, "./static"), { maxage: 30 * 24 * 60 * 60 * 1000 })
);

// 整点跑爬虫任务
schedule.scheduleJob("0 0 * * * *", function () {
  spiderTask();
});

// 整天清理5天前的爬虫文件夹
schedule.scheduleJob("* * 0 * * *", function () {
  cleanTask();
});

app.listen(port);
console.log(`your server is deployed on ${port}`);
