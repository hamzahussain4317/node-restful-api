const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Order = require('../models/Order')
const Product = require('../models/product')
const checkAuth = require('../middlewares/check-auth');
const orderController = require('../controllers/orderController')

//to fetch data about orders
router.get('/', checkAuth, orderController.orders_get_all)
//to add an order
router.post('/', checkAuth, orderController.orders_create_order)
//to fetch data of a specific order Id
router.get('/:orderId', checkAuth, orderController.orders_get_order)
//to delete an order of specific id//
router.delete('/:orderId', checkAuth, orderController.orders_delete_order)

module.exports = router;
