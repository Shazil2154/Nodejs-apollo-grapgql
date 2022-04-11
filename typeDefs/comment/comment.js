const { gql } = require("apollo-server-express");

module.exports = gql`
  type Comment {
    _id: ID
    message: String
    user: User
  }

  extend type Mutation {
    createComment(postId: ID!, message: String!, user: ID!): Post
    deleteComment(postId: ID!, commentId: ID!): Post
    editComment(postId: ID!, commentId: ID!, message: String!): Post
  }

  extend type Subscription {
    commentAdded(postId: ID!): Comment
  }
`;
