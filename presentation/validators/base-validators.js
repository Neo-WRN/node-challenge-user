const { body } = require('express-validator')

validateBoolean = (field, field_name) =>
    body(field)
    .exists({checkNull: true})
    .withMessage(field_name + " can't be null")
    .escape()
    .trim()
    .toBoolean()
    .isBoolean()
    .withMessage(field_name + " must be either true or false")

const validateDate = (field, field_name=field) =>
    body(field)
    .escape()
    .trim()
    .toDate()
    .isISO8601()
    .withMessage(field_name + " must be a Date")

const validateString = (field, field_name=field) => 
    body(field)
    .trim()
    .escape()
    .isString()
    .withMessage(field_name + " must be a String")

const validateRequiredString = (field, field_name=field) => 
    validateString(field, field_name)
    .exists({checkNull: true, checkFalsy: true})
    .withMessage(field_name + " can't be empty")

const validateNumberCode = (field, field_name=field, min, max=min) =>
    validateString(field, field_name)
    .isLength({min: min})
    .withMessage(field_name + " must have at least 11 characters")
    .isLength({max: max})
    .withMessage(field_name + " must have at maximum 14 characters")
    .customSanitizer((value) => {return value.replace(/\D/g, "")})
    .matches(`^\\d{${min}}$`)
    .withMessage(field_name + " must be composed of 11 numbers")

module.exports = {
    validateBoolean,
    validateDate,
    validateString,
    validateRequiredString,
    validateNumberCode,
}