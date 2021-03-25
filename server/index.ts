import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';

const app = express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware({app, path: '/graphql'});

const port = process.env.port || 4000;

app.listen({port}, () => {
    console.log(`Graphql server listening on http://localhost:${port}${server.graphqlPath}`);
});