const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const {info, error } = require('./utils/logger');

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((er) => {
    error('error connecting to MongoDB:', er.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
