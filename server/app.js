const Koa = require("koa");
const koaBody = require("koa-body");
const static = require("koa-static");
const session = require("koa-session");

const schedule = require("node-schedule");
const path = require("path");

const router = require("./router/index");
const logger = require("./middleware/logger");
const spiderTask = require("./service/spider/index");
const cleanTask = require("./service/spider/cleaner");

const port = 9527;
const session_config = {
  key: "koa:sess" /**  cookie的key。 (默认是 koa:sess) */,
  maxAge: 60 * 60 * 24 * 30 * 1000 /**  session 过期时间，30天 。*/,
  autoCommit: true /** 自动提交到响应头。(默认是 true) */,
  overwrite: true /** 是否允许重写 。(默认是 true) */,
  httpOnly: true /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */,
  signed: false /** 是否签名。(默认是 true) */,
  rolling: false /** 是否每次响应时刷新Session的有效期。(默认是 false) */,
  renew: false /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */,
};

const app = new Koa();

const Session = session(session_config, app);

// 使用中间件，注意有先后顺序
app.use(Session);

app.use(logger);
app.use(
  koaBody({
    multipart: true,
  })
);
app.use(router.routes());
app.use(router.allowedMethods());
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
