import { useState, useEffect } from "react";
import { Blog, NewBlogForm } from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogsService";
import loginService from "./services/loginService";
import FeedbackMsg from "./components/FeedbackMsg";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [feedbackMsg, setFeedbackMsg] = useState({ msg: "", type: "" });

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("loggedNoteappUser"));
    console.log("storage", storage);
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
      localStorage.setItem("loggedNoteappUser", JSON.stringify(result));
      setUser(result);
      setServiceTokenAndGetBlogs(result);
    } catch (ex) {
      console.log("exception: ", ex);
      setFeedbackMsg({
        msg: "Wrong username or password",
        type: "error",
      });
      timeoutFeedbackMsg();
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedNoteappUser");
    setUser("");
    setBlogs("");
  };

  const setServiceTokenAndGetBlogs = async (user) => {
    try {
      if (user !== undefined) {
        blogService.setToken(user.token);
        const blogs = await blogService.getAll();
        setBlogs(blogs.sort((a, b) => b.likes - a.likes));
      }
    } catch (ex) {
      setFeedbackMsg({
        msg: `Error while trying to set token for blog service and fetching blogs: ${ex}`,
        type: "error",
      });
      timeoutFeedbackMsg();
      console.log("exception: ", ex);
    }
  };

  const postNewBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = {
        title: e.target.title.value,
        author: e.target.author.value,
        url: e.target.url.value,
      };
      const result = await blogService.postNewBlog(newBlog);
      setBlogs(blogs.concat(result));
      const newUser = { ...user, blogs: user.blogs.concat(result.id) };
      setUser(newUser);
      localStorage.setItem("loggedNoteappUser", JSON.stringify(newUser));
      setFeedbackMsg({
        msg: `a new blog ${newBlog.title} posted succesfully`,
        type: "success",
      });
      timeoutFeedbackMsg();
    } catch (ex) {
      console.log("exception: ", ex);
      setFeedbackMsg({
        msg: `Failed to post blog ${e.target.title.value}. Error: ${ex}`,
        type: "error",
      });
      timeoutFeedbackMsg();
    }
  };

  const likeBlog = async (blog) => {
    try {
      blog.likes += 1;
      const result = await blogService.updateBlog(blog);
      const newBlogs = [...blogs].map((b) => (b.id === blog.id ? blog : b));
      newBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
    } catch (ex) {
      setFeedbackMsg({
        msg: `Failed to update blog ${blog.title} likes. Error: ${ex}`,
        type: "error",
      });
      timeoutFeedbackMsg();
    }
  };

  const removeBlog = async (blogId) => {
    try {
      const result = await blogService.deleteBlog(blogId);
      if (result.status && result.status === 200)
        setBlogs(blogs.filter((b) => b.id !== blogId));
    } catch (ex) {
      setFeedbackMsg({
        msg: `Failed to remove blog ${blogId}. Error: ${ex}`,
        type: "error",
      });
      timeoutFeedbackMsg();
    }
  };

  const timeoutFeedbackMsg = () =>
    setTimeout(() => {
      setFeedbackMsg({ msg: "", type: "" });
    }, 5000);

  if (user === "") {
    return (
      <>
        <FeedbackMsg msg={feedbackMsg} />
        <Login user={user} login={(e) => login(e)} logout={() => logout()} />
      </>
    );
  } else if (blogs === "undefined" || blogs.length === 0) {
    return (
      <div>
        <FeedbackMsg msg={feedbackMsg} />
        <Login user={user} login={(e) => login(e)} logout={() => logout()} />

        <Togglable buttonLabel="New blog">
          <NewBlogForm postNewBlog={(e) => postNewBlog(e)} />
        </Togglable>
      </div>
    );
  } else {
    return (
      <div>
        <FeedbackMsg msg={feedbackMsg} />
        <Login user={user} login={(e) => login(e)} logout={() => logout()} />

        <Togglable buttonLabel="New blog">
          <NewBlogForm postNewBlog={(e) => postNewBlog(e)} />
        </Togglable>

        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    );
  }
};

export default App;
