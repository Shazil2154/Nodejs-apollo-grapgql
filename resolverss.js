const Post = require("./models/postModel");
const User = require("./models/userModel");

const resolvers = {
  Query: {
    getAllPosts: async () => await Post.find(),
    getPost: async (_, { id }) => await Post.findById(id),
  },
  Mutation: {
    createUser: async (_, { user }) =>
      await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      }),
    createPost: async (parent, args, context, info) => await Post.create(args.post),
    updatePost: async (_, { id, title, content }) =>
      await Post.findByIdAndUpdate(id, { title, content }, { new: true }),
    deletePost: async (_, { id }) => await Post.findByIdAndDelete(id),
  },
};

module.exports = resolvers;
