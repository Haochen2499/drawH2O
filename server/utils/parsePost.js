module.exports =  {
  obj: ctx => new Promise((res, rej) => {
    try {
      let postData = ''
      ctx.req.addListener('data', data => postData += data)
      ctx.req.addListener('end', () => {
        res(JSON.parse(postData.toString()))
      })
    } catch (e) {
      rej(e)
    }
  }),
  formData: ctx => new Promise((res, rej) => {
    try {
      let postData = ''
      ctx.req.addListener('data', data => postData += data)
      ctx.req.addListener('end', () => {
        let ret = {}
        postData
          .toString()
          .split('&')
          .forEach(item => {
            const pair = item.split('=')
            ret[pair[0]] = pair[1]
          })
        res(ret)
      })
    } catch (e) {
      rej(e)
    }
  })
}