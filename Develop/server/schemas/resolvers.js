const { Book, User } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id }).populate();
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
    delete: async (parent, { user }, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
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