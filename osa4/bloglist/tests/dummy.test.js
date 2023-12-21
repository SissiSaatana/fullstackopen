const listHelper = require('../utils//list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Mymy',
      author: 'Jymy',
      url: 'http://www.jymy.com',
      likes: 99,
      __v: 0
    }
  ]
  test('when list has no entries', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes([listWithOneBlog[0]])
    expect(result).toBe(listWithOneBlog[0].likes)
  })

  test('list total likes', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(104)
  })

})