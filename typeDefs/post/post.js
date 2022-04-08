const { gql } = require("apollo-server-express");

module.exports = gql`
  type Post {
    _id: ID
    title: String
    content: String
    author: User
    comments: [Comment]
  }

  extend type Query {
    getAllPosts: [Post]
    getPost(id: ID!): Post
  }

  input PostInput {
    title: String!
    content: String
    author: ID!
  }

  extend type Mutation {
    createPost(post: PostInput): Post
    updatePost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): Post
  }
`;
