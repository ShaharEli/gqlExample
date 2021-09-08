import { gql } from 'apollo-server-express'

export default gql`
  type Author {
    id: ID!
    firstName: String!
    lastName: String!
  }
  input AuthorInput {
    firstName: String!
    lastName: String!
  }

  input BookInput {
    title: String!
    author: AuthorInput!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Query {
    books: [Book]
    book(id: Int!): Book
  }

  type Mutation {
    addBook(book: BookInput!): Book
  }
`
