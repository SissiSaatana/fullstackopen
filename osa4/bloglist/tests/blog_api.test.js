const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testHelper = require('./test_helper')


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

afterAll(async () => {
  await mongoose.connection.close()
})
