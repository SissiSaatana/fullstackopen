/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(b => {
    const id = b._id
    // eslint-disable-next-line no-param-reassign
    delete b._doc._id
    return ({ ...b._doc, id })
  }))
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  const result = await blog.save()
  res.status(201).json(result)
})

module.exports = blogsRouter
