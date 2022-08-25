const { 
    signupController, 
    loginController 
} = require('../controller/authController')
const signupValidator = require('../validators/signupValidator')
const loginValidator = require('../validators/loginValidator')
const router = require('express').Router()

router.post('/signup', signupValidator, signupController)
router.post('/login', loginValidator, loginController)

module.exports = router;