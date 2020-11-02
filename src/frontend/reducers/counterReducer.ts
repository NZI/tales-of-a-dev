import initialState from "~/frontend/initialState";
import Action from '~/lib/interfaces/Action'

export default function counterReducer(state = initialState.counter, action: Action) {
    switch (action.type) {
        case 'counter/increment':
            return {
                ...state,
                value: state.value + 1
            }
        case 'counter/decrement':
            return {
                ...state,
                value: state.value - 1
            }
        default:
            return state
    }
}