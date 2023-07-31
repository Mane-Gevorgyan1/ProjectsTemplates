const { Model, DataTypes } = require("sequelize");
const {sequelize} = require('./sequelizeConfig')

class Categories extends Model { }
Categories.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    // parentId: INTEGER,
}, {
    modelName: "categories",
    sequelize,
})
Categories.sync();

module.exports = { Categories }