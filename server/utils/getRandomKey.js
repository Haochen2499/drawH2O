/**
 * 生成随机数
 * @param  {Number} length = 4
 */
const fn = (length = 4) => {
  let randomKey = "";
  for (let i = 0; i < length; i++) {
    let key = Math.floor(10 * Math.random());
    randomKey += key;
  }
  return randomKey;
};

module.exports = fn;
