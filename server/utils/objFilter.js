const fn = (params = {}, keyArr = []) => {
  let ret = {};
  keyArr.forEach((key) => {
    if (params.hasOwnProperty(key)) {
      ret[key] = params[key];
    }
  });
  return ret;
};
module.exports = fn;
