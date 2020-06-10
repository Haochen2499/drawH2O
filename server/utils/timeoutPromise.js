module.exports = (promise, timeout = 5000) => {
  const timeoutPromise = new Promise((res) => {
    setTimeout(() => {
      res("timeout");
    }, timeout);
  });
  return Promise.race([promise, timeoutPromise]);
};
