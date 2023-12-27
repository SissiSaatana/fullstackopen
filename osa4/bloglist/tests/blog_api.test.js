const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
// const testHelper = require('./test_helper')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('expect 3 returned blogs', async () => {
  const response = await api.get('/api/blogs')

  console.log(response.body)
  expect(response.body).toHaveLength(3)
})

test('expect id filed to be "id"', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog).toHaveProperty('id')
  });
})

test('Post new blog', async () => {
  const newBlog = {
    title: 'Petroskoi',
    author: 'mymy',
    url: 'petroskoi.fi',
    likes: 8,
    __v: 0,
  }

  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  postResponse.body.id = postResponse.body._id
  delete postResponse.body._id

  const getResponse = await api.get('/api/blogs')
  const blog = getResponse.body.filter(b => b.id === postResponse.body.id)
  expect(blog).toContainEqual(postResponse.body)
})


afterAll(async () => {
  await mongoose.connection.close()
})
