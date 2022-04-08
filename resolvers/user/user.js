const { UserInputError } = require("apollo-server-express");
const User = require("../../models/userModel");

module.exports = {
  Query: {
    getAllUsers: async () => await User.find(),
    getUser: async (_, { id }) => await User.findById(id),
    userLogin: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new UserInputError("User not found");
      }
      const isValidPassword = await user.matchPassword(password);
      if (!isValidPassword) {
        throw new UserInputError("Invalid password");
      }
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { user }) =>
      await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      }),
    updateUser: async (_, { id, user }) => await User.findByIdAndUpdate(id, user, { new: true }),
    deleteUser: async (_, { id }) => await User.findByIdAndDelete(id),
  },
};
