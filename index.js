// external imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const app = express()
require('dotenv').config()

// IMPORTING ROUTERS
const productRouter = require('./router/productRouter')

// ASSIGNED VARIABLES 
const PORT = process.env.PORT || 8080;

// USING MIDDLEWARES
app.use(morgan('dev'))

app.use('/products', productRouter)

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