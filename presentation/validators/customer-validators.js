const { body } = require('express-validator')
const { validateString } = require('./base-validators')


const validateName = () => 
    validateString("full_name", "Name")
    .isLength({ min: 1 })
    .withMessage("Name must have at least one character")
    .isAlpha()
    .withMessage("Name can't have numbers or symbols")
    
    .escape()

const validateEmail = () =>
    validateString("email", "Email")
    .isEmail()

module.exports = {

    validateName,
       

}