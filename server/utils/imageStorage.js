const fs = require("fs");
const imageDownload = require("image-download");
const imageType = require("image-type");
const path = require("path");
const moment = require("moment");
const timeoutPromise = require("./timeoutPromise");

const time = moment().format("YYYY-MM-DD");
console.log(moment());
console.log(time);
const imgDir = path.join(__dirname, `../static/spider-img/${time}`);

if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir);
}

const fn = async (url) => {
  const buffer = await timeoutPromise(imageDownload(url));
  if (!buffer) {
    return null;
  }
  const type = imageType(buffer);
  if (!["jpg", "jpeg", "gif", "png"].includes(type.ext)) {
    return null;
  }
  const randomNum = new Date().getTime() + Math.floor(Math.random() * 100000);
  const fileName = `${randomNum}.${type.ext}`;

  fs.writeFileSync(`${imgDir}/${fileName}`, buffer);
  return `/spider-img/${time}/${fileName}`;
};

module.exports = fn;
