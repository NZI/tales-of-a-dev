import "reflect-metadata";
import { buildSchema } from "type-graphql";
import {UserResolver} from "~/lib/User";

async function main() {
    const schema = await buildSchema({
        resolvers: [UserResolver],
        emitSchemaFile: true,
        validate: false,
    })
    console.log(schema.toConfig())
}

main()