import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import express, { RequestHandler, response } from 'express'
import {graphqlHTTP} from 'express-graphql'
import {resolve} from "path"
import { exists, fstat, stat, readFile } from 'fs'
import { promisify } from 'util'
import getDb from './database'
import { User } from '~/lib/entities/User'
import { getRepository } from 'typeorm'
import { coerceInputValue } from 'graphql'
import cote from 'cote'
import GraphQLRoute from './graphql'

const asyncStat = promisify(stat)
const asyncReadFile = promisify(readFile)

export default (async () => {
    const app = express()

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

    const graphQLRoute = await GraphQLRoute()

    app.use('/graphql', graphQLRoute)

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
            let requester: cote.Requester = null
            const handler: RequestHandler = async (request, response, next) => {
                console.log('sending request to ', {name: `${service}.requester`, key: service})
                if (requester == null) {
                    requester = new cote.Requester({name: `${service}.requester`, key: service})
                }
                const req = {
                    type: `${request.method}`,
                    query: request.query,
                    params: request.params,
                    cookies: request.cookies,
                    body: request.body,
                }

                console.log(req)

                const res = await requester.send(req)

                if ('headers' in res) {
                    for (let header in res.headers) {
                        if (!res.headers.hasOwnProperty(header)) continue
                        response.header(header, res.headers[header])
                    }

                }

                response.send(res.body)
            };
            paths.forEach((path: string) => {
                hackyApp[method](path, handler)
            })
        })
    });


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
        const path = resolve(process.cwd(), `../frontend/${request.path}`)
        let sendFile = false
        try {
            const stats = await asyncStat(path)
            if (stats.isFile()) {
                sendFile = true
            }
        } catch(e) { }

        if (sendFile) {
            response.sendFile(path)
        } else {
            response.sendFile(resolve(process.cwd(), '../static/index.html'))
        }
    })

    app.listen(4000)

    console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})()
