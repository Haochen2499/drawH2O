const Koa = require("koa");
const logger = require("./middleware/logger");
const bodyParser = require("koa-bodyparser");
const router = require("./router/index");
const static = require("koa-static");
const schedule = require("node-schedule");
const path = require("path");
const spiderTask = require("./service/spider/index");

const app = new Koa();
const port = 9527;
app.use(logger);
app.use(bodyParser());
app.use(router.routes());
app.use(static(path.join(__dirname, "../web/web/dist")));
app.use(static(path.join(__dirname, "./static")));

// 整点跑爬虫任务
schedule.scheduleJob("0 0 * * * *", function () {
  spiderTask();
});

app.listen(port);
console.log(`your server is deployed on ${port}`);
