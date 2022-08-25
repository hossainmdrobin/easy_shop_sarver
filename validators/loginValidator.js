const {check} = require('express-validator')
const People = require('../models/people')
const bcrypt = require('bcrypt')

const loginValidator = [
    check('email').isEmail()
    .withMessage('Please Enter a valid emial')
    .custom(async (email, {req}) => {
        let user = await People.findOne({email});
        if(!user){
            return Promise.reject('User not Found');
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return Promise.reject('Password or email is Incorrect')
        }
    })

]

module.exports = loginValidator;