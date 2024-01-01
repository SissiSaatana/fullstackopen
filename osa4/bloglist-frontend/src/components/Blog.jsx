import style from "../styles/blog.module.css";

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const NewBlogForm = ({postNewBlog}) => {
  
  return (
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
  )
}
export { Blog, NewBlogForm } 
