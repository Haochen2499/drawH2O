module.exports = (cookie) => {
  const ret = {};
  const blocks = cookie.split(";");
  blocks.forEach((item) => {
    const pair = item.split("=");
    if (pair[1]) {
      ret[pair[0].trim()] = pair[1];
    }
  });
  return ret;
};
