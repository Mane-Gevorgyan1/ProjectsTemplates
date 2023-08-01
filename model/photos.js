const { sequelize } = require('./sequelizeConfig')
const { Model, DataTypes } = require("sequelize")
class Photos extends Model { }

Photos.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    productId: DataTypes.INTEGER
}, {
    modelName: "photos",
    sequelize,
})
Photos.sync()

module.exports = { Photos }   