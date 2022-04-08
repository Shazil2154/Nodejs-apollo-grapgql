const express = require("express");
const colors = require("colors");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const connectDB = require("./config/db");

const startServer = async () => {
  const app = express();
  connectDB();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.use((req, res) => res.send("Hello From GraphQL Apollo Server"));
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
  );
};

startServer();
