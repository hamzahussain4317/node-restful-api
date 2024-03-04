const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const multer = require('multer')
const checkAuth = require('../middlewares/check-auth');
const productController = require('../controllers/productControllers')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

const Product = require('../models/product')

//now it handles the http methods requests
//here we use / because from app we send a request of /products
//if we going to write /products it will become /products/products//

//to open some products web browser//
//display all products
router.get('/', productController.products_get_all)
//to add a new product//
router.post('/', upload.single('productImage'), checkAuth, productController.products_post_product)
//to get the product with the specific id//
router.get('/:productId', productController.products_get_product)
//to update a product//
router.patch('/:productId', checkAuth, productController.products_update_product)
// to delete a product//
router.delete('/:productId', checkAuth, productController.products_delete_product)

module.exports = router;
