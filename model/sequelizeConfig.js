const { Sequelize } = require("sequelize");
const config = require("../config/dbConfig");

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect
    })

module.exports = { sequelize }