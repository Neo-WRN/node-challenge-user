const { body } = require('express-validator')


// TODO Search and experiment if storing the function in a variable is really necessary

const validateString = (field, field_name=field) => 
    body(field)
    .escape()
    .isString()
    .withMessage(field_name + " must be a String")
    .trim()

const validateNumberCode = (field, field_name=field, min, max=min, mask="-") =>
    //TODO - Use for things like cpf and cellphone
    validateString(field, field_name)
    .isLength({min: min})
    .withMessage(field_name + " must have at least " + min + "characters")
    .isLength({max: max})
    .withMessage(field_name + " must have at maximum " + max + "characters")
    .blacklist(mask)
    .matches(/\d{11}$/)
    .withMessage("Cellphone number must be composed of 11 numbers")

module.exports = {
    validateString,
}