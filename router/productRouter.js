const router = require('express').Router()
const {
    addProductController
} = require('../controller/productController')
const multer = require('multer')
const path = require('path')

//MULTER STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../public/uploads`)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-') + '-' + Date.now();
        cb(null, fileName + fileExt)
    }
})

// MULTER UPLOAD OBJECT
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            cb(null, true)
        } else {
            cb(new Error('Only .jepg, .pnj or jpeg allowed !'))
        }
    }
})

router.post('/add', upload.single('photo'), addProductController)

module.exports = router;