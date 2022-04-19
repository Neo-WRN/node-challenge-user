const { body } = require('express-validator')


const validateString = (field, field_name=field) => 
    body(field)
    .escape()
    .isString()
    .withMessage(field_name + " must be a String")
    .trim()

const validateNumberCode = (field, field_name=field, min, max=min) =>
    validateString(field, field_name)
    .isLength({min: min})
    .withMessage("CPF must have at least 11 characters")
    .isLength({max: max})
    .withMessage("CPF must have at maximum 14 characters")
    .customSanitizer((value) => {return value.replace(/\D/g, "")})
    .matches(`^\\d{${min}}$`)
    .withMessage(field_name + " must be composed of 11 numbers")

module.exports = {
    validateString,
    validateNumberCode,
}