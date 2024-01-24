const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

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

module.exports = resolvers;
