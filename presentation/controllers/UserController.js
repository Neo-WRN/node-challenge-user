const { validationResult } = require('express-validator')

class UserController {

    // registerPage(req, res, next) {
    // }

    createCustomer(req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped()})
        }
        console.log(req.body)
        res.status(200).end('success')
    }
}

module.exports = new UserController()