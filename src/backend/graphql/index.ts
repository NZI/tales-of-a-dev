import {request, response, Router} from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './resolvers/UserResolver'

export default async () => {
    const router = Router()

    const schema = await buildSchema({
        resolvers: [UserResolver]
    })
    
    router.use('/', graphqlHTTP({
        schema,
        graphiql: true
    }))
    

    return router
}