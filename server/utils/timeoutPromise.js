module.exports = (promise, timeout = 5000, defaultVal) => {
  const timeoutPromise = new Promise((res) => {
    setTimeout(() => {
      res(defaultVal);
    }, timeout);
  });
  return Promise.race([promise, timeoutPromise]);
};
