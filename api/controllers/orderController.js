const Order = require('../models/Order')
const Product = require('../models/product')
const checkAuth = require('../middlewares/check-auth');
const mongoose = require('mongoose')

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name')
        .exec()
        .then(result => {
            res.status(200).json({
                count: result.length,
                orders: result.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.orders_create_order = (req, res, next) => {

    Product.findById(req.body.productId)
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: 'Id doestnot found'
                });
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            return order.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'Order Stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders/' + result._id,
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product', 'name')
        .exec()
        .then(order => {
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.orders_delete_order = (req, res, next) => {
    const id = req.params.orderId
    Order.findByIdAndDelete(id)
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: { productId: 'ID', quantity: 'Number' }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

