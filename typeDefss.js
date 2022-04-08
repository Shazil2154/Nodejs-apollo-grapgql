const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }
  type Post {
    _id: ID
    title: String
    content: String
    author: User
  }

  type Query {
    hello: String
    getAllPosts: [Post]
    getPost(id: ID!): Post
  }

  input PostInput {
    title: String!
    content: String
    author: ID!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(user: UserInput): User
    createPost(post: PostInput): Post
    updatePost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): Post
  }
`;

module.exports = typeDefs;
