import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      booksCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      genres
      author {
        name
      }
    }
  }
`;

export const GET_UNIQUE_BOOK_GENRES = gql`
  query {
    uniqueBookGenres
  }
`;

export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const BOOK = gql`
  fragment book on Book {
    title
    author {
      name
    }
    published
    genres
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...book
    }
  }
  ${BOOK}
`;
