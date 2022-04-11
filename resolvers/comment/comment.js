const Post = require("../../models/postModel");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

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
      const updatedPost = await post.save();
      const postedComment = updatedPost.comments[updatedPost.comments.length - 1];
      pubsub.publish(`COMMENT_ADDED-${updatedPost._id}`, { commentAdded: postedComment });
      return updatedPost;
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
    editComment: async (_, { postId, commentId, message }) => {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("Post not found");
      }
      const comment = post.comments.id(commentId);
      if (!comment) {
        throw new Error("Comment not found");
      }
      comment.message = message;
      return await post.save();
    },
  },
  Subscription: {
    commentAdded: {
      subscribe: (_, { postId }) => {
        return pubsub.asyncIterator(`COMMENT_ADDED-${postId}`);
      },
    },
  },
};
