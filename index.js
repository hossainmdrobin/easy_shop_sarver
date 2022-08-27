// external imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')
const app = express()
require('dotenv').config()
const path = require('path')

// IMPORTING ROUTERS
const productRouter = require('./router/productRouter')
const authRouter = require('./router/authRouter');
const { urlencoded } = require('body-parser');

// ASSIGNED VARIABLES 
const PORT = process.env.PORT || 8080;

// USING MIDDLEWARES
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('uploads'));
app.use(express(urlencoded({extended:true})))
app.use(express.json())

app.use('/products', productRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err.message))

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})