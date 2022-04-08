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
      return await post.save();
    },
    deleteComment: async (_, { postId, commentId }) => {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("Post not found");
      }
      const comment = post.comments.id(commentId);
      if (!comment) {
        throw new Error("Comment not found");
      }
      comment.remove();
      return await post.save();
    },
  },
};
