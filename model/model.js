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


const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.categories = require('./categories')
db.products = require('./products')
db.productCategories = require('./productCategories') 

db.categories.Categories.belongsToMany(db.products.Products, {
    through: 'productcategories',
    foreignKey: 'categoryId'
})

db.products.Products.belongsToMany(db.categories.Categories, {
    through: 'productcategories',
    foreignKey: 'productId'
})
module.exports =  db ;

// module.exports = db









// categories (inch tesak sayt a)
// products   foreign key - category_id   web uni/chuni, mobile uni/chuni
// many to many
// requests

// name, description, price, shat nkarner, 
// product photo