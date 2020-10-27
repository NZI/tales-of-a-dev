import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {ObjectType, Field, ID, Resolver, ResolverInterface, Query, Int} from "type-graphql";

@Entity()
@ObjectType({ description: "The Users model" })
export class User {

    @Field(()=> ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field(() => Int)
    @Column('int')
    age: number;
}

@Resolver(of => User)
export class UserResolver {
    private userCollection: User[] = [];

    @Query(returns => [User])
    async users() {
        const isaac = new User()
        const foobar = new User()
        isaac.firstName = 'isaac'
        isaac.lastName = 'gilmour'
        foobar.firstName = 'foo'
        foobar.lastName = 'bar'
        return [
            isaac,
            foobar
        ]
    }
}