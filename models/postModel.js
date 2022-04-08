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
});

postSchema.pre("save", function (next) {
  this.populate("author");
  next();
});

postSchema.pre("findOne", async function (next) {
  this.populate("author");
  next();
});

postSchema.pre("find", async function (next) {
  this.populate("author");
  next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
