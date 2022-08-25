const {check} = require('express-validator');

const productValidator = [
    check('name')
    .isLength({min:1})
    .withMessage('Product name is Required'),

    check('title')
    .isLength({min:1})
    .withMessage('Title name is Required'),

    check('desc')
    .isLength({min:1})
    .withMessage('Product description is Required'),

    check('price')
    .isLength({min:1})
    .withMessage('Product price is Required'),

    check('oldPrice')
    .isLength({min:1})
    .withMessage('Product oldPrice is Required'),

    check('desc')
    .isLength({min:1})
    .withMessage('Product description is Required'),
]

module.exports = productValidator;

