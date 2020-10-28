import "reflect-metadata"
import {Arg, Query, Resolver} from "type-graphql"
import {User} from "~/lib/entities/User"

@Resolver(of => User)
export class UserResolver {
    @Query(returns => [User], {description: "Returns a list of Users"})
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
        console.log(firstName, lastName)
        const isaac = new User()
        const foobar = new User()
        isaac.id = `${Math.random()}`
        foobar.id = `${Math.random()}`
        isaac.firstName = 'isaac'
        isaac.lastName = 'gilmour'
        foobar.firstName = 'foo'
        foobar.lastName = 'bar'
        let users = [
            isaac,
            foobar
        ]

        if (firstName) {
            users = users.filter(user => new RegExp(firstName).test(user.firstName))
        }

        if (lastName) {
            users = users.filter(user => new RegExp(lastName).test(user.lastName))
        }

        return users
    }
}