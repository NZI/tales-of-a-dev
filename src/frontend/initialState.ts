import State from "~/lib/interfaces/State"
import LoadState from "~/lib/interfaces/LoadState"

const initialState: State = {
    counter: {
        value: 0,
        serverValue: {}
    },
    user: {
        loadState: LoadState.NOT_LOADED,
    }
}

export default initialState