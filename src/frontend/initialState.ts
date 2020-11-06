import {State} from "~/lib/interfaces/State"
import LoadState from "~/lib/interfaces/LoadState"

const initialState: State = {
    counter: {
        value: 0,
        serverValue: {}
    },
    user: {
        loadState: LoadState.NOT_LOADED,
    },
    page: {
        loadState: LoadState.NOT_LOADED,
    },
    app: {
        showLogin: false,
    }
}

export default initialState