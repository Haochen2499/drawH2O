const response = {
  res: (data = {}) => {
    return {
      error_code: 0,
      error_msg: "success",
      data,
    };
  },
  error: (data = {}) => {
    const { code, msg } = data;
    return {
      error_code: code || -1,
      error_msg: msg || "uncatched error",
    };
  },
};

module.exports = response;
