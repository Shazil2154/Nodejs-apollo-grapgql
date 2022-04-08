const Post = require("../../models/postModel");

module.exports = {
  Query: {
    getAllPosts: async () => await Post.find(),
    getPost: async (_, { id }) => await Post.findById(id),
    getPostsByUser: async (_, { userId }) => await Post.find({ author: userId }),
  },
  Mutation: {
    createPost: async (parent, args, context, info) => await Post.create(args.post),
    updatePost: async (_, { id, title, content }) =>
      await Post.findByIdAndUpdate(id, { title, content }, { new: true }),
    deletePost: async (_, { id }) => await Post.findByIdAndDelete(id),
  },
};
