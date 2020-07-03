const fs = require("fs");
const path = require("path");

const uploadDir = path.join(process.cwd(), "./server/static/upload");

const fn = async (file) => {
  const randomNum = new Date().getTime() + Math.floor(Math.random() * 100000);
  const { name, path } = file;
  const ext = name.split(".")[1];
  const fileName = `${randomNum}.${ext}`;
  const filePath = `${uploadDir}/${fileName}`;
  const rs = fs.createReadStream(path);
  const ws = fs.createWriteStream(filePath);
  rs.pipe(ws);
  const promise = new Promise((res, rej) => {
    ws.on("finish", () => {
      fs.unlinkSync(path);
      res({ type: "success", path: `/static/upload/${fileName}` });
    });
    ws.on("error", (e) => {
      console.log(e);
      rej({ type: "failed" });
    });
  });
  let ret;
  try {
    ret = await promise;
  } catch (e) {
    console.log(e);
    ret = e;
  }
  return ret;
};

module.exports = fn;
