const { body } = require('express-validator')
const req = require('express/lib/request')
const { isCpfValid } = require('../../utils/validateData')
const { validateBoolean, validateDate, validateRequiredString, validateNumber,} = require('./base-validators')


// TODO Test sanitizers later on
// TODO See what must and what mustn't be non-blocking/async and garantee it is.
// TODO Use API to see if address info is correct

const validateName = () => 
    validateRequiredString("full_name", "Name")
    .isLength({ min: 1 })
    .withMessage("Name must have at least one character")
    .isAlpha()
    .withMessage("Name can't have numbers or symbols")

const validateEmail = (field="email", field_name="Email") =>
    validateRequiredString(field, field_name)
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
    validateNumber("cpf", "CPF", 11, 14)
    .custom(async value => {
        if (!isCpfValid(value)) return Promise.reject("CPF is not valid")
    }).withMessage("Cpf is not a valid Cpf")

const validateCellphone = () =>
    validateNumber("cellphone", "Cellphone Number", 11, 15)

const validateBirthdate = () =>
    validateDate("birthdate", "Birthdate")

const validateEmailSms = () =>
    validateBoolean("email_sms", "Email/SMS")

const validateWhatsapp = () =>
    validateBoolean("whatsapp", "Whatsapp")

const validateCountry = () =>
    validateRequiredString("country", "Country")

const validateCity = () =>
    validateRequiredString("city", "City")

const validatePostalCode = () =>
    validateNumber("postal_code", "Postal Code", 8, 9)

const validateAddress = () =>
    validateRequiredString("address", "Address")

const customerValidators = [
    validateName(), validateEmail(), validateEmailConfirm(), validateCpf(), 
    validateCellphone(), validateBirthdate(), validateEmailSms(), validateWhatsapp(), 
    validateCountry(), validateCity(), validatePostalCode(), validateAddress()]

module.exports = {

    customerValidators
}