const config = require('./utils/config')
const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const loginRouter=require('./controllers/login')
const usersRouter=require('./controllers/users')
const blogsRouter=require('./controllers/blogs')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.info('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.morganLogger())
app.use(middleware.tokenExtractor)

app.use('/api/login',loginRouter)
app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app
