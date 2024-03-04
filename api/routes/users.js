const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require("jsonwebtoken");
const userController = require('../controllers/userController')

router.post('/signup', userController.user_signup)

router.post('/login', userController.user_login)

router.delete('/:userId', userController.delete_user)

module.exports = router;

