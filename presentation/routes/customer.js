const express = require('express')
const { validationResult } = require('express-validator')
const { validateName } = require('../validators/customer-validators')

const router = express.Router()

router.post(
    '/customer', validateName(),
    (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped()})
        }
        console.log(req.body)
        res.status(200).end('success')
})


//TODO Search about cnnecting multiple routers to one (so have router files for, ex, /customer/... /products/... all connected to here)


module.exports = router