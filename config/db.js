const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose
      .connect("mongodb://localhost:27017/graphql-apollo-server")
      .then((conn) => console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline))
      .catch((err) => {
        console.error(`Error: ${err.message}`.red.underline.bold);
        process.exit(1);
      });
  } catch (err) {
    console.error(`Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};
module.exports = connectDB;
