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

  if (!blog.title || blog.title === 'undefined'
  || !blog.url || blog.url === 'undefined') {
    console.log('bad request!!')
    res.status(400).send('missing title || url')
    return
  }

  if (!blog.likes || blog.likes === 'undefined') {
    console.log('no blog likes!');
    blog.likes = 0
  }

  const result = await blog.save()
  res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id)
  console.log(blog)
  if (blog === null) {
    res.status(204).json(blog)
    return
  }
  res.status(200).json(blog)
})

module.exports = blogsRouter
