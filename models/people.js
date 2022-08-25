const {Schema, model} = require('mongoose')

const people = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type:String,
        enum:['customer', 'seller'],
        default:'customer',
    }
}, {timestamps: true})

const People = model('People', people)

module.exports = People