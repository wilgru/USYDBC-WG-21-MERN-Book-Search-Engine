const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Email or password was incorrect.');
      }

      const pwStatus = await user.isCorrectPassword(password);

      if (!pwStatus) {
        throw new AuthenticationError('Email or password was incorrect.');
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password } ) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { username, bookId }, context) => {
      console.log(username);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: username._id },
          { $addToSet: { savedBooks: bookId } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        return "Something went wrong";
      }
    },
    delete: async (parent, { username }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: username._id },
          { $pull: { savedBooks: { bookId: params.bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          return 'No book found to delete';
        }
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;