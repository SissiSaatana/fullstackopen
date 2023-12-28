import { useState, useEffect } from 'react'
import { Blog, NewBlogForm } from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogsService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedNoteappUser'))
    console.log('user @ effect', user)
    if (user) {
      setupUser(user)
    }
  }, [])

  const setupUser = async (user) => {
    setUser(user)

    if (user !== undefined) {
      blogService.setToken(user.token)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }

  return (
    <div>
      <Login user={user} propagateUser={(user) => setupUser(user)} />
      <NewBlogForm />
    </div>
  )

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



