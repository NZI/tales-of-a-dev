import {User} from "~/lib/entities/User"
import LoadState from "~/lib/interfaces/LoadState"

export default interface State {
    counter: {
        value: number,
        serverValue: any
    },
    user: {
        user?: User,
        loadState: LoadState
    }
}