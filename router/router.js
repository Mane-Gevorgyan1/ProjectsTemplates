const express = require("express")
const CategoryController = require("../controller/categoryController")
const ProductController = require("../controller/productController")
const passport = require('passport')
require('../config/passportConfig')(passport)
const router = express.Router()

const multer = require('multer')
const RequestController = require("../controller/requestController")
const UsersController = require("../controller/userController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        let name = file.originalname + Date.now()
        cb(null, name)
    }
})
const upload = multer({ storage })

router.get('/getCategories', CategoryController.getCategories)
router.post('/createCategy', CategoryController.createCategory)
router.post('/editCategory', CategoryController.editCategory)

router.get('/getProducts', ProductController.getProducts)
router.post('/createProduct', upload.array("photos"), ProductController.createProduct)
router.post('/editProduct', upload.array("photos"), ProductController.editProduct)

router.get('/getRequests', RequestController.getRequests)
router.post('/createRequest', RequestController.createRequest)

router.get('/getUsers', UsersController.getUsers)
router.post('/register', UsersController.register)
router.post('/login', passport.authenticate("local"), UsersController.login)
router.post('/editRoleId', UsersController.editRoleId)

module.exports = router