const express = require("express")
const CategoryController = require("../controller/categoryController")
const ProductController = require("../controller/productController")
const router = express.Router()

/** Multer */

const multer = require('multer')
const RequestController = require("../controller/requestController")

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

router.post('/createCategories', CategoryController.createCategories)
router.get('/getCategories', CategoryController.getCategories)

router.post('/createProduct', upload.array("photos"), ProductController.createProduct)
router.get('/getProducts', ProductController.getProducts)

router.post('/createRequest', RequestController.createRequest)
router.get('/getRequests', RequestController.getRequests)

// update
// uxarkel mail-in
// user

module.exports = router