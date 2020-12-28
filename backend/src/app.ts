import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';

import env from './config';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import chekAuth from './middlewares/chek-auth';


const app = express();

app.use(bodyParser.json());

app.use(chekAuth);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })  //to access request object from graphQL resolvers
});

server.applyMiddleware({ app, cors: true });

mongoose
  .connect(
    `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@cluster0.aajy3.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`Server ready at http://localhost:${env.PORT}${server.graphqlPath}`,)
    });
  })
  .catch(err => {
    console.log(err);
  })