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
db.photos = require('./photos')
db.requests = require('./requests')
db.users = require('./users')

db.products.Products.belongsToMany(db.categories.Categories, {
    through: 'productcategories',
    foreignKey: 'productId'
})
db.categories.Categories.belongsToMany(db.products.Products, {
    through: 'productcategories',
    foreignKey: 'categoryId'
})

db.products.Products.hasMany(db.photos.Photos, { as: "photos" })
db.photos.Photos.belongsTo(db.products.Products, {
    foreignKey: 'productId'
})

db.products.Products.hasMany(db.requests.Requests, { as: "request" })
db.requests.Requests.belongsTo(db.products.Products, {
    foreignKey: 'productId'
})

module.exports = db;