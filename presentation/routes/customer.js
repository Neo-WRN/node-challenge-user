const express = require('express')
const { validationResult } = require('express-validator')
const { validateName } = require('../validators/customer-validator')

const router = express.Router()


router.post(
    '/customer', [validateName],
    (req, res) => {
        console.log(req.body)
        res.end("success")
})


//TODO Search about cnnecting multiple routers to one (so have router files for, ex, /customer/... /products/... all connected to here)


module.exports = router