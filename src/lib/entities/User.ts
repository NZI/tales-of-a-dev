import "reflect-metadata"
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"
import {Arg, Field, ID, Int, ObjectType, Query, Resolver} from "type-graphql"

@Entity()
@ObjectType({ description: "The Users model" })
export class User {

    @Field(()=> ID)
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column()
    firstName: string

    @Field()
    @Column()
    lastName: string

    @Field(() => Int)
    @Column('int')
    age: number

    @Field(() => Int)
    @Column('int')
    IQ: number

    @Field()
    @Column()
    email: string
}
