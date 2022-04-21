const express = require('express')
const { validationResult } = require('express-validator')
const UserController = require('../controllers/UserController')
const { customerValidators } = require('../validators/customer-validators')

const router = express.Router()

router.post('/customer', customerValidators, UserController.createCustomer)


//TODO Search about cnnecting multiple routers to one (so have router files for, ex, /customer/... /products/... all connected to here)


module.exports = router