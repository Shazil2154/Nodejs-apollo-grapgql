const User = require("../../models/userModel");

module.exports = {
  Query: {},
  Mutation: {
    createUser: async (_, { user }) =>
      await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      }),
  },
};
