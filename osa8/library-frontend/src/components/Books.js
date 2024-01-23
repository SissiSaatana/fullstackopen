import { gql, useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = () => {
  const [genre, setGenre] = useState("");
  const books = useQuery(ALL_BOOKS);
  // const [genres, setGenres] = useState([]);

  if (books.loading) return <div>loading...</div>;

  console.log("books", books);
  console.log("books data", books.data);
  // const genres = [...new Set(books.data.allBooks.map((book) => book.genres))];
  const genres = [
    ...new Set(books.data.allBooks.map((book) => book.genres).flat(1)),
  ];
  console.log("genres", genres);
  console.log("genre", genre);
  console.log(
    books.data.allBooks.filter((b) => (genre ? b.genres.includes(genre) : b))
  );

  return (
    <div>
      <h2>books</h2>
      <p>in genre</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks
            .filter((b) => (genre ? b.genres.includes(genre) : b))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        {genres.map((g, index) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
