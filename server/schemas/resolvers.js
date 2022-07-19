const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks'); // return User
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

      return { token, user }; // return Auth
    },
    addUser: async (parent, { username, email, password } ) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user }; // return Auth
    },
    saveBook: async (parent, { bookId, authors, title, description, image }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: { bookId: bookId, authors: authors, title: title, description: description, image: image } } },
            { new: true, runValidators: true }
          );
          return updatedUser; // return User
        } catch (err) {
          console.log(err);
          return "Something went wrong";
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId} } },
          { new: true }
        );
        if (!updatedUser) {
          return 'No book found to delete';
        }
        return updatedUser; // return User
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;