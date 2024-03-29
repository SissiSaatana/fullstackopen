// /* eslint-disable no-undef */
const listHelper = require('../utils/list_helper');

const blogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d1ef8',
    title: 'Mymy',
    author: 'Jymy',
    url: 'http://www.jymy.com',
    likes: 100,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d1ef8',
    title: 'Mymy',
    author: 'Jymy',
    url: 'http://www.jymy.com',
    likes: 99,
    __v: 0,
  },
  {
    _id: '5a422ea71b54a676234d1ef8',
    title: 'Mymy',
    author: 'Jymy',
    url: 'http://www.jymy.com',
    likes: 99,
    __v: 0,
  },
  {
    _id: '5a422as71b54a676234d1ef8',
    title: 'Mymy',
    author: 'Jymy',
    url: 'http://www.jymy.com',
    likes: 99,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676124d17fc',
    title: 'Typeee wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

// describe('total likes', () => {
//   test('when list has no entries', () => {
//     const result = listHelper.totalLikes([])
//     expect(result).toBe(0)
//   })

//   test('when list has only one blog equals the likes of that', () => {
//     const result = listHelper.totalLikes([blogs[0]])
//     expect(result).toBe(blogs[0].likes)
//   })

//   test('list total likes', () => {
//     const result = listHelper.totalLikes(blogs)
//     expect(result).toBe(433)
//   })
// })

// describe('checking for most liked blog', () => {
//   test('most liked blog', () => {
//     const result = listHelper.favoriteBlog(blogs)
//     expect(result).toEqual(blogs[1])
//   })
// })

// describe('checking for author with most blogs', () => {
//   test('author with most blogs and blog count', () => {
//     const result = listHelper.mostBlogs(blogs)
//     expect(result).toEqual({ author: 'Robert C. Martin', blogCount: 4 })
//   })
// })

// describe('checking for author with most likes', () => {
//   test('author with most likes and like count', () => {
//     const result = listHelper.mostLikes(blogs)
//     expect(result).toEqual({ author: 'Jymy', likes: 397 })
//   })
// })
