const { ApolloServer, gql } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    books: [Book!]!
    booksCount: Int
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!
    booksCount: Int!
    allAuthors: [Author!]!
    authorCount: Int!
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String,
      genres:[String]
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");
      return books
        .filter((book) =>
          args.author ? book.author.name === args.author : book
        )
        .filter((b) => (args.genre ? b.genres.includes(args.genre) : b));
    },

    booksCount: async () => Book.collection.countDocuments(), // books.length,
    allAuthors: async () => Author.find({}).populate("books"),
    authorCount: async () => Author.collection.countDocuments(), // authors.length,
  },
  Author: {
    booksCount: async (author) => {
      const res = await Book.find({
        author: author,
      });
      return res.length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });
      let existingAuthor = await Author.findOne({ name: args.author });
      if (!existingAuthor) {
        try {
          existingAuthor = await new Author({ name: args.author }).save();
        } catch (error) {
          throw new GraphQLError("saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          });
        }
      }

      try {
        book.author = existingAuthor;
        return await book.save();
      } catch (error) {
        throw new GraphQLError("saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args) => {
      try {
        return await Author.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.setBornTo } },
          { returnNewDocument: true, returnDocument: "after" }
        );
      } catch (error) {
        throw new GraphQLError("editing author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// addAuthor(name: String!, born: Int!): Author!
