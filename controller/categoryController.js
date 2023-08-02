const db = require('../model/model')
const Categories = db.categories.Categories

class CategoryController {

    static async getCategories(req, res) {
        await Categories.findAll().then(categories => {
            res.send({ success: true, categories })
        }).catch(error => {
            res.send({ success: false, message: 'Something happened in the server', error })
        })
    }

    static async createCategory(req, res) {
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

    static async editCategory(req, res) {
        if (!req.body.name) {
            res.send({ sucess: false, message: 'name field is required' })
        } else if (!req.body.categoryId) {
            res.send({ sucess: false, message: 'categoryId is required' })
        } else {
            await Categories.update({ name: req.body.name }, {
                where: {
                    id: req.body.categoryId
                }
            }).then(() => {
                res.send({ success: true, message: 'Category updated' })
            }).catch(error => {
                res.send({ sucess: false, message: 'Something happend in the server', error })
            })
        }
    }

}

module.exports = CategoryController;        