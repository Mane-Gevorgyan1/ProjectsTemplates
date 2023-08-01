const db = require('../model/model')
const Categories = db.categories.Categories

class CategoryController {

    static async createCategories(req, res) {
        if (!req.body.name) {
            res.send({ sucess: false, message: 'name field is required' })
        } else {
            await Categories.create({ ...req.body }).then((category) => {
                res.send({ sucess: true, message: 'Category created', category })
            }).catch((error) => {
                res.send({ sucess: false, message: 'Something happend in the server', error })
            })
        }
    }

    static async getCategories(req, res) {
        await Categories.findAll().then(request => {
            res.send({ success: true, request })
        }).catch(error => {
            res.send({ success: false, message: 'Something happened in the server', error })
        })
    }

}

module.exports = CategoryController;        