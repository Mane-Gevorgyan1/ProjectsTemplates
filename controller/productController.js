const db = require('../model/model')
const Product = db.products.Products

class ProductController {

    static async createProduct(req, res) {
        if (!req.body.product) {
            res.send({ sucess: false, message: 'Product field is required' })
        } else {
            const product = await Product.create({ ...req.body })
            res.send({ sucess: true, message: 'Product created', product })
        }

    }

}

module.exports = ProductController;      
