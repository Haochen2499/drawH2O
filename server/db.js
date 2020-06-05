const Sequelize = require("sequelize");
const { host, user, password, database, port } = require("./config").database;

const sequelize = new Sequelize(database, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: false,
  timezone: "+08:00",
});

sequelize.sync({ force: false });

module.exports = {
  sequelize,
};
