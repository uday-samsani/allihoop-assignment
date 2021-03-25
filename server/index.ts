import 'reflect-metadata'
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';

import ShipResolvers from './resolvers/ship';

const main = async () => {
    const app = express();

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ShipResolvers],
            validate: false
        })
    });

    server.applyMiddleware({app, path: '/graphql'});

    const port = process.env.port || 4000;

    app.listen({port}, () => {
        console.log(`Graphql server listening on http://localhost:${port}${server.graphqlPath}`);
    });
};

main().catch(err => {
    console.log(err);
});