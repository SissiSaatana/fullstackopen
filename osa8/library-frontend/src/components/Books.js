import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_UNIQUE_BOOK_GENRES } from "../queries";
import { useState } from "react";

const Books = () => {
  const [genre, setGenre] = useState("");
  const booksToShow = useQuery(ALL_BOOKS, { variables: { genre: genre } });
  const genres = useQuery(GET_UNIQUE_BOOK_GENRES, {
    refetchQueries: [{ query: ALL_BOOKS }],
  });

  if (booksToShow.loading) return <div>loading...</div>;

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
          {booksToShow.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.data
          ? genres.data.uniqueBookGenres.map((genre) => (
              <button key={genre} onClick={() => setGenre(genre)}>
                {genre}
              </button>
            ))
          : null}
      </div>
    </div>
  );
};

export default Books;
