import "reflect-metadata"
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"
import {Field, ID, Int, ObjectType} from "type-graphql"

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
}

