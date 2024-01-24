const { ApolloServer, gql } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
   value: String!
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!
    uniqueBookGenres: [String!]!
    booksCount: Int!
    allAuthors: [Author!]!
    authorCount: Int!
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String,
      genres:[String]
    ): Book!

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String
    ): User

    login(
      username: String!
      password: String!
    ): Token
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
    uniqueBookGenres: async () => {
      const genres = await Book.distinct("genres");
      console.log("genres", genres);
      return genres;
    },

    booksCount: async () => Book.collection.countDocuments(), // books.length,
    allAuthors: async () => Author.find({}).populate("books"),
    authorCount: async () => Author.collection.countDocuments(), // authors.length,
    me: (root, args, context) => {
      console.log(context.currentUser);
      return context.currentUser;
    },
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
    addBook: async (root, args, context) => {
      const book = new Book({ ...args });

      const currentUser = context.currentUser;

      console.log("currentUser");
      console.log(currentUser);
      console.log(currentUser.favoriteGenre);
      console.log(context);
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

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

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      console.log("currentUser");
      console.log(currentUser);
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

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

    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      console.log(args.username);
      console.log(args);
      console.log(user);

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      console.log("user login!");

      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      console.log(user);
      console.log(user.favoriteGenre);

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },

  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// addAuthor(name: String!, born: Int!): Author!
