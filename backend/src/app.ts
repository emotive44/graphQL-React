import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ApolloServer, PubSub } from 'apollo-server-express';
import http from 'http';

import env from './config';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import chekAuth from './middlewares/chek-auth';


const app = express();

app.use(bodyParser.json());

// CORS middleware
app.use((_, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, x-auth-token, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  next();
});

app.use(chekAuth);

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),  //to access request object from graphQL resolvers
  playground: true, // enables the actual playground
  subscriptions: {
    path: '/api/ws', //set route for websockets
    keepAlive: 15000,
    onConnect: () => console.log("connected"),
    onDisconnect: () => console.log("disconnected")
  }
});
                                          // set route for query and mutation
server.applyMiddleware({ app, cors: true, path: '/api/graphql' });

// create http server, to be able to make subscriptions
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

mongoose
  .connect(
    `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@cluster0.aajy3.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    httpServer.listen(env.PORT, () => {
      console.log(`Server ready at http://localhost:${env.PORT}${server.graphqlPath}`,)
    });
  })
  .catch(err => {
    console.log(err);
  })