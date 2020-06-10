const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "        ",
  database: "main",
  charset: "utf8mb4",
});

connection.connect();
const obj = {
  title: "芒果酸奶冰淇淋🥭🍦",
  url: "http://www.xiachufang.com/recipe/104692245/",
  cover_url:
    "http://i2.chuimg.com/6b82d41dd45f45c19824915362777ca8_3024w_3024h.jpg?imageView2/1/w/215/h/136/interlace/1/q/90",
  infoFrom: "xiachufang",
};
connection.query("insert into spider_info set ?", [obj], (err, res) => {
  if (err) throw err;
  console.log("res:", res);
});
connection.end();
