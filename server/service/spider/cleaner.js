const fs = require("fs");
const path = require("path");
const moment = require("moment");
const deleteFolder = require("../../utils/deleteFolder");

const imgDir = path.join(process.cwd(), "./server/static/spider-img");

const fn = () => {
  const dirs = fs.readdirSync(imgDir);
  console.log(dirs);
  dirs.forEach((name) => {
    const filePath = path.join(imgDir, name);
    const fileStat = fs.statSync(filePath);
    // 离现在时间大于5天为过期
    const isExpire =
      fileStat.isDirectory() &&
      moment().diff(moment(name)) > 60 * 60 * 24 * 5 * 1000;
    if (isExpire) {
      deleteFolder(filePath);
    }
  });
};

module.exports = fn;
