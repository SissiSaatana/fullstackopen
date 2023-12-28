import blogService from './services/blogsService'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const NewBlogForm = () => {


  return (
    <form onSubmit={e => postNewBlog(e)}>
      <div>
        <label for='title'>Title</label>
        <input type="text" name='title'></input>
      </div>
      <div>
        <label for='author'>Author</label>
        <input type="text" name='author'></input>
      </div>
      <div>
        <label for='url'>Url</label>
        <input type="text" name='url'></input>
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export { Blog, NewBlogForm } 
