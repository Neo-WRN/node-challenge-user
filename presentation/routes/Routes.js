import { Router } from 'express'
import customerRouter from './customer.js'

const router = Router()
router.use("/customer", customerRouter)

export default router