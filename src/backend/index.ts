import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import express, { RequestHandler, response } from 'express'
import {graphqlHTTP} from 'express-graphql'
import {UserResolver} from "~/backend/resolvers/User"
import {resolve} from "path"
import { exists, fstat, stat, readFile } from 'fs'
import { promisify } from 'util'
import getDb from './database'
import { User } from '~/lib/entities/User'
import { getRepository } from 'typeorm'

const asyncStat = promisify(stat)
const asyncReadFile = promisify(readFile)

export default (async () => {
    const schema: any = await buildSchema({
        resolvers: [UserResolver],
        emitSchemaFile: false,
        validate: true,
    })

    const app = express()

    const connection = await getDb()

    // let user = new User()
    // user.firstName = 'Isaac'
    // user.lastName = 'Gilmour'
    // user.age = 25

    // user = await connection.manager.save(user)
    // console.log(user)

    // const userRepository = getRepository(User)
    // const user = await userRepository.find({firstName: 'Isaac'})
    // console.log(user)

    const services = JSON.parse(await asyncReadFile(resolve(process.cwd(), 'services.json'), {encoding: 'utf-8'}))
 
    const servicesOrder = Object.keys(services).sort((left, right) => {
        const leftPriority = 'priority' in services[left] ? services[left].priority : 0
        const rightPriority = 'priority' in services[right] ? services[right].priority : 0
        return leftPriority == rightPriority ? left.localeCompare(right) : rightPriority - leftPriority
    })

    const hackyApp: any = (app as any)
    servicesOrder.forEach(service => {
        const methods = Object.keys(services[service])
        methods.forEach(method => {
            if (typeof (hackyApp[method]) !== 'function') {
                return
            }
            let paths = services[service][method]
            if (!(services[service][method] instanceof Array)) {
                paths = [paths]
            }
            const handler: RequestHandler = function (request, response, next) {
                
                next()
            };
            paths.forEach((path: string) => {
                hackyApp[method](path, handler)
            })
        })
    });

    app.use((request, response, next) => {

    })

    // app.use('/graphql', graphqlHTTP({
    //     schema,
    //     graphiql: true
    // }))


    // app.get('/users', async (request,response, next) => {
    //     const userRepository = getRepository(User)

    //     const user = await userRepository.find({firstName: request.params.firstName})

    //     response.json(user)
    // })


    // app.post('/users', async (request,response, next) => {
    //     const userRepository = getRepository(User)

    //     let user = new User()
    //     user.firstName = request.params.firstName
    //     user.lastName = 'Gilmour'
    //     user.age = 25

    //     user = await connection.manager.save(user)

    //     response.json(user)
    // })

    app.get('*', async (request,response, next) => {
        const path = resolve(process.cwd(), `./frontend/${request.path}`)
        let sendFile = false
        try {
            const stats = await asyncStat(path)
            if (stats.isFile()) {
                sendFile = true
            }
        } finally {
            if (sendFile) {
                response.sendFile(path)
            } else {
                response.sendFile(resolve(process.cwd(), './frontend/index.html'))
            }
        }
    })

    app.listen(4000)

    console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})()
