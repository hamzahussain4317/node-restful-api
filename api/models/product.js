//here we create a basic structure of product using mongoose schema
//and then export this structure using a object product where every time
//if we want to add new product we initialize the constructor by product=new
//Product and use in products.js//



const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true }
})

module.exports = mongoose.model('Product', productSchema);