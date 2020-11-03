import cote from 'cote'
import { User } from '~/lib/entities/User'

const responder = new cote.Responder({name: 'responder.graphqlUserResolver', key: 'graphqlUserResolver'})

responder.on('graphqlUserResolver.users', async (data: any) => {
    console.log(data)
    const foobar = new User()
    foobar.id = '2'
    foobar.firstName = 'foo'
    foobar.lastName = 'bar'
    foobar.age = 69
    foobar.IQ = 1

    const isaac = new User()
    isaac.id = '1'
    isaac.firstName = 'isaac'
    isaac.lastName = 'gilmour'
    isaac.age = 25
    isaac.IQ = 9000

    return [
        isaac,
        foobar
    ]
})
