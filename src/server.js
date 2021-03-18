import express from 'express';
import pkg from 'apollo-server-express';
const { ApolloServer } = pkg;
import {PORT}  from './config/configurations.js';
import {resolvers , typeDefs} from './index.js';
const setupApollo = () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    return server;
};
const apServer = setupApollo();
const app = express();
apServer.applyMiddleware({ app });
const port = PORT || 4000;
app.listen({ port: port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${apServer.graphqlPath}`)
);