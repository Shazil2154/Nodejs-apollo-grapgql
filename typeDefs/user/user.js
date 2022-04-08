const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserUpdateInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  extend type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    userLogin(email: String!, password: String!): User
  }
  extend type Mutation {
    createUser(user: UserInput): User
    updateUser(id: ID!, user: UserUpdateInput): User
    deleteUser(id: ID!): User
  }
`;
