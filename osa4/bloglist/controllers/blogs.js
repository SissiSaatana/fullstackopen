/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const { body } = req

    const blog = new Blog({
      ...body,
      user: user._id,
    })

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
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    res.status(201).json(result)
  } catch (error) {
    next(error);
  }
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
