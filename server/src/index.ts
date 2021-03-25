import 'reflect-metadata'
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';

import ShipResolvers from './resolvers/ship';
import {createConnection} from 'typeorm';
import dailyStale from './utils/scheduler';

const main = async () => {
    try{
        await createConnection()
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error.message)
        console.log("Database connection failed")
    }

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


    dailyStale()
};

main().catch(err => {
    console.log(err);
});