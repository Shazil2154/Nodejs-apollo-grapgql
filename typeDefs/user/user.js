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
  extend type Mutation {
    createUser(user: UserInput): User
  }
`;
