const { validationResult } = require('express-validator')
const validatorFormatter = require('../utils/validatorFormatter')
const Product = require('../models/products')
const fs = require('fs')

exports.addProductController = (req, res, next) => {
    try {

        const errors = validationResult(req).formatWith(validatorFormatter).mapped()
        if (Object.keys(errors).length !== 0) {
            return console.log(errors)
        }
        const product = new Product({ ...req.body, photo: req.file.filename })
        product.save()
            .then(response => res.status(200).json({ message: 'Product uploaded Successfully' }))
    } catch (err) {
        console.log(err)
    }
}

exports.getAllProductController = async (req, res) => {
    try {
        const products = await Product.find({});
        if (products) {
            res.status(200).json(products)
        }
    } catch {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.getProductByIdController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.status(200).json(product)
        }
    } catch (err) {
        console.log(err)
    }
}
exports.getProductByCatagoryController = async (req, res) => {
    try {
        const products = await Product.find({ title: req.params.catagory })
        if (products) {
            res.status(200).json(products)
        }
    } catch (err) {
        console.log(err)
    }
}

exports.updateProduct = async (req, res) => {
    try {
        console.log(req.body)
        const { name, title, desc, price, oldPrice } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { $set: { name, title, desc, price, oldPrice } })
        if (product) {
            res.status(200).json({ message: 'Product Updated Successfully' })
        }
    } catch (e) {
        console.log(e);

    }
}

exports.deleteProduct = async (req, res) => {
    try {
        console.log(req.params.id)
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            console.log(product)
            const path = `./public/uploads/${product.photo}`
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
    } catch {

    }
}