const db = require('../model/model')
const Categories = db.categories.Categories

class CategoryController {

    static async createCategories(req, res) {
        if (!req.body.category) {
            res.send({ sucess: false, message: 'Category field is required' })
        } else {
            const category = await Categories.create({ ...req.body })
            res.send({ sucess: true, message: 'Category created', category })
        }
    }

}

module.exports = CategoryController;      