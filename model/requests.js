const { sequelize } = require('./sequelizeConfig')
const { Model, DataTypes } = require("sequelize")
class Requests extends Model { }

Requests.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    description: DataTypes.STRING,
    productId: DataTypes.INTEGER,
}, {
    modelName: "requests",
    sequelize,
})
Requests.sync();

module.exports = { Requests }     