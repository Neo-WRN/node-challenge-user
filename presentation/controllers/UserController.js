import { validationResult } from 'express-validator'
import Users from '../../domain/user/mocks/UserMock.js'
class UserController {

    // registerPage(req, res, next) {
    // }

    createCustomer(req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped()})
        }
        const {full_name, email, email_confirmation, cpf, 
            cellphone, birthdate, email_sms, whatsapp, 
            country, city, postal_code, address} = req.body
        const newUser = [full_name, email, email_confirmation, cpf, 
            cellphone, birthdate, email_sms, whatsapp, 
            country, city, postal_code, address]
        
        Users.push(newUser)
        console.log(Users)
        
        res.status(200).end('success')
    }
}

export default new UserController().createCustomer