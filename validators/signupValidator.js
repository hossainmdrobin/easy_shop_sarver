const {check} = require('express-validator')
const People = require('../models/people')

const signupValidator = [
    check('name').isLength({min: 1})
    .withMessage('Name is required'),

    check('email').isEmail()
    .withMessage('Please Enter a valid emial')
    .custom(async email => {
        let user = await People.findOne({email});
        if(user){
            return Promise.reject('Email Already is use')
        }
    }),

    check('password').isLength({min:4})
    .withMessage('Password must be morre than 4 character')
]

module.exports = signupValidator;