import initialState from "~/frontend/initialState"
import Action from '~/lib/interfaces/Action'
import {CounterState} from "~/lib/interfaces/State"

export const COUNTER_SAVED = 'FETCH/COUNTER_SAVED'
export const COUNTER_INCREMENT = 'COUNTER/INCREMENT'
export const COUNTER_DECREMENT = 'COUNTER/DECREMENT'

export function counter(state = initialState.counter, action: Action): CounterState {
    switch (action.type) {
        case COUNTER_SAVED:
            return {
                ...state,
                serverValue: action.value
            }
        case COUNTER_INCREMENT:
            return {
                ...state,
                value: state.value + 1
            }
        case COUNTER_DECREMENT:
            return {
                ...state,
                value: state.value - 1
            }
        default:
            return state
    }
}