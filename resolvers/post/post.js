const Post = require("../../models/postModel");
const { POST_ADDED } = require("../../constants");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

module.exports = {
  Query: {
    getAllPosts: async () => await Post.find(),
    getPost: async (_, { id }) => await Post.findById(id),
    getPostsByUser: async (_, { userId }) => await Post.find({ author: userId }),
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const post = await Post.create(args.post);
      pubsub.publish(POST_ADDED, { postAdded: post });
      return post;
    },
    updatePost: async (_, { id, title, content }) =>
      await Post.findByIdAndUpdate(id, { title, content }, { new: true }),
    deletePost: async (_, { id }) => await Post.findByIdAndDelete(id),
  },
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator(POST_ADDED),
    },
  },
};
