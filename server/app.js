const Koa = require('koa');
const logger = require('./middleware/logger');
const bodyParser = require('koa-bodyparser')
const schedule = require('node-schedule');

const app = new Koa()
const port = 9527

app.use(logger)
app.use(bodyParser())
app.use(async ctx => {
  ctx.body = 'hello world'
})

app.listen(port)
console.log(`your server is deployed on ${port}`);