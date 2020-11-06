import { Arg, Query, Resolver } from "type-graphql"
import { User } from "~/lib/entities/User"
import { Requester } from 'cote'
import { request } from "express"

let requester: Requester = null

@Resolver(of => User)
export class UserResolver {
    @Query(returns => [User], { description: "Returns a list of Users" })
    async users(
        @Arg('firstName', {
            nullable: true,
            description: 'Regular expression for filtering by Users first name'
        }) firstName?: string,
        @Arg('lastName', {
            nullable: true,
            description: 'Regular expression for filtering by Users first name'
        }) lastName?: string,
    ) {
        if (requester == null) {
            requester = new Requester({ name: 'requester.graphqlUserResolver', key: 'graphqlUserResolver' })
        }

        const users = await requester.send({
            type: 'users',
            firstName,
            lastName
        })


        return users
    }
}