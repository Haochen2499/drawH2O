const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '        ',
  database: 'main'
})

connection.connect()
connection.query('SELECT ?? FROM ??', [['cover_url', 'url', 'title'], 'spider_info'], (err, res) => {
  if (err) throw err
  console.log('res:', res);
})
connection.end()