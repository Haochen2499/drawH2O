const Article = require("./models/article");

const fn = async () => {
  const res = await Article.findAll();
  console.log(res);
};

fn();
