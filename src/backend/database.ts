import { Connection, createConnection, ConnectionOptions } from "typeorm"
import { User } from "~/lib/entities/User"

const config = JSON.parse(process.env.DATABASE)

let connection: Promise<Connection>

export default () => {
    if (connection) {
        return connection
    }
    const latestConfig = {
        ...config,
        entities: [
            User
        ],
    }
    console.log(latestConfig)
    return connection = createConnection(latestConfig)
}
