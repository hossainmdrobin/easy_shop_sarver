const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validatorFormatter = require('./../utils/validatorFormatter')
const People = require('./../models/people')

exports.signupController = async (req, res) => {
    try {
        const errors = validationResult(req).formatWith(validatorFormatter).mapped();
        if (Object.keys(errors).length > 0) {
            console.log(errors)
            return res.status(400).json({message:'validation error'});
        }
        const hashPass = await bcrypt.hash(req.body.password, 9)
        if (hashPass) {
            const people = new People({ ...req.body, password: hashPass })
            people.save().then(response => {
                if (response) {
                    const token = jwt.sign({ id: response._id, name: response.name }, process.env.JWT);
                    return res.status(200).json({ message: 'Signup Successfull', accessToken: token });
                }
            })
                .catch(err => console.log(err))
        }
    } catch (e) {
        if (e) {
            res.status(500).json({ message: 'Internal Server error' })
        }
    }
}

exports.loginController = async (req, res) => {
    try {
        console.log(req.body)
        const errors = validationResult(req).formatWith(validatorFormatter).mapped();
        if (Object.keys(errors).length > 0) {
            console.log(errors)
            return res.status(400).json({message:'validation error'});
        }

        const user = await People.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT);
            return res.status(200).json({ message: 'Login Successfull', accessToken: token });
        }

    } catch (e) {
        if (e) {
            res.status(500).json({ message: 'Internal Server error' })
        }

    }

}