const Post = require("../../models/postModel");
module.exports = {
  Mutation: {
    createComment: async (_, { postId, message, user }) => {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("Post not found");
      }
      const comment = {
        message,
        user,
      };
      post.comments.push(comment);
      const result = await post.save();
      return comment;
    },
  },
};