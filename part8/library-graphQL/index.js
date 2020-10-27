const {ApolloServer, UserInputError, gql} = require("apollo-server");
const {v1: uuid} = require("uuid");
import Book from "./models/Book";
import Author from "./models/Author";

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
    addBook: (root, args) => {
      if (books.find(book => book.title === args.title)) {
        throw new UserInputError("Title must be unique", {
          invalidArgs: args.title
        });
      }
      if (!authors.find(author => author.name === args.author)) {
        const author = {
          name: args.author,
          id: uuid()
        };
        authors = authors.concat(author);
      }
      const book = {...args, id: uuid()};
      console.log(book);
      books = books.concat(book);
      return book;
    },
    editAuthor: (root, args) => {
      let author = authors.find(a => a.name === args.name);
      if (!author) {
        return null;
      }
      author = {...author, born: args.setBornTo};
      authors = authors.filter(a => a.name !== author.name).concat(author);
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
