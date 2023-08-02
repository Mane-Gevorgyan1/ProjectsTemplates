const { sequelize } = require('./sequelizeConfig')
const { Model, DataTypes } = require("sequelize")
class Users extends Model { }

Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 3
    }
}, {
    modelName: "users",
    sequelize,
})
Users.sync()

module.exports = { Users }