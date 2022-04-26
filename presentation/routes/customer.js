import { Router } from 'express'
import app from '../../app.js'
import createCustomer from '../controllers/UserController.js' //! a
import customerValidators from '../validators/customer-validators.js'

const router = Router()
router.post('/', customerValidators, createCustomer)

export default router