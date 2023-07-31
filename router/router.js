const express = require("express");
const CategoryController = require("../controller/categoryController");
const ProductController = require("../controller/productController");
const router = express.Router();

router.post('/createCategories', CategoryController.createCategories)

router.post('/createProduct', ProductController.createProduct)

module.exports = router;
