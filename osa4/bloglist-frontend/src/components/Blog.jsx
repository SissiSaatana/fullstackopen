import PropTypes from 'prop-types'
import style from '../styles/blog.module.css'
import blogService from '../services/blogsService'
import { setNotification } from '../reducers/notificationReducer'
import { setBlogs } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
    width: '40%'
  }

  const like = async () => {
    try {
      const result = await blogService.updateBlog(blog)
      console.log('result', result)
      const newBlogs = blogs.map((b) =>
        b.id === blog.id ? result : b
      )
      newBlogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(newBlogs))
    } catch (ex) {
      console.log('failed: ', ex)
      dispatch(
        setNotification({
          msg: `Failed to update blog ${blog.title} likes. Error: ${ex}`,
          type: 'error'
        })
      )
      timeoutFeedbackMsg()
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        Likes {blog.likes}
        <button className="like-button" onClick={like}>
          like
        </button>
      </p>
      <p>added by {blog.user ? blog.user.name : 'unknown poster'}</p>
    </div>
  )
}
Blog.propTypes = {
  blogs: PropTypes.array.isRequired
}

const commentForm = () => {
  const postComment = async (e) => {
    e.preventDefault()
    try {
      blog.comments.push(e.target.comment.value)
      const result = await blogService.updateBlog()
      console.log('result', result)
      const newBlogs = dispatch(
        setBlogs(blogs.map((b) => (b.id === result.id ? result : b)))
      )
    } catch (ex) {
      console.log('failed: ', ex)
      dispatch(
        setNotification({
          msg: `Failed to post comment. Error: ${ex}`,
          type: 'error'
        })
      )
      timeoutFeedbackMsg()
    }
  }

  return (
    <form
      className={style['comment-form']}
      onSubmit={(e) => postComment(e)}
    >
      <label htmlFor="comment">Comment</label>
      <input type="text" id="comment" name="comment" />
      <button type="submit">Submit</button>
    </form>
  )
}

const NewBlogForm = ({ postNewBlog }) => {
  return (
    <form onSubmit={postNewBlog} className={style['blog-form']}>
      <div className={style['input-container']}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title"></input>
      </div>
      <div className={style['input-container']}>
        <label htmlFor="author">Author</label>
        <input type="text" name="author"></input>
      </div>
      <div className={style['input-container']}>
        <label htmlFor="url">Url</label>
        <input type="text" name="url"></input>
      </div>
      <button id="submit-new-blog" type="submit">
        Create
      </button>
    </form>
  )
}
export { Blog, NewBlogForm }

const timeoutFeedbackMsg = () =>
  setTimeout(() => {
    dispatch(setNotification({ msg: '', type: '' }))
  }, 5000)
