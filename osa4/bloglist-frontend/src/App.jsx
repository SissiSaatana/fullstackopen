import { useState, useEffect } from 'react'
import { Blog, NewBlogForm } from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogsService'
import loginService from './services/loginService'
import FeedbackMsg from './components/FeedbackMsg'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [feedbackMsg, setFeedbackMsg] = useState({msg: '', type: ''})  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedNoteappUser'))
    if (user) {
      setupUser(user)
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
        setBlogs(blogs)
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
    } catch (ex) {
      console.log('exception: ', ex)
      setFeedbackMsg({ 
        msg: `Failed to post blog ${newBlog.title}. Error: ${ex}`,
        type: 'error'
      })
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
        <NewBlogForm postNewBlog={e => postNewBlog(e)} />
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
  
  


  // f1 
  // "command promt"

  // f2
  // change variable name inside file

  // ctrl + k, z
  //     toggle zen mode

  // ctrl + k, c
  //     comment line 
  // ctrl + k, u
  //     uncomment line

  // ctrl + k + s -> save all opened files
  // ctrl + k, s -> view hotkeys

      
  // if (!user) {
  //   return (<Login propagateUser={(user) => setupUser(user)} />)
  // } else {
  //   return (
  //     <div>
  //       <p>{user.name} logged in</p>
  //       <Login propagateUser={(user) => setupUser(user)} />
  //       <h2>blogs</h2>
  //       {blogs.map(blog =>
  //         <Blog key={blog.id} blog={blog} />
  //       )}
  //     </div>
  //   )
  // }
}

export default App



