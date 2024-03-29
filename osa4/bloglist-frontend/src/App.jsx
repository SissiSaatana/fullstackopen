import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { Blog, NewBlogForm } from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogsService'
import loginService from './services/loginService'
import Notification from './components/Notification'
import Users from './components/Users'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import style from './styles/app.module.css'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('loggedNoteappUser'))
    if (storage) {
      dispatch(setUser(storage))
      setServiceTokenAndGetBlogs(storage)
    }
  }, [])

  const login = async (e) => {
    e.preventDefault()
    try {
      const user = {
        username: e.target.username.value,
        password: e.target.password.value
      }
      const result = await loginService.postLogin(user)
      localStorage.setItem('loggedNoteappUser', JSON.stringify(result))
      dispatch(setUser(result))
      setServiceTokenAndGetBlogs(result)
    } catch (ex) {
      console.log('exception: ', ex)
      dispatch(
        setNotification({
          msg: 'Wrong username or password',
          type: 'error'
        })
      )
      timeoutFeedbackMsg()
    }
  }

  const logout = () => {
    localStorage.removeItem('loggedNoteappUser')
    dispatch(setUser(''))
    dispatch(setBlogs([]))
  }

  const setServiceTokenAndGetBlogs = async (user) => {
    try {
      if (user !== undefined) {
        blogService.setToken(user.token)
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      }
    } catch (ex) {
      dispatch(
        setNotification({
          msg: `Error while trying to set token for blog service and fetching blogs: ${ex}`,
          type: 'error'
        })
      )
      timeoutFeedbackMsg()
      console.log('exception: ', ex)
    }
  }

  const postNewBlog = async (e) => {
    e.preventDefault()
    try {
      const newBlog = {
        title: e.target.title.value,
        author: e.target.author.value,
        url: e.target.url.value
      }
      const result = await blogService.postNewBlog(newBlog)
      dispatch(setBlogs(blogs.concat(result)))
      const newUser = { ...user, blogs: user.blogs.concat(result.id) }
      dispatch(setUser(newUser))
      localStorage.setItem('loggedNoteappUser', JSON.stringify(newUser))
      dispatch(
        setNotification({
          msg: `a new blog ${newBlog.title} posted succesfully`,
          type: 'success'
        })
      )
      timeoutFeedbackMsg()
    } catch (ex) {
      console.log('exception: ', ex)
      dispatch(
        setNotification({
          msg: `Failed to post blog ${e.target.title.value}. Error: ${ex}`,
          type: 'error'
        })
      )
      timeoutFeedbackMsg()
    }
  }

  const timeoutFeedbackMsg = () =>
    setTimeout(() => {
      dispatch(setNotification({ msg: '', type: '' }))
    }, 5000)

  if (user === '') {
    return (
      <>
        <Notification msg={notification} />
        <Login user={user} login={(e) => login(e)} logout={() => logout()} />
      </>
    )
  } else {
    return (
      <div>
        <Notification msg={notification} />
        <Router>
          <nav>
            <Link to="/">Blogs</Link>
            <Link to="/users">users</Link>
            <Login user={user} login={(e) => login(e)} logout={() => logout()} />
          </nav>
          <Routes>
            <Route path="/users/:id" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/blogs/:id" element={blogs.length ? <Blog blogs={blogs} /> : <Navigate replace to="/" />} />
            <Route
              path="/"
              element={
                <>
                  <Togglable buttonLabel="New blog">
                    <NewBlogForm postNewBlog={(e) => postNewBlog(e)} />
                  </Togglable>
                  <h2>blogs</h2>
                  {blogs.map((blog) => (
                    <Link key={blog.id} to={`/blogs/${blog.id}`} className={style['blog-link']}>
                      {blog.title} {blog.author}
                    </Link>
                  ))}
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App
