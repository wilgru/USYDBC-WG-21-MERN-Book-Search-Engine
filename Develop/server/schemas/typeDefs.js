const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        authors: String
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): User
        createUser(username: String!, email: String!, password: String!): User
        saveBook(username: String!, bookId: String!): Book
        delete(username: String!): User
    }
`

module.exports = typeDefs;