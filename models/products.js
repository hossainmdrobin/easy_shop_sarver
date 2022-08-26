const { Schema, model } = require('mongoose')

const product = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    oldPrice: {
        type: String,
        required: true
    },
    photo: {
        image: Buffer,
        contentType: String
    },
    rating: String,
    rated: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, { timestamps: true })

const Product = model('Product', product)

module.exports = Product;