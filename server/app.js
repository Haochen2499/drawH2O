const Koa = require('koa');
const logger = require('./middleware/logger');
const bodyParser = require('koa-bodyparser')
const router = require('./router/index')
const static = require('koa-static')
const schedule = require('node-schedule');
const path = require('path');

const app = new Koa()
const port = 9527
console.log(path.join(__dirname, '../web/web/dist'));
app.use(logger)
app.use(bodyParser())
app.use(router.routes())
app.use(static(
  path.join(__dirname, '../web/web/dist')
), {
  index: 'rua'
})
// app.use(async ctx => {
//   ctx.body = 'hello world'
// })

app.listen(port)
console.log(`your server is deployed on ${port}`);