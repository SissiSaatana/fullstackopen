import { useState, useEffect } from 'react';
import { Blog, NewBlogForm } from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogsService';
import loginService from './services/loginService';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { createStore } from 'redux';
import { setNotification } from './reducers/notificationReducer';
import { setBlogs } from './reducers/blogsReducer';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  console.log('blogs', blogs);
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('loggedNoteappUser'));
    console.log('storage', storage);
    if (storage) {
      setUser(storage);
      setServiceTokenAndGetBlogs(storage);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = {
        username: e.target.username.value,
        password: e.target.password.value,
      };
      const result = await loginService.postLogin(user);
      localStorage.setItem('loggedNoteappUser', JSON.stringify(result));
      setUser(result);
      setServiceTokenAndGetBlogs(result);
    } catch (ex) {
      console.log('exception: ', ex);
      dispatch(
        setNotification({
          msg: 'Wrong username or password',
          type: 'error',
        }),
      );
      timeoutFeedbackMsg();
    }
  };

  const logout = () => {
    localStorage.removeItem('loggedNoteappUser');
    setUser('');
    dispatch(setBlogs(''));
  };

  const setServiceTokenAndGetBlogs = async (user) => {
    try {
      if (user !== undefined) {
        blogService.setToken(user.token);
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
      }
    } catch (ex) {
      dispatch(
        setNotification({
          msg: `Error while trying to set token for blog service and fetching blogs: ${ex}`,
          type: 'error',
        }),
      );
      timeoutFeedbackMsg();
      console.log('exception: ', ex);
    }
  };

  const postNewBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    };

    try {
      const newBlog = {
        title: e.target.title.value,
        author: e.target.author.value,
        url: e.target.url.value,
      };
      const result = await blogService.postNewBlog(newBlog);
      dispatch(setBlogs(blogs.concat(result)));
      const newUser = { ...user, blogs: user.blogs.concat(result.id) };
      setUser(newUser);
      localStorage.setItem('loggedNoteappUser', JSON.stringify(newUser));
      dispatch(
        setNotification({
          msg: `a new blog ${newBlog.title} posted succesfully`,
          type: 'success',
        }),
      );
      timeoutFeedbackMsg();
    } catch (ex) {
      console.log('exception: ', ex);
      dispatch(
        setNotification({
          msg: `Failed to post blog ${e.target.title.value}. Error: ${ex}`,
          type: 'error',
        }),
      );
      timeoutFeedbackMsg();
    }
  };

  const likeBlog = async (blog) => {
    try {
      const result = await blogService.updateBlog(blog);
      console.log('result', result);
      const newBlogs = blogs.map((b) => (b.id === blog.id ? result : b));
      newBlogs.sort((a, b) => b.likes - a.likes);
      dispatch(setBlogs(newBlogs));
    } catch (ex) {
      dispatch(
        setNotification({
          msg: `Failed to update blog ${blog.title} likes. Error: ${ex}`,
          type: 'error',
        }),
      );
      timeoutFeedbackMsg();
    }
  };

  const removeBlog = async (blogId) => {
    try {
      const result = await blogService.deleteBlog(blogId);
      if (result.status && result.status === 200) dispatch(setBlogs(blogs.filter((b) => b.id !== blogId)));
    } catch (ex) {
      dispatch(
        setNotification({
          msg: `Failed to remove blog ${blogId}. Error: ${ex}`,
          type: 'error',
        }),
      );
      timeoutFeedbackMsg();
    }
  };

  const timeoutFeedbackMsg = () =>
    setTimeout(() => {
      dispatch(setNotification({ msg: '', type: '' }));
    }, 5000);

  if (user === '') {
    return (
      <>
        <Notification msg={notification} />
        <Login user={user} login={(e) => login(e)} logout={() => logout()} />
      </>
    );
  } else if (blogs === 'undefined' || blogs.length === 0) {
    return (
      <div>
        <Notification msg={notification} />
        <Login user={user} login={(e) => login(e)} logout={() => logout()} />

        <Togglable buttonLabel="New blog">
          <NewBlogForm postNewBlog={(e) => postNewBlog(e)} />
        </Togglable>
      </div>
    );
  } else {
    return (
      <div>
        <Notification msg={notification} />
        <Login user={user} login={(e) => login(e)} logout={() => logout()} />

        <Togglable buttonLabel="New blog">
          <NewBlogForm postNewBlog={(e) => postNewBlog(e)} />
        </Togglable>

        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />
        ))}
      </div>
    );
  }
};

export default App;
