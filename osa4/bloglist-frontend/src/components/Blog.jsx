import style from "../styles/blog.module.css";
import { useState } from 'react'

const Blog = ({ blog }) => {
  const [display, setDisplay] = useState('none')
  const blogStyle = {    
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: '40%'
    //width: 'fit-content'
  }
  const hidableContent = {
    display: display
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


  return (
    <div style={blogStyle}>
      <p>{blog.title} <button onClick={e => toggleContentDisplay(e)}>view</button></p>
      <div style={hidableContent}>
        <p>{blog.url}</p>
        <p>{blog.author}</p>
        <p>Likes 0 <button>like</button></p>
      </div>
    </div>  
  )
}

const NewBlogForm = ({postNewBlog}) => {
    <form onSubmit={e => postNewBlog(e)} className={style['blog-form']}>
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
      <button type='submit'>Create</button>
    </form>
}
export { Blog, NewBlogForm } 
