const { createServer } = require("http");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const express = require("express");
const colors = require("colors");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const connectDB = require("./config/db");
const cors = require("cors");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

connectDB();

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});
app.use(cors());

// app.use((req, res) => res.send("Hello From GraphQL Apollo Server"));

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startServer();

const PORT = 4000;
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`.yellow.underline);
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`.underline
  );
});

// Without subscriptions Server setup
// const startServer = async () => {

//   const app = express();
//   const httpServer = createServer(app);

//   connectDB();
//   const apolloServer = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });
//   await apolloServer.start();
//   apolloServer.applyMiddleware({ app });

//   app.use((req, res) => res.send("Hello From GraphQL Apollo Server"));
//   app.listen({ port: 4000 }, () =>
//     console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
//   );
// };

// startServer();
