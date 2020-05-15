const axios = require('axios')

axios.defaults.headers.common['user-agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
module.exports = {
  get (url, params, headers) {
    return new Promise((resolve, reject) => {
      axios.get(url, {params, headers})
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },
  post (url, params, headers) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, {headers})
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },
}