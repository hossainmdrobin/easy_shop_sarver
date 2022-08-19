const {Schema, model} = require('mongoose')

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: {
            String,
            required: true
        }
    },
    role: {
        type:String,
        enum:['customer', 'seller'],
        default:'customer'
    }
}, {timestamps: true})

const User = model('User', user)

module.exports = User