const router = require('express').Router()
const productValidator = require('../validators/productValidator')
const {
    addProductController,
    getAllProductController,
    getProductByIdController,
    getProductByCatagoryController,
    updateProduct,
    deleteProduct
} = require('../controller/productController')
const multer = require('multer')
const path = require('path')

//MULTER STORAGE

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
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
        fileSize: 5000000
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

router.post('/add', upload.single('photo'), productValidator, addProductController)

// FETCH PRODUCTS BY DEFFERENT WAY
router.get('/getAllProduct', getAllProductController)
router.get('/getProductById/:id',getProductByIdController)
router.get('/getProductByCatagory/:catagory',getProductByCatagoryController)
router.post('/update/:id', updateProduct)
router.get('/delete/:id', deleteProduct )

module.exports = router;