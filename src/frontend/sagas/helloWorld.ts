import {debounce, select, put} from 'redux-saga/effects'
import State from "~/lib/interfaces/State"
import Action from "~/lib/interfaces/Action";


export const getCounterValue = (state: State) => {
    console.log(state.counter)
    return state.counter.value
}

export function* sendCounterToServer() {
    const value = yield select(getCounterValue)

    const response = yield fetch('/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({value})
    })
    const serverCounter = yield response.json()
    yield put({
        type: 'FETCH/COUNTER_SAVED',
        value: serverCounter
    })
}

export function* debounceCounterToServer() {
    yield debounce(1000, (a: Action) => /COUNTER\/.*/.test(a.type), sendCounterToServer)
}