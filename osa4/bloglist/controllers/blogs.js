/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      const mapped = blogs.map(b => {
        const id = b._id
        // eslint-disable-next-line no-param-reassign
        delete b._doc._id
        return ({ ...b._doc, id })
      })
      response.json(mapped)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter
