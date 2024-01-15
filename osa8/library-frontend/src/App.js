import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      booksCount
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");

  const authors = useQuery(ALL_AUTHORS);

  // const books = useQuery(ALL_AUTHORS, {);

  if (authors.loading) return <div>loading...</div>;

  console.log("authors: " + authors.data);
  console.log("authors: ", authors.data.allAuthors);

  return (
    <Router>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Routes>
        <Route path="/books" element={<Books />} />
        <Route
          path="/"
          element={<Authors authors={authors.data.allAuthors} />}
        />
      </Routes>

      <NewBook show={page === "add"} />
    </Router>
  );
};

export default App;
