import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog, NewBlogForm } from './Blog'

test('Blog tests', async () => {
  const blog = {
    title: 'mymmerön blogi',
    author: 'Mymyshka Petroskoi',
    url: 'https://mymy-blob.cat',
    user: {
      username: 'test',
      name: 'mymy',
      blogs: [
        '658dbf55df69c445edc39533',
        '658dbfbddf69c445edc39541',
        '658dbfc6df69c445edc39548',
        '658dbfe4df69c445edc3954f',
        '658dbff2df69c445edc39556',
        '658dc041df69c445edc39560',
        '658dc043df69c445edc39564',
        '658dc2ccdf69c445edc3957b',
        '65934e218f3fa1b93cc57e05',
        '659376c64216fc6befca4d4d',
        '659433ab17f4651a9e6a9b74',
        '6594341317f4651a9e6a9b7b',
        '6594346d479bd3ed71f1c4d1',
        '659434ad5d6a234304564801',
        '65988d5f59c6cf61c15a159b'
      ],
      id: '658bd03e61db0ea2387f64d7'
    },
    likes: 6,
    id: '658dc2ccdf69c445edc3957b'
  }
  const user = {
    username: 'test',
    name: 'mymy',
    blogs: [
      '658dbf55df69c445edc39533',
      '658dbfbddf69c445edc39541',
      '658dbfc6df69c445edc39548',
      '658dbfe4df69c445edc3954f',
      '658dbff2df69c445edc39556',
      '658dc041df69c445edc39560',
      '658dc043df69c445edc39564',
      '658dc2ccdf69c445edc3957b',
      '65934e218f3fa1b93cc57e05',
      '659376c64216fc6befca4d4d',
      '659433ab17f4651a9e6a9b74',
      '6594341317f4651a9e6a9b7b',
      '6594346d479bd3ed71f1c4d1',
      '659434ad5d6a234304564801',
      '65988bf259c6cf61c15a157c',
      '65988c7459c6cf61c15a1587',
      '65988d5f59c6cf61c15a159b'
    ],
    id: '658bd03e61db0ea2387f64d7',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjY1OGJkMDNlNjFkYjBlYTIzODdmNjRkNyIsImlhdCI6MTcwNDQ5NjQ2Nn0.Iafub5dZEAND4HptcdgaruLrogGJQe905w83AgXblrQ'
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} likeBlog={mockHandler} />)

  const testUser = userEvent.setup()
  const title = screen.getByText('mymmerön blogi')
  const viewButton = screen.getByText('view')
  await testUser.click(viewButton)
  const author = screen.getByText('Mymyshka Petroskoi')
  const url = screen.getByText('https://mymy-blob.cat')
  const likes = screen.getByText(`Likes ${blog.likes}`)
  const likeButton = screen.getByText('like')
  await testUser.click(likeButton)
  await testUser.click(likeButton)

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('new blog form tests', async () => {
  const mockHandler = jest.fn((e) => e.preventDefault())

  const { container } = render(<NewBlogForm postNewBlog={mockHandler} />)
  const user = userEvent.setup()
  const inputTitle = container.querySelector('input[name="title"]')
  const inputAuthor = container.querySelector('input[name="author"]')
  const inputUrl = container.querySelector('input[name="url"]')
  const buttonSubmit = screen.getByText('Create')

  await user.type(inputTitle, 'Test title...')
  await user.type(inputAuthor, 'Test author...')
  await user.type(inputUrl, 'https://test.test')
  await user.click(buttonSubmit)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].target.elements.title.value).toBe('Test title...')
  expect(mockHandler.mock.calls[0][0].target.elements.author.value).toBe('Test author...')
  expect(mockHandler.mock.calls[0][0].target.elements.url.value).toBe('https://test.test')
})
