const { body } = require('express-validator')
const req = require('express/lib/request')
const { validateString, validateNumberCode} = require('./base-validators')


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

function isCpfValid(cpf) {
    let cpfArray = Array.from(cpf, Number)
    const confirmationDigits = cpfArray.slice(-2)
    cpfArray = cpfArray.slice(0, -2)
    const calcDigit = (start=1) => 
        cpfArray.reduce((total, num, index) => 
        {
            total += (num*(index+start)) 
            return total
            //console.log(num+"x"+(start+index)+" = "+(num*(start+index))+" | Total: ",+total);
        }, 0) % 11
    
    const firstDigit = calcDigit()
    if (firstDigit !== confirmationDigits[0]) return false
    cpfArray.push(firstDigit)
    if (calcDigit(0) !== confirmationDigits[1]) return false
    
    return true
}
const validateCpf = () =>
    validateNumberCode("cpf", "CPF", 11, 14)
    .custom(async value => {
        if (!isCpfValid(value)) return Promise.reject("CPF is not valid")
    }).withMessage("CPF INVALIDO")

const validateCellphone = () =>
    validateNumberCode("cellphone", "Cellphone Number", 11, 15)

module.exports = {

    validateName,
    validateEmail,
    validateEmailConfirm,
    validateCpf,
    validateCellphone,
}