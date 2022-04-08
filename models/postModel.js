const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      message: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      required: false,
    },
  ],
});

async function autoPopulate(next) {
  this.populate("author");
  this.populate("comments.user");
  next();
}

postSchema.pre("save", autoPopulate);

postSchema.pre("findOne", autoPopulate);

postSchema.pre("find", autoPopulate);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
