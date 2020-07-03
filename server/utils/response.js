const response = {
  res: (data = {}) => {
    return {
      error_code: 0,
      error_msg: "操作成功",
      data,
    };
  },
  error: (data = {}) => {
    const { code, msg } = data;
    return {
      error_code: code || -1,
      error_msg: msg || "操作失败",
    };
  },
};

module.exports = response;
