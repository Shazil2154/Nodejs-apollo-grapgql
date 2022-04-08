const { gql } = require("apollo-server-express");

module.exports = gql`
  type Comment {
    _id: ID
    message: String
    user: User
  }

  extend type Mutation {
    createComment(postId: ID!, message: String!, user: ID!): Post
  }
`;
