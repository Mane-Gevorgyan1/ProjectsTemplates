const { sequelize } = require('./sequelizeConfig')
const { Model, DataTypes } = require("sequelize")
class Products extends Model { }

Products.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    hasWebsite: DataTypes.BOOLEAN,
    hasApplication: DataTypes.BOOLEAN,
}, {
    modelName: "products",
    sequelize,
})
Products.sync();

module.exports = { Products }   