const express = require('express')
const UserController = require('../controllers/UserController')
const { customerValidators } = require('../validators/customer-validators')

const router = express.Router()
router.post('/', customerValidators, UserController.createCustomer)

module.exports = router