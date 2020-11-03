import {debounce, select, put} from 'redux-saga/effects'
import State from "~/lib/interfaces/State"
import Action from "~/lib/interfaces/Action"
import Cookies from 'js-cookie'



export const getUser = (state: State) => {
    return state.user.user
}

export function* loadInitialState() {
    const apiKey = Cookies.get('API_KEY')
    if (!apiKey) {
        return
    }
    console.log(apiKey)
    // const response = yield fetch('/login', {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({value})
    // })
    // const serverCounter = yield response.json()
    // yield put({
    //     type: 'FETCH/COUNTER_SAVED',
    //     value: serverCounter
    // })
}