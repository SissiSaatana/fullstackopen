import { useState, useEffect } from 'react'
import { Blog, NewBlogForm } from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogsService'
import loginService from './services/loginService'
import FeedbackMsg from './components/FeedbackMsg'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [feedbackMsg, setFeedbackMsg] = useState({msg: '', type: ''})  

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('loggedNoteappUser'))
    console.log('storage', storage)
    if (storage) {
      setupUser(storage)
    }
  }, [])

  const login = async(e) => {
    e.preventDefault()
    try {
      const user = {
        username: e.target.username.value,
        password: e.target.password.value
      }
      const result = await loginService.postLogin(user)
      localStorage.setItem('loggedNoteappUser', JSON.stringify(result)) 
      setupUser(result)

    } catch (ex) {
      console.log('exception: ', ex)
      setFeedbackMsg({ 
        msg: `Wrong username or password`,
        type: 'error'
      }) 
    }    
  }

  const logout = () => {
    localStorage.removeItem('loggedNoteappUser')
    setUser('')
    setBlogs('')
  }

  const setupUser = async (user) => {
    setUser(user)
    try {
      if (user !== undefined) {
        blogService.setToken(user.token)
        const blogs = await blogService.getAll()
        // const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes).filter(b => b.likes !== 0).reverse()
        // sortedBlogs.concat(blogs.filter(b => b.like === 0))
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      }
    } catch (ex) {
      console.log('exception: ', ex)
    }
  }

  const postNewBlog = async (e) => {
    e.preventDefault()
    try {
      const newBlog = {
        title: e.target.title.value,
        author: e.target.author.value,
        url: e.target.url.value,
      }
      const result = await blogService.postNewBlog(newBlog)
      setBlogs(blogs.concat(result))
      setFeedbackMsg({ 
        msg: `a new blog ${newBlog.title} posted succesfully`,
        type: 'success'
      })
      timeoutFeedbackMsg();
    } catch (ex) {
      console.log('exception: ', ex)
      setFeedbackMsg({ 
        msg: `Failed to post blog ${newBlog.title}. Error: ${ex}`,
        type: 'error'
      })
      timeoutFeedbackMsg();
    }
  }

  const likeBlog = async blog => {
    try {
      blog.likes += 1
      const result = await blogService.updateBlog(blog)
      const newBlogs = [...blogs].map(b => (b.id === blog.id) ? blog : b)
      newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
    } catch (ex) {
      console.log('exception: ', ex)
      setFeedbackMsg({ 
        msg: `Failed to post blog ${newBlog.title}. Error: ${ex}`,
        type: 'error'
      })
      timeoutFeedbackMsg();
    }
  }

  const removeBlog = async blogId => {
    try {
      const result = await blogService.deleteBlog(blogId)
      console.log(result)
      if (result.status && result.status === 200)
        setBlogs(blogs.filter(b => b.id !== blogId))
    } catch (ex) {
      console.log('exception: ', ex)
      setFeedbackMsg({ 
        msg: `Failed to post blog ${newBlog.title}. Error: ${ex}`,
        type: 'error'
      })
      timeoutFeedbackMsg();
    }
  }

  const timeoutFeedbackMsg = () => 
    setTimeout(() => {
      setFeedbackMsg({msg: '', type: ''})
    }, 5000)

  if (blogs === undefined || blogs.length == 0) {
    return (
      <>
        <FeedbackMsg msg={feedbackMsg} />
        <Login user={user} login={e => login(e)} logout={() => logout()} />
      </>
    )
  } else {
    return (
      <div>
        <FeedbackMsg msg={feedbackMsg} />
        <Login user={user} login={(e) => login(e)} logout={() => logout()} />
        
        <Togglable buttonLabel='New blog'> 
          <NewBlogForm postNewBlog={e => postNewBlog(e)} />
        </Togglable>

        <h2>blogs</h2>
        {blogs.map(blog =>
            <Blog 
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              user={user}
            />
        )}
      </div>
    )
  }
        // <ul>
        //   {blogs.map(blog =>
        //     <li key={blog.id}>
        //       {blog.title}
        //       <Togglable buttonLabel='New blog'> 
        //         <Blog blog={blog} />
        //       </Togglable>
        //     </li>
        //   )}
        // </ul>        
}

export default App



