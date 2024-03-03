//here we will handle requests using express//
const express = require('express');
const app = express();
const morgan = require('morgan')
//this middleware will parse the request body which is not available in readable form//
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/users')
const dbms = 'mongodb+srv://hamzy6311:22k4317@restful-api.2lejh3u.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbms)
    .then((result) => console.log('connected'))
    .catch((err) => {
        console.log(err)
    })


//morgan is basically a middleware that logs  the request like this(GET /products 304 9.976 ms - -) and works as quite similar
//to next(); basically it does something with the request and forworded to the
//route handler thats why we have to place it before our routes middleware//
app.use(morgan('dev'));


app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

//here we tell the bodyParser to parse the simple urls 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use is a middleware whenever a request comes it must pass through it//
//now here if the requests is related to our product it will send it to our 
//product.js which is basically handling my routes of products
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

//now we are going to handle errors using middleware and it puts after that routes
//means if the request is not handled by these middlewares there is something 
//fishy or have some error so now we create another middleware to handle our erros//

app.use((req, res, next) => {
    //now here we create an error and sets its status 404 which is typically web page not found
    //not found error and tells the middleware where to go next like displaying 
    //the error
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status = error.status || 500
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
