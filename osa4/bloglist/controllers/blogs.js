/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
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
    console.log('user', user)

    if (!blog.title || blog.title === 'undefined'
    || !blog.url || blog.url === 'undefined') {
      console.log('bad request!!')
      return res.status(400).send('missing title || url')
    }

    if (!blog.likes || blog.likes === 'undefined') {
      console.log('no blog likes!');
      blog.likes = 0
    }

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    console.log('result', result._id)
    await user.save()
    result.user = user

    res.status(201).json(result)
  } catch (error) {
    next(error);
  }
})

blogsRouter.put('/', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.body.id)
    blog.likes += 1
    await blog.save()
    return res.status(204).json()
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { user } = req
    const blog = await Blog.findById(req.params.id)

    if (blog === null) {
      return res.status(204).json(blog)
    }

    if (blog.user.toString() === user._id.toString()) {
      user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
      await Blog.findByIdAndDelete(blog._id)
      await user.save()
    } else {
      return res.status(403).json(blog)
    }

    res.status(200).json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
