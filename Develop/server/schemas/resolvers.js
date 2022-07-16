const { Book, User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
        return User.find().populate('thoughts');
    },
  },
  Mutation: {

  },
};

module.exports = resolvers;