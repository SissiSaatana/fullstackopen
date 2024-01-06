import style from '../styles/blog.module.css'
import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [display, setDisplay] = useState('none')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: '40%',
  }
  const hidableContent = {
    display: display,
  }

  const toggleContentDisplay = e => {
    if (display === 'none') {
      setDisplay('block')
      e.target.innerText = 'hide'
    } else {
      setDisplay('none')
      e.target.innerText = 'view'
    }
  }

  const like = () =>
    likeBlog(blog)

  const remove = () => {
    if (confirm(`Do u really want to remove ${blog.title} blog`))
      removeBlog(blog.id)
  }

  return (
    <div class='blog' style={blogStyle}>
      <p>
        {blog.title}
        <button class='show-blog-button'
          onClick={e => toggleContentDisplay(e)}>
            view
          </button>
      </p>
      <div style={hidableContent}>
        <p>{blog.url}</p>
        <p>{blog.author}</p>
        <p>Likes {blog.likes} 
          <button class='like-button' onClick={like}>like</button>
        </p>
        <p>{(blog.user) ? blog.user.name : 'unknown poster'}</p>
        {(user.blogs.includes(blog.id)) ? <button class='remove-blog-button' onClick={remove}>Remove</button> : ''}
      </div>
    </div>
  )
}

const NewBlogForm = ({ postNewBlog }) => {
  return (
    <form onSubmit={postNewBlog} className={style['blog-form']}>
      <div className={style['input-container']}>
        <label htmlFor='title'>Title</label>
        <input type="text" name='title'></input>
      </div>
      <div className={style['input-container']}>
        <label htmlFor='author'>Author</label>
        <input type="text" name='author'></input>
      </div>
      <div className={style['input-container']}>
        <label htmlFor='url'>Url</label>
        <input type='text' name='url'></input>
      </div>
      <button id='submit-new-blog' type='submit'>Create</button>
    </form>
  )
}
export { Blog, NewBlogForm }
