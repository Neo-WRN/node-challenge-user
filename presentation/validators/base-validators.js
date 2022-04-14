const { body } = require('express-validator')


const validateString = (field, field_name) => 
    body(field)
    .isString()
    .withMessage(field_name + " must be a String")
    .trim()


module.exports = {
    validateString,
}