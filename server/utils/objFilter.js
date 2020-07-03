const _ = require("lodash");
const fn = (params = {}, keyArr = []) => {
  let ret = _.cloneDeep(params);
  const keys = Object.keys(ret);
  keys.forEach((key) => {
    if (_.includes(keyArr, key)) {
      delete ret[key];
    }
  });
  return ret;
};
module.exports = fn;
