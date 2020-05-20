const db = require('../utils/dbUtil')

const spider = {
  add: async model => {
    const res = await db.insertData('spider_info', model)
    return res
  },
  getList: async type => {
    const res = await db.findDataBy('spider_info', '*', `info_from = ${type}`)
    return res
  }
}

module.exports = spider