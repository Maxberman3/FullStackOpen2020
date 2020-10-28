require("dotenv").config();
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql
} = require("apollo-server");
const Book = require("./models/Book");
const Author = require("./models/Author");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ALWAYS_BRING_A_RUM_HAM";

const MONGODB_URI = process.env.MONGO_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.count({}),
    authorCount: async () => await Author.count({}),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const books = await Book.find({});
        console.log(books);
        return books;
      }
      if (args.author && !args.genre) {
        const books = await Book.find({author: args.author});
        return books;
      }
      if (!args.author && args.genre) {
        const books = await Book.find({genres: args.genre});
        return books;
      }
      const books = await Book.find({author: args.author, genre: args.genre});
      return books;
    },
    allAuthors: async () => {
      const allAuthors = await Author.find({});
      return allAuthors;
    },
    me: (roots, args, {currentUser}) => {
      return currentUser;
    }
  },
  Author: {
    bookCount: async root => {
      console.log(root);
      const bookCount = await Book.count({author: root._id});
      return bookCount;
    }
  },
  Book: {
    author: async root => {
      console.log(root);
      const author = await Author.findById(root.author);
      return author;
    }
  },
  Mutation: {
    addBook: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const author = await Author.findOne({name: args.author});
      if (!author) {
        try {
          let saveAuthor = new Author({name: args.author});
          saveAuthor = await saveAuthor.save();
          const book = new Book({...args, author: saveAuthor._id});
          const saveBook = await book.save();
          return saveBook;
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        }
      } else {
        const book = new Book({...args, author: author._id});
        const saveBook = await book.save().catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        });
        return saveBook;
      }
    },
    editAuthor: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      let author = await Author.findOne({name: args.name});
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      const saveAuthor = await author.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });

      return saveAuthor;
    },
    createUser: (root, args) => {
      const user = new User({username: args.username});

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username});

      if (!user || args.password !== "secred") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return {value: jwt.sign(userForToken, JWT_SECRET)};
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );
      return {currentUser};
    }
  }
});

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`);
});
