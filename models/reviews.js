const { model, Schema } = require('mongoose')

const reviews = new Schema({
    comment: {
        type: String,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    }
})

const Reviews = model('Reviews', reviews)
module.exports = Reviews