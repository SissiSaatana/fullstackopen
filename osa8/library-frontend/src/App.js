import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/Loginform";
import FavoriteGenre from "./components/FavoriteGenre";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ALL_AUTHORS, GET_USER, BOOK_ADDED, ALL_BOOKS } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const user = useQuery(GET_USER);
  const authors = useQuery(ALL_AUTHORS);

  if (authors.loading) return <div>loading...</div>;

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    console.log(message);
  };

  console.log("authors: " + authors.data);
  console.log("authors: ", authors.data.allAuthors);
  console.log("user: ", user);
  // <Notify errorMessage={errorMessage} />;
  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Link className="link" to="/">
          authors
        </Link>
        <Link className="link" to="/books">
          books
        </Link>
        <Link className="link" to="/newbook">
          add book
        </Link>
        <Link className="link" to="/recommend">
          recommend
        </Link>

        <button onClick={logout}>logout</button>
      </div>

      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook />} />
        <Route
          path="/recommend"
          element={<FavoriteGenre user={user.data.me} />}
        />
        <Route
          path="/"
          element={<Authors authors={authors.data.allAuthors} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
