require("dotenv").config();
const {ApolloServer, UserInputError, gql} = require("apollo-server");
const Book = require("./models/Book");
const Author = require("./models/Author");
const mongoose = require("mongoose");

// const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

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
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.count({}),
    authorCount: async () => await Author.count({}),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const books = await Book.find({});
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
    }
  },
  Author: {
    bookCount: async root => {
      const bookCount = await Book.count({author: root.name});
      return bookCount;
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log(args);
      const author = await Author.findOne({name: args.author});
      console.log(author);
      if (!author) {
        console.log("about to save author");
        let saveAuthor = new Author({name: args.author});
        saveAuthor = await saveAuthor.save();
        const book = new Book({...args, author: saveAuthor._id});
        const saveBook = await book.save();
        console.log("author saved");
        return saveBook;
      } else {
        const book = new Book({...args, author: author._id});
        const saveBook = await book.save();
        return saveBook;
      }
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOne({name: args.name});
      if (!author) {
        return null;
      }
      author = {...author, born: args.setBornTo};
      await author.save();
      return author;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`);
});
