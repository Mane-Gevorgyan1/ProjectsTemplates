const { Model, DataTypes } = require("sequelize")
const { sequelize } = require('./sequelizeConfig')


class ProductCategories extends Model { }
ProductCategories.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    categoryId: DataTypes.STRING,
    productId: DataTypes.STRING,

}, {

    modelName: "productcategories",
    sequelize,
})
ProductCategories.sync();

module.exports = { ProductCategories }