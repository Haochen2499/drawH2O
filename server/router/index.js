const Router = require('koa-router');
const fs = require('fs')
const spider = require('../db/model/spider')
const resp = require('../utils/response')

const render = async path => {
  return new Promise((res, rej) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) rej(err)
      if (data) res(data)
    })
  })
}

const idx = new Router()
idx.get('/', async ctx => {
  ctx.body = await render('./view/index.html')
})

const order = new Router()
order.get('/', async ctx => {
  ctx.body = await render('./view/order.html')
})

const api = new Router()
api.get('/', ctx => {
  ctx.body = resp.res({name: 'hhc'})
})
api.get('/info/get_list', async ctx => {
  const {type} = ctx.query
  let res
  if (type) {
    res = await spider.getListBy(type)
  } else {
    res = await spider.getList()
  }
  ctx.body = resp.res(res)
})
api.get('/error', ctx => {
  ctx.body = resp.error()
})
api.post('/post_obj', async ctx => {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body
})
api.post('/post_form', async ctx => {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body
})


const router = new Router()

const useRouter = (path, route) => {
  router.use(path, route.routes(), route.allowedMethods())
}
useRouter('/', idx)
useRouter('/order', order)
useRouter('/api', api)

module.exports = router
