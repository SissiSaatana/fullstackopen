import { useState, useEffect } from 'react'
import { Blog, NewBlogForm } from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogsService'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()

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
    } catch (ex) {
      console.log('exception: ', ex)
    }
    
  }

  if (blogs === undefined || blogs.length == 0) {
    return <Login user={user} login={e => login(e)} logout={() => logout()} />
  } else {
    return (
      <div>
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



