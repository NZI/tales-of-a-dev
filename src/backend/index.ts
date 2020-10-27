import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import {UserResolver} from "~/backend/resolvers/User";
import path from "path";

export default (async () => {
    const schema: any = await buildSchema({
        resolvers: [UserResolver],
        emitSchemaFile: false,
        validate: true,
    })

    const app = express()

    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.get('*.js', (request, response, next) => {
        response.sendFile(path.resolve(process.cwd(), `./frontend/${request.path}`))
    })

    app.get('*', (request,response, next) => {
        response.sendFile(path.resolve(process.cwd(), './static/index.html'))
    })

    app.listen(4000)

    console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})()
