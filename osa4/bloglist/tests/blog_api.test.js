const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
// const testHelper = require('./test_helper')

const api = supertest(app)

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// // test('expect 6 returned blogs', async () => {
// //   const response = await api.get('/api/blogs')
// //   expect(response.body).toHaveLength(6)
// // })

// test('expect id filed to be "id"', async () => {
//   const response = await api.get('/api/blogs')
//   response.body.forEach(blog => {
//     expect(blog).toHaveProperty('id')
//   });
// })

// describe('Adding a new blog', () => {
//   test('Post new blog', async () => {
//     const newBlog = {
//       title: 'Petroskoi',
//       author: 'mymy',
//       url: 'petroskoi.fi',
//       likes: 10,
//       __v: 0,
//     }

//     const postResponse = await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
//     postResponse.body.id = postResponse.body._id
//     delete postResponse.body._id

//     const getResponse = await api.get('/api/blogs')
//     const blog = getResponse.body.filter(b => b.id === postResponse.body.id)
//     expect(blog).toContainEqual(postResponse.body)
//   })

//   test('Post new blog without likes', async () => {
//     const newBlog = {
//       title: 'No likes',
//       author: 'mymy',
//       url: 'petroskoi.fi',
//       __v: 0,
//     }

//     const postResponse = await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
//     postResponse.body.id = postResponse.body._id
//     delete postResponse.body._id

//     const getResponse = await api.get('/api/blogs')
//     const blog = getResponse.body.filter(b => b.id === postResponse.body.id)
//     expect(blog.likes === postResponse.body.likes)
//   })

//   test('Post with bad request', async () => {
//     const newBlog = {
//       author: 'mymy',
//       url: 'petroskoi.fi',
//       __v: 0,
//     }

//     const postResponse = await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .expect(400)
//   })
// })

test('delete last blog', async () => {
  const res = await api
    .delete('/api/blogs/658bc0cbcdeb8311ce0bfaf8')
    .expect(200)
})

afterAll(async () => {
  await mongoose.connection.close()
})
