const response = {
  res: data => {
    return {
      error_code: 0,
      error_msg: '',
      data
    }
  },
  error: data => {
    const dt = data || {}
    const {code, msg} = dt
    return {
      error_code: code || -1,
      error_msg: msg || 'uncatched error'
    }
  }
}

module.exports = response