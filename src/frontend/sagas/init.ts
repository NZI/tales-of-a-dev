import {debounce, select, put, delay} from 'redux-saga/effects'
import {State} from "~/lib/interfaces/State"
import Action from "~/lib/interfaces/Action"
import Cookies from 'js-cookie'
import {PAGE_LOADED} from "~/frontend/reducers/pageReducer";


function* loadUser() {
    const apiKey = Cookies.get('API_KEY')
    if (!apiKey) {
        return
    }
}

export function* loadInitialState() {
    yield loadUser()
    yield delay(1)
    yield put({
         type: PAGE_LOADED
     })
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