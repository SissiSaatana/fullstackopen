import PropTypes from 'prop-types'
import style from '../styles/blog.module.css'
import blogService from '../services/blogsService'
import { setNotification } from '../reducers/notificationReducer'
import { setBlogs } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Blog = ({ blogs }) => {
  console.log('blogs', blogs)
  console.log('blog id', useParams().id)

  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  console.log('blog with this is id:', blog)
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
      <h3>comments:</h3>
      <ul>
        {blog.comments.map((comment, index) => {
          return <li key={index}>{comment}</li>
        })}
        <li></li>
      </ul>
      <CommentForm blog={blog} blogs={blogs} />
    </div>
  )
}
Blog.propTypes = {
  blogs: PropTypes.array.isRequired
}

const CommentForm = ({ blog, blogs }) => {
  const dispatch = useDispatch()
  const postComment = async (e) => {
    console.log('triggered')

    e.preventDefault()
    try {
      const result = await blogService.postComment(
        blog.id,
        e.target.comment.value
      )
      console.log('result', result)

      const newBlogs = blogs.map((b) =>
        b.id === blog.id ? result : b
      )
      dispatch(setBlogs(newBlogs))
    } catch (ex) {
      console.log('failed: ', ex)
      setTimeout(() => {
        dispatch(setNotification({ msg: '', type: '' }))
      }, 5000)
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
