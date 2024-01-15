import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const query = gql`
  query {
    allAuthors {
      name
      born
      booksCount
    }
  }
`;

client.query({ query }).then((response) => {
  console.log(response.data);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// type Book {
//   title: String!
//   published: Int!
//   author: String!
//   id: ID!
//   genres: [String]!
// }

// type Author {
//   name: String!
//   born: Int
//   id: ID!
//   books: [Book!]!
//   booksCount: Int
// }

// query {
//   allBooks {
//     title
//     published
//     author
//   }
// }
