module.exports = async (ctx, next) => {
  console.log("method:", ctx.method);
  console.log("host:", ctx.host);
  console.log("url", ctx.url);
  await next();
};
