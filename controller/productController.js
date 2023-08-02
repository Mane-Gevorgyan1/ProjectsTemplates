const db = require('../model/model')
const Product = db.products.Products
const Photos = db.photos.Photos
const ProductCategories = db.productCategories.ProductCategories

class ProductController {

    static async getProducts(req, res) {
        await Product.findAll({ include: { all: true } }).then(product => {
            res.send({ success: true, product })
        }).catch(error => {
            res.send({ success: false, message: 'Something happened in the server', error })
        })
    }

    static async createProduct(req, res) {
        if (!req.body.name) {
            res.send({ sucess: false, message: 'Name field is required' })
        } else if (!req.body.description) {
            res.send({ sucess: false, message: 'description field is required' })
        } else if (!req.body.price) {
            res.send({ sucess: false, message: 'price field is required' })
        } else if (!req.body.categoryId) {
            res.send({ sucess: false, message: 'categoryId field is required' })
        } else if (('hasWebsite' in req.body) === false) {
            res.send({ sucess: false, message: 'hasWebsite field is required' })
        } else if (('hasApplication' in req.body) === false) {
            res.send({ sucess: false, message: 'hasApplication field is required' })
        } else if (!req?.files?.length) {
            res.send({ sucess: false, message: 'photos field is required' })
        } else {
            await Product.create({ ...req.body }).then((async product => {
                const productId = product.dataValues.id
                const categoryIds = product.dataValues.categoryId

                categoryIds.map(async categoryId => {
                    await ProductCategories.create({ categoryId, productId })
                })

                req.files.map(async photo => {
                    await Photos.create({ name: photo.originalname, productId })
                })

                res.send({ success: true, message: 'Product created', product })
            })).catch(error => {
                res.send({ success: false, message: 'Something happened in the server', error })
            })
        }
    }

    static async editProduct(req, res) {
        if (!req.body.name) {
            res.send({ sucess: false, message: 'Name field is required' })
        } else if (!req.body.description) {
            res.send({ sucess: false, message: 'description field is required' })
        } else if (!req.body.price) {
            res.send({ sucess: false, message: 'price field is required' })
        } else if (!req.body.categoryId) {
            res.send({ sucess: false, message: 'categoryId field is required' })
        } else if (('hasWebsite' in req.body) === false) {
            res.send({ sucess: false, message: 'hasWebsite field is required' })
        } else if (('hasApplication' in req.body) === false) {
            res.send({ sucess: false, message: 'hasApplication field is required' })
        } else if (!req.body.productId) {
            res.send({ sucess: false, message: 'productId field is required' })
        } else {
            await Product.update({ ...req.body }, {
                where: {
                    id: req.body.productId
                }
            }).then(() => {
                req.body?.deletePhotos?.map(async photoId => {
                    await Photos.destroy({ where: { id: photoId } })
                })
                req.files?.map(async photo => {
                    await Photos.create({ name: photo.originalname, productId: req.body.productId })
                })
                res.send({ success: true, message: 'product updated' })
            }).catch(error => {
                res.send({ sucess: false, message: 'Something happend in the server', error })
            })
        }
    }

}

module.exports = ProductController;      
