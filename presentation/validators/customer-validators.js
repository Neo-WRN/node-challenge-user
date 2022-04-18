const { body } = require('express-validator')
const req = require('express/lib/request')
const { validateString } = require('./base-validators')


// TODO Test sanitizers later on
// TODO See what must and what mustn't be non-blocking/async and garantee it is. 
// TODO Analyze repeated code and create functions for it

const validateName = () => 
    validateString("full_name", "Name")
    .isLength({ min: 1 })
    .withMessage("Name must have at least one character")
    .isAlpha()
    .withMessage("Name can't have numbers or symbols")

const validateEmail = (field="email", field_name="Email") =>
    validateString(field, field_name)
    .isEmail()
    .withMessage("Email must be a valid email")
    .normalizeEmail()

const validateEmailConfirm = () =>
    validateEmail("email_confirmation", "Email Confirmation")
    .custom(async(value, { req }) => {
        if (value !== req.body.email) {
            return Promise.reject("Email Confirmation must be the same as Email")
        }
    })

const validateCpf = () =>
    validateString("cpf", "CPF")
    .isLength({min: 11})
    .withMessage("CPF must have at least 11 characters")
    .isLength({max: 14})
    .withMessage("CPF must have at maximum 14 characters")
    .customSanitizer((value) => {return value.replace(/\D/g, "")})
    .matches(/\d{11}$/)
    .withMessage("CPF must be composed of 11 numbers")

// const validateCellphone = () =>
//     validateString("cellphone", "Cellphone number")
//     .isLength({min: 11})
//     .withMessage("Cellphone number must have at least 11 characters")
//     .isLength({max: 15})
//     .withMessage("Cellphone number must have at maximum 15 characters")
//     .customSanitizer((value) => {
//         return value.replace(/\D/g, "0")
//     })
//     .matches(/.{11}$/).isLength({min: 11})
//     .withMessage("Cellphone number must be composed of 11 numbers")


module.exports = {

    validateName,
    validateEmail,
    validateEmailConfirm,
    validateCpf,
    // validateCellphone,
}