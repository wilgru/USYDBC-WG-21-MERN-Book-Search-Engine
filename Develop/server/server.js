const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas'); // for Apollo server
const db = require('./config/connection'); // MongoDB 
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

// create new Apollo server
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });
}

// 
startApolloServer(typeDefs, resolvers);