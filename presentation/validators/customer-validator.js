const { body } = require('express-validator')

module.exports = {

    validateName:
        body('full_name').trim()
        .isLength({ min: 3 })
        .escape()

}