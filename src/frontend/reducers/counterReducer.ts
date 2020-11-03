import initialState from "~/frontend/initialState";
import Action from '~/lib/interfaces/Action'

export default function counterReducer(state = initialState.counter, action: Action) {
    switch (action.type) {
        case 'FETCH/COUNTER_SAVED':
            console.log(action.value)
            return {
                ...state,
                serverValue: action.value
            }
        case 'COUNTER/INCREMENT':
            return {
                ...state,
                value: state.value + 1
            }
        case 'COUNTER/DECREMENT':
            return {
                ...state,
                value: state.value - 1
            }
        default:
            return state
    }
}